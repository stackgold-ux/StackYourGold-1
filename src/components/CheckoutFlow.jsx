import { useState, useEffect, useRef } from 'react';
import { CreditCard, Truck, CheckCircle2, ArrowRight, ArrowLeft, Building2, CheckSquare, Info, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { wixClient } from '../utils/wixClient';
import { shopifyClient } from '../utils/shopifyClient';
import { trackPurchase } from '../utils/tracking';

const CheckoutFlow = ({ cart, onComplete, onCancel, onOpenRules }) => {
  const containerRef = useRef(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Smoothly scroll the checkout modal into the center of the viewport on mount
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Google Customer Reviews opt-in — fire once a real order is confirmed on our site.
  // (Shopify and Stripe checkouts complete off-site, so this only runs for the
  // local wire/check confirmation path.)
  useEffect(() => {
    if (step !== 4) return;
    const allOrders = JSON.parse(localStorage.getItem('syg_orders') || '[]');
    const lastOrder = allOrders[allOrders.length - 1];
    if (!lastOrder || !lastOrder.orderId || !lastOrder.customerEmail) return;
    const delivery = new Date(Date.now() + 14 * 86400000);
    window.__SYG_ORDER__ = {
      order_id: lastOrder.orderId,
      email: lastOrder.customerEmail,
      delivery_country: 'US',
      estimated_delivery_date: delivery.toISOString().slice(0, 10)
    };
    if (typeof window.renderGoogleOptIn === 'function') window.renderGoogleOptIn();
  }, [step]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    dob: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    paymentMethod: 'card',
    createAccount: false,
    username: '',
    password: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
  const shipping = subtotal > 500 ? 0 : 20;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerOrderNotification = async (orderData) => {
    const WEBHOOK_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_NOTIFICATION_WEBHOOK_URL) || '';

    console.log('--- ORDER NOTIFICATION SYSTEM ---');
    console.log('Order ID:', orderData.orderId);
    console.log('Customer:', orderData.customerName);
    console.log('Amount:', `${orderData.totalAmount}`);
    
    // Sync logic
    try { await wixClient.syncOrder(orderData); } catch { console.warn('[WIX] Sync failed'); }
    try { await shopifyClient.syncOrder(orderData); } catch { console.warn('[SHOPIFY] Sync failed'); }
    
    if (WEBHOOK_URL) {
      try {
        let payload = {
          text: `🚀 *New Wealth Order Secured!*\n*Order ID:* ${orderData.orderId}\n*Customer:* ${orderData.customerName}\n*Email:* ${orderData.customerEmail}\n*Amount:* ${orderData.totalAmount.toFixed(2)}\n*Status:* ${orderData.status}`
        };
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (error) {
        console.warn('[NOTIFICATION] Webhook dispatch failed');
      }
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zip || !formData.dob) {
        alert('Please fill out all details.');
        return;
      }
    }

    if (step === 3) {
      const shopifyItems = cart.filter(item => item.isShopify);
      if (shopifyItems.length > 0) {
        try {
          const checkoutUrl = await shopifyClient.createCheckout(shopifyItems);
          if (checkoutUrl) {
            window.location.href = checkoutUrl;
            return;
          }
        } catch (error) {
          console.error('[SHOPIFY] Checkout failed', error);
          alert('Shopify checkout connection failed.');
          return;
        }
      }

      const orderId = `SYS-${Math.floor(1000 + Math.random() * 9000)}`;
      const status = formData.paymentMethod === 'wire' ? 'Awaiting Wire Transfer' : 
                     formData.paymentMethod === 'check' ? 'Pending Check Clearance' : 'Completed';

      const newOrder = {
        orderId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zip}`,
        items: cart.map(item => ({ name: item.name, price: Number(parseFloat(item.price).toFixed(2)), type: item.type })),
        totalAmount: Number(total.toFixed(2)),
        isSubscription: cart.some(item => item.type === 'subscription'),
        paymentMethod: formData.paymentMethod,
        status,
        date: new Date().toISOString()
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('syg_orders') || '[]');
      localStorage.setItem('syg_orders', JSON.stringify([...existingOrders, newOrder]));

      triggerOrderNotification(newOrder);
      trackPurchase(newOrder);

      if (formData.createAccount) {
        const subscriptionItem = cart.find(item => item.type === 'subscription');
        const newProfile = {
          username: formData.username,
          fullName: formData.name,
          email: formData.email,
          tier: subscriptionItem ? subscriptionItem.name : 'Free Stacker',
          date: new Date().toISOString()
        };
        const existingProfiles = JSON.parse(localStorage.getItem('syg_squad_profiles') || '[]');
        localStorage.setItem('syg_squad_profiles', JSON.stringify([...existingProfiles, newProfile]));
      }

      // Stripe logic
      if (formData.paymentMethod === 'card') {
        const stripeLinks = {
          silver: 'https://buy.stripe.com/9B6dR915cdGv8XoekF3Je00',
          gold: 'https://buy.stripe.com/8x2aEXaFM59Z4H83G13Je01',
          platinum: 'https://buy.stripe.com/4gMcN5eW245Va1sa4p3Je02'
        };
        const subscriptionItem = cart.find(item => item.type === 'subscription');
        if (subscriptionItem) {
          let redirectUrl = null;
          if (subscriptionItem.id.includes('silver')) redirectUrl = stripeLinks.silver;
          else if (subscriptionItem.id.includes('gold')) redirectUrl = stripeLinks.gold;
          else if (subscriptionItem.id.includes('platinum')) redirectUrl = stripeLinks.platinum;
          if (redirectUrl) {
            window.location.href = redirectUrl;
            return;
          }
        }
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (step === 4) {
    const allOrders = JSON.parse(localStorage.getItem('syg_orders') || '[]');
    const lastOrder = allOrders[allOrders.length - 1];
    const orderId = lastOrder?.orderId || 'SYS-XXXX';
    
    const subscriptionOrders = allOrders.filter(o => o.isSubscription);
    const isWinner = lastOrder?.isSubscription && subscriptionOrders.length % 9 === 0;

    return (
      <div ref={containerRef} className="bg-surface p-12 rounded-3xl border border-primary/30 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
        {isWinner && (
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/20 blur-[80px] rounded-full"></div>
          </div>
        )}
        
        <div className="relative z-10">
          {isWinner && (
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8 inline-block">
              <div className="bg-primary text-background px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm flex items-center shadow-xl shadow-primary/40 animate-bounce">
                <Zap size={16} className="mr-2 fill-current" />
                Surprise Stack Winner!
                <Zap size={16} className="ml-2 fill-current" />
              </div>
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mt-3">Subscriber #{subscriptionOrders.length}</p>
            </motion.div>
          )}

          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-primary" size={48} />
          </div>
          <h2 className="text-3xl font-black uppercase italic mb-2">Wealth Secured</h2>
          <div className="text-primary font-mono font-bold mb-6 uppercase tracking-widest text-lg">Order #{orderId}</div>
          
          {isWinner && (
            <div className="mb-8 p-6 bg-primary/10 border-2 border-primary/30 rounded-2xl text-left">
              <p className="text-sm text-white font-bold leading-relaxed">
                As our {subscriptionOrders.length}th subscriber, you've won a <span className="text-primary italic">Surprise Stack</span> of real physical gold & silver!
              </p>
            </div>
          )}

          <div className="bg-background/50 p-6 rounded-2xl border border-border mb-8 text-left">
            {formData.paymentMethod === 'wire' && (
              <div className="space-y-2 text-[10px] uppercase font-bold text-text-muted">
                <p>Wire transfer required within 24h. Include Order #{orderId}.</p>
                <div className="border-t border-border/50 pt-2 grid grid-cols-2">
                  <span>Bank:</span><span className="text-white text-right">JPMorgan Chase</span>
                  <span>Account:</span><span className="text-white text-right">8273491024</span>
                </div>
              </div>
            )}
            {formData.paymentMethod === 'card' && <p className="text-text-muted text-sm">Receipt sent to your email.</p>}
          </div>

          <button onClick={onComplete} className="bg-primary text-background px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-surface rounded-3xl border border-border overflow-hidden max-w-4xl mx-auto shadow-2xl">
      <div className="flex border-b border-border bg-background/30">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all ${step === s ? 'text-primary border-b-2 border-primary' : 'text-text-muted opacity-50'}`}>
            {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
          </div>
        ))}
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center"><Truck className="mr-2 text-primary" /> Shipping Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name" onChange={handleInputChange} value={formData.name} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2 text-white" />
              <input name="email" placeholder="Email Address" onChange={handleInputChange} value={formData.email} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2 text-white" />
              <input name="phone" placeholder="Phone" onChange={handleInputChange} value={formData.phone} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2 text-white" />
              <input name="address" placeholder="Address" onChange={handleInputChange} value={formData.address} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2 text-white" />
              <input name="city" placeholder="City" onChange={handleInputChange} value={formData.city} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary text-white" />
              <input name="zip" placeholder="Zip" onChange={handleInputChange} value={formData.zip} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary text-white" />
              <input name="dob" placeholder="DOB (MM/DD/YYYY)" onChange={handleInputChange} value={formData.dob} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2 text-white" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold flex items-center"><CreditCard className="mr-2 text-primary" /> Payment Method</h3>
            <div className="grid grid-cols-3 gap-4">
              {['card', 'wire', 'check'].map(id => (
                <button key={id} onClick={() => setFormData({ ...formData, paymentMethod: id })} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2 ${formData.paymentMethod === id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background/50 text-text-muted'}`}>
                  <span className="text-[10px] font-black uppercase">{id}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Review Order</h3>
            <div className="space-y-2">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                  <span className="font-bold text-white uppercase">{item.name}</span>
                  <span className="font-mono text-primary font-bold">${parseFloat(item.price).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-4 flex justify-between text-xl font-black border-t border-border/50">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-12">
          {step > 1 ? (
            <button onClick={prevStep} className="text-text-muted font-bold uppercase text-xs">Back</button>
          ) : (
            <button onClick={onCancel} className="text-red-500 font-bold uppercase text-xs">Cancel</button>
          )}
          <button onClick={nextStep} className="bg-primary text-background px-10 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl">
            {step === 3 ? 'Secure Wealth' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
