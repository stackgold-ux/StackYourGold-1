import { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, ShoppingCart } from 'lucide-react';
import { shopifyClient } from '../utils/shopifyClient';

// Import local assets for high-fidelity fallback
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
const ProductCard = ({ item, addToCart }) => {
  const [activeImage, setActiveImage] = useState(item.images[0]?.url || item.image);
  const [selectedVariant, setSelectedVariant] = useState(item.variants ? item.variants[0] : null);

  // Sync active image if item structure changes
  useEffect(() => {
    setActiveImage(item.images[0]?.url || item.image);
    if (item.variants) setSelectedVariant(item.variants[0]);
  }, [item.id]);

  const hasMultipleImages = item.images && item.images.length > 1;

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({
        id: item.id + (selectedVariant ? `-${selectedVariant.id}` : ''),
        name: item.name + (selectedVariant ? ` - ${selectedVariant.title}` : ''),
        price: selectedVariant ? selectedVariant.price : item.price,
        image: activeImage,
        type: 'swag',
        description: item.description
      });
    } else {
      window.open(item.etsyUrl || 'https://www.etsy.com/shop/StackYourGold', '_blank');
    }
  };

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
            <button 
              onClick={handleAddToCart}
              className="w-full bg-secondary text-background font-black uppercase tracking-widest text-xs py-3 rounded-xl flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <ShoppingCart size={14} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Selector for Multi-Image Products */}
        {hasMultipleImages && (
          <div className="flex space-x-2 mb-4 justify-center">
            {item.images.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveImage(img.url || img)} 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(img.url || img);
                }}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === (img.url || img) ? 'border-secondary scale-105' : 'border-border/50 hover:border-text-muted'
                }`}
              >
                <img src={img.url || img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
        <p className="text-text-muted text-xs mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
        
        {/* Variant Selector if available */}
        {item.variants && item.variants.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.variants.map(v => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`text-[10px] px-2 py-1 rounded border transition-all ${
                  selectedVariant?.id === v.id ? 'bg-secondary text-background border-secondary' : 'border-border text-text-muted hover:border-text-main'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-border/30">
        <p className="text-secondary font-mono font-black text-xl">
          ${(selectedVariant ? selectedVariant.price : item.price).toFixed(2)}
        </p>
        <button 
          onClick={handleAddToCart}
          className="text-xs font-bold uppercase tracking-wider text-primary hover:text-white flex items-center space-x-1 transition-colors"
        >
          <span>Quick Add</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

const SwagShop = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSwag = async () => {
      try {
        const products = await shopifyClient.getProducts('swag');
        
        // Merge Shopify products with local Etsy metadata if IDs match or use Shopify as primary
        setItems(products);
      } catch (error) {
        console.error('Failed to fetch Swag from Shopify:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSwag();
  }, []);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-secondary italic mb-4">Stack Squad Swag</h2>
          <p className="text-text-muted text-lg max-w-2xl">
            We don't just stack gold; we wear our values. Curated premium apparel and EDC gear designed to spark deep conversations about generational wealth.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-lg border border-secondary/20">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          <span className="text-secondary text-[10px] font-black uppercase tracking-widest">Live Shopify Inventory</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-surface/30 h-[400px] rounded-2xl border border-border/50"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <ProductCard key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      )}
      
      <div className="mt-16 text-center">
        <p className="text-text-muted text-sm mb-6">Looking for our full legacy collection?</p>
        <a 
          href="https://www.etsy.com/shop/StackYourGold" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-secondary font-black uppercase tracking-widest hover:text-white transition-colors border-b-2 border-secondary/30 pb-1"
        >
          <span>Visit Official Etsy Store</span>
          <ChevronRight size={18} />
        </a>
      </div>
    </section>
  );
};

export default SwagShop;
