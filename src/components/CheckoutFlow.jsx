import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const CheckoutFlow = ({ cart, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
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
              <input name="address" placeholder="Shipping Address" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary col-span-2" />
              <input name="city" placeholder="City" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary" />
              <input name="zip" placeholder="Zip Code" onChange={handleInputChange} className="bg-background border border-border p-4 rounded-xl outline-none focus:border-primary" />
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
