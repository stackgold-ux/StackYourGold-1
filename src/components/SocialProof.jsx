import React from 'react';
import { Twitter, Instagram, Youtube, Linkedin, Facebook, MessageCircle, Quote, Users, BookOpen, Gift, Trophy } from 'lucide-react';

const SocialProof = () => {
  const stats = [
    { number: '2', label: 'Active Stack Squad™ Members', icon: <Users size={24} />, color: 'text-accent' },
    { number: '14', label: 'Free Educational Articles', icon: <BookOpen size={24} />, color: 'text-primary' },
    { number: '🎁', label: 'Surprise Stacks Given Away', icon: <Gift size={24} />, color: 'text-accent' },
    { number: '🏆', label: '9/9/26 Grand Giveaway', icon: <Trophy size={24} />, color: 'text-primary' },
  ];

  const testimonials = [
    {
      handle: '@sound_money_mike',
      role: 'Stack Squad Member',
      icon: '📚',
      text: '"Your Stack School is the single best free resource for understanding why physical gold matters. Start with \'Fiat vs. Hard Money\' — it changed how I see my savings."'
    },
    {
      handle: '@family_stack',
      role: 'First-Time Stacker',
      icon: '🪙',
      text: '"Just received my first Stack Squad delivery. Holding that silver bar in my hand is completely different from seeing numbers on a screen. This is tangible. This is real."'
    },
    {
      handle: '@legacy_builder',
      role: 'Legacy Engraving Client',
      icon: '🏛️',
      text: '"Had a silver bar engraved with my daughter\'s birth year for her 1st birthday. She\'ll hold this when she\'s 30 and know exactly what her father stood for."'
    }
  ];

  const socialLinks = [
    { name: 'X', url: 'https://x.com/stackyourgold', icon: <Twitter size={20} /> },
    { name: 'IG', url: 'https://instagram.com/stackyourgold', icon: <Instagram size={20} /> },
    { name: 'YT', url: 'https://YouTube.com/stackyourgold', icon: <Youtube size={20} /> },
    { name: 'TT', url: 'https://tiktok.com/stackyourgold', icon: <Zap size={20} /> },
    { name: 'LI', url: 'https://linkedin.com/company/stackyourgold', icon: <Linkedin size={20} /> },
    { name: 'FB', url: 'https://facebook.com/stackyourgold', icon: <Facebook size={20} /> },
  ];

  return (
    <section className="py-24 bg-surface/30 px-4 border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4 block">🔥 JOIN THE MOVEMENT</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none mb-6">
            Real People. <span className="text-accent">Real Metal.</span> Real Results.
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            Families across the country are choosing physical wealth over fragile paper. 
            Follow our journey and start yours.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="bg-background border border-border rounded-2xl p-6 text-center hover:border-accent/30 transition-all group shadow-lg">
              <div className="mb-4 flex justify-center text-primary group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className={`text-3xl md:text-4xl font-black uppercase tracking-tighter italic ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Social Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background border border-border rounded-2xl p-8 hover:border-accent/20 transition-all shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg shadow-inner">
                    {t.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.handle}</div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{t.role}</div>
                  </div>
                </div>
                <p className="text-text-muted leading-relaxed italic relative">
                  <span className="absolute -top-4 -left-2 text-4xl text-primary/20 opacity-50">"</span>
                  {t.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Follow / CTA Strip */}
        <div className="bg-accent/5 border border-accent/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 blur-3xl -ml-16 -mb-16"></div>
          
          <p className="text-xl md:text-2xl font-black uppercase tracking-tighter italic mb-8 relative z-10">
            Follow <span className="text-accent">@StackYourGold</span> Across All Platforms
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8 relative z-10">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center hover:border-accent hover:text-accent transition-all hover:scale-110 shadow-lg group"
              >
                <span className="group-hover:animate-pulse">{social.icon}</span>
              </a>
            ))}
          </div>
          
          <p className="text-text-muted text-sm font-bold uppercase tracking-widest relative z-10">
            Daily inflation education · Stacking tips · Giveaway announcements · Community stories
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
