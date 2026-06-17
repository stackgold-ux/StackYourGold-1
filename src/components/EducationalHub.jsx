import React from 'react';
import { BookOpen, Users, Key, Landmark } from 'lucide-react';

const EducationalHub = () => {
  const articles = [
    { 
      title: 'The Fiat Trap: Why Gold is the Only Real Money', 
      icon: Landmark, 
      category: 'Sound Money',
      desc: 'Discover how paper currency is designed to lose value and why physical metal is the ultimate shield.'
    },
    { 
      title: 'Teaching Your Kids to Stack: Generational Wealth 101', 
      icon: Users, 
      category: 'Family',
      desc: 'Practical strategies for introducing your children to real assets and financial responsibility.'
    },
    { 
      title: 'Custody vs. Convenience: How to Store Your Bullion', 
      icon: Key, 
      category: 'Security',
      desc: 'Expert guide on home safes, bank vaults, and third-party storage solutions for your growing stack.'
    },
    { 
      title: 'Inflation Decoded: Protecting Your Purchasing Power', 
      icon: BookOpen, 
      category: 'Economics',
      desc: 'Understand the hidden tax of inflation and how to benchmark your wealth against tangible assets.'
    },
  ];

  return (
    <section className="py-24 bg-surface/10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-6">Your Stack School</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Master the art of physical stacking. No confusing jargon, just actionable financial literacy for the modern family.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="group bg-surface border border-border p-8 rounded-3xl hover:border-primary/50 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 shadow-xl">
              <div className="w-20 h-20 bg-background rounded-2xl border border-border flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-inner">
                <article.icon className="text-primary" size={40} />
              </div>
              <div>
                <span className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-2 block">{article.category}</span>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight mb-2">
                  {article.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {article.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="border border-border hover:border-primary text-text-muted hover:text-primary px-8 py-3 rounded-full transition-all font-bold uppercase text-sm tracking-widest">
            View All Resources
          </button>
        </div>
      </div>
    </section>
  );
};

export default EducationalHub;
