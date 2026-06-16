import React, { useState, useEffect } from 'react';
import SpotTicker from './components/SpotTicker';
import BullionShop from './components/BullionShop';
import StackingClub from './components/StackingClub';
import LegacyEngraver from './components/LegacyEngraver';
import SwagShop from './components/SwagShop';
import EducationalHub from './components/EducationalHub';
import CheckoutFlow from './components/CheckoutFlow';
import { ShoppingCart, Menu, X, ChevronRight, Shield, Award, Zap } from 'lucide-react';
import LogoGold from './assets/logo-gold.jpg';
import LogoSilver from './assets/logo-silver.jpg';

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
  };

  return (
    <div className="min-h-screen bg-background text-text-main gritty-bg selection:bg-primary selection:text-background">
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
              <span className="text-xl font-black uppercase italic tracking-tighter leading-none">Stack Your Gold</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Solidify Your Legacy</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 font-bold text-sm uppercase tracking-widest">
            <a href="#shop" className="hover:text-primary transition-colors">Bullion</a>
            <a href="#club" className="hover:text-primary transition-colors text-accent">Stack Squad</a>
            <a href="#legacy" className="hover:text-primary transition-colors">Legacy</a>
            <a href="#swag" className="hover:text-primary transition-colors">Stack Swag</a>
            <a href="#education" className="hover:text-primary transition-colors">Stack School</a>
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
            <a href="#shop" onClick={() => setIsMenuOpen(false)}>Bullion</a>
            <a href="#club" onClick={() => setIsMenuOpen(false)}>Stack Squad</a>
            <a href="#legacy" onClick={() => setIsMenuOpen(false)}>Legacy</a>
            <a href="#swag" onClick={() => setIsMenuOpen(false)}>Stack Swag</a>
            <a href="#education" onClick={() => setIsMenuOpen(false)}>Stack School</a>
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
            </div>
            
            <div className="relative w-full max-w-md hidden md:block">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
              <img src={LogoGold} alt="SYG Premium Gold" className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-pulse" />
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
              <div className="flex items-center space-x-4 mb-6">
                <img src={LogoGold} alt="SYG Logo" className="w-12 h-12" />
                <div className="flex flex-col">
                  <span className="text-xl font-black uppercase italic tracking-tighter">Stack Your Gold</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">The New Standard</span>
                </div>
              </div>
              <p className="text-text-muted max-w-sm mb-8">
                Providing families with the tools and resources to transition from fragile fiat dependency to tangible, generational wealth via **Stack Squad** and **Your Stack School**.
              </p>
              <div className="flex space-x-4">
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
                <li><a href="#education" className="hover:text-white transition-colors">Your Stack School</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Price Charts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Storage Solutions</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-text-muted uppercase tracking-widest">
            <div className="flex items-center space-x-4">
              <img src={LogoSilver} alt="SYS Logo" className="w-8 h-8 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair" />
              <p>© 2026 Stack Your Gold. All rights reserved.</p>
            </div>
            <p className="mt-4 md:mt-0 italic">Secure Your Future, One Ounce at a Time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
