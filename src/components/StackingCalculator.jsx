import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowDownRight, ShieldCheck } from 'lucide-react';

const StackingCalculator = ({ spotPrices }) => {
  const [monthlyAmount, setMonthlyAmount] = useState(49.99);
  const [metal, setMetal] = useState('silver');
  const [results, setResults] = useState({ 1: 0, 5: 0, 10: 0 });

  const tiers = [24.99, 49.99, 99.99];
  
  useEffect(() => {
    let price;
    if (metal === 'gold') price = spotPrices.gold;
    else if (metal === 'silver') price = spotPrices.silver;
    else price = (spotPrices.gold + spotPrices.silver) / 2; // Mix/Surprise average

    const yearly = (monthlyAmount * 12) / price;
    setResults({
      1: yearly.toFixed(2),
      5: (yearly * 5).toFixed(2),
      10: (yearly * 10).toFixed(2)
    });
  }, [monthlyAmount, metal, spotPrices]);

  return (
    <div className="bg-surface border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <TrendingUp size={120} />
      </div>

      <h3 className="text-2xl font-black uppercase tracking-tight mb-8 italic">Calculate Your Legacy Stack</h3>
      
      <div className="space-y-8 relative z-10">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-text-muted">Monthly Contribution</label>
          <div className="flex justify-between items-center bg-background border border-border rounded-xl p-2">
            {tiers.map((tier) => (
              <button
                key={tier}
                onClick={() => setMonthlyAmount(tier)}
                className={`flex-1 py-3 px-4 rounded-lg font-black transition-all ${monthlyAmount === tier ? 'bg-primary text-background' : 'text-text-muted hover:bg-surface'}`}
              >
                ${tier}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-text-muted">Metal Focus</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['silver', 'gold', 'mix', 'surprise'].map((m) => (
              <button 
                key={m}
                onClick={() => setMetal(m)}
                className={`py-3 px-1 rounded-xl border-2 font-bold uppercase text-[9px] tracking-widest transition-all ${metal === m ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-text-muted'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          {[1, 5, 10].map((years) => (
            <div key={years} className="bg-background/50 border border-border p-4 rounded-2xl text-center">
              <span className="block text-[10px] font-bold text-text-muted uppercase mb-1">{years} Year{years > 1 ? 's' : ''}</span>
              <span className="text-xl font-black text-white">{results[years]}oz</span>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0"><ShieldCheck size={20} /></div>
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="text-white font-bold block mb-1 uppercase tracking-tight">The Inflation Shield</span>
              In 10 years, your ${monthlyAmount} cash savings could lose up to 40% of purchasing power. Your physical stack remains historic, tangible money.
            </p>
          </div>
        </div>

        <button className="w-full bg-primary text-background py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">
          Automate My Stack Now
        </button>
      </div>
    </div>
  );
};

export default StackingCalculator;
