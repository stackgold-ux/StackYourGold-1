import { useState, useEffect } from 'react';
import { ArrowRight, ShoppingCart, Loader2 } from 'lucide-react';
import { shopifyClient } from '../utils/shopifyClient';
import { filterByCategory } from '../utils/categorize';
import { METAL_CONFIG } from './MetalShop';

/**
 * Sellable homepage preview: live in-stock products for one metal,
 * each with a working Add to Stack button, plus a "shop all" link.
 */
const MetalPreview = ({ metal, navigateTo, addToCart, targetView }) => {
  const config = METAL_CONFIG[metal];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchPreview = async () => {
      try {
        const all = await shopifyClient.getAllProducts();
        if (!cancelled) setProducts(filterByCategory(all, metal).slice(0, 4));
      } catch (error) {
        console.error(`[MetalPreview:${metal}] failed:`, error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPreview();
    return () => { cancelled = true; };
  }, [metal]);

  if (!loading && products.length === 0) return null;

  const handleAdd = (product) => {
    const variant = product.variants?.[0] || {};
    addToCart({
      id: `${product.id}-${variant.id}`,
      shopifyVariantId: variant.id,
      name: product.name,
      price: variant.price || product.price,
      image: product.images[0]?.url,
      type: 'bullion',
      description: product.description,
      isShopify: true,
    });
  };

  return (
    <section className="py-20 bg-surface/5 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${config.accentText} mb-3`}>
              {config.brand} · Live Inventory
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
              In Stock <span className={config.accentText}>{metal === 'gold' ? 'Gold' : 'Silver'}</span>
            </h2>
          </div>
          <button
            onClick={() => navigateTo(targetView)}
            className={`flex items-center ${config.accentText} font-black uppercase tracking-widest text-sm group`}
          >
            Shop all {metal}
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 space-y-4">
            <Loader2 size={28} className={`${config.accentText} animate-spin`} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-background border border-border rounded-3xl p-5 hover:border-primary/40 transition-all duration-500 shadow-xl flex flex-col"
              >
                <div className="aspect-square mb-4 rounded-2xl overflow-hidden bg-surface relative">
                  {product.images[0]?.url && (
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].altText || product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className={`absolute top-3 left-3 ${config.accentBg} text-background text-[10px] font-black px-2 py-1 rounded shadow-lg`}>
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                <h4 className="font-bold uppercase italic tracking-tight mb-3 line-clamp-2 flex-grow text-sm">
                  {product.name}
                </h4>
                <button
                  onClick={() => handleAdd(product)}
                  className="w-full py-3 bg-surface hover:bg-primary hover:text-background border border-border hover:border-primary rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={14} /> Add to Stack
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MetalPreview;
