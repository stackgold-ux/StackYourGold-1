import React from 'react';
import { ShoppingBag } from 'lucide-react';

const SwagShop = () => {
  const items = [
    { id: 'swag-1', name: 'Stacker Elite Hoodie', price: 65, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400' },
    { id: 'swag-2', name: 'Sound Money Tee', price: 32, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400' },
    { id: 'swag-3', name: 'Legacy Trucker Cap', price: 28, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400' },
    { id: 'swag-4', name: 'Bullion Master Bottle', price: 45, image: 'https://images.unsplash.com/photo-1602143399827-bd95ef6f7397?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-secondary italic">Brand Gear & Swag</h2>
          <p className="text-text-muted mt-2">High-quality lifestyle gear for the disciplined stacker.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map(item => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-surface border border-border group-hover:border-secondary transition-all">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <button className="w-full bg-secondary text-background font-bold py-2 rounded-lg flex items-center justify-center space-x-2">
                  <ShoppingBag size={18} />
                  <span>Quick Add</span>
                </button>
              </div>
            </div>
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-secondary font-mono">${item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SwagShop;
