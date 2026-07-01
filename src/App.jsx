/* SYG Web App - Multi-Tab Platform Architecture */
import { useState, useEffect } from 'react';
import SpotTicker from './components/SpotTicker';
import BullionShop from './components/BullionShop';
import StackingClub from './components/StackingClub';
import LegacyEngraver from './components/LegacyEngraver';
import SwagShop from './components/SwagShop';
import EducationalHub from './components/EducationalHub';
import AboutUs from './components/AboutUs';
import CheckoutFlow from './components/CheckoutFlow';
import MerchantPortal from './components/MerchantPortal';
import CookieConsent from './components/CookieConsent';
import Rules from './components/Rules';
import ReceiptWall from './components/ReceiptWall';
import SocialProof from './components/SocialProof';
import StackingStories from './components/StackingStories';
import { trackAddToCart, trackInitiateCheckout } from './utils/tracking';
import { ShoppingCart, Menu, X, ChevronRight, Shield, Award, Zap, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import LogoGold from './assets/logo-gold.jpg';
import LogoSilver from './assets/logo-silver.jpg';
import HeroLogoGif from './assets/hero-logo.gif';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [showMerchantPortal, setShowMerchantPortal] = useState(false);
  const [isMerchantActive, setIsMerchantActive] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('merchant') === 'true') {
      setIsMerchantActive(true);
    }

    // Handle hash-based routing for direct links
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'club', 'shop', 'swag', 'legacy', 'education', 'about'].includes(hash)) {
        if (hash === 'club') setCurrentView('home');
        else if (hash === 'shop') setCurrentView('vault');
        else if (hash === 'education') setCurrentView('school');
        else setCurrentView(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const [spotPrices, setSpotPrices] = useState({
    gold: 4065.12,
    silver: 58.75,
    platinum: 1625.00,
    palladium: 1200.00
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotPrices(prev => ({
        gold: prev.gold + (Math.random() - 0.5) * 2,
        silver: prev.silver + (Math.random() - 0.5) * 0.1,
        platinum: prev.platinum + (Math.random() - 0.5) * 1.5,
        palladium: prev.palladium + (Math.random() - 0.5) * 1.0
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

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 px-4 overflow-hidden">
              <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl text-center md:text-left">
                  <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                    From Grams to Kilos, You're in control.
                  </h1>
                  <p className="text-xl text-text-muted mb-12 max-w-xl mx-auto md:mx-0">
                    Your Stack, Your Way, Always. Shift from fragile fiat to tangible wealth.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
                    <button onClick={() => navigateTo('squad')} className="bg-primary text-background px-10 py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center group hover:scale-105 transition-all shadow-xl">
                      Join Stack Squad <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button onClick={() => navigateTo('vault')} className="border border-border bg-surface/50 backdrop-blur px-10 py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center hover:bg-surface transition-all">
                      The Vault
                    </button>
                  </div>
                  <div className="mt-12 flex items-center space-x-6 justify-center md:justify-start">
                    <img src={LogoGold} alt="SYG" className="w-10 h-10 object-contain" />
                    <span className="text-primary font-black tracking-[0.4em] text-[10px] uppercase italic">.999 Fine</span>
                    <img src={LogoSilver} alt="SYS" className="w-10 h-10 object-contain" />
                  </div>
                </div>
                <div className="relative w-full max-w-md hidden md:block">
                  <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                  <img src={HeroLogoGif} alt="SYG Premium Gold" className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]" />
                </div>
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl rounded-full"></div>
            </section>

            {/* Value Props */}
            <section className="py-12 border-y border-border bg-surface/5">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary"><Shield size={24} /></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider mb-1">Insured Shipping</h4>
                    <p className="text-sm text-text-muted">Every order is fully insured and tracked to your door.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary"><Award size={24} /></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider mb-1">Authenticity Guaranteed</h4>
                    <p className="text-sm text-text-muted">Direct from sovereign mints and certified refineries.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary"><Zap size={24} /></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider mb-1">Live Pricing</h4>
                    <p className="text-sm text-text-muted">Transparent flat pricing over real-time spot.</p>
                  </div>
                </div>
              </div>
            </section>

            <ReceiptWall />

            <SocialProof />

            {/* The Problem Section */}
            <section className="py-24 bg-surface/20 border-b border-border relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8 leading-none">
                      The Bank Account Lie: <br />
                      <span className="text-primary">Your Savings Are Evaporating</span>
                    </h2>
                    <div className="space-y-6 text-lg text-text-muted">
                      <p>
                        Every hour you spend working is an investment of your life. But if you store the rewards of that work in a standard savings account, you are losing.
                      </p>
                      <p>
                        With record inflation, paper currency is losing purchasing power at an unprecedented rate. The "money" in your bank app is actually a depreciating liability.
                      </p>
                      <p className="font-bold text-white italic">
                        It’s time to stop saving in paper, and start stacking in physical, historic money.
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface border border-border p-10 rounded-3xl relative backdrop-blur-sm shadow-2xl">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl"></div>
                    <h3 className="text-2xl font-black uppercase tracking-widest mb-8 border-b border-border pb-4 italic">Real Ownership</h3>
                    <ul className="space-y-8">
                      {[
                        "No market-timing stress.",
                        "No dealer premiums or hidden fees.",
                        "Direct delivery of physical assets.",
                        "Generational wealth that you can touch."
                      ].map((item, i) => (
                        <li key={i} className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-black italic">{i+1}</div>
                          <span className="font-bold uppercase tracking-wider text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Global CTA */}
            <section className="py-32 bg-primary relative overflow-hidden">
              <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-8 text-background leading-none">
                  The Future Belongs to Those Who <span className="underline decoration-background decoration-4 underline-offset-8">Own</span> the Present.
                </h2>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <button onClick={() => navigateTo('squad')} className="bg-background text-primary px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                    Join Stack Squad
                  </button>
                  <button onClick={() => navigateTo('vault')} className="bg-transparent border-2 border-background text-background px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-background hover:text-primary transition-all">
                    Browse The Vault
                  </button>
                </div>
              </div>
            </section>
          </>
        );
      case 'squad':
        return <div className="pt-8 min-h-screen"><StackingClub spotPrices={spotPrices} addToCart={addToCart} /></div>;
      case 'vault':
        return <div className="pt-8 min-h-screen"><BullionShop spotPrices={spotPrices} addToCart={addToCart} /></div>;
      case 'school':
        return (
          <div className="pt-8 min-h-screen">
            <EducationalHub />
            <StackingStories />
          </div>
        );
      case 'swag':
        return <div className="pt-8 min-h-screen"><SwagShop addToCart={addToCart} /></div>;
      case 'legacy':
        return <div className="pt-8 min-h-screen"><LegacyEngraver spotPrices={spotPrices} addToCart={addToCart} /></div>;
      case 'about':
        return <div className="pt-8 min-h-screen"><AboutUs /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main gritty-bg selection:bg-primary selection:text-background relative">
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
            <button onClick={() => navigateTo('home')} className="bg-background text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
              Claim Your Spot
            </button>
          </div>
        </div>
      </div>

      <SpotTicker spotPrices={spotPrices} />

      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="relative flex items-center">
              <img src={LogoGold} alt="SYG Gold Logo" className="w-12 h-12 object-contain" />
              <img src={LogoSilver} alt="SYS Silver Logo" className="w-10 h-10 object-contain -ml-4 mt-4 border-2 border-background rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black uppercase italic tracking-tighter leading-none">Stack Your Gold | Stack Your Silver™</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Solidify Your Family's Legacy</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 font-bold text-sm uppercase tracking-widest">
            {[
              { id: 'home', label: 'Home' },
              { id: 'squad', label: 'Stack Squad' },
              { id: 'vault', label: 'The Vault' },
              { id: 'school', label: 'Stack School' },
              { id: 'swag', label: 'Stack Swag' },
              { id: 'legacy', label: 'Legacy' }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => navigateTo(view.id)}
                className={`transition-colors py-2 border-b-2 ${currentView === view.id ? 'text-primary border-primary' : 'border-transparent hover:text-primary'}`}
              >
                {view.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => { setIsCheckoutOpen(true); trackInitiateCheckout(cart); }}
              className="relative p-2 hover:bg-surface rounded-full transition-colors"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-background text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 p-6 lg:hidden font-black uppercase italic">
          <div className="flex flex-col space-y-6 text-2xl">
            {[
              { id: 'home', label: 'Home' },
              { id: 'squad', label: 'Stack Squad' },
              { id: 'vault', label: 'The Vault' },
              { id: 'school', label: 'Stack School' },
              { id: 'swag', label: 'Stack Swag' },
              { id: 'legacy', label: 'Legacy' }
            ].map((view) => (
              <button key={view.id} className="text-left" onClick={() => navigateTo(view.id)}>
                {view.label}
              </button>
            ))}
          </div>
        </div>
      )}

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

      <main>
        {renderView()}
        
        {/* Common FAQ Section on all views */}
        <section className="py-24 bg-background px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-16 text-center">Common Questions</h2>
            <div className="space-y-8">
              {[
                { 
                  q: "How is your pricing calculated?", 
                  a: "We believe in complete transparency. We pull live spot prices from major global mints and offer competitive, transparent pricing for retail orders, while Stack Squad members enjoy exclusive discounted rates. This covers our secure sourcing, fully-insured delivery, and operational costs." 
                },
                { 
                  q: "Is shipping safe? What if my package is lost?", 
                  a: "Every single shipment is 100% fully insured by us until it is signed for or delivered to your address. We package everything in secure, highly durable, and completely discreet boxes." 
                }
              ].map((faq, i) => (
                <div key={i} className="bg-surface border border-border p-8 rounded-2xl">
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <span className="text-primary mr-4 font-black italic">Q:</span>
                    {faq.q}
                  </h4>
                  <div className="pl-9 text-text-muted leading-relaxed">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-32 bg-primary relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-8 text-background">
              The Future Belongs to Those Who Own the Present.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button onClick={() => navigateTo('home')} className="bg-background text-primary px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all">
                Join Stack Squad
              </button>
              <button onClick={() => navigateTo('vault')} className="bg-transparent border-2 border-background text-background px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-background hover:text-primary transition-all">
                The Vault
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
            <div>
              <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
                <img src={LogoGold} alt="SYG" className="w-8 h-8" />
                <span className="text-xl font-black uppercase italic tracking-tighter">Stack Your Silver™</span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Empowering families to build generational wealth through physical gold and silver ownership.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-primary">Quick Links</h4>
              <div className="grid grid-cols-2 gap-4 text-sm font-bold uppercase tracking-wider">
                <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors">Home</button>
                <button onClick={() => navigateTo('squad')} className="hover:text-primary transition-colors">Stack Squad</button>
                <button onClick={() => navigateTo('vault')} className="hover:text-primary transition-colors">The Vault</button>
                <button onClick={() => navigateTo('school')} className="hover:text-primary transition-colors">Stack School</button>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-primary">Join the Community</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com/stackyourgold" target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-full hover:border-accent hover:text-accent transition-all"><Facebook size={18} /></a>
                <a href="https://instagram.com/stackyourgold" target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-full hover:border-accent hover:text-accent transition-all"><Instagram size={18} /></a>
                <a href="https://YouTube.com/stackyourgold" target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-full hover:border-accent hover:text-accent transition-all"><Youtube size={18} /></a>
                <a href="https://linkedin.com/company/stackyourgold" target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-full hover:border-accent hover:text-accent transition-all"><Linkedin size={18} /></a>
              </div>
              <p className="mt-6 text-sm font-bold text-text-muted">contact@stackyoursilver.com</p>
            </div>
          </div>
          <div className="pt-12 border-t border-border text-center">
            <p className="text-xs text-text-muted">© 2026 Stack Your Gold | Stack Your Silver™ LLC. All rights reserved.</p>
            <p className="mt-4 italic text-primary/50 text-[10px] uppercase tracking-widest">Your Future. Your Stack. Your Legacy.™</p>
          </div>
        </div>
      </footer>

      <CookieConsent />
      <Rules isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
}

export default App;
