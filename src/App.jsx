{/* SYG Web App - Bundled Updates */}
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
import { ShoppingCart, Menu, X, ChevronRight, Shield, Award, Zap } from 'lucide-react';
import LogoGold from './assets/logo-gold.jpg';
import LogoSilver from './assets/logo-silver.jpg';
import HeroLogoGif from './assets/hero-logo.gif';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
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
    setCart([...cart, product]);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-text-main gritty-bg selection:bg-primary selection:text-background relative">
      <SpotTicker />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center">
              <img src={LogoGold} alt="SYG Gold Logo" className="w-12 h-12 object-contain" />
              <img src={LogoSilver} alt="SYS Silver Logo" className="w-10 h-10 object-contain -ml-4 mt-4 border-2 border-background rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black uppercase italic tracking-tighter leading-none">Stack Your Gold™</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Solidify Your Legacy</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 font-bold text-sm uppercase tracking-widest">
            <a href="#club" className="hover:text-primary transition-colors text-accent">Stack Squad</a>
            <a href="#shop" className="hover:text-primary transition-colors">Bullion</a>
            <a href="#swag" className="hover:text-primary transition-colors">Stack Swag</a>
            <a href="#legacy" className="hover:text-primary transition-colors">Legacy</a>
            <a href="#education" className="hover:text-primary transition-colors">Stack School</a>
            <a href="#about" className="hover:text-primary transition-colors">About Us</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="relative p-2 hover:bg-surface rounded-full transition-colors"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-background text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 p-6 lg:hidden">
          <div className="flex flex-col space-y-6 text-2xl font-black uppercase italic">
            <a href="#club" onClick={() => setIsMenuOpen(false)}>Stack Squad</a>
            <a href="#shop" onClick={() => setIsMenuOpen(false)}>Bullion</a>
            <a href="#swag" onClick={() => setIsMenuOpen(false)}>Stack Swag</a>
            <a href="#legacy" onClick={() => setIsMenuOpen(false)}>Legacy</a>
            <a href="#education" onClick={() => setIsMenuOpen(false)}>Stack School</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a>
          </div>
        </div>
      )}

      {/* Modal for Checkout */}
      {isCheckoutOpen && (
        <div className="absolute inset-x-0 top-0 min-h-full z-[60] bg-background/95 backdrop-blur-sm flex items-start justify-center p-4 pt-12 md:pt-24 pb-24">
          <div className="w-full max-w-4xl">
            <CheckoutFlow 
              cart={cart} 
              onComplete={() => {
                setCart([]);
                setIsCheckoutOpen(false);
              }}
              onCancel={() => setIsCheckoutOpen(false)}
            />
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                From Grams to Kilos, You're in control.
              </h1>
              <p className="text-xl text-text-muted mb-12 max-w-xl mx-auto md:mx-0">
                Your Stack, Your Way, Always
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
                <a href="#shop" className="bg-primary text-background px-10 py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center group hover:scale-105 transition-all">
                  Start Stacking <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#club" className="border border-border bg-surface/50 backdrop-blur px-10 py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center hover:bg-surface transition-all">
                  Join the Squad
                </a>
              </div>

              {/* Purity Seal */}
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
          
          {/* Background decoration */}
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
                <p className="text-sm text-text-muted">Transparent 15% flat markup over real-time spot.</p>
              </div>
            </div>
          </div>
        </section>

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

        <div id="club" className="scroll-mt-0"><StackingClub spotPrices={spotPrices} addToCart={addToCart} /></div>
        <div id="shop" className="scroll-mt-8"><BullionShop spotPrices={spotPrices} addToCart={addToCart} /></div>
        <div id="swag" className="scroll-mt-4"><SwagShop addToCart={addToCart} /></div>
        <div id="legacy" className="scroll-mt-4"><LegacyEngraver spotPrices={spotPrices} addToCart={addToCart} /></div>
        <div id="education" className="scroll-mt-0"><EducationalHub /></div>
        <AboutUs />

        {/* FAQ Section */}
        <section className="py-24 bg-background px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-16 text-center">Common Questions</h2>
            <div className="space-y-8">
              {[
                { 
                  q: "How is your pricing calculated?", 
                  a: "We believe in complete transparency. We pull live spot prices from major global mints and add a flat, non-negotiable 15% markup. This covers our secure sourcing, fully-insured delivery, and operational costs. There are no surprise dealer premiums or hidden checkout fees." 
                },
                { 
                  q: "Is shipping safe? What if my package is lost?", 
                  a: "Every single shipment is 100% fully insured by us until it is signed for or delivered to your address. We package everything in secure, highly durable, and completely discreet boxes with no mention of 'gold', 'silver', or 'metals' on the outside to ensure absolute privacy." 
                },
                { 
                  q: "Can I cancel or change my Stack Squad subscription?", 
                  a: "Absolutely. You have total control. You can pause, cancel, increase, or decrease your monthly stacking subscription at any time directly through your dashboard with a single click. No lock-in contracts, no cancellation fees." 
                },
                { 
                  q: "How do custom engravings work?", 
                  a: "Simply select 'Custom Engraving' during checkout on any eligible gold or silver bar. Upload your high-res design, family coat of arms, or type in your desired text. Our designers will generate a high-fidelity visual preview for your approval before our high-precision lasers carve it permanently into the metal." 
                }
              ].map((faq, i) => (
                <div key={i} className="bg-surface border border-border p-8 rounded-2xl hover:border-primary/30 transition-colors">
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

        {/* Final CTA Section */}
        <section className="py-32 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-8 text-background leading-none">
              The Future Belongs to Those Who Own the Present.
            </h2>
            <p className="text-xl text-background/80 font-bold mb-12 italic uppercase tracking-wide">
              Take your wealth out of the digital ether. Hold your legacy in your hands.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="#club" className="bg-background text-primary px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                Start Stack Squad
              </a>
              <a href="#shop" className="bg-transparent border-2 border-background text-background px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-background hover:text-primary transition-all">
                Buy Physical Bullion Now
              </a>
            </div>
          </div>
        </section>
      </main>

      {showMerchantPortal && <MerchantPortal />}

      {/* Footer */}
      <footer className="bg-surface py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            {/* Brand Section */}
            <div className="md:col-span-4">
              <div className="flex items-center space-x-4 mb-6">
                <img src={LogoGold} alt="SYG Logo" className="w-12 h-12" />
                <div className="flex flex-col">
                  <span className="text-xl font-black uppercase italic tracking-tighter leading-none">Stack Your Gold™</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">The New Standard</span>
                </div>
              </div>
              <p className="text-text-muted max-w-sm mb-10 leading-relaxed">
                Providing families with the tools and resources to transition from fragile fiat dependency to tangible, generational wealth via <span className="text-white font-bold italic text-xs uppercase tracking-tight">Stack Squad</span> and <span className="text-white font-bold italic text-xs uppercase tracking-tight">Your Stack School</span>.
              </p>
              <div className="flex space-x-4">
                {['X', 'IG', 'YT'].map((social) => (
                  <div key={social} className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:border-primary cursor-pointer transition-all hover:scale-110 text-[10px] font-black">
                    {social}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="md:col-span-2">
              <h5 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-white">Company</h5>
              <ul className="space-y-4 text-text-muted text-sm font-bold uppercase tracking-wider">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#footer-contact" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-2">
              <h5 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-white">Resources</h5>
              <ul className="space-y-4 text-text-muted text-sm font-bold uppercase tracking-wider">
                <li><a href="#education" className="hover:text-primary transition-colors">Stack School</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Charts</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Storage</a></li>
              </ul>
            </div>

            {/* Contact & Locations */}
            <div id="footer-contact" className="md:col-span-4 scroll-mt-24">
              <h5 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-white">Contact & Locations</h5>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">Call or Text</p>
                  <a href="tel:1-510-999-4653" className="text-2xl font-black hover:text-primary transition-colors block leading-none tracking-tighter">1-510-999-GOLD</a>
                  <p className="text-xs text-text-muted mt-2 font-bold">(510) 999-4653</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">Email Support</p>
                  <a href="mailto:contact@stackyourgold.com" className="text-sm font-bold hover:text-white transition-colors border-b border-primary/30 pb-1">contact@stackyourgold.com</a>
                </div>
                <div className="pt-6 border-t border-border/50">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-3 italic">Custom Solutions:</p>
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-relaxed">Inquire for custom designed bars and rounds</p>
                </div>
                <div className="pt-6 border-t border-border/50">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-3 italic">Serving Everywhere. Offices in:</p>
                  <p className="text-sm font-black uppercase italic tracking-[0.2em] text-white">BOS | ATL | DFW</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
            <div className="flex items-center space-x-6">
              <img src={LogoSilver} alt="SYS Logo" className="w-10 h-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-crosshair" />
              <p>© 2026 Stack Your Gold™. All rights reserved.</p>
              {isMerchantActive && (
                <button 
                  onClick={() => {
                    setShowMerchantPortal(!showMerchantPortal);
                    if (!showMerchantPortal) {
                      setTimeout(() => {
                        document.getElementById('merchant-portal')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className="text-text-muted hover:text-primary transition-colors ml-4 border-l border-border pl-4"
                >
                  Merchant Portal
                </button>
              )}
            </div>
            <p className="mt-6 md:mt-0 italic text-primary/50">Your Future. Your Stack. Your Legacy.™</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
