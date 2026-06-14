import React from 'react';
import { ShoppingCart, ShieldCheck } from 'lucide-react';

const BullionShop = ({ spotPrices, addToCart }) => {
  const products = [
    {
      id: 'g-eagle-1oz',
      name: 'American Gold Eagle',
      type: 'gold',
      weight: '1 oz',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=400',
      description: 'The official gold bullion coin of the United States.'
    },
    {
      id: 's-eagle-1oz',
      name: 'American Silver Eagle',
      type: 'silver',
      weight: '1 oz',
      image: 'https://images.unsplash.com/photo-1589182397057-b82d519d0031?auto=format&fit=crop&q=80&w=400',
      description: 'Struck from .999 fine silver, a classic choice for stackers.'
    },
    {
      id: 'g-bar-10g',
      name: 'PAMP Suisse Gold Bar',
      type: 'gold',
      weight: '10g',
      image: 'https://images.unsplash.com/photo-1589182397057-b82d519d0031?auto=format&fit=crop&q=80&w=400', // Using placeholders
      description: 'Exquisite craftsmanship from the heart of Switzerland.'
    },
    {
      id: 's-round-1oz',
      name: 'Buffalo Silver Round',
      type: 'silver',
      weight: '1 oz',
      image: 'https://images.unsplash.com/photo-1589182397057-b82d519d0031?auto=format&fit=crop&q=80&w=400',
      description: 'One of the most popular silver rounds in the world.'
    }
  ];

  const calculatePrice = (product) => {
    const spot = spotPrices[product.type];
    const weightInOz = product.weight === '1 oz' ? 1 : 10 / 31.1035; // Rough conversion for 10g
    return (spot * weightInOz * 1.15).toFixed(2);
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-primary italic">Live Bullion Shop</h2>
          <p className="text-text-muted mt-2">Priced dynamically at 15% over live spot.</p>
        </div>
        <div className="hidden md:flex items-center text-accent text-sm font-bold bg-accent/10 px-4 py-2 rounded border border-accent/20">
          <ShieldCheck size={18} className="mr-2" />
          AUTHENTICITY GUARANTEED
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-3 py-1 rounded text-xs font-bold text-primary uppercase">
                {product.weight} {product.type}
              </div>
            </div>
            
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-text-muted text-sm line-clamp-2 mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-xs text-text-muted block uppercase tracking-widest">Your Price</span>
                  <span className="text-2xl font-mono font-bold">${calculatePrice(product)}</span>
                </div>
                <button 
                  onClick={() => addToCart({ ...product, price: calculatePrice(product) })}
                  className="bg-primary hover:bg-primary-dark text-background p-3 rounded-lg transition-colors"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BullionShop;
