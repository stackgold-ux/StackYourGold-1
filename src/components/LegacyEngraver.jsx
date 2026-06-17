import React, { useState } from 'react';
import { Type, Image as ImageIcon, RotateCw, Download } from 'lucide-react';

const LegacyEngraver = () => {
  const [text, setText] = useState('SMITH FAMILY');
  const [font, setFont] = useState('serif');

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
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
            <p className="font-bold italic text-white">
              Pass down an asset they will never want to sell.
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-text-muted">Engraving Text</label>
              <input 
                type="text" 
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                className="w-full bg-surface border border-border p-4 rounded-lg focus:border-primary outline-none text-xl font-bold font-serif"
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
            
            <button className="w-full bg-primary hover:bg-primary-dark text-background font-black uppercase py-4 rounded-lg transition-all flex items-center justify-center space-x-2">
              <Download size={20} />
              <span>Save Design & Add to Cart</span>
            </button>
          </div>
        </div>

        <div className="relative aspect-square max-w-lg mx-auto w-full">
          {/* Mock Gold Bar Preview */}
          <div className="absolute inset-0 metallic-gold rounded-3xl shadow-2xl overflow-hidden border-4 border-accent/30 flex items-center justify-center transform rotate-12">
            <div className="absolute inset-4 border-2 border-accent/20 rounded-2xl flex flex-col items-center justify-between py-12 px-6 text-background/80">
              <div className="w-16 h-16 border-2 border-background/40 rounded-full flex items-center justify-center">
                <ImageIcon size={32} strokeWidth={1} />
              </div>
              
              <div className="text-center">
                <p className={`text-3xl font-black tracking-widest break-all px-4 ${font === 'serif' ? 'font-serif' : 'font-sans'}`}>
                  {text || 'YOUR TEXT HERE'}
                </p>
                <p className="mt-4 text-sm font-bold uppercase tracking-widest opacity-60 italic">STOCKED FOR GENERATIONS</p>
              </div>
              
              <div className="text-center">
                <p className="text-xs font-bold">1 OZ GOLD .9999 FINE</p>
                <p className="text-[10px] opacity-40 mt-1 uppercase tracking-tighter italic">Stack Your Gold Mint</p>
              </div>
            </div>
            
            {/* Gloss shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"></div>
          </div>
          
          <button className="absolute bottom-0 right-0 bg-surface border border-border p-3 rounded-full hover:bg-primary/20 transition-colors">
            <RotateCw size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LegacyEngraver;
