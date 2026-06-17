import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const CheckoutFlow = ({ cart, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    createAccount: false,
    username: '',
    password: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const shipping = subtotal > 500 ? 0 : 20;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1) {
      if (formData.createAccount && (!formData.username || !formData.password)) {
        alert('Please provide a username and password to create your account.');
        return;
      }
    }

    if (step === 3) {
      // Save order to localStorage
      const orderId = `SYG-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder = {
        orderId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zip}`,
        items: cart.map(item => ({ name: item.name, price: item.price, type: item.type })),
        totalAmount: total,
        isSubscription: cart.some(item => item.type === 'subscription'),
        date: new Date().toISOString()
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('syg_orders') || '[]');
      localStorage.setItem('syg_orders', JSON.stringify([...existingOrders, newOrder]));

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

      // Stripe Payment Links Integration
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
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  if (step === 4) {
    return (
      <div className="bg-surface p-12 rounded-3xl border border-primary/30 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-primary" size={48} />
        </div>
        <h2 className="text-3xl font-black uppercase italic mb-4">Wealth Secured</h2>
        <p className="text-text-muted mb-8">
          Your order has been processed. You'll receive a confirmation email shortly. 
          Your legacy is one step closer to being solidified.
        </p>
        <button 
          onClick={onComplete}
          className="bg-primary text-background px-8 py-3 rounded-xl font-bold uppercase"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-3xl border border-border overflow-hidden max-w-4xl mx-auto">
      <div className="flex border-b border-border">
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest ${
              step === s ? 'text-primary border-b-2 border-primary' : 'text-text-muted'
            }`}
          >
            {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
          </div>
        ))}
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Truck className="mr-2 text-primary" /> Shipping Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2" />
              <input name="email" placeholder="Email Address" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2" />
              <input name="phone" placeholder="Phone Number" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2" />
              <input name="address" placeholder="Shipping Address" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2" />
              <input name="city" placeholder="City" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary" />
              <input name="zip" placeholder="Zip Code" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary" />
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
                  <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Unlock community chat, exclusive giveaways, and tracking.</p>
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
                      className="w-full bg-background border border-border p-4 rounded-xl outline-none focus:border-primary font-bold" 
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Set Password</label>
                    <input 
                      name="password" 
                      type="password" 
                      placeholder="••••••••" 
                      onChange={handleInputChange} 
                      className="w-full bg-background border border-border p-4 rounded-xl outline-none focus:border-primary font-bold" 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <CreditCard className="mr-2 text-primary" /> Payment Method
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <input name="cardNumber" placeholder="Card Number" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-4" />
              <input name="expiry" placeholder="MM/YY" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2" />
              <input name="cvc" placeholder="CVC" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Review Order</h3>
            <div className="space-y-2">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                  <span>{item.name}</span>
                  <span className="font-mono">${item.price}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span>Subtotal</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span>Shipping</span>
                <span className="font-mono">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4">
                <span>Total</span>
                <span className="text-primary font-mono">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-12">
          {step > 1 ? (
            <button onClick={prevStep} className="flex items-center text-text-muted hover:text-white font-bold transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
          ) : (
            <button onClick={onCancel} className="text-red-500 font-bold hover:underline">Cancel</button>
          )}
          
          <button 
            onClick={nextStep}
            className="bg-primary hover:bg-primary-dark text-background px-8 py-3 rounded-xl font-bold flex items-center transition-all"
          >
            {step === 3 ? 'Secure Wealth Now' : 'Continue'} <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
