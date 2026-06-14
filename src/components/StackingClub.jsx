import React, { useState } from 'react';
import { Check, Calendar, TrendingUp, Shield } from 'lucide-react';

const StackingClub = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 'apprentice', name: 'Apprentice', amount: 100, perks: ['1/10 oz Silver monthly', 'Educational newsletter', 'Market updates'] },
    { id: 'guardian', name: 'Guardian', amount: 250, perks: ['1/4 oz Silver + 1g Gold', 'Exclusive webinars', 'Early access to drops'] },
    { id: 'patriarch', name: 'Patriarch/Matriarch', amount: 500, perks: ['1/2 oz Silver + 2.5g Gold', 'Custom engraving included', 'Private consulting'] },
  ];

  return (
    <section className="py-20 bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase italic text-accent mb-4">Monthly Stacking Club</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Shift from fragile fiat to tangible wealth with disciplined, hands-off accumulation.
            Join the elite circle of generational wealth builders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col ${
                selectedPlan === plan.id 
                  ? 'border-primary bg-primary/5 scale-105 shadow-2xl shadow-primary/20' 
                  : 'border-border bg-surface hover:border-primary/30'
              }`}
            >
              {selectedPlan === plan.id && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background text-xs font-bold px-4 py-1 rounded-full uppercase">
                  Selected
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-primary">${plan.amount}</span>
                <span className="text-text-muted">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.perks.map((perk, i) => (
                  <li key={i} className="flex items-start text-sm text-text-muted">
                    <Check size={16} className="text-primary mr-3 mt-0.5 shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                selectedPlan === plan.id 
                  ? 'bg-primary text-background' 
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}>
                Join the Club
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-border pt-16">
          <div>
            <Calendar className="mx-auto text-primary mb-4" size={32} />
            <h4 className="font-bold mb-2">Auto-Delivery</h4>
            <p className="text-text-muted text-sm">Metals shipped securely to your vault monthly.</p>
          </div>
          <div>
            <TrendingUp className="mx-auto text-primary mb-4" size={32} />
            <h4 className="font-bold mb-2">DCA Strategy</h4>
            <p className="text-text-muted text-sm">Eliminate market timing stress with dollar-cost averaging.</p>
          </div>
          <div>
            <Shield className="mx-auto text-primary mb-4" size={32} />
            <h4 className="font-bold mb-2">Legacy Wealth</h4>
            <p className="text-text-muted text-sm">Building a foundation that survives inflation and crisis.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackingClub;
