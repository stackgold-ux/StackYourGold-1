import { useState } from 'react';
import { ShoppingCart, ShieldCheck, ChevronDown, ChevronUp, DollarSign, Info } from 'lucide-react';
import ImgGold from '../assets/IMG_0596.jpeg';
import ImgSilver from '../assets/IMG_0597.jpeg';
import ImgSurprise from '../assets/IMG_0605.jpeg';

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
    gold: ImgGold,
    silver: ImgSilver,
    copper: ImgSurprise
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

    // Weight calculation happens in background as requested
    const weightLabel = calculateWeight(metal, amount);

    const product = {
      id: `${metal}-solo-${amount}-${Date.now()}`,
      name: metal === 'copper' ? 'Surprise Sack Solo Stack' : `${metal.charAt(0).toUpperCase() + metal.slice(1)} Solo Stack`,
      type: metal,
      weight: weightLabel,
      image: images[metal],
      price: amount.toFixed(2),
      description: metal === 'copper'
        ? 'Surprise metals (Gold/Silver mix) as close to value at purchase as possible.'
        : `One-time physical ${metal} bullion purchase. Direct-to-vault allocation.`
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
      title: 'Surprise Sack (Gold/Silver Mix)',
      description: "Can’t decide between Gold and Silver? Let us customize a surprise mixture of high-purity precious metals for your budget. We fulfill all Surprise Sack orders with a carefully optimized combination of fine gold and silver coins, bars, or rounds, mapped as closely as possible to the exact real-time spot value at your time of purchase."
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-primary italic">Solo Stack - One Time Purchases</h2>
          <p className="text-text-muted mt-2">Pick your metal and set your budget ($25 to $9,999) for a one-time bullion acquisition.</p>
          <p className="text-xs text-text-muted mt-3 italic text-primary/80">
            * All orders are fulfilled with physical assets and secured in our vaulted network.
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

          return (
            <div key={metal} className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={images[metal]} 
                  alt={metal} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 italic">
                    {metal === 'gold' ? '🏆 Gold Solo Stack' : metal === 'silver' ? '🥈 Silver Solo Stack' : '🎁 Surprise Sack'}
                  </h3>
                  <p className="text-text-muted text-sm mb-6">
                    {metal === 'gold' ? 'Fulfilling using premium physical gold coins, bars, and rounds.' : 
                     metal === 'silver' ? 'Fulfilling using premium physical silver coins, bars, and rounds.' : 
                     'Surprise metals (Gold/Silver mix) as close to value at purchase as possible.'}
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

                <div className="mt-auto border-t border-border pt-6">
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
                    Solo Stack {metal} • ${(isValid ? currentAmount : 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
          Physical Bullion Assets
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
