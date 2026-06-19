import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Users, Key, Landmark, X, Award, Shield, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import blog contents using Vite's glob import
// Note: In Vite, we use import.meta.glob with ?raw to get the string content
const blogModules = import.meta.glob('../blogs/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
});

const EducationalHub = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    { 
      id: '7stop',
      title: 'The 7 Stops to Generational Wealth', 
      icon: Award, 
      category: 'Premium Strategy',
      desc: 'The definitive 7-step journey from fragile paper assets to an unbreakable family legacy.',
      blogPath: '../blogs/7stop.md'
    },
    { 
      id: 'fiat-trap',
      title: 'The Fiat Trap: Why Gold is the Only Real Money', 
      icon: Landmark, 
      category: 'Sound Money',
      desc: 'Discover how paper currency is designed to lose value and why physical metal is the ultimate shield.',
      blogPath: '../blogs/1_fiat_vs_hard_money.md'
    },
    { 
      id: 'iraq-gold',
      title: 'The $20 Million Smuggled Gold Scandal', 
      icon: Shield, 
      category: 'High Intrigue',
      desc: 'The true story of covert operatives, military cargo planes, and the looted vaults of Baghdad.',
      blogPath: '../blogs/8_cia_iraq_gold_heist.md'
    },
    { 
      id: 'kids-stacking',
      title: 'Teaching Your Kids to Stack: Generational Wealth 101', 
      icon: Users, 
      category: 'Family',
      desc: 'Practical strategies for introducing your children to real assets and financial responsibility.'
    },
    { 
      id: 'custody',
      title: 'Custody vs. Convenience: How to Store Your Bullion', 
      icon: Key, 
      category: 'Security',
      desc: 'Expert guide on home safes, bank vaults, and third-party storage solutions for your growing stack.'
    }
  ];

  const handleOpenArticle = (article) => {
    if (article.blogPath) {
      const content = blogModules[article.blogPath];
      setSelectedArticle({ ...article, content });
      window.scrollTo({ top: document.getElementById('education').offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <section id="education" className="py-24 bg-surface/10 border-t border-border relative">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {!selectedArticle ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-6">Your Stack School</h2>
                <p className="text-text-muted max-w-2xl mx-auto text-lg">
                  Master the art of physical stacking. No confusing jargon, just actionable financial literacy for the modern family.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleOpenArticle(article)}
                    className={`group bg-surface border border-border p-8 rounded-3xl transition-all flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 shadow-xl ${article.blogPath ? 'hover:border-primary/50 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
                  >
                    <div className="w-20 h-20 bg-background rounded-2xl border border-border flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-inner">
                      <article.icon className="text-primary" size={40} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-primary uppercase tracking-[0.3em] block">{article.category}</span>
                        {article.blogPath && <ChevronRight size={16} className="text-primary/50 group-hover:translate-x-1 transition-transform" />}
                      </div>
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
            </motion.div>
          ) : (
            <motion.div
              key="article"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-border rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="bg-background/50 border-b border-border p-6 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center space-x-2 text-text-muted hover:text-primary transition-colors font-bold uppercase text-xs tracking-widest"
                >
                  <ArrowLeft size={16} />
                  <span>Back to School</span>
                </button>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Live Lesson</span>
                </div>
              </div>

              <div className="p-8 md:p-16 max-w-4xl mx-auto">
                <div className="mb-12">
                  <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block italic">{selectedArticle.category}</span>
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none mb-8">
                    {selectedArticle.title}
                  </h1>
                  <div className="h-1 w-24 bg-primary mb-8"></div>
                </div>

                <div className="markdown-content">
                  <ReactMarkdown 
                    components={{
                      h1: ({node, ...props}) => <h1 className="hidden" {...props} />, // Hide redundant h1
                      h2: ({node, ...props}) => <h2 className="text-3xl font-black uppercase italic tracking-tight text-white mt-12 mb-6 border-l-4 border-primary pl-6" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-primary mt-10 mb-4" {...props} />,
                      p: ({node, ...props}) => <p className="text-text-muted text-lg leading-relaxed mb-6" {...props} />,
                      ul: ({node, ...props}) => <ul className="space-y-4 mb-8 ml-4" {...props} />,
                      li: ({node, ...props}) => (
                        <li className="flex items-start space-x-3 text-text-muted text-lg">
                          <span className="text-primary mt-1.5">•</span>
                          <span {...props} />
                        </li>
                      ),
                      strong: ({node, ...props}) => <strong className="text-white font-bold italic" {...props} />,
                      hr: ({node, ...props}) => <hr className="border-border my-12" {...props} />,
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-primary bg-primary/5 p-8 italic text-xl text-white rounded-r-2xl mb-8" {...props} />
                      )
                    }}
                  >
                    {selectedArticle.content}
                  </ReactMarkdown>
                </div>

                <div className="mt-20 pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-2">Ready to apply this knowledge?</h4>
                    <p className="text-text-muted">Start your stacking journey today with the Stack Squad.</p>
                  </div>
                  <a href="#club" onClick={() => setSelectedArticle(null)} className="bg-primary text-background px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all">
                    Join the Squad
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EducationalHub;
