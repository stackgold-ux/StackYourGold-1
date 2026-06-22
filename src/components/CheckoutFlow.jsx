import { useState, useEffect, useRef } from 'react';
import { CreditCard, Truck, CheckCircle2, ArrowRight, ArrowLeft, Building2, CheckSquare, Info, ShieldCheck, Zap } from 'lucide-react';
import { wixClient } from '../utils/wixClient';
import { shopifyClient } from '../utils/shopifyClient';
import { trackPurchase } from '../utils/tracking';

const CheckoutFlow = ({ cart, onComplete, onCancel }) => {
  const containerRef = useRef(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Smoothly scroll the checkout modal into the center of the viewport on mount
    // This is vital for full-height embedded iframe execution environments (like Wix iframe embeds)
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);
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
    // Read notification webhook URL from environment variables (Slack, Discord, Twilio, etc.)
    const WEBHOOK_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_NOTIFICATION_WEBHOOK_URL) || '';

    console.log('--- ORDER NOTIFICATION SYSTEM ---');
    console.log('Order ID:', orderData.orderId);
    console.log('Customer:', orderData.customerName);
    console.log('Amount:', `${orderData.totalAmount}`);
    console.log('Method:', orderData.paymentMethod);
    console.log('Status:', orderData.status);
    
    // Wix Sync Integration
    try {
      console.log('[WIX] Synchronizing order with Wix Headless backend...');
      await wixClient.syncOrder(orderData);
      console.log('[WIX] Sync complete.');
    } catch {
      console.warn('[WIX] Sync failed, but order is safe in local storage.');
    }

    // Shopify Sync Integration
    try {
      console.log('[SHOPIFY] Synchronizing order with Shopify Storefront backend...');
      await shopifyClient.syncOrder(orderData);
      console.log('[SHOPIFY] Sync complete.');
    } catch {
      console.warn('[SHOPIFY] Sync failed, but order is safe in local storage.');
    }
    
    console.log('---------------------------------');

    // Live Webhook Dispatcher (Supports Slack and Discord Rich Embed Cards)
    if (WEBHOOK_URL) {
      try {
        let payload = {};
        const isDiscord = WEBHOOK_URL.includes('discord.com') || WEBHOOK_URL.includes('discordapp.com');

        if (isDiscord) {
          payload = {
            embeds: [{
              title: "🚀 New Wealth Order Secured!",
              color: 13411387, // Gold Color hex: #cca43b
              fields: [
                { name: "Order ID", value: orderData.orderId, inline: true },
                { name: "Customer", value: orderData.customerName, inline: true },
                { name: "Email", value: orderData.customerEmail, inline: true },
                { name: "Amount", value: `${orderData.totalAmount.toFixed(2)}`, inline: true },
                { name: "Payment Method", value: orderData.paymentMethod.toUpperCase(), inline: true },
                { name: "Status", value: orderData.status, inline: true }
              ],
              timestamp: orderData.date,
              footer: { text: "Your Future. Your Stack. Your Legacy." }
            }]
          };
        } else {
          // Default Slack payload formatting
          payload = {
            text: `🚀 *New Wealth Order Secured!*\n*Order ID:* ${orderData.orderId}\n*Customer:* ${orderData.customerName}\n*Email:* ${orderData.customerEmail}\n*Amount:* ${orderData.totalAmount.toFixed(2)}\n*Method:* ${orderData.paymentMethod.toUpperCase()}\n*Status:* ${orderData.status}`
          };
        }

        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log('[NOTIFICATION] Real-time webhook notification dispatched successfully.');
      } catch (error) {
        console.warn('[NOTIFICATION] Webhook dispatch failed:', error.message);
      }
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zip || !formData.dob) {
        alert('Please fill out all shipping and verification details, including your Phone Number and Date of Birth.');
        return;
      }
      // Validate 10-digit phone number with area code
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        alert('Please enter a valid 10-digit phone number including your 3-digit area code (e.g., 510-999-4653).');
        return;
      }
      if (formData.createAccount && (!formData.username || !formData.password)) {
        alert('Please provide a username and password to create your account.');
        return;
      }
    }

    if (step === 3) {
      // Save order to localStorage
      const orderId = `SYG-${Math.floor(1000 + Math.random() * 9000)}`;
      const status = formData.paymentMethod === 'wire' ? 'Awaiting Wire Transfer' : 
                     formData.paymentMethod === 'check' ? 'Pending Check Clearance' : 'Completed';

      const newOrder = {
        orderId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zip}`,
        items: cart.map(item => ({ 
          name: item.name, 
          price: Number((parseFloat(item.price) || 0).toFixed(2)), 
          type: item.type 
        })),
        totalAmount: Number(total.toFixed(2)),
        isSubscription: cart.some(item => item.type === 'subscription'),
        paymentMethod: formData.paymentMethod,
        status,
        date: new Date().toISOString()
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('syg_orders') || '[]');
      localStorage.setItem('syg_orders', JSON.stringify([...existingOrders, newOrder]));

      // Trigger notification
      triggerOrderNotification(newOrder);
      trackPurchase(newOrder);

      // Save Profile if requested
      if (formData.createAccount) {
        const subscriptionItem = cart.find(item => item.type === 'subscription');
        const newProfile = {
          username: formData.username,
          password: formData.password, // Mock storage as requested
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          tier: subscriptionItem ? subscriptionItem.name : 'Free Stacker',
          date: new Date().toISOString()
        };
        const existingProfiles = JSON.parse(localStorage.getItem('syg_squad_profiles') || '[]');
        localStorage.setItem('syg_squad_profiles', JSON.stringify([...existingProfiles, newProfile]));
      }

      // Stripe Payment Links Integration (Only for Card/Subscription)
      if (formData.paymentMethod === 'card') {
        const stripeLinks = {
          silver: 'https://buy.stripe.com/9B6dR915cdGv8XoekF3Je00',
          gold: 'https://buy.stripe.com/8x2aEXaFM59Z4H83G13Je01',
          platinum: 'https://buy.stripe.com/4gMcN5eW245Va1sa4p3Je02'
        };

        const subscriptionItem = cart.find(item => item.type === 'subscription');
        
        if (subscriptionItem) {
          let redirectUrl = null;
          if (subscriptionItem.id.startsWith('squad-silver')) redirectUrl = stripeLinks.silver;
          else if (subscriptionItem.id.startsWith('squad-gold')) redirectUrl = stripeLinks.gold;
          else if (subscriptionItem.id.startsWith('squad-platinum')) redirectUrl = stripeLinks.platinum;

          if (redirectUrl) {
            window.location.href = redirectUrl;
            return; // Prevent step increment if redirecting
          }
        }
      }
    }
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  if (step === 4) {
    const lastOrder = JSON.parse(localStorage.getItem('syg_orders') || '[]').pop();
    const orderId = lastOrder?.orderId || 'SYG-XXXX';

    return (
      <div ref={containerRef} className="bg-surface p-12 rounded-3xl border border-primary/30 text-center max-w-2xl mx-auto shadow-2xl">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-primary" size={48} />
        </div>
        <h2 className="text-3xl font-black uppercase italic mb-2">Wealth Secured</h2>
        <div className="text-primary font-mono font-bold mb-6 uppercase tracking-widest text-lg">Order #{orderId}</div>
        
        <div className="bg-background/50 p-6 rounded-2xl border border-border mb-8 text-left">
          {formData.paymentMethod === 'wire' && (
            <div className="space-y-4">
              <p className="text-sm text-text-muted">
                Please initiate your Bank Wire transfer within 24 hours. <strong>Important: Include Order #{orderId} in the wire memo.</strong>
              </p>
              <div className="grid grid-cols-2 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-text-muted border-t border-border/50 pt-4">
                <span>Account Name</span>
                <span className="text-white text-right">Stack Your Gold LLC</span>
                <span>Bank Name</span>
                <span className="text-white text-right">JPMorgan Chase</span>
                <span>Routing Number</span>
                <span className="text-white text-right font-mono">021000021</span>
                <span>Account Number</span>
                <span className="text-white text-right font-mono">8273491024</span>
              </div>
            </div>
          )}

          {formData.paymentMethod === 'check' && (
            <div className="space-y-4">
              <p className="text-sm text-text-muted">
                Please mail your check for ${total.toFixed(2)} to the address below. <strong>Include Order #{orderId} on the check.</strong>
              </p>
              <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted border-t border-border/50 pt-4">
                <p>Payable to: <span className="text-white">Stack Your Gold LLC</span></p>
                <p>123 Gold St, Suite 500</p>
                <p>San Francisco, CA 94105</p>
              </div>
            </div>
          )}

          {formData.paymentMethod === 'card' && (
            <p className="text-text-muted">
              Your digital receipt has been sent to your email. Your legacy is one step closer to being solidified.
            </p>
          )}
        </div>

        {/* Road to 99 Grand Giveaway Entry Calculator */}
        <div className="bg-background/80 border border-accent/30 rounded-2xl p-6 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Zap size={64} className="text-accent" />
          </div>
          <div className="text-center relative z-10">
            <h4 className="text-accent font-black uppercase tracking-widest text-[10px] mb-4">9/9/26 Grand Giveaway Challenge Entry Summary</h4>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-black text-white italic leading-none">{Math.floor(total)}</div>
                <div className="text-[8px] font-bold text-text-muted uppercase tracking-[0.2em] mt-1">Base Entries</div>
              </div>
              <div className="text-accent font-black text-xl">X</div>
              <div className="text-center">
                <div className="text-3xl font-black text-accent italic leading-none animate-pulse">3X</div>
                <div className="text-[8px] font-bold text-text-muted uppercase tracking-[0.2em] mt-1">Multiplier</div>
              </div>
              <div className="text-white font-black text-xl">=</div>
              <div className="text-center">
                <div className="text-3xl font-black text-primary italic leading-none">{Math.floor(total) * 3}</div>
                <div className="text-[8px] font-bold text-text-muted uppercase tracking-[0.2em] mt-1">Total Potential</div>
              </div>
            </div>
            <p className="text-[9px] text-text-muted uppercase font-bold tracking-[0.1em] leading-relaxed max-w-sm mx-auto">
              Want to hit the max? Record your unboxing and tag us on <span className="text-accent">3+ platforms</span> to TRIPLE your entries instantly! 🎥
            </p>
            <div className="mt-4">
              <a href="#" className="text-[8px] font-black uppercase tracking-widest text-accent/50 hover:text-accent border-b border-accent/20 hover:border-accent transition-all">View Official Campaign Rules</a>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onComplete}
          className="bg-primary text-background px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-surface rounded-3xl border border-border overflow-hidden max-w-4xl mx-auto shadow-2xl">
      <div className="flex border-b border-border bg-background/30">
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              step === s ? 'text-primary border-b-2 border-primary' : 'text-text-muted opacity-50'
            }`}
          >
            {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
          </div>
        ))}
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
              <h3 className="text-xl font-bold flex items-center">
                <Truck className="mr-2 text-primary" /> Shipping Details
              </h3>
              <div className="flex flex-col md:items-end">
                <div className="flex items-center space-x-2 bg-primary/10 border border-primary/40 px-4 py-2 rounded-xl">
                  <ShieldCheck className="text-primary animate-pulse" size={18} />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                    100% ENCRYPTED SECURE SSL SESSION
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">
                  💳 Payment Services Guaranteed Through Stripe
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name" onChange={handleInputChange} value={formData.name} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2 text-white" />
              <input name="email" placeholder="Email Address" onChange={handleInputChange} value={formData.email} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2 text-white" />
              <input type="tel" name="phone" placeholder="Phone Number (10-digit: e.g. 510-999-4653)" onChange={handleInputChange} value={formData.phone} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2 text-white" />
              <input name="address" placeholder="Shipping Address" onChange={handleInputChange} value={formData.address} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2 text-white" />
              <input name="city" placeholder="City" onChange={handleInputChange} value={formData.city} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary text-white" />
              <input name="zip" placeholder="Zip Code" onChange={handleInputChange} value={formData.zip} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary text-white" />
              <div className="col-span-2 space-y-2 border-t border-border/50 pt-4 mt-2">
                <label className="block text-[11px] font-black uppercase tracking-widest text-primary">
                  Date of Birth (MM/DD/YYYY) * Required for KYC Verification
                </label>
                <input 
                  type="text" 
                  name="dob" 
                  placeholder="MM/DD/YYYY (e.g. 10/24/1985)" 
                  onChange={handleInputChange} 
                  value={formData.dob} 
                  className="w-full bg-background border border-border p-4 rounded-xl outline-none focus:border-primary text-white font-mono" 
                />
                <p className="text-[10px] text-text-muted uppercase tracking-wider leading-relaxed">
                  ⚠️ Federal Know Your Customer (KYC) laws require physical identity and age verification for precious metal transactions to combat money laundering and protect generational assets.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    name="createAccount"
                    checked={formData.createAccount}
                    onChange={(e) => setFormData({ ...formData, createAccount: e.target.checked })}
                    className="sr-only" 
                  />
                  <div className={`w-6 h-6 border-2 rounded-md transition-all ${formData.createAccount ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50'}`}>
                    {formData.createAccount && <CheckCircle2 size={16} className="text-background m-auto absolute inset-0" />}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-white uppercase tracking-tight text-sm">Create a Stack Squad Account (Optional)</span>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Unlock community chat and exclusive giveaways.</p>
                </div>
              </label>

              {formData.createAccount && (
                <div className="grid grid-cols-2 gap-4 mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Choose Username</label>
                    <input 
                      name="username" 
                      placeholder="e.g. GoldStacker" 
                      onChange={handleInputChange} 
                      value={formData.username}
                      className="w-full bg-background border border-border p-4 rounded-xl outline-none focus:border-primary font-bold text-white" 
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Set Password</label>
                    <input 
                      name="password" 
                      type="password" 
                      placeholder="••••••••" 
                      onChange={handleInputChange} 
                      value={formData.password}
                      className="w-full bg-background border border-border p-4 rounded-xl outline-none focus:border-primary font-bold text-white" 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold flex items-center">
              <CreditCard className="mr-2 text-primary" /> Select Payment Method
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'card', label: 'Credit/Debit Card (via Stripe)', icon: <CreditCard size={20} /> },
                { id: 'wire', label: 'Bank Wire Transfer', icon: <Building2 size={20} /> },
                { id: 'check', label: 'Mail-in Check', icon: <CheckSquare size={20} /> }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2 ${
                    formData.paymentMethod === method.id 
                      ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10' 
                      : 'border-border bg-background/50 text-text-muted hover:border-primary/30'
                  }`}
                >
                  {method.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest">{method.label}</span>
                </button>
              ))}
            </div>

            <div className="bg-background/40 border border-border rounded-2xl p-6 min-h-[220px]">
              {formData.paymentMethod === 'card' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Secure Card Entry</span>
                    <ShieldCheck size={16} className="text-primary" />
                  </div>
                  <input name="cardNumber" placeholder="Card Number" onChange={handleInputChange} value={formData.cardNumber} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary w-full text-white font-mono" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="expiry" placeholder="MM/YY" onChange={handleInputChange} value={formData.expiry} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary text-white font-mono" />
                    <input name="cvc" placeholder="CVC" onChange={handleInputChange} value={formData.cvc} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary text-white font-mono" />
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'wire' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center text-primary space-x-2">
                    <Building2 size={20} />
                    <span className="font-bold uppercase tracking-widest text-sm">Bank Wire Instructions</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    <span>Account Name</span>
                    <span className="text-white text-right">Stack Your Gold LLC</span>
                    <span>Bank Name</span>
                    <span className="text-white text-right">JPMorgan Chase</span>
                    <span>Account Type</span>
                    <span className="text-white text-right">Business Checking</span>
                    <span>Routing Number</span>
                    <span className="text-white text-right font-mono">021000021</span>
                    <span>Account Number</span>
                    <span className="text-white text-right font-mono">8273491024</span>
                    <span className="text-primary">Wire Memo</span>
                    <span className="text-primary text-right font-mono italic">INCLUDE YOUR ORDER ID</span>
                  </div>
                  <div className="pt-4 border-t border-border/50 flex items-start space-x-2">
                    <Info size={14} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-[9px] text-text-muted leading-relaxed">
                      Wired funds must be initiated within 24 hours to lock in your current rate. <strong>Please ensure your Order ID is in the wire memo.</strong> Orders will be released for shipping as soon as the wire settles.
                    </p>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'check' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center text-primary space-x-2">
                    <CheckSquare size={20} />
                    <span className="font-bold uppercase tracking-widest text-sm">Mail-in Check Instructions</span>
                  </div>
                  <div className="space-y-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    <p>Please make check payable to:</p>
                    <p className="text-white text-lg font-black tracking-tight leading-none italic">Stack Your Gold LLC</p>
                    <div className="pt-2">
                      <p>Send to:</p>
                      <p className="text-white">123 Gold St, Suite 500</p>
                      <p className="text-white">San Francisco, CA 94105</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/50 flex items-start space-x-2">
                    <Info size={14} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-[9px] text-text-muted leading-relaxed">
                      Checks must be postmarked within 48 hours. Orders will be held for a 5-day clearance period after receipt before physical fulfillment begins.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Review Order</h3>
            <div className="space-y-2">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                  <div className="flex flex-col">
                    <span className="font-bold text-white uppercase tracking-tight">{item.name}</span>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest">{item.weight || 'Physical Allocation'}</span>
                  </div>
                  <span className="font-mono text-primary font-bold">${(parseFloat(item.price) || 0).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-xs py-1 text-text-muted font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs py-1 text-text-muted font-bold uppercase tracking-widest">
                  <span>{shipping === 0 ? 'Shipping' : 'Insured Shipping (With Stacker Bonuses)'}</span>
                  <span className="font-mono text-white">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-4 border-t border-border/50">
                  <span className="uppercase tracking-tighter">Grand Total</span>
                  <span className="text-primary font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-primary">
                    {formData.paymentMethod === 'card' ? <CreditCard size={18} /> : 
                     formData.paymentMethod === 'wire' ? <Building2 size={18} /> : <CheckSquare size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-text-muted tracking-widest leading-none mb-1">Selected Payment</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {formData.paymentMethod === 'card' ? 'Credit / Debit (via Stripe)' : 
                       formData.paymentMethod === 'wire' ? 'Bank Wire Transfer' : 'Mail-in Check'}
                    </span>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="text-[9px] font-black uppercase tracking-widest text-primary border-b border-primary/30 hover:border-primary">Change</button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-12">
          {step > 1 ? (
            <button onClick={prevStep} className="flex items-center text-text-muted hover:text-white font-bold transition-colors uppercase text-xs tracking-widest">
              <ArrowLeft size={16} className="mr-2" /> Back
            </button>
          ) : (
            <button onClick={onCancel} className="text-red-500 font-bold hover:underline uppercase text-xs tracking-widest">Cancel Checkout</button>
          )}
          
          <button 
            onClick={nextStep}
            className="bg-primary hover:bg-primary-dark text-background px-10 py-4 rounded-xl font-black uppercase tracking-widest flex items-center transition-all shadow-xl shadow-primary/20"
          >
            {step === 3 ? 'Secure Wealth Now' : 'Continue'} <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
