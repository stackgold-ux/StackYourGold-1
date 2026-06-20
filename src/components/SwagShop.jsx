import { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';

// Import local assets
import Img0642 from '../assets/IMG_0642.jpeg';
import Img0643 from '../assets/IMG_0643.jpeg';
import Img0644 from '../assets/IMG_0644.jpeg';
import Img0645 from '../assets/IMG_0645.jpeg';
import Img0647 from '../assets/IMG_0647.jpeg';
import Img0649 from '../assets/IMG_0649.jpeg';
import Img0650 from '../assets/IMG_0650.jpeg';
import Img0653 from '../assets/IMG_0653.jpeg';
import Img0655 from '../assets/IMG_0655.jpeg';
import Img0665 from '../assets/IMG_0665.jpeg';
import Img0666 from '../assets/IMG_0666.jpeg';
import Img0667 from '../assets/IMG_0667.jpeg';

// Separate ProductCard component to manage local state for image selectors per-product
const ProductCard = ({ item }) => {
  const [activeImage, setActiveImage] = useState(item.image);

  // Sync active image if item structure changes
  useEffect(() => {
    setActiveImage(item.image);
  }, [item]);

  const hasMultipleImages = item.images && item.images.length > 1;

  return (
    <div className="group bg-surface/30 border border-border/50 rounded-2xl p-5 hover:border-secondary hover:bg-surface/50 transition-all duration-300 flex flex-col justify-between h-full shadow-md hover:shadow-xl">
      <div>
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-background border border-border/30 flex items-center justify-center">
          <img 
            src={activeImage} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 z-10">
            <a 
              href={item.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-secondary text-background font-black uppercase tracking-widest text-xs py-3 rounded-xl flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <ShoppingBag size={14} />
              <span>Buy on Etsy ↗</span>
            </a>
          </div>
        </div>

        {/* Thumbnail Selector for Multi-Image Products */}
        {hasMultipleImages && (
          <div className="flex space-x-2 mb-4 justify-center">
            {item.images.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveImage(img)} // Hover-swap for rapid-browsing
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(img);
                }}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-secondary scale-105' : 'border-border/50 hover:border-text-muted'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
        <p className="text-text-muted text-xs mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
      </div>

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-border/30">
        <p className="text-secondary font-mono font-black text-xl">${item.price.toFixed(2)}</p>
        <a 
          href={item.etsyUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs font-bold uppercase tracking-wider text-primary hover:text-white flex items-center space-x-1 transition-colors"
        >
          <span>See on Etsy</span>
          <ChevronRight size={14} />
        </a>
      </div>
    </div>
  );
};

const SwagShop = () => {
  const items = [
    { 
      id: 'swag-1', 
      name: 'SYG Stealth Sack', 
      price: 35.00, 
      image: Img0666, 
      images: [Img0666, Img0665, Img0667],
      description: 'SYG Stealth Stack Sack. Compact, heavy-duty waist or cross-body bag designed to keep your sound money close and secure. Features melting gold drip emblem.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-2', 
      name: 'SYG Drip Beanie', 
      price: 25.00, 
      image: Img0655, 
      images: [Img0655],
      description: 'Drip Gold Circle Logo Knit Beanie | Embroidered. Keep your head warm and your assets physical.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-3', 
      name: 'SYG .999 Fine Tank Top', 
      price: 28.00, 
      image: Img0653, 
      images: [Img0653],
      description: 'Stack Your Gold™ Womens Tank .999 Fine. Sleek, stylish and sound money certified.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-4', 
      name: 'SYG Funny AU/AG AC/DC Heavy Metal Shirt', 
      price: 32.00, 
      image: Img0650, 
      images: [Img0650, Img0649],
      description: 'SYG - Funny AU/AG AC/DC heavy metal shirt | Rock Band Graphic Tee. Metallic Gold & Silver design.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-5', 
      name: 'SYG Funny AU/AG AC/DC Banner', 
      price: 35.00, 
      image: Img0647, 
      images: [Img0647],
      description: 'SYG - AU/AG AC/DC heavy metal Banner. Bring the sound money attitude to any wall or garage.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-6', 
      name: 'SYG Drip Logo Hoodie', 
      price: 48.00, 
      image: Img0643, 
      images: [Img0643, Img0645, Img0644],
      description: 'Stack Squad Gold Drip Logo Hoodie | Melted Metallic Emblem. Heavyweight premium comfort with unisex back view option.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    },
    { 
      id: 'swag-7', 
      name: 'SYG Drip Logo Tee', 
      price: 32.00, 
      image: Img0642, 
      images: [Img0642],
      description: 'SYG - Drip Tee Shirt. Stack Squad Gold Drip Logo T-shirt with Melted Metallic Emblem. Premium combed cotton.', 
      etsyUrl: 'https://www.etsy.com/shop/StackYourGold' 
    }
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
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default SwagShop;
