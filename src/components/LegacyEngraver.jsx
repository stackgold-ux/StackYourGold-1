import { useState } from 'react';
import { Type, Image as ImageIcon, RotateCw, Download } from 'lucide-react';

const LegacyEngraver = ({ spotPrices, addToCart }) => {
  const [text, setText] = useState('SMITH FAMILY');
  const [font, setFont] = useState('serif');
  const [metal, setMetal] = useState('gold');

  const engravingFees = {
    gold: 100,
    silver: 25
  };

  const handleAddToCart = () => {
    const spot = spotPrices[metal] || 0;
    const price = spot * 1.15 + engravingFees[metal];
    
    const product = {
      id: `legacy-${metal}-${Date.now()}`,
      name: `Custom Engraved ${metal.charAt(0).toUpperCase() + metal.slice(1)} Bar`,
      price: price.toFixed(2),
      type: 'bullion',
      metal,
      engravingText: text,
      font,
      description: `Custom legacy-engraved 1oz .9999 fine ${metal} bullion bar. Text: "${text}"`,
      image: metal === 'gold' 
        ? 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=400'
        : 'https://images.unsplash.com/photo-1589182397057-b82d519d0031?auto=format&fit=crop&q=80&w=400'
    };

    addToCart(product);
  };

  return (
    <section id="legacy" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary italic mb-8 leading-tight">
            Don't Just Save Money. <br />
            <span className="text-white">Carve Your Family Name in It.</span>
          </h2>
          <div className="space-y-6 text-text-muted mb-10 text-lg">
            <p>
              Gold and silver are eternal. Turn your financial assets into priceless family heirlooms. 
              Our precision engraving program allows you to custom-etch family names, crests, dates, 
              or personal messages onto premium silver and gold bars.
            </p>
            <div className="flex space-x-4 mb-8">
              <button 
                onClick={() => setMetal('gold')}
                className={`flex-1 py-3 rounded-xl font-black uppercase tracking-widest border-2 transition-all ${metal === 'gold' ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-border bg-surface text-text-muted hover:border-primary/50'}`}
              >
                Gold Bar
              </button>
              <button 
                onClick={() => setMetal('silver')}
                className={`flex-1 py-3 rounded-xl font-black uppercase tracking-widest border-2 transition-all ${metal === 'silver' ? 'border-slate-300 bg-slate-300/10 text-slate-200 shadow-[0_0_15px_rgba(200,200,200,0.3)]' : 'border-border bg-surface text-text-muted hover:border-slate-300/50'}`}
              >
                Silver Bar
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-text-muted">Engraving Text</label>
              <input 
                type="text" 
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                className={`w-full bg-surface border border-border p-4 rounded-lg focus:border-primary outline-none text-xl font-bold ${font === 'serif' ? 'font-serif' : 'font-sans'}`}
                maxLength={20}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setFont('serif')}
                className={`p-4 border rounded-lg flex items-center justify-center space-x-2 ${font === 'serif' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface'}`}
              >
                <Type size={20} />
                <span className="font-serif">Classic Serif</span>
              </button>
              <button 
                onClick={() => setFont('sans')}
                className={`p-4 border rounded-lg flex items-center justify-center space-x-2 ${font === 'sans' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface'}`}
              >
                <Type size={20} />
                <span className="font-sans">Modern Sans</span>
              </button>
            </div>
            
            <div className="bg-surface/50 p-6 rounded-2xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Dynamic Price</span>
                <span className="text-2xl font-black text-primary">${((spotPrices[metal] || 0) * 1.15 + engravingFees[metal]).toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-text-muted uppercase tracking-widest leading-relaxed">
                Includes 1oz .9999 physical {metal} at 15% over spot + ${engravingFees[metal]} precision laser fee.
              </p>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary-dark text-background font-black uppercase py-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-primary/20"
            >
              <Download size={20} />
              <span>Save Design & Add to Cart</span>
            </button>
          </div>
        </div>

        <div className="relative aspect-square max-w-lg mx-auto w-full group">
          {/* Metallic Bar Preview */}
          <div className={`absolute inset-0 rounded-3xl shadow-2xl overflow-hidden border-4 flex items-center justify-center transform rotate-6 transition-all duration-700 ${metal === 'gold' ? 'metallic-gold border-accent/30' : 'metallic-silver border-slate-300/30'}`}>
            <div className={`absolute inset-4 border-2 rounded-2xl flex flex-col items-center justify-between py-12 px-6 ${metal === 'gold' ? 'border-accent/20 text-background/80' : 'border-slate-300/20 text-slate-800/80'}`}>
              <div className={`w-16 h-16 border-2 rounded-full flex items-center justify-center ${metal === 'gold' ? 'border-background/40' : 'border-slate-800/40'}`}>
                <ImageIcon size={32} strokeWidth={1} />
              </div>
              
              <div className="text-center">
                <p className={`text-3xl font-black tracking-widest break-all px-4 ${font === 'serif' ? 'font-serif' : 'font-sans'}`}>
                  {text || 'YOUR TEXT HERE'}
                </p>
                <p className="mt-4 text-sm font-bold uppercase tracking-widest opacity-60 italic">STOCKED FOR GENERATIONS</p>
              </div>
              
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest">1 OZ {metal.toUpperCase()} .9999 FINE</p>
                <p className="text-[10px] opacity-40 mt-1 uppercase tracking-tighter italic">Stack Your Gold™ Mint</p>
              </div>
            </div>
            
            {/* Gloss shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
          
          <button className="absolute -bottom-4 -right-4 bg-surface border border-border p-4 rounded-full hover:bg-primary/20 transition-all shadow-xl group-hover:rotate-180 duration-500">
            <RotateCw size={24} className="text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LegacyEngraver;
