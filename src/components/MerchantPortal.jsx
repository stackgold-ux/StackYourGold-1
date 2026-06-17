import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, ShoppingBag, Database, Trash2, Download, Check, X } from 'lucide-react';

const MerchantPortal = () => {
  const [orders, setOrders] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    loadData();
    // Listen for storage changes (for same-window updates if needed, though usually it's for other tabs)
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const loadData = () => {
    const savedOrders = JSON.parse(localStorage.getItem('syg_orders') || '[]');
    const savedProfiles = JSON.parse(localStorage.getItem('syg_squad_profiles') || '[]');
    setOrders(savedOrders);
    setProfiles(savedProfiles);
  };

  const resetDatabase = () => {
    if (window.confirm('Are you sure you want to clear all orders and profiles? This cannot be undone.')) {
      localStorage.removeItem('syg_orders');
      localStorage.removeItem('syg_squad_profiles');
      setOrders([]);
      setProfiles([]);
      // Reload to trigger seeding if implemented in App.jsx or here
      window.location.reload();
    }
  };

  const exportData = () => {
    setShowExport(true);
  };

  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const activeSubscribers = orders.filter(order => order.isSubscription).length;

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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Sales', value: `$${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: <LayoutDashboard size={24} />, color: 'text-primary' },
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

        {/* Tables Section */}
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
                      <td className="px-8 py-6 text-right">
                        <div className="font-black text-primary font-mono">${order.totalAmount.toFixed(2)}</div>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-12 text-center text-text-muted italic">No orders found.</td>
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
