import React from 'react';
import { MessageCircle } from 'lucide-react';
import LogoGold from '../assets/logo-gold.jpg';
import LogoSilver from '../assets/logo-silver.jpg';

const Footer = ({ onOpenRules, isMerchantActive, showMerchantPortal, setShowMerchantPortal }) => {
  return (
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
              <a href="https://discord.gg/mCuHgwBBE" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:border-primary cursor-pointer transition-all hover:scale-110">
                <MessageCircle size={16} className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h5 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-white">Company</h5>
            <ul className="space-y-4 text-text-muted text-sm font-bold uppercase tracking-wider">
              <li><button className="hover:text-primary transition-colors text-left">About Us</button></li>
              <li><button className="hover:text-primary transition-colors text-left">Contact</button></li>
              <li><button onClick={onOpenRules} className="hover:text-primary transition-colors text-left">Road to 99 Rules</button></li>
              <li><button className="hover:text-primary transition-colors text-left">Privacy</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h5 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-white">Resources</h5>
            <ul className="space-y-4 text-text-muted text-sm font-bold uppercase tracking-wider">
              <li><button className="hover:text-primary transition-colors text-left">Stack School</button></li>
              <li><button className="hover:text-primary transition-colors text-left">Charts</button></li>
              <li><button className="hover:text-primary transition-colors text-left">Shipping</button></li>
              <li><button className="hover:text-primary transition-colors text-left">Storage</button></li>
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
  );
};

export default Footer;
