import React from 'react';
import { Quote, ChevronRight, User } from 'lucide-react';

const StackingStories = () => {
  const stories = [
    {
      title: "The Silver Bar That Will Outlive Us All",
      characters: "Robert (68, retired teacher), his newborn grandson Leo",
      text: "Robert held his grandson Leo for the first time in the hospital room. He didn't have millions, but he had a sense that paper dollars weren't going to hold value. He joined the Stack Squad™ Silver Tier. Every month, a piece of silver arrives. On Leo's 18th birthday, he'll hand him a box of 216 ounces of pure silver.",
      lesson: "You don't need to be rich to leave a legacy. You just need to start.",
      category: "Legacy"
    },
    {
      title: "What If We Skipped Dinner?",
      characters: "Marcus and Aisha (early 30s, Denver)",
      text: "Marcus and Aisha realized they spent $3,600 on restaurants in a year—the cost of 144 ounces of silver. They traded one dinner out per month for the Stack Squad™ Platinum Tier. Holding physical metal changed how they saw wealth. They still go out, but their meals taste better knowing what they're building.",
      lesson: "Small recurring trades compound into generational wealth faster than you think.",
      category: "Budgeting"
    },
    {
      title: "$24.99 a Month Changed Everything",
      characters: "Danielle (34, single mom), her sons Elijah and Mateo",
      text: "Danielle canceled a barely-watched streaming service to join Stack Squad™ Silver. She wanted her boys to understand that money you can print infinitely isn't wealth. Now, her sons check spot prices and know what real money feels like. She's building a foundation no bank can take away.",
      lesson: "Redirect what you're already spending into something that holds its value.",
      category: "Family"
    },
    {
      title: "From Tesla Stock to Silver Bars",
      characters: "James (41, software engineer), his wife Priya",
      text: "When James's tech portfolio dropped 60%, he realized his wealth was 'rented' on a server. He moved 5% of his savings into Stack Squad™ Gold and Platinum. Now, he doesn't panic during market crashes; he smiles because his monthly DCA buys more metal at a lower price.",
      lesson: "Diversification isn't just about different stocks—it's about different kinds of assets.",
      category: "Investing"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-3 mb-12">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">REAL STORIES FROM THE SQUAD</span>
          <div className="h-px flex-1 bg-border"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="bg-surface border border-border p-10 rounded-3xl relative hover:border-primary/30 transition-all group">
              <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-bl-2xl border-l border-b border-primary/10">
                {story.category}
              </div>
              
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 bg-background border border-border rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-primary shadow-inner">
                  <Quote size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-tight mb-2 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center">
                    <User size={12} className="mr-2" /> {story.characters}
                  </p>
                </div>
              </div>
              
              <p className="text-text-muted leading-relaxed mb-8 italic border-l-2 border-primary/20 pl-6">
                "{story.text}"
              </p>
              
              <div className="bg-background/50 p-6 rounded-2xl border border-border">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">The Lesson:</p>
                <p className="text-sm font-bold text-white italic">{story.lesson}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-text-muted text-sm italic mb-8">Want to share your stacking journey? Email us at contact@stackyoursilver.com</p>
          <button className="bg-primary text-background px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all">
            Join the Squad & Start Your Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default StackingStories;
