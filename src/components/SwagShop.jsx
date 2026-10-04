import { useState, useEffect } from 'react';
import { ExternalLink, Printer, Truck } from 'lucide-react';
import swagData from '../data/printifySwag.json';

const ETSY_SHOP_URL = 'https://www.etsy.com/shop/StackYourSilver';

const formatPrice = (p) => `$${p.toFixed(2)}`;

// Separate ProductCard component to manage local state for image + variant selectors per-product
const ProductCard = ({ item }) => {
  const [activeImage, setActiveImage] = useState(item.images?.[0]);
  const [selectedVariant, setSelectedVariant] = useState(item.variants?.[0] || null);

  // Sync if item structure changes
  useEffect(() => {
    setActiveImage(item.images?.[0]);
    setSelectedVariant(item.variants?.[0] || null);
  }, [item.id]);

  const hasMultipleImages = item.images && item.images.length > 1;
  const price = selectedVariant ? selectedVariant.price : item.priceMin;

  const handleBuy = () => {
    window.open(item.etsyUrl || ETSY_SHOP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group bg-surface/30 border border-border/50 rounded-2xl p-5 hover:border-secondary hover:bg-surface/50 transition-all duration-300 flex flex-col justify-between h-full shadow-md hover:shadow-xl">
      <div>
        <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-background border border-border/30 flex items-center justify-center">
          <img
            src={activeImage}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 z-10">
            <button
              onClick={handleBuy}
              className="w-full bg-secondary text-background font-black uppercase tracking-widest text-xs py-3 rounded-xl flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <ExternalLink size={14} />
              <span>Buy on Etsy</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Selector for Multi-Image Products */}
        {hasMultipleImages && (
          <div className="flex space-x-2 mb-4 justify-center">
            {item.images.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveImage(img)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(img);
                }}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-secondary scale-105' : 'border-border/50 hover:border-text-muted'
                }`}
              >
                <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <h3 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight mb-2">{item.title}</h3>
        <p className="text-text-muted text-xs mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

        {/* Variant Selector */}
        {item.variants && item.variants.length > 1 && (
          <div className="mb-4">
            <select
              value={selectedVariant?.id || ''}
              onChange={(e) => {
                const v = item.variants.find((vv) => String(vv.id) === e.target.value);
                if (v) setSelectedVariant(v);
              }}
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-secondary cursor-pointer"
            >
              {item.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title} — {formatPrice(v.price)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-border/30">
        <p className="text-secondary font-mono font-black text-xl">
          {item.priceMin === item.priceMax ? formatPrice(item.priceMin) : `From ${formatPrice(item.priceMin)}`}
        </p>
        <button
          onClick={handleBuy}
          className="text-xs font-bold uppercase tracking-wider flex items-center space-x-1 text-primary hover:text-white transition-colors"
        >
          <span>{selectedVariant && item.variants.length === 1 ? formatPrice(price) + ' · ' : ''}Buy on Etsy</span>
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

const SwagShop = () => {
  const products = swagData.products || [];

  return (
    <section className="py-24">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="bg-secondary/5 border-2 border-secondary/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-secondary text-background text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl">
                <Printer size={12} />
                <span>Print on Demand</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white italic mb-4 leading-none">
                The <span className="text-secondary">Swag</span> Collection
              </h2>
              <p className="text-text-muted text-lg font-medium">
                Official Stack Your Gold gear — made to order and shipped direct.
                Every piece is printed when you order it, so it's fresh off the press.
              </p>
              <div className="flex items-center space-x-2 mt-6 text-text-muted text-xs">
                <Truck size={14} className="text-secondary" />
                <span>Fulfilled by our print partner · checkout securely on our Etsy shop</span>
              </div>
            </div>
            <a
              href={ETSY_SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-black uppercase tracking-widest hover:text-white transition-colors border-b-2 border-secondary/30 pb-1 text-sm whitespace-nowrap"
            >
              Full Etsy Catalog ↗
            </a>
          </div>

          {products.length === 0 ? (
            <p className="text-text-muted text-center py-16">
              The swag collection is being restocked — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {products.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-text-muted text-xs max-w-2xl mx-auto">
          Swag items are print-on-demand and ship separately from bullion orders.
          See our <a href="#shipping" className="text-secondary hover:text-white underline">Shipping Policy</a> for details.
        </p>
      </div>
    </section>
  );
};

export default SwagShop;
