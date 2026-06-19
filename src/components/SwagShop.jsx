import { ShoppingBag } from 'lucide-react';

const SwagShop = ({ addToCart }) => {
  const items = [
    { 
      id: 'swag-1', 
      name: 'SYG Drip Logo Tee', 
      price: 32, 
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400', 
      description: 'Stack Squad Gold Drip Logo T-shirt | Melted Metallic Emblem. Available in Black, white, grey, ivory, khaki.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-2', 
      name: 'AU/AG Heavy Metal Tee', 
      price: 32, 
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400', 
      description: 'AC/DC Lightning Logo T-shirt | Rock Band Graphic Tee, Metallic Gold Silver.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-3', 
      name: '.999 Fine Womens Tank', 
      price: 28, 
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400', 
      description: 'Stack Your Gold Womens Tank .999 Fine. Sleek, stylish and sound money certified.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-4', 
      name: 'SYG Gold Drip Beanie', 
      price: 25, 
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d435353?auto=format&fit=crop&q=80&w=400', 
      description: 'Drip Gold Circle Logo Knit Beanie | Embroidered. Keep your head warm and your assets physical.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-5', 
      name: 'SYG Drip Toddler Tee', 
      price: 22, 
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=400', 
      description: 'Dripping Gold Monogram - Stack Your Gold - infant Tee | Melting Logo Baby Shirt.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-6', 
      name: 'Stealth Stack Fanny Pack', 
      price: 35, 
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=400', 
      description: 'Gold Drip Fanny Pack – White Waist Bag With Emblem, USA Assembled.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-secondary italic mb-4">Stack Squad Swag</h2>
          <p className="text-text-muted text-lg max-w-2xl">
            We don't just stack gold; we wear our values. Curated premium apparel and EDC gear designed to spark deep conversations about generational wealth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-surface border border-border group-hover:border-secondary transition-all">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <a 
                  href={item.etsyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-secondary text-background font-bold py-2 rounded-lg flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95"
                >
                  <ShoppingBag size={18} />
                  <span>Buy on Etsy ↗</span>
                </a>
              </div>
            </div>
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-secondary font-mono">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SwagShop;
