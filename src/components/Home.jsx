import React from 'react';
import { ChevronRight, Zap, Shield, Award } from 'lucide-react';
import LogoGold from '../assets/logo-gold.jpg';
import LogoSilver from '../assets/logo-silver.jpg';
import HeroLogoGif from '../assets/hero-logo.gif';
import StackingClub from './StackingClub';
import SocialProof from './SocialProof';

const Home = ({ spotPrices, addToCart }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
              From Grams to Kilos, You're in control.
            </h1>
            <p className="text-xl text-text-muted mb-12 max-w-xl mx-auto md:mx-0 font-bold uppercase italic">
              Your Stack, Your Way, Always
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
              <button 
                onClick={() => document.getElementById('receipt').scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-background px-10 py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center group hover:scale-105 transition-all"
              >
                See The Receipt <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('squad-home').scrollIntoView({ behavior: 'smooth' })}
                className="border border-border bg-surface/50 backdrop-blur px-10 py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center hover:bg-surface transition-all"
              >
                Join the Squad
              </button>
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

      {/* === FIAT PAIN: THE RECEIPT WALL === */}
      <section id="receipt" className="py-24 bg-background/95 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-red-400 mb-4 block">📉 INFLATION IS A THIEF</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">The Receipt</h2>
            <p className="text-lg md:text-xl text-text-muted mt-6 max-w-2xl mx-auto">What fiat currency has cost your family since 1970.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-6 text-red-400">$100 in 1970</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold text-xl">🛒</span>
                  <span className="font-bold text-white">A full week of groceries for a family of 4</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold text-xl">⛽</span>
                  <span className="font-bold text-white">36 gallons of gas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold text-xl">🏠</span>
                  <span className="font-bold text-white">1/230th of a brand-new home</span>
                </li>
              </ul>
            </div>
            <div className="bg-background border border-red-500/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500/5"></div>
              <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-6 text-red-400 relative z-10">$100 TODAY</h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 font-bold text-xl">🥩</span>
                  <span className="font-bold opacity-70">A single meal for 2 people</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 font-bold text-xl">⛽</span>
                  <span className="font-bold opacity-70">3.5 gallons of gas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 font-bold text-xl">📉</span>
                  <span className="font-bold opacity-70"><span className="text-red-400 font-black">88% of purchasing power GONE</span></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
            <p className="text-xl md:text-2xl font-black uppercase tracking-tighter italic mb-4">Meanwhile, $100 in <span className="text-accent">physical gold</span> in 1970 is worth <span className="text-accent">over $6,800</span> today.</p>
            <p className="text-text-muted max-w-2xl mx-auto mb-6 font-bold uppercase tracking-tight">The math is not complicated. The system is designed to drain you. The only question is: <span className="text-accent font-black underline decoration-2">are you going to build your own fortress?</span></p>
          </div>
        </div>
      </section>

      <SocialProof />

      <div id="squad-home" className="scroll-mt-24 border-t border-border">
        <StackingClub spotPrices={spotPrices} addToCart={addToCart} />
      </div>
    </div>
  );
};

export default Home;
