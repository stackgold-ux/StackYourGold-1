import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, ShoppingBag, Database, Trash2, Download, Check, X, RefreshCw, Globe, Package, ExternalLink, Shield } from 'lucide-react';
import { wixClient } from '../utils/wixClient';
import { shopifyClient } from '../utils/shopifyClient';

const MerchantPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('syg_admin_authenticated') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'LegacyStack2026!') {
      sessionStorage.setItem('syg_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Merchant Passcode. Access Denied.');
    }
  };

  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('syg_orders') || '[]'));
  const [profiles, setProfiles] = useState(() => JSON.parse(localStorage.getItem('syg_squad_profiles') || '[]'));
  const [wixOrders, setWixOrders] = useState([]);
  const [wixProducts, setWixProducts] = useState([]);
  const [shopifyOrders, setShopifyOrders] = useState([]);
  const [shopifyProducts, setShopifyProducts] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [activeTab, setActiveTab] = useState('local'); // 'local', 'wix', or 'shopify'

  const loadData = () => {
    const savedOrders = JSON.parse(localStorage.getItem('syg_orders') || '[]');
    const savedProfiles = JSON.parse(localStorage.getItem('syg_squad_profiles') || '[]');
    setOrders(savedOrders);
    setProfiles(savedProfiles);
  };

  useEffect(() => {
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const fetchWixOrders = async () => {
    setIsSyncing(true);
    const data = await wixClient.getOrders();
    setWixOrders(data);
    setIsSyncing(false);
  };

  const fetchWixProducts = async () => {
    setIsSyncing(true);
    const data = await wixClient.getProducts();
    setWixProducts(data);
    setIsSyncing(false);
  };

  const pushToWix = async () => {
    if (orders.length === 0) return alert('No local orders to push.');
    setIsSyncing(true);
    await wixClient.syncOrder(orders[0]);
    alert('Synchronization initiated: Local orders are being pushed to Wix Headless.');
    setIsSyncing(false);
  };

  const fetchShopifyOrders = async () => {
    setIsSyncing(true);
    const data = await shopifyClient.getOrders();
    setShopifyOrders(data);
    setIsSyncing(false);
  };

  const fetchShopifyProducts = async () => {
    setIsSyncing(true);
    const data = await shopifyClient.getProducts();
    setShopifyProducts(data);
    setIsSyncing(false);
  };

  const pushToShopify = async () => {
    if (orders.length === 0) return alert('No local orders to push.');
    setIsSyncing(true);
    await shopifyClient.syncOrder(orders[0]);
    alert('Synchronization initiated: Local orders are being pushed to Shopify Swag Store.');
    setIsSyncing(false);
  };

  const resetDatabase = () => {
    if (window.confirm('Are you sure you want to clear all orders and profiles? This cannot be undone.')) {
      localStorage.removeItem('syg_orders');
      localStorage.removeItem('syg_squad_profiles');
      setOrders([]);
      setProfiles([]);
      window.location.reload();
    }
  };

  const exportData = () => {
    setShowExport(true);
  };

  const totalSales = orders.reduce((sum, order) => sum + (parseFloat(order.totalAmount) || 0), 0);
  const activeSubscribers = orders.filter(order => order.isSubscription).length;

  if (!isAuthenticated) {
    return (
      <section id="merchant-portal" className="py-24 bg-background border-t border-border relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full mx-auto px-6 relative z-10">
          <div className="bg-surface border border-border p-10 rounded-[32px] shadow-2xl backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
              <Shield size={32} />
            </div>
            
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">
              Access Restricted
            </h2>
            <p className="text-text-muted text-sm mb-8">
              The Merchant Command Center requires a secure passcode for authorization.
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="text-left">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2 block">
                  Merchant Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-white text-center font-bold tracking-widest focus:border-primary/50 focus:outline-none transition-colors"
                />
              </div>

              {error && (
                <div className="text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-background font-black uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-100 transition-all text-xs"
              >
                Unlock Command Center
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="merchant-portal" className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Database size={12} />
              <span>Internal Admin Portal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
              Merchant <span className="text-primary">Command Center</span>
            </h2>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={exportData}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-all font-bold uppercase text-xs tracking-widest"
            >
              <Download size={16} />
              <span>Export Data</span>
            </button>
            <button 
              onClick={resetDatabase}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all font-bold uppercase text-xs tracking-widest"
            >
              <Trash2 size={16} />
              <span>Reset Database</span>
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex flex-wrap gap-2 mb-8 bg-surface p-1 rounded-2xl border border-border w-fit">
          <button 
            onClick={() => setActiveTab('local')}
            className={`px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'local' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white'}`}
          >
            <Database size={14} />
            <span>Local Database</span>
          </button>
          <button 
            onClick={() => { setActiveTab('wix'); fetchWixOrders(); fetchWixProducts(); }}
            className={`px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'wix' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white'}`}
          >
            <Globe size={14} />
            <span>Wix Headless Sync</span>
          </button>
          <button 
            onClick={() => { setActiveTab('shopify'); fetchShopifyOrders(); fetchShopifyProducts(); }}
            className={`px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'shopify' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white'}`}
          >
            <ShoppingBag size={14} />
            <span>Shopify Swag Sync</span>
          </button>
        </div>

        {activeTab === 'local' && (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Total Sales', value: `${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: <LayoutDashboard size={24} />, color: 'text-primary' },
                { label: 'Active Subscribers', value: activeSubscribers, icon: <Users size={24} />, color: 'text-accent' },
                { label: 'Total Orders', value: orders.length, icon: <ShoppingBag size={24} />, color: 'text-white' },
                { label: 'Registered Profiles', value: profiles.length, icon: <Database size={24} />, color: 'text-secondary' },
              ].map((stat, i) => (
                <div key={i} className="bg-surface border border-border p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full -mr-8 -mt-8 group-hover:bg-primary/5 transition-all"></div>
                  <div className={`${stat.color} mb-4`}>{stat.icon}</div>
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Local Tables Section */}
            <div className="space-y-12">
              {/* Paying Customers Table */}
              <div className="bg-surface border border-border rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-border flex items-center justify-between">
                  <h3 className="text-xl font-black uppercase italic tracking-tight">Recent Orders & Customers</h3>
                  <span className="text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full text-text-muted uppercase tracking-widest">
                    {orders.length} Entries
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-background/50 text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <th className="px-8 py-4">ID / Date</th>
                        <th className="px-8 py-4">Customer</th>
                        <th className="px-8 py-4">Contact</th>
                        <th className="px-8 py-4">Items</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {orders.map((order, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6">
                            <div className="font-bold text-white text-sm">{order.orderId}</div>
                            <div className="text-[10px] text-text-muted mt-1">{new Date(order.date).toLocaleDateString()}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-white text-sm">{order.customerName}</div>
                            <div className="text-[10px] text-text-muted mt-1 max-w-[150px] truncate">{order.shippingAddress}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm font-medium">{order.customerEmail}</div>
                            <div className="text-[10px] text-text-muted mt-1">{order.customerPhone}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-wrap gap-1">
                              {order.items.map((item, idx) => (
                                <span key={idx} className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${item.type === 'subscription' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white/5 text-text-muted border border-white/10'}`}>
                                  {item.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${
                              order.status?.includes('Awaiting') ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                              order.status?.includes('Pending') ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                              'bg-green-500/10 text-green-500 border-green-500/20'
                            }`}>
                              {order.status || 'Completed'}
                            </span>
                            <div className="text-[9px] text-text-muted mt-1 uppercase tracking-widest">{order.paymentMethod || 'card'}</div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="font-black text-primary font-mono">${(parseFloat(order.totalAmount) || 0).toFixed(2)}</div>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan="6" className="px-8 py-12 text-center text-text-muted italic">No orders found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stack Squad Profiles Table */}
              <div className="bg-surface border border-border rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-border flex items-center justify-between">
                  <h3 className="text-xl font-black uppercase italic tracking-tight">Stack Squad Member Profiles</h3>
                  <span className="text-[10px] font-bold bg-primary/10 px-3 py-1 rounded-full text-primary uppercase tracking-widest">
                    {profiles.length} Members
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-background/50 text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <th className="px-8 py-4">Username</th>
                        <th className="px-8 py-4">Full Name</th>
                        <th className="px-8 py-4">Email</th>
                        <th className="px-8 py-4">Phone</th>
                        <th className="px-8 py-4">Plan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {profiles.map((profile, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6">
                            <div className="font-black text-accent text-sm">@{profile.username}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-white text-sm">{profile.fullName}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm font-medium">{profile.email}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm font-medium">{profile.phone}</div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-[10px] font-black uppercase px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                              {profile.tier || 'Free Stacker'}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {profiles.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-8 py-12 text-center text-text-muted italic">No registered profiles.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'wix' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Wix Headless Sync Dashboard */}
            <div className="bg-surface border border-border rounded-3xl p-8 mb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Globe className="text-primary" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tight">Wix Headless Integration</h3>
                  </div>
                  <p className="text-text-muted text-sm max-w-xl">
                    Connect your local storefront with Wix Headless backend. Manage products, sync orders, and track your global inventory in real-time.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={fetchWixOrders}
                    disabled={isSyncing}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 disabled:opacity-50"
                  >
                    <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                    <span>Fetch Wix Orders</span>
                  </button>
                  <button 
                    onClick={fetchWixProducts}
                    disabled={isSyncing}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Package size={14} className={isSyncing ? 'animate-spin' : ''} />
                    <span>Fetch Wix Catalog</span>
                  </button>
                  <button 
                    onClick={pushToWix}
                    disabled={isSyncing}
                    className="px-6 py-3 rounded-xl bg-primary text-background font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                    <span>Push Local Orders to Wix</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-border/50">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted block">Connection Status</label>
                  <div className="bg-background/50 border border-border rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <Check size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white uppercase text-xs tracking-widest">Wix Headless API</div>
                        <div className="text-[10px] text-text-muted mt-1 font-mono">App ID: d2e3f13a...eeea3cb0e925</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase text-green-500 tracking-widest">Connected</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted block">API Token (Secured)</label>
                  <div className="bg-background/50 border border-border rounded-2xl p-6 flex items-center justify-between">
                    <div className="font-mono text-xs text-white/50 tracking-tighter">
                      3LuAarTroNpB-UQ••••••••••••••••
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20">
                      WIX_HEADLESS_KEY
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Wix Orders Table */}
              <div className="bg-surface border border-border rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="text-primary" size={20} />
                    <h3 className="text-xl font-black uppercase italic tracking-tight">Wix Store Orders</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full text-text-muted uppercase tracking-widest">
                    {wixOrders.length} Synced
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-background/50 text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <th className="px-8 py-4">Wix ID</th>
                        <th className="px-8 py-4">Customer</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {wixOrders.map((order, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6 font-mono text-xs text-primary">{order.id}</td>
                          <td className="px-8 py-6 text-sm font-bold text-white">{order.customer}</td>
                          <td className="px-8 py-6">
                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${order.status === 'PAID' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right font-black text-white">{order.total}</td>
                        </tr>
                      ))}
                      {wixOrders.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-8 py-12 text-center text-text-muted italic text-sm">No Wix orders fetched. Click 'Fetch Wix Orders' to sync.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Wix Products Table */}
              <div className="bg-surface border border-border rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Package className="text-accent" size={20} />
                    <h3 className="text-xl font-black uppercase italic tracking-tight">Wix Catalog Products</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full text-text-muted uppercase tracking-widest">
                    {wixProducts.length} Synced
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-background/50 text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <th className="px-8 py-4">Name</th>
                        <th className="px-8 py-4">Price</th>
                        <th className="px-8 py-4">Stock</th>
                        <th className="px-8 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {wixProducts.map((prod, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6 text-sm font-bold text-white">{prod.name}</td>
                          <td className="px-8 py-6 text-sm font-mono text-accent">
                            {typeof prod.price === 'number' ? `${prod.price.toFixed(2)}` : prod.price}
                          </td>
                          <td className="px-8 py-6 text-[10px] font-black uppercase text-text-muted">{prod.inventory} Units</td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-primary hover:text-white transition-colors">
                              <ExternalLink size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {wixProducts.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-8 py-12 text-center text-text-muted italic text-sm">No Wix catalog products found. Click 'Fetch Wix Catalog' to sync.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shopify' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Shopify Storefront Sync Dashboard */}
            <div className="bg-surface border border-border rounded-3xl p-8 mb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <ShoppingBag className="text-accent" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tight">Shopify Storefront Sync</h3>
                  </div>
                  <p className="text-text-muted text-sm max-w-xl">
                    Sync local stacker acquisitions and Swag collections with your live Shopify merchant backend dynamically in real-time.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={fetchShopifyOrders}
                    disabled={isSyncing}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 disabled:opacity-50"
                  >
                    <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                    <span>Fetch Shopify Orders</span>
                  </button>
                  <button 
                    onClick={fetchShopifyProducts}
                    disabled={isSyncing}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Package size={14} className={isSyncing ? 'animate-spin' : ''} />
                    <span>Fetch Swag Catalog</span>
                  </button>
                  <button 
                    onClick={pushToShopify}
                    disabled={isSyncing}
                    className="px-6 py-3 rounded-xl bg-primary text-background font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                    <span>Push Swag Orders</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-border/50">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted block">Connection Status</label>
                  <div className="bg-background/50 border border-border rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <Check size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white uppercase text-xs tracking-widest">Shopify Custom App</div>
                        <div className="text-[10px] text-text-muted mt-1 font-mono">Domain: stackyoursilver.myshopify.com</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase text-green-500 tracking-widest">Connected</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted block">Access Token (Masked)</label>
                  <div className="bg-background/50 border border-border rounded-2xl p-6 flex items-center justify-between">
                    <div className="font-mono text-xs text-white/50 tracking-tighter">
                      shpat_01a3cf8d742b918f654b9d••••••
                    </div>
                    <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest border border-accent/20">
                      SHOPIFY_STOREFRONT_TOKEN
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Shopify Orders Table */}
              <div className="bg-surface border border-border rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="text-primary" size={20} />
                    <h3 className="text-xl font-black uppercase italic tracking-tight">Shopify Swag Orders</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full text-text-muted uppercase tracking-widest">
                    {shopifyOrders.length} Synced
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-background/50 text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <th className="px-8 py-4">Shopify ID</th>
                        <th className="px-8 py-4">Customer</th>
                        <th className="px-8 py-4">Swag Items</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {shopifyOrders.map((order, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6 font-mono text-xs text-primary">{order.id}</td>
                          <td className="px-8 py-6 text-sm font-bold text-white">{order.customer}</td>
                          <td className="px-8 py-6 text-xs text-text-muted">{order.items}</td>
                          <td className="px-8 py-6">
                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${order.status === 'FULFILLED' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right font-black text-white">{order.total}</td>
                        </tr>
                      ))}
                      {shopifyOrders.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-8 py-12 text-center text-text-muted italic text-sm">No Shopify orders fetched. Click 'Fetch Shopify Orders' to sync.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Shopify Products Table */}
              <div className="bg-surface border border-border rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Package className="text-accent" size={20} />
                    <h3 className="text-xl font-black uppercase italic tracking-tight">Shopify Swag Products</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full text-text-muted uppercase tracking-widest">
                    {shopifyProducts.length} Synced
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-background/50 text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <th className="px-8 py-4">Name</th>
                        <th className="px-8 py-4">Price</th>
                        <th className="px-8 py-4">Stock</th>
                        <th className="px-8 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {shopifyProducts.map((prod, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6 text-sm font-bold text-white">{prod.name}</td>
                          <td className="px-8 py-6 text-sm font-mono text-accent">
                            {typeof prod.price === 'number' ? `${prod.price.toFixed(2)}` : prod.price}
                          </td>
                          <td className="px-8 py-6 text-[10px] font-black uppercase text-text-muted">{prod.inventory} Units</td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-primary hover:text-white transition-colors">
                              <ExternalLink size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {shopifyProducts.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-8 py-12 text-center text-text-muted italic text-sm">No Shopify products found. Click 'Fetch Swag Catalog' to sync.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Data Modal */}
        {showExport && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md">
            <div className="bg-surface border border-border rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl relative">
              <button 
                onClick={() => setShowExport(false)}
                className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="p-12">
                <h3 className="text-2xl font-black uppercase italic mb-6">Database Export (JSON)</h3>
                <div className="bg-background p-6 rounded-2xl border border-border h-[400px] overflow-auto mb-8">
                  <pre className="text-[10px] text-primary/80 font-mono">
                    {JSON.stringify({ orders, profiles }, null, 2)}
                  </pre>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify({ orders, profiles }, null, 2));
                    alert('Copied to clipboard!');
                  }}
                  className="w-full py-4 rounded-2xl bg-primary text-background font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                >
                  <Check size={20} />
                  <span>Copy to Clipboard</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MerchantPortal;
