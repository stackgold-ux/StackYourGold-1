{/* SYG Web App - Multi-Tab Platform Architecture */}
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SpotTicker from './components/SpotTicker';
import BullionShop from './components/BullionShop';
import StackingClub from './components/StackingClub';
import LegacyEngraver from './components/LegacyEngraver';
import SwagShop from './components/SwagShop';
import EducationalHub from './components/EducationalHub';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import CheckoutFlow from './components/CheckoutFlow';
import MerchantPortal from './components/MerchantPortal';
import CookieConsent from './components/CookieConsent';
import Rules from './components/Rules';
import { trackAddToCart, trackInitiateCheckout } from './utils/tracking';
import { Zap } from 'lucide-react';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [showMerchantPortal, setShowMerchantPortal] = useState(false);
  const [isMerchantActive, setIsMerchantActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('merchant') === 'true') {
      setIsMerchantActive(true);
    }
  }, []);

  const [spotPrices, setSpotPrices] = useState({
    gold: 4344.36,
    silver: 70.25,
    platinum: 1811.00
  });

  // Seed data logic
  useEffect(() => {
    const existingOrders = localStorage.getItem('syg_orders');
    const existingProfiles = localStorage.getItem('syg_squad_profiles');
    
    if (!existingOrders) {
      const mockOrders = [
        {
          orderId: 'SYG-1001',
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          customerPhone: '555-0101',
          shippingAddress: '123 Gold St, San Francisco, CA 94105',
          items: [{ name: '1oz Gold Buffalo Coin', price: 2450.50, type: 'bullion' }],
          totalAmount: 2450.50,
          isSubscription: false,
          date: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          orderId: 'SYG-1002',
          customerName: 'Jane Smith',
          customerEmail: 'jane@example.com',
          customerPhone: '555-0202',
          shippingAddress: '456 Silver Ln, Austin, TX 78701',
          items: [{ name: 'Stack Squad: The Gold Tier (Mixed)', price: 49.99, type: 'subscription' }],
          totalAmount: 49.99,
          isSubscription: true,
          date: new Date(Date.now() - 86400000).toISOString()
        },
        {
          orderId: 'SYG-1003',
          customerName: 'Mike Ross',
          customerEmail: 'mike@example.com',
          customerPhone: '555-0303',
          shippingAddress: '789 Platinum Way, New York, NY 10001',
          items: [{ name: '10oz Silver Bar', price: 320.00, type: 'bullion' }, { name: 'Stack Squad: The Silver Tier (Silver)', price: 24.99, type: 'subscription' }],
          totalAmount: 344.99,
          isSubscription: true,
          date: new Date().toISOString()
        }
      ];
      localStorage.setItem('syg_orders', JSON.stringify(mockOrders));
    }
    
    if (!existingProfiles) {
      const mockProfiles = [
        {
          username: 'SilverSurfer',
          password: 'password123',
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          phone: '555-0202',
          tier: 'The Gold Tier',
          date: new Date(Date.now() - 86400000).toISOString()
        },
        {
          username: 'GoldKing',
          password: 'password456',
          fullName: 'Mike Ross',
          email: 'mike@example.com',
          phone: '555-0303',
          tier: 'The Silver Tier',
          date: new Date().toISOString()
        }
      ];
      localStorage.setItem('syg_squad_profiles', JSON.stringify(mockProfiles));
    }
  }, []);

  // Mock spot price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotPrices(prev => ({
        gold: prev.gold + (Math.random() - 0.5) * 1,
        silver: prev.silver + (Math.random() - 0.5) * 0.05,
        platinum: prev.platinum + (Math.random() - 0.5) * 0.5
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => {
    trackAddToCart(product);
    setCart([...cart, product]);
    setIsCheckoutOpen(true);
    trackInitiateCheckout([...cart, product]);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home spotPrices={spotPrices} addToCart={addToCart} />;
      case 'squad':
        return <StackingClub spotPrices={spotPrices} addToCart={addToCart} />;
      case 'vault':
        return <BullionShop spotPrices={spotPrices} addToCart={addToCart} />;
      case 'swag':
        return <SwagShop addToCart={addToCart} />;
      case 'legacy':
        return <LegacyEngraver spotPrices={spotPrices} addToCart={addToCart} />;
      case 'school':
        return <EducationalHub />;
      case 'about':
        return <AboutUs />;
      default:
        return <Home spotPrices={spotPrices} addToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main gritty-bg selection:bg-primary selection:text-background relative">
      {/* Road to 99 Global Promo Banner */}
      <div className="bg-accent text-background py-3 px-4 text-center relative overflow-hidden group z-[60]">
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 relative z-10">
          <div className="flex items-center space-x-2">
            <Zap size={16} className="fill-current animate-pulse" />
            <span className="font-black uppercase italic tracking-tighter text-sm md:text-base">Road to 99 Campaign is Live!</span>
          </div>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Every 9th Subscriber Wins a <span className="underline underline-offset-4 decoration-2">Surprise Stack</span> of Real Gold & Silver! 🎁
          </p>
          <div className="flex items-center space-x-4">
            <span className="hidden lg:block text-[10px] font-black opacity-50 italic">9/9/26 Grand Giveaway Challenge</span>
            <button 
              onClick={() => setCurrentTab('squad')}
              className="bg-background text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
            >
              Claim Your Spot
            </button>
          </div>
        </div>
      </div>

      <SpotTicker />
      
      <Navigation 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cart.length}
        onOpenCheckout={() => { setIsCheckoutOpen(true); trackInitiateCheckout(cart); }}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Modal for Checkout */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-start justify-center p-4 pt-12 md:pt-24 pb-24 overflow-y-auto">
          <div className="w-full max-w-4xl">
            <CheckoutFlow 
              cart={cart} 
              onComplete={() => {
                setCart([]);
                setIsCheckoutOpen(false);
              }}
              onCancel={() => setIsCheckoutOpen(false)}
              onOpenRules={() => setIsRulesOpen(true)}
            />
          </div>
        </div>
      )}

      <main className="pb-24">
        {renderTabContent()}
      </main>

      {showMerchantPortal && <MerchantPortal />}

      <Footer 
        onOpenRules={() => setIsRulesOpen(true)}
        isMerchantActive={isMerchantActive}
        showMerchantPortal={showMerchantPortal}
        setShowMerchantPortal={setShowMerchantPortal}
      />

      <CookieConsent />
      <Rules isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
}

export default App;
