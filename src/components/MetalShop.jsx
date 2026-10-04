import { useState, useEffect } from 'react';
import { ShoppingCart, Box, Loader2 } from 'lucide-react';
import { shopifyClient } from '../utils/shopifyClient';
import { filterByCategory } from '../utils/categorize';

const METAL_CONFIG = {
  gold: {
    brand: 'Stack Your Gold',
    headline: 'In Stock Gold',
    tagline: 'Live gold inventory, ready for secure shipment',
    description:
      'Physical gold from world-renowned refineries and sovereign mints — bars, rounds, and certified coins, priced live and shipped insured.',
    accentText: 'text-amber-300',
    accentBg: 'bg-amber-300',
    accentBorder: 'hover:border-amber-300/50',
    glow: 'bg-amber-300/10',
  },
  silver: {
    brand: 'Stack Your Silver',
    headline: 'In Stock Silver',
    tagline: 'Live silver inventory, ready for secure shipment',
    description:
      'Physical silver rounds, bars, and coins at stacker-friendly premiums — every piece verified in our vault and ready to ship.',
    accentText: 'text-slate-200',
    accentBg: 'bg-slate-200',
    accentBorder: 'hover:border-slate-200/50',
    glow: 'bg-slate-200/10',
  },
  other: {
    brand: 'Vault Finds',
    headline: 'Copper, Antique & Vintage',
    tagline: 'Copper bullion and one-of-a-kind collectible pieces',
    description:
      'Copper bullion, pre-1933 gold, certified vintage coins, and other rare finds from the vault. When they are gone, they are gone.',
    accentText: 'text-orange-300',
    accentBg: 'bg-orange-300',
    accentBorder: 'hover:border-orange-300/50',
    glow: 'bg-orange-300/10',
  },
};

const ProductCard = ({ product, addToCart, accent }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || {});
  const isSoldOut = product.totalInventory <= 0;
  const isVariantSoldOut = (selectedVariant.inventory || 0) <= 0 || !selectedVariant.available;
  const currentPrice = selectedVariant.price || product.price;

  const handleAddToCart = () => {
    if (isVariantSoldOut || !addToCart) return;
    addToCart({
      id: `${product.id}-${selectedVariant.id}`,
      shopifyVariantId: selectedVariant.id,
      name: `${product.name}${selectedVariant.title ? ` — ${selectedVariant.title}` : ''}`,
      price: currentPrice,
      image: product.images[0]?.url,
      type: 'bullion',
      description: product.description,
      isShopify: true,
    });
  };

  return (
    <div className={`group bg-surface/30 border border-border/50 rounded-2xl overflow-hidden ${accent.accentBorder} hover:bg-surface/50 transition-all duration-300 flex flex-col h-full shadow-md hover:shadow-xl ${isSoldOut ? 'opacity-75' : ''}`}>
      <div className="relative aspect-square overflow-hidden bg-background">
        {product.images[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
            loading="lazy"
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isSoldOut ? 'grayscale' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            <Box size={48} />
          </div>
        )}
        <div className={`absolute top-3 left-3 ${accent.accentBg} text-background text-[10px] font-black px-2 py-1 rounded shadow-lg`}>
          ${currentPrice.toFixed(2)}
        </div>
        {!isSoldOut && (
          <div className="absolute top-3 right-3 flex items-center text-[10px] font-bold text-green-400 bg-background/70 backdrop-blur px-2 py-1 rounded">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
            IN STOCK
          </div>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-secondary text-background font-black px-4 py-2 rounded-lg text-xs uppercase tracking-widest -rotate-6 shadow-xl border border-white/20">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h4 className="font-bold text-lg leading-tight mb-2 line-clamp-2">{product.name}</h4>
        <p className="text-text-muted text-xs mb-4 line-clamp-2 leading-relaxed flex-grow">{product.description}</p>

        {product.variants && product.variants.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                disabled={(v.inventory || 0) <= 0}
                className={`text-[10px] px-2 py-1 rounded border transition-all ${
                  selectedVariant?.id === v.id
                    ? `${accent.accentBg} text-background border-transparent font-black`
                    : (v.inventory || 0) <= 0
                      ? 'border-border text-text-muted opacity-30 cursor-not-allowed'
                      : 'border-border text-text-muted hover:border-text-main'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isVariantSoldOut}
          className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 mt-auto ${
            isVariantSoldOut
              ? 'bg-muted text-text-muted cursor-not-allowed'
              : `${accent.accentBg} text-background hover:scale-[1.02] active:scale-95 shadow-lg`
          }`}
        >
          <ShoppingCart size={14} />
          <span>{isVariantSoldOut ? 'Unavailable' : 'Add to Stack'}</span>
        </button>
      </div>
    </div>
  );
};

const MetalShop = ({ metal, addToCart }) => {
  const config = METAL_CONFIG[metal] || METAL_CONFIG.other;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchInventory = async () => {
      setLoading(true);
      setFailed(false);
      try {
        const all = await shopifyClient.getAllProducts();
        if (!cancelled) {
          if (all.length === 0) setFailed(true);
          setProducts(filterByCategory(all, metal));
        }
      } catch (error) {
        console.error(`[MetalShop:${metal}] inventory fetch failed:`, error);
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchInventory();
    return () => { cancelled = true; };
  }, [metal]);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <div className={`rounded-[2.5rem] border border-border/60 p-8 md:p-14 relative overflow-hidden mb-12 ${config.glow}`}>
        <div className="relative z-10">
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${config.accentText} mb-4`}>
            {config.brand}
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic leading-none mb-4">
            {config.headline}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl">{config.description}</p>
          {!loading && !failed && products.length > 0 && (
            <p className="mt-6 text-xs font-black uppercase tracking-widest text-text-muted">
              <span className={`${config.accentText}`}>{products.length}</span> {products.length === 1 ? 'piece' : 'pieces'} in stock now
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 size={32} className={`${config.accentText} animate-spin`} />
          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.3em]">Syncing Vault…</p>
        </div>
      ) : failed ? (
        <div className="text-center py-24">
          <p className="text-text-muted mb-2">Live inventory is temporarily unavailable.</p>
          <p className="text-text-muted text-sm">Please check back shortly or contact us.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-text-muted mb-2">Nothing in this vault right now.</p>
          <p className="text-text-muted text-sm">New inventory lands regularly — check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} accent={config} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MetalShop;
export { METAL_CONFIG };
