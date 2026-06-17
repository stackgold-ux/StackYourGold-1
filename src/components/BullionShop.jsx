import React, { useState } from 'react';
import { ShoppingCart, ShieldCheck, ChevronDown, ChevronUp, DollarSign, Info } from 'lucide-react';

const BullionShop = ({ spotPrices, addToCart }) => {
  const [amounts, setAmounts] = useState({
    gold: 250,
    silver: 100,
    copper: 50
  });

  const [customInputs, setCustomInputs] = useState({
    gold: '250',
    silver: '100',
    copper: '50'
  });

  const [openTab, setOpenTab] = useState(null);

  const images = {
    gold: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=400',
    silver: 'https://images.unsplash.com/photo-1589182397057-b82d519d0031?auto=format&fit=crop&q=80&w=400',
    copper: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=400'
  };

  const presetAmounts = [25, 50, 100, 250, 500, 1000, 2500, 5000];

  const handlePresetSelect = (metal, value) => {
    setAmounts(prev => ({ ...prev, [metal]: value }));
    setCustomInputs(prev => ({ ...prev, [metal]: String(value) }));
  };

  const handleCustomInputChange = (metal, value) => {
    setCustomInputs(prev => ({ ...prev, [metal]: value }));
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      setAmounts(prev => ({ ...prev, [metal]: parsed }));
    }
  };

  const calculateWeight = (metal, amount) => {
    const spot = spotPrices[metal] || 0.25;
    const totalWeightOz = amount / (spot * 1.15);
    if (metal === 'copper' && totalWeightOz >= 16) {
      return `${(totalWeightOz / 16).toFixed(2)} lbs`;
    }
    return `${totalWeightOz.toFixed(4)} oz`;
  };

  const handleAddToCart = (metal) => {
    const amount = amounts[metal];
    if (amount < 25 || amount > 9999 || isNaN(amount)) return;

    const weightLabel = calculateWeight(metal, amount);

    const product = {
      id: `${metal}-custom-${amount}-${Date.now()}`,
      name: `${metal.charAt(0).toUpperCase() + metal.slice(1)} custom stacking`,
      type: metal,
      weight: weightLabel,
      image: images[metal],
      price: amount.toFixed(2),
      description: `Custom physical ${metal} bullion allocation. Direct-to-vault dynamic physical weight conversion.`
    };

    addToCart(product);
  };

  const tabs = [
    {
      id: 'silver',
      title: 'Silver Rounds, Bars & Coins',
      description: 'Physical silver is the cornerstone of any robust physical stack. For custom budget purchases, we fulfill orders utilizing high-purity .999 Fine Silver Coins (such as American Eagles, Canadian Maples), Mint-Certified Bars (1oz, 10oz, 100oz), or fractional Silver Rounds. We mathematically optimize your physical metal weight to get the maximum ounce yield for your specific dollar amount.'
    },
    {
      id: 'gold',
      title: 'Gold Rounds, Bars & Coins',
      description: 'Generational wealth starts with gold. We fulfill all custom gold orders using .9999 Fine Gold Bars from world-renowned LBMA-certified refineries (like PAMP Suisse, Valcambi, Royal Canadian Mint) or official Sovereign Gold Coins. Fractional weights (including 1g, 5g, 10g, and 1/10 oz, 1/4 oz, 1/2 oz coins) are dynamically compiled to map precisely to your custom order value, ensuring no paper residuals.'
    },
    {
      id: 'copper',
      title: 'Copper Rounds, Bars & Coins',
      description: 'Industrial utility meets tangible wealth. Copper is an essential industrial asset with surging global demand. We fulfill copper stacking orders using highly polished 1oz Copper Bullets/Rounds, 10oz Bars, or 1lb pure bullion bars. Stacking copper offers a robust, tangible, and high-volume entry point into hard assets, perfectly suited for long-term vaulting and emergency barter.'
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-primary italic">Custom Stacking Shop</h2>
          <p className="text-text-muted mt-2">Pick your metal, set your budget ($25 to $9,999), and we calculate your physical weight at exactly 15% over live spot.</p>
          <p className="text-xs text-text-muted mt-3 italic text-primary/80">
            * All orders will be packaged as close to spot price as possible at time of order. We utilize metal grain to fill orders in or to supply micro orders unless otherwise specified.
          </p>
        </div>
        <div className="flex items-center text-accent text-sm font-bold bg-accent/10 px-4 py-2 rounded border border-accent/20">
          <ShieldCheck size={18} className="mr-2" />
          .999+ PURITY SEALS GUARANTEED
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {['gold', 'silver', 'copper'].map((metal) => {
          const currentAmount = amounts[metal];
          const inputVal = customInputs[metal];
          const isValid = currentAmount >= 25 && currentAmount <= 9999;
          const displayWeight = isValid ? calculateWeight(metal, currentAmount) : '0.0000 oz';

          return (
            <div key={metal} className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={images[metal]} 
                  alt={metal} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Spot Price</span>
                  <span className="text-xl font-mono font-bold text-white">
                    ${(spotPrices[metal] || 0.25).toFixed(2)}/oz
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 italic">
                    {metal === 'gold' ? '🏆 Gold Stacker' : metal === 'silver' ? '🥈 Silver Stacker' : '🥉 Copper Stacker'}
                  </h3>
                  <p className="text-text-muted text-sm mb-6">
                    Customize your budget. We fulfill using premium physical {metal} coins, bars, and rounds.
                  </p>

                  {/* Standard Presets */}
                  <div className="mb-4">
                    <span className="text-xs text-text-muted block uppercase tracking-wider mb-2 font-bold">Quick Presets</span>
                    <div className="grid grid-cols-4 gap-2">
                      {presetAmounts.slice(0, 4).map(val => (
                        <button
                          key={val}
                          onClick={() => handlePresetSelect(metal, val)}
                          className={`py-1.5 px-1 rounded text-xs font-bold transition-all ${
                            currentAmount === val 
                              ? 'bg-primary text-background' 
                              : 'bg-background hover:bg-border text-text-main border border-border'
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {presetAmounts.slice(4, 8).map(val => (
                        <button
                          key={val}
                          onClick={() => handlePresetSelect(metal, val)}
                          className={`py-1.5 px-1 rounded text-xs font-bold transition-all ${
                            currentAmount === val 
                              ? 'bg-primary text-background' 
                              : 'bg-background hover:bg-border text-text-main border border-border'
                          }`}
                        >
                          ${val >= 1000 ? `${(val/1000).toFixed(1)}k` : `$${val}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Budget Input */}
                  <div className="mb-6">
                    <span className="text-xs text-text-muted block uppercase tracking-wider mb-2 font-bold">Custom Budget</span>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign size={16} className="text-text-muted" />
                      </div>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        value={inputVal}
                        onChange={(e) => handleCustomInputChange(metal, e.target.value.replace(/[^0-9.]/g, ''))}
                        className={`w-full bg-background border rounded-lg pl-8 pr-12 py-2.5 font-mono text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-primary ${
                          isValid ? 'border-border' : 'border-red-500'
                        }`}
                        placeholder="Enter amount"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-xs text-text-muted font-bold font-mono">USD</span>
                      </div>
                    </div>
                    {!isValid && (
                      <span className="text-red-400 text-xs mt-1 block">
                        Limit: $25 to $9,999.
                      </span>
                    )}
                  </div>
                </div>

                {/* Final Yield display */}
                <div className="mt-auto border-t border-border pt-6">
                  <div className="flex justify-between items-center bg-background/50 p-4 rounded-xl border border-border/50 mb-4">
                    <div>
                      <span className="text-xs text-text-muted block uppercase tracking-widest font-bold">Physical Yield</span>
                      <span className="text-2xl font-mono font-black text-primary">{displayWeight}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-text-muted block uppercase tracking-widest font-bold">Markup</span>
                      <span className="text-sm font-bold text-accent font-mono">+15% Spot</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleAddToCart(metal)}
                    disabled={!isValid}
                    className={`w-full flex items-center justify-center py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 ${
                      isValid 
                        ? 'bg-primary hover:bg-primary-dark text-background shadow-lg hover:shadow-primary/10' 
                        : 'bg-muted cursor-not-allowed text-text-muted'
                    }`}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Stack {metal} • ${(isValid ? currentAmount : 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accordion expanding tab section for Rounds, Bars and Coins */}
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6 italic border-b border-border pb-4 flex items-center">
          <Info size={22} className="mr-2 text-primary" />
          Rounds, Bars and Coins
        </h3>
        
        <div className="space-y-4">
          {tabs.map((tab) => {
            const isOpen = openTab === tab.id;
            return (
              <div key={tab.id} className="border border-border/60 rounded-xl overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenTab(isOpen ? null : tab.id)}
                  className={`w-full flex items-center justify-between p-5 text-left font-bold text-lg transition-all ${
                    isOpen ? 'bg-background text-primary' : 'hover:bg-background/40 text-white'
                  }`}
                >
                  <span className="uppercase tracking-tight">{tab.title}</span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {isOpen && (
                  <div className="p-5 bg-background/50 border-t border-border/40 text-text-muted leading-relaxed text-sm">
                    {tab.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BullionShop;
