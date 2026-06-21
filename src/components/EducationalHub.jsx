import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Users, Key, Landmark, X, Award, Shield, ChevronRight, ArrowLeft, History, Gem, Scale, TrendingUp, Wallet, Anchor, Map } from 'lucide-react';
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
      icon: Map, 
      category: 'Premium Strategy',
      desc: 'The definitive 7-step journey from fragile paper assets to an unbreakable family legacy.',
      blogPath: '../blogs/7stop.md'
    },
    { 
      id: 'fiat-trap',
      title: 'Fiat vs. Hard Money', 
      icon: Landmark, 
      category: 'Sound Money',
      desc: 'Why paper currencies historically always return to zero and why precious metals remain the ultimate anchor.',
      blogPath: '../blogs/1_fiat_vs_hard_money.md'
    },
    { 
      id: 'budgeting',
      title: 'The 10% Wealth Shield', 
      icon: Wallet, 
      category: 'Sound Money',
      desc: "How to budget for your family's financial citadel by converting paper into physical protection.",
      blogPath: '../blogs/2_budgeting_10_percent_shield.md'
    },
    { 
      id: 'gold-vs-silver',
      title: 'Gold vs. Silver Comparison', 
      icon: Scale, 
      category: 'Sound Money',
      desc: "Settle the debate: critical differences and strategic advantages of both gold and silver.",
      blogPath: '../blogs/3_gold_vs_silver_comparison.md'
    },
    { 
      id: 'dca-superpower',
      title: 'The DCA Stacking Superpower', 
      icon: TrendingUp, 
      category: 'Sound Money',
      desc: 'Why timing the market is a losing game and how consistent stackers win in the long run.',
      blogPath: '../blogs/4_dca_stacking_superpower.md'
    },
    { 
      id: 'legacy-passing',
      title: 'Passing the Torch', 
      icon: Users, 
      category: 'Family',
      desc: 'How physical metals bypass bureaucratic gridlock and estate delays for private wealth transfer.',
      blogPath: '../blogs/5_legacy_passing_wealth.md'
    },
    { 
      id: 'ratio-trading',
      title: 'The Gold-to-Silver Ratio', 
      icon: Gem, 
      category: 'Sound Money',
      desc: 'The mathematical secret to multiplying your ounces for free without spending new capital.',
      blogPath: '../blogs/6_gold_silver_ratio_trading.md'
    },
    { 
      id: 'iraq-gold',
      title: 'The $20M Smuggled Gold Scandal', 
      icon: Shield, 
      category: 'High Intrigue',
      desc: 'The true story of covert operatives and looted vaults during the 2003 invasion of Baghdad.',
      blogPath: '../blogs/8_cia_iraq_gold_heist.md'
    },
    { 
      id: 'hunt-brothers',
      title: 'The Day the Silver Market Broke', 
      icon: History, 
      category: 'High Intrigue',
      desc: 'How two Texas oil billionaires nearly cornered the global silver supply in 1980.',
      blogPath: '../blogs/9_hunt_brothers_silver_thursday.md'
    },
    { 
      id: 'nazi-gold',
      title: 'The Shadow of Nazi Gold', 
      icon: History, 
      category: 'High Intrigue',
      desc: 'The dark history of WWII looted bullion, secret vaults, and the Swiss connection.',
      blogPath: '../blogs/10_nazi_gold_secret_vaults.md'
    },
    { 
      id: 'fort-knox',
      title: 'Inside Fort Knox', 
      icon: Landmark, 
      category: 'High Intrigue',
      desc: 'Separating myths from reality at the US Bullion Depository and the sovereign truth.',
      blogPath: '../blogs/11_fort_knox_conspiracy.md'
    },
    { 
      id: 'brinks-mat',
      title: 'The Brink\'s-MAT Gold Robbery', 
      icon: History, 
      category: 'High Intrigue',
      desc: 'How a simple warehouse robbery accidentally scored three tons of solid gold in 1983.',
      blogPath: '../blogs/12_brinks_mat_gold_heist.md'
    },
    { 
      id: 'bre-x-fraud',
      title: 'The $6 Billion Bre-X Mirage', 
      icon: Shield, 
      category: 'High Intrigue',
      desc: 'The massive gold mine fraud of the 1990s that fooled Wall Street with ring shavings.',
      blogPath: '../blogs/13_bre_x_gold_mine_fraud.md'
    },
    { 
      id: 'el-dorado',
      title: 'The Ocean of Gold', 
      icon: Anchor, 
      category: 'High Intrigue',
      desc: 'Shipwreck treasure and the mythical quest for golden cities that shaped the Americas.',
      blogPath: '../blogs/14_el_dorado_sunken_galleons.md'
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
    <section className="py-24 bg-surface/10 border-t border-border relative">
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

              {/* Today's Featured Marketing Spotlight */}
              <div className="mb-20">
                <div className="flex items-center space-x-3 mb-8 justify-center lg:justify-start">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-primary">FEATURED ARTICLES FOR TODAY</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Blog 1: Foundation of Buying Bullion */}
                  <div 
                    onClick={() => handleOpenArticle(articles.find(a => a.id === 'fiat-trap'))}
                    className="relative overflow-hidden group bg-gradient-to-br from-primary/10 to-surface/20 border border-primary/20 p-8 rounded-3xl transition-all shadow-xl hover:border-primary/50 cursor-pointer flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6"
                  >
                    <div className="absolute top-0 right-0 bg-primary/20 text-primary text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-xl border-l border-b border-primary/20">
                      FOUNDATIONAL SELECTION
                    </div>
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0 border border-primary/30 group-hover:scale-105 transition-transform shadow-inner">
                      <Landmark className="text-primary" size={32} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-2">SOUND MONEY</span>
                      <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors leading-tight mb-3">
                        Fiat vs. Hard Money™
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed mb-4">
                        Why paper currencies historically always return to zero and why precious metals remain the ultimate anchor. Master the foundational principles of sound money before buying your first ounce of physical bullion.
                      </p>
                      <span className="text-xs font-bold text-primary group-hover:underline flex items-center">
                        READ ARTICLE <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Blog 2: High Intrigue Historical / Conspiracy Theory */}
                  <div 
                    onClick={() => handleOpenArticle(articles.find(a => a.id === 'fort-knox'))}
                    className="relative overflow-hidden group bg-gradient-to-br from-border/10 to-surface/20 border border-border p-8 rounded-3xl transition-all shadow-xl hover:border-primary/40 cursor-pointer flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6"
                  >
                    <div className="absolute top-0 right-0 bg-border/20 text-text-muted text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-xl border-l border-b border-border/20">
                      CONSPIRACY & HISTORY
                    </div>
                    <div className="w-16 h-16 bg-surface border border-border rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                      <History className="text-primary" size={32} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-2">HIGH INTRIGUE</span>
                      <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors leading-tight mb-3">
                        Inside Fort Knox™
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed mb-4">
                        Separating myths from reality at the US Bullion Depository. Is there actually gold inside Fort Knox, or has it been empty for decades? Read the historical audits and conspiracy theories that follow the world's most guarded vault.
                      </p>
                      <span className="text-xs font-bold text-primary group-hover:underline flex items-center">
                        READ ARTICLE <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleOpenArticle(article)}
                    className={`group bg-surface border border-border p-6 rounded-2xl transition-all flex flex-col items-start space-y-4 shadow-lg hover:border-primary/50 cursor-pointer`}
                  >
                    <div className="w-14 h-14 bg-background rounded-xl border border-border flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-inner">
                      <article.icon className="text-primary" size={28} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block">{article.category}</span>
                        <ChevronRight size={14} className="text-primary/50 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-2">
                        {article.title}
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                        {article.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <button className="border border-border hover:border-primary text-text-muted hover:text-primary px-8 py-3 rounded-full transition-all font-bold uppercase text-sm tracking-widest opacity-50 cursor-not-allowed">
                  More Resources Coming Soon
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
