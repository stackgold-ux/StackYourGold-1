import { useState, useEffect } from 'react';
import { ShoppingCart, ShieldCheck, Box, Loader2, Play, Search, Filter } from 'lucide-react';
import { shopifyClient } from '../utils/shopifyClient';

const InStock = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllInventory = async () => {
      setLoading(true);
      try {
        // Fetch products with different tags to get a comprehensive list
        const [silver, gold, swag] = await Promise.all([
          shopifyClient.getProducts('silver'),
          shopifyClient.getProducts('gold'),
          shopifyClient.getProducts('swag')
        ]);
        
        // Merge and remove duplicates by ID
        const allProducts = [...silver, ...gold, ...swag];
        const uniqueProducts = Array.from(new Map(allProducts.map(item => [item.id, item])).values());
        
        setProducts(uniqueProducts);
      } catch (error) {
        console.error('Failed to fetch live inventory:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllInventory();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'bullion' && (product.tags.includes('silver') || product.tags.includes('gold'))) ||
                         (filter === 'swag' && product.tags.includes('swag'));
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto min-h-[60vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase animate-pulse">Live Inventory</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white italic leading-none">
            In Stock <span className="text-primary">Now</span>
          </h2>
          <p className="text-xl text-text-muted mt-4 max-w-2xl">
            Real-time access to our physical vault and official apparel. 
            All items shown are verified in-stock and ready for immediate secure shipment.
          </p>
        </div>
        
        <div className="bg-surface border border-border p-2 rounded-2xl flex flex-wrap gap-2">
          {['all', 'bullion', 'swag'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                filter === f ? 'bg-primary text-background' : 'hover:bg-background/50 text-text-muted hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the vault..."
            className="w-full bg-surface border border-border rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
          />
        </div>
        
        <div className="flex items-center space-x-8 text-text-muted text-[10px] font-black uppercase tracking-widest">
            <div className="flex items-center">
                <Box size={14} className="mr-2 text-primary" />
                {filteredProducts.length} Items Found
            </div>
            <div className="flex items-center">
                <ShieldCheck size={14} className="mr-2 text-green-400" />
                Fully Insured
            </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 size={48} className="text-primary animate-spin" />
          <p className="text-text-muted font-bold uppercase tracking-widest animate-pulse">Syncing with Vault...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductGridCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div className="bg-surface/50 border border-dashed border-border rounded-3xl py-32 text-center">
          <Box size={48} className="mx-auto text-text-muted mb-4 opacity-20" />
          <h3 className="text-2xl font-black uppercase italic text-text-muted">No items found</h3>
          <p className="text-text-muted mt-2">Try adjusting your search or filter</p>
          <button 
            onClick={() => { setFilter('all'); setSearchQuery(''); }}
            className="mt-6 text-primary font-black uppercase text-xs tracking-widest hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
      
      {/* Disclaimer */}
      <div className="mt-16 pt-8 border-t border-border/50 text-center">
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
              * Live inventory, prices, and images are synced directly from our Shopify catalog and updated every 60 seconds.
          </p>
      </div>
    </section>
  );
};

const ProductGridCard = ({ product, addToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const isSoldOut = product.totalInventory <= 0;
  const isVariantSoldOut = selectedVariant.inventory <= 0 || !selectedVariant.available;
  
  const initialMedia = product.images.length > 0 
    ? { type: 'IMAGE', url: product.images[0].url }
    : product.media.length > 0
      ? { type: 'VIDEO', url: product.media[0].sources[0].url }
      : { type: 'IMAGE', url: null };

  const [activeMedia, setActiveMedia] = useState(initialMedia);

  const handleAddToCart = () => {
    if (isVariantSoldOut) return;
    
    addToCart({
      id: `${product.id}-${selectedVariant.id}`,
      shopifyVariantId: selectedVariant.id,
      name: `${product.name} - ${selectedVariant.title}`,
      price: selectedVariant.price,
      image: product.images[0]?.url || '',
      type: product.tags.includes('swag') ? 'swag' : 'bullion',
      weight: selectedVariant.title,
      description: product.description,
      isShopify: true
    });
  };

  return (
    <div className={`group bg-surface border border-border rounded-3xl overflow-hidden flex flex-col h-full hover:border-primary/40 transition-all duration-500 shadow-xl ${isSoldOut ? 'opacity-80' : ''}`}>
      <div className="relative aspect-video overflow-hidden bg-black">
        {activeMedia.type === 'IMAGE' ? (
          <img 
            src={activeMedia.url} 
            alt={product.name} 
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${isSoldOut ? 'grayscale' : ''}`}
          />
        ) : (
          <video 
            src={activeMedia.url} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {isSoldOut && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
            <span className="bg-red-600 text-white font-black px-4 py-2 rounded-full text-sm uppercase italic tracking-widest -rotate-12 border-2 border-white shadow-2xl">
              Out of Stock
            </span>
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest ${product.tags.includes('silver') ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-primary/20 text-primary backdrop-blur-md'}`}>
                {product.tags.includes('silver') ? 'Silver' : product.tags.includes('gold') ? 'Gold' : 'Swag'}
            </span>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
            <h4 className="text-xl font-black uppercase italic tracking-tighter text-white leading-none group-hover:text-primary transition-colors">
                {product.name}
            </h4>
            <p className="text-lg font-black text-primary italic font-mono ml-4">
                ${selectedVariant.price.toFixed(2)}
            </p>
        </div>
        
        <p className="text-xs text-text-muted mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {product.variants.length > 1 && (
            <div className="mb-6">
                <div className="flex gap-2 flex-wrap">
                    {product.variants.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            disabled={v.inventory <= 0}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                                selectedVariant.id === v.id 
                                ? 'bg-primary border-primary text-background' 
                                : v.inventory <= 0
                                    ? 'opacity-30 cursor-not-allowed border-border text-text-muted'
                                    : 'bg-background/50 border-border text-white hover:border-primary/50'
                            }`}
                        >
                            {v.title}
                        </button>
                    ))}
                </div>
            </div>
        )}

        <div className="mt-auto pt-6 border-t border-border/30 flex items-center justify-between">
            <div className="flex items-center text-[9px] font-bold text-text-muted uppercase tracking-widest">
                <div className={`w-2 h-2 rounded-full mr-2 ${isVariantSoldOut ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
                {isVariantSoldOut ? 'Out of Stock' : 'In Stock'}
            </div>

            <button
                onClick={handleAddToCart}
                disabled={isVariantSoldOut}
                className={`p-3 rounded-xl transition-all ${
                    isVariantSoldOut 
                        ? 'bg-muted text-text-muted cursor-not-allowed' 
                        : 'bg-primary hover:bg-primary-dark text-background hover:scale-110 shadow-lg'
                }`}
            >
                <ShoppingCart size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default InStock;
