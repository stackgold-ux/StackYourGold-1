import React from 'react';
import { BookOpen, Users, Key, Landmark } from 'lucide-react';

const EducationalHub = () => {
  const articles = [
    { title: 'The Fiat Trap: Why Gold is the Only Real Money', icon: Landmark, category: 'Sound Money' },
    { title: 'Teaching Your Kids to Stack: Generational Wealth 101', icon: Users, category: 'Family' },
    { title: 'Custody vs. Convenience: How to Store Your Bullion', icon: Key, category: 'Security' },
    { title: 'Inflation Decoded: Protecting Your Purchasing Power', icon: BookOpen, category: 'Economics' },
  ];

  return (
    <section className="py-20 bg-surface/10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-12 text-center">Educational Hub</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="group bg-surface border border-border p-8 rounded-2xl hover:bg-surface/50 transition-all cursor-pointer flex items-center space-x-6">
              <div className="w-16 h-16 bg-background rounded-xl border border-border flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                <article.icon className="text-primary" size={32} />
              </div>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1 block">{article.category}</span>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
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
