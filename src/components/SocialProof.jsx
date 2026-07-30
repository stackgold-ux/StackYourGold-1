import React from 'react';
import { Share2, Users, BookOpen, Gift, Trophy, MessageCircle, Play, Music, Camera, Zap, Info } from 'lucide-react';

const SocialProof = () => {
  const stats = [
    { number: '2', label: 'Active Stack Squad™ Members', icon: <Users className="text-primary" size={24} /> },
    { number: '14', label: 'Free Educational Articles', icon: <BookOpen className="text-primary" size={24} /> },
    { number: '🎁', label: 'Surprise Stacks Given Away', icon: <Gift className="text-primary" size={24} /> },
    { number: '🏆', label: '9/9/26 Grand Giveaway', icon: <Trophy className="text-primary" size={24} /> },
  ];

  const testimonials = [
    {
      user: '@sound_money_mike',
      role: 'Stack Squad Member',
      icon: '📚',
      text: '"Your Stack School is the single best free resource for understanding why physical gold matters. Start with \'Fiat vs. Hard Money\' — it changed how I see my savings."'
    },
    {
      user: '@family_stack',
      role: 'First-Time Stacker',
      icon: '🪙',
      text: '"Just received my first Stack Squad delivery. Holding that silver bar in my hand is completely different from seeing numbers on a screen. This is tangible. This is real."'
    },
    {
      user: '@legacy_builder',
      role: 'Legacy Engraving Client',
      icon: '🏛️',
      text: '"Had a silver bar engraved with my daughter\'s birth year for her 1st birthday. She\'ll hold this when she\'s 30 and know exactly what her father stood for."'
    }
  ];

  const socialLinks = [
    { name: 'X', icon: <Zap size={18} />, href: 'https://x.com/stackyourgold' },
    { name: 'IG', icon: <Camera size={18} />, href: 'https://instagram.com/stackyourgold' },
    { name: 'YT', icon: <Play size={18} />, href: 'https://youtube.com/@stackyourgold' },
    { name: 'TT', icon: <Music size={18} />, href: 'https://tiktok.com/@stackyourgold' },
    { name: 'FB', icon: <Share2 size={18} />, href: 'https://facebook.com/stackyourgold' },
  ];

  return (
    <section id="social-proof" className="py-24 bg-surface/30 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
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
            <div key={i} className="bg-background border border-border rounded-2xl p-6 text-center hover:border-accent/30 transition-all group">
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-accent">{stat.number}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-background border border-border rounded-2xl p-8 hover:border-accent/20 transition-all flex flex-col h-full shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg shadow-inner">
                  {testimonial.icon}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{testimonial.user}</div>
                  <div className="text-[10px] text-text-muted uppercase tracking-widest font-black">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-text-muted leading-relaxed italic grow">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>

        {/* Follow / CTA Strip */}
        <div className="bg-accent/5 border border-accent/10 rounded-3xl p-10 text-center backdrop-blur-sm">
          <p className="text-xl font-black uppercase tracking-tighter italic mb-8">
            Follow <span className="text-accent">@StackYourGold</span> Across All Platforms
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-background border border-border rounded-full flex items-center justify-center hover:border-accent hover:text-accent transition-all hover:scale-110 text-xs font-black uppercase tracking-wider shadow-lg"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-text-muted text-xs font-bold uppercase tracking-widest max-w-xl mx-auto leading-loose">
            Daily inflation education <span className="text-accent mx-2">•</span> Stacking tips <span className="text-accent mx-2">•</span> Giveaway announcements <span className="text-accent mx-2">•</span> Community stories
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
