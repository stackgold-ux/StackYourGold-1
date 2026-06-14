import React, { useState, useEffect } from 'react';
import SpotTicker from './components/SpotTicker';
import BullionShop from './components/BullionShop';
import StackingClub from './components/StackingClub';
import LegacyEngraver from './components/LegacyEngraver';
import SwagShop from './components/SwagShop';
import EducationalHub from './components/EducationalHub';
import CheckoutFlow from './components/CheckoutFlow';
import { ShoppingCart, Menu, X, ChevronRight, Shield, Award, Zap } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [spotPrices, setSpotPrices] = useState({
    gold: 2350.45,
    silver: 29.12,
    platinum: 980.20
  });

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
    // Optional: show some feedback
  };

  return (
    <div className="min-h-screen bg-background text-text-main gritty-bg selection:bg-primary selection:text-background">
      <SpotTicker />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 metallic-gold rounded flex items-center justify-center font-black text-background">SYG</div>
            <span className="text-2xl font-black uppercase italic tracking-tighter">Stack Your Gold</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-bold text-sm uppercase tracking-widest">
            <a href="#shop" className="hover:text-primary transition-colors">Bullion</a>
            <a href="#club" className="hover:text-primary transition-colors">Stacking Club</a>
            <a href="#legacy" className="hover:text-primary transition-colors">Legacy</a>
            <a href="#swag" className="hover:text-primary transition-colors">Swag</a>
            <a href="#education" className="hover:text-primary transition-colors">Education</a>
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
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-20 p-6 md:hidden">
          <div className="flex flex-col space-y-6 text-2xl font-black uppercase italic">
            <a href="#shop" onClick={() => setIsMenuOpen(false)}>Bullion</a>
            <a href="#club" onClick={() => setIsMenuOpen(false)}>Stacking Club</a>
            <a href="#legacy" onClick={() => setIsMenuOpen(false)}>Legacy</a>
            <a href="#swag" onClick={() => setIsMenuOpen(false)}>Swag</a>
            <a href="#education" onClick={() => setIsMenuOpen(false)}>Education</a>
          </div>
        </div>
      )}

      {/* Modal for Checkout */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                Build a <span className="text-primary italic">Legacy</span> Beyond Fiat.
              </h1>
              <p className="text-xl text-text-muted mb-12 max-w-2xl">
                Shift your family's wealth into tangible, generational gold and silver. 
                Transparent pricing, automated stacking, and custom legacy pieces.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="#shop" className="bg-primary text-background px-10 py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center group hover:scale-105 transition-all">
                  Start Stacking <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#club" className="border border-border bg-surface/50 backdrop-blur px-10 py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center hover:bg-surface transition-all">
                  Join the Club
                </a>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl rounded-full"></div>
          <div className="absolute top-1/4 -right-20 w-96 h-96 metallic-gold rounded-full blur-[120px] opacity-20"></div>
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

        <div id="shop"><BullionShop spotPrices={spotPrices} addToCart={addToCart} /></div>
        <div id="club"><StackingClub /></div>
        <div id="legacy"><LegacyEngraver /></div>
        <div id="swag"><SwagShop /></div>
        <div id="education"><EducationalHub /></div>
      </main>

      {/* Footer */}
      <footer className="bg-surface py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 metallic-gold rounded flex items-center justify-center font-black text-background text-sm">SYG</div>
                <span className="text-xl font-black uppercase italic tracking-tighter">Stack Your Gold</span>
              </div>
              <p className="text-text-muted max-w-sm mb-8">
                Providing families with the tools and resources to transition from fragile fiat dependency to tangible, generational wealth.
              </p>
              <div className="flex space-x-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:border-primary cursor-pointer transition-colors">X</div>
                <div className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:border-primary cursor-pointer transition-colors">IG</div>
                <div className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:border-primary cursor-pointer transition-colors">YT</div>
              </div>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest mb-6">Company</h5>
              <ul className="space-y-4 text-text-muted text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest mb-6">Resources</h5>
              <ul className="space-y-4 text-text-muted text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Price Charts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Storage Solutions</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-text-muted uppercase tracking-widest">
            <p>© 2026 Stack Your Gold. All rights reserved.</p>
            <p className="mt-4 md:mt-0 italic">Secure Your Future, One Ounce at a Time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
