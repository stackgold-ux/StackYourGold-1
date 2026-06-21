import { useState } from 'react';
import { Check, ArrowRight, Sliders, DollarSign, Zap, Award, Shield } from 'lucide-react';
import LogoGold from '../assets/logo-gold.jpg';
import LogoSilver from '../assets/logo-silver.jpg';
import ImgGold from '../assets/IMG_0596.jpeg';
import ImgSilver from '../assets/IMG_0597.jpeg';
import ImgPlatinum from '../assets/IMG_0598.jpeg';
import ImgStrategist from '../assets/IMG_0600.jpeg';

import ImgSurprise from '../assets/IMG_0605.jpeg';

const StackingClub = ({ addToCart }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selections, setSelections] = useState({
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Mix'
  });

  const [strategistBudget, setStrategistBudget] = useState(500);
  const [allocationSlider, setAllocationSlider] = useState(0);

  const goldRatio = 50 + (allocationSlider * 5);
  const silverRatio = 100 - goldRatio;

  const handleStrategistAddToCart = () => {
    if (strategistBudget < 101 || strategistBudget > 10000) return;
    
    addToCart({
      id: `squad-strategist-${strategistBudget}-${allocationSlider}`,
      name: `Stack Squad: The Strategists Tier (${strategistBudget}/mo - ${goldRatio}% Gold / ${silverRatio}% Silver)`,
      price: parseFloat(strategistBudget),
      type: 'subscription',
      image: ImgStrategist,
      description: `Custom stacking strategy: ${goldRatio}% Gold, ${silverRatio}% Silver.`
    });
  };

  const plans = [
    { 
      id: 'silver', 
      name: 'The Silver Tier', 
      amount: 24.99, 
      image: ImgSilver,
      perks: [
        'High-purity physical metals accumulated monthly',
        'Discreet insured shipping once thresholds met',
        'Full access to Your Stack School'
      ],
      perfect: 'Perfect for: Budding stackers, young families, or gifts for children.'
    },
    { 
      id: 'gold', 
      name: 'The Gold Tier', 
      amount: 49.99, 
      image: ImgGold,
      perks: [
        'Increased metal accumulation speed',
        'Prioritized monthly allocation',
        'Direct insured shipping',
        'Premium access to Your Stack School webinars'
      ],
      perfect: 'Perfect for: Family heads establishing a robust and active tangible safety net.',
      popular: true
    },
    { 
      id: 'platinum', 
      name: 'The Platinum Tier', 
      amount: 99.99, 
      image: ImgPlatinum,
      perks: [
        'Maximum priority metal allocation',
        'Priority shipping',
        'Free custom legacy engraving on one annual milestone piece',
        'Exclusive brand apparel'
      ],
      perfect: 'Perfect for: High-conviction wealth builders, business owners, and legacy collectors.'
    },
  ];

  const metalOptions = ['Silver', 'Gold', 'Mix', 'Surprise Me'];

  const handleAddToCart = (plan) => {
    const selection = selections[plan.id];
    addToCart({
      id: `squad-${plan.id}-${selection.toLowerCase()}`,
      name: `Stack Squad: ${plan.name} (${selection})`,
      price: plan.amount,
      type: 'subscription',
      image: plan.image,
      description: `Stack Squad subscription customized with ${selection}.`
    });
  };

  return (
    <section className="py-24 bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic text-accent mb-6">Stack Squad</h2>
          <p className="text-xl text-white font-bold mb-4 italic">Put Your Generational Wealth on Autopilot</p>
          <p className="text-text-muted max-w-2xl mx-auto">
            No market-timing stress. No manual order forms. Just automatic, disciplined wealth accumulation.
          </p>
        </div>

        {/* Road to 99 Campaign Highlight */}
        <div className="mb-24 bg-accent/5 border border-accent/20 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Zap className="text-accent opacity-20" size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent text-background text-[10px] font-black uppercase tracking-widest mb-6">
                <span>Active Campaign: Road to 99</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic mb-6 leading-none">
                The <span className="text-accent">"Road to 99"</span> Challenge
              </h3>
              <p className="text-lg text-text-muted mb-8 font-medium">
                We are on a mission to help 99 families secure their first physical gold and silver stack. To celebrate, we're dropping massive value into the community.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/20 p-2 rounded-lg text-accent mt-1"><Award size={20} /></div>
                  <div>
                    <h4 className="font-black uppercase tracking-widest text-xs text-white">The Surprise Stack</h4>
                    <p className="text-[10px] text-text-muted mt-1 uppercase font-bold">Every 9th subscriber gets extra physical gold/silver slid into their box.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/20 p-2 rounded-lg text-accent mt-1"><Shield size={20} /></div>
                  <div>
                    <h4 className="font-black uppercase tracking-widest text-xs text-white">9/9/26 Grand Giveaway</h4>
                    <p className="text-[10px] text-text-muted mt-1 uppercase font-bold">Every $1 spent = 1 entry into our ultimate physical wealth vault drawing.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-48 h-48 md:w-64 md:h-64 relative group">
              <div className="absolute inset-0 bg-accent blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img src={ImgSurprise} alt="Road to 99" className="w-full h-full object-cover rounded-[2rem] border-2 border-accent relative z-10 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter italic">How it works</h3>
            <p className="text-lg text-text-muted">
              The smartest stackers don't try to time the market. They leverage <span className="text-white font-bold italic">Dollar-Cost Averaging (DCA)</span>. By subscribing to the Stack Squad, you build your physical holdings consistently every single month.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Flat 15% Spot Margin', desc: "No hidden fees or dealer tricks. You see exactly what you pay." },
                { title: 'Automated Autopilot', desc: 'Set your budget once and let your legacy grow automatically.' },
                { title: 'Custom Selections', desc: 'Choose your focus: Silver, Gold, Mix, or Surprise Me.' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary"><Check size={24} /></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wide text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer p-8 rounded-3xl border-2 transition-all duration-500 flex flex-col ${
                selectedPlan === plan.id 
                  ? 'border-primary bg-primary/5 scale-[1.02] shadow-2xl shadow-primary/20' 
                  : 'border-border bg-surface hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-background text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              {/* Surprise Stack Badge */}
              <div className="absolute -right-4 -top-4 w-20 h-20 z-10 pointer-events-none">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20"></div>
                  <img src={ImgSurprise} alt="Surprise Stack" className="w-full h-full object-cover rounded-full border-2 border-accent shadow-xl" />
                  <div className="absolute -bottom-1 -right-1 bg-accent text-background text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter leading-none text-center shadow-lg">
                    1-in-9<br/>Win
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-black mb-1 uppercase italic tracking-tight">{plan.name}</h3>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-6">{plan.perfect}</p>
              
              <div className="mb-6 h-48 rounded-2xl overflow-hidden border border-border/50 bg-background/50">
                <img 
                  src={plan.image} 
                  alt={plan.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="mb-8">
                <span className="text-5xl font-black text-primary">${plan.amount}</span>
                <span className="text-text-muted font-bold uppercase text-xs ml-2">/ month</span>
              </div>
              
              <div className="mb-8 bg-background/50 p-4 rounded-2xl border border-border">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-muted text-center">Custom Selection</label>
                <div className="grid grid-cols-2 gap-2">
                  {metalOptions.map((option) => (
                    <button
                      key={option}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelections({ ...selections, [plan.id]: option });
                      }}
                      className={`py-2 px-1 text-[9px] font-black uppercase rounded-lg border transition-all ${
                        selections[plan.id] === option 
                          ? 'border-primary bg-primary text-background' 
                          : 'border-border bg-background/50 text-text-muted hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.perks.map((perk, i) => (
                  <li key={i} className="flex items-start text-sm text-text-muted font-medium">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5"><Check size={12} className="text-primary" /></div>
                    {perk}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(plan);
                  setSelectedPlan(plan.id);
                }}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 ${
                selectedPlan === plan.id 
                  ? 'bg-primary text-background shadow-lg shadow-primary/30' 
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}>
                <span>Select Tier</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* The Strategists Tier */}
        <div className="mt-16">
          <div className="bg-surface border-2 border-accent/20 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full group-hover:bg-accent/10 transition-all duration-700"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  <Sliders size={12} />
                  <span>The Strategists Tier</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black uppercase italic mb-6 leading-none">
                  Full, Active <span className="text-accent text-glow-accent">Control</span>
                </h3>
                <p className="text-lg text-text-muted mb-8 max-w-md">
                  For those wanting full, active control of their precious metals future. Define your budget, dial in your ratio, and we'll handle the rest.
                </p>

                <div className="mb-8 h-48 max-w-md rounded-3xl overflow-hidden border border-border/50 bg-background/50">
                  <img 
                    src={ImgStrategist} 
                    alt="Custom Stacking Strategy" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-4 flex justify-between">
                      <span>Monthly Budget</span>
                      <span className="text-accent font-mono">${strategistBudget}</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center text-text-muted">
                        <DollarSign size={20} />
                      </div>
                      <input 
                        type="number" 
                        min="101" 
                        max="10000"
                        value={strategistBudget}
                        onChange={(e) => setStrategistBudget(e.target.value)}
                        className="w-full bg-background border border-border p-4 pl-12 rounded-2xl outline-none focus:border-accent text-xl font-black transition-all"
                      />
                      <p className="mt-2 text-[10px] font-bold text-text-muted uppercase tracking-widest italic">Min: $101 | Max: $10,000</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-6 flex justify-between">
                      <span>Allocation Strategy</span>
                      <span className="text-white italic">{silverRatio}% Silver / {goldRatio}% Gold</span>
                    </label>
                    <div className="px-2">
                      <input 
                        type="range"
                        min="-10"
                        max="10"
                        step="1"
                        value={allocationSlider}
                        onChange={(e) => setAllocationSlider(parseInt(e.target.value))}
                        className="w-full h-2 bg-background border border-border rounded-full appearance-none cursor-pointer accent-accent"
                      />
                      <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <span>100% Silver</span>
                        <span>Balanced (50/50)</span>
                        <span>100% Gold</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background/40 backdrop-blur-xl border border-border/50 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <h4 className="text-xl font-black uppercase italic mb-8 text-center tracking-tighter">Your Custom Ratio</h4>
                
                <div className="flex items-end justify-center space-x-12 h-64 mb-10">
                  {/* Silver Bar */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="relative w-full group">
                      <div 
                        className="w-full bg-gradient-to-t from-slate-400 to-slate-200 rounded-2xl transition-all duration-500 shadow-[0_0_20px_rgba(148,163,184,0.3)]"
                        style={{ height: `${silverRatio * 2}px` }}
                      ></div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl font-black italic text-slate-300">{silverRatio}%</div>
                    </div>
                    <span className="mt-4 text-xs font-black uppercase tracking-widest text-slate-400">Silver</span>
                  </div>

                  {/* Gold Bar */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="relative w-full group">
                      <div 
                        className="w-full bg-gradient-to-t from-primary to-yellow-200 rounded-2xl transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                        style={{ height: `${goldRatio * 2}px` }}
                      ></div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl font-black italic text-primary">{goldRatio}%</div>
                    </div>
                    <span className="mt-4 text-xs font-black uppercase tracking-widest text-primary">Gold</span>
                  </div>
                </div>

                <button 
                  onClick={handleStrategistAddToCart}
                  disabled={strategistBudget < 101 || strategistBudget > 10000}
                  className="w-full py-5 rounded-2xl bg-accent text-background font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20 disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center space-x-3"
                >
                  <span>Lock In Custom Strategy</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackingClub;
