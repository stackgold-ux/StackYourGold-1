import { Shield, Target, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-surface/5 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8 leading-none">
              Built By Families, <br />
              <span className="text-primary">For Families</span>
            </h2>
            
            <div className="space-y-6 text-text-muted text-lg leading-relaxed">
              <h4 className="text-xl font-black uppercase italic tracking-widest text-white">About Stack Your Gold™</h4>
              <p>
                Stack Your Gold™ and our sister initiative, Stack Your Silver™, are more than just business names—they are a passion born from necessity. Our ownership team is made up of two families coming together to educate and build a better future.
              </p>
              <p>
                We’ve spent a lot of time thinking about the lessons we want to pass on to the next generation, including our own combined 10 children. Financial education often comes too late. Many of us weren’t taught how to build wealth, preserve purchasing power, or think long-term about our financial future.
              </p>
              <p>
                Whether you select gold coins or opt to build Your Stack™ via our flexible monthly subscription program, our mission is to make real physical bullion ownership accessible to everyone. Through our proprietary Micro Metal™ stacking program, we utilize fractional grain weights to fill order gaps that standard dealers leave completely empty, making the most of every dollar you invest.
              </p>
              <p className="font-bold text-white italic">
                Wealth isn’t built overnight. It’s built overtime, consistently.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full"></div>
            <div className="relative bg-surface border border-border p-10 rounded-3xl backdrop-blur shadow-2xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-primary/20 rounded-xl text-primary">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">Our Mission</h3>
              </div>
              
              <p className="text-text-muted mb-8 leading-relaxed italic">
                "To empower individuals and families to build generational wealth through accessible precious metals ownership, financial education, and consistent investing habits."
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Shield, title: "Long-term Preservation", desc: "We teach the wealth-building principles many wish they had learned earlier." },
                  { icon: Users, title: "Accessible Ownership", desc: "Access to metals through micro-stacking and flexible subscription tiers." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4 border-t border-border/50 pt-6">
                    <item.icon className="text-primary shrink-0" size={24} />
                    <div>
                      <h5 className="font-black uppercase text-sm tracking-widest text-white mb-1">{item.title}</h5>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-border flex justify-center">
                <span className="text-lg font-black uppercase tracking-[0.3em] text-primary italic animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">
                  Your Future. Your Stack. Your Legacy.™
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
