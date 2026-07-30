import React from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import LogoGold from '../assets/logo-gold.jpg';
import LogoSilver from '../assets/logo-silver.jpg';

const Navigation = ({ 
  currentTab, 
  setCurrentTab, 
  cartCount, 
  onOpenCheckout, 
  isMenuOpen, 
  setIsMenuOpen 
}) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'squad', label: 'Stack Squad' },
    { id: 'vault', label: 'The Vault' },
    { id: 'swag', label: 'Stack Swag' },
    { id: 'legacy', label: 'Legacy Lab' },
    { id: 'school', label: 'Stack School' },
    { id: 'about', label: 'About Us' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setCurrentTab('home')}
        >
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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`hover:text-primary transition-colors ${currentTab === tab.id ? 'text-accent border-b-2 border-accent' : 'text-text-main'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenCheckout}
            className="relative p-2 hover:bg-surface rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-background text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 p-6 lg:hidden">
          <div className="flex flex-col space-y-6 text-2xl font-black uppercase italic">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setIsMenuOpen(false);
                }}
                className={`text-left ${currentTab === tab.id ? 'text-accent' : 'text-text-main'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
