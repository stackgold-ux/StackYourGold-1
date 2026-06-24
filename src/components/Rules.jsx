import React from 'react';
import { X, ShieldCheck, Zap, Gavel, Award, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Rules = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/95 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-surface border border-primary/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-border flex items-center justify-between bg-background/50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Gavel size={24} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight">Campaign Rules & Transparency</h2>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Official Guidelines for the "Road to 99" & Grand Giveaway</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-muted hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 md:p-10 space-y-12 gritty-bg">
            
            {/* Overview Section */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2 text-primary mb-2">
                <Zap size={18} className="fill-current" />
                <h3 className="font-black uppercase tracking-widest text-sm">Campaign Overview</h3>
              </div>
              <p className="text-text-muted leading-relaxed">
                The <span className="text-white font-bold italic">"Road to 99"</span> Launch Campaign and <span className="text-white font-bold italic">9/9/26 Grand Giveaway Challenge</span> are designed to celebrate the launch of Stack Your Gold™ and empower our first 99 subscribers with extra physical wealth.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Eligibility */}
              <section className="bg-background/40 p-6 rounded-2xl border border-border">
                <h4 className="font-black uppercase tracking-widest text-[10px] text-primary mb-4 flex items-center">
                  <ShieldCheck size={14} className="mr-2" /> 1. Eligibility
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Open to legal residents of the United States, 18+ years of age. Void where prohibited by law. Employees and immediate family members of Stack Your Gold™ are not eligible.
                </p>
              </section>

              {/* Period */}
              <section className="bg-background/40 p-6 rounded-2xl border border-border">
                <h4 className="font-black uppercase tracking-widest text-[10px] text-primary mb-4 flex items-center">
                  <Globe size={14} className="mr-2" /> 2. Campaign Period
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase italic">Surprise Stack Promo:</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Runs until the 99th active subscriber is verified.</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase italic">9/9/26 Grand Giveaway:</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Entries close Sept 1, 2026. Drawing on Sept 9, 2026.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* How to Enter */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2 text-primary mb-2">
                <Award size={18} />
                <h3 className="font-black uppercase tracking-widest text-sm">3. How to Enter the Grand Giveaway</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-black italic text-primary">A</div>
                    <p className="text-xs font-bold uppercase tracking-wider">Automatic Entry via Purchase</p>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed pl-9">
                    Receive one (1) automatic entry for every $1.00 USD spent on physical merchandise or active subscription payments during the window.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-black italic text-primary">B</div>
                    <p className="text-xs font-bold uppercase tracking-wider">Mail-in Entry (No Purchase Necessary)</p>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed pl-9">
                    To enter without purchase, send a hand-printed postcard to: <br />
                    <span className="text-white italic">Stack Your Gold, Attn: Road to 99 Giveaway, 100 Sovereign Way, Suite 300, Miami, FL 33101</span>. <br />
                    Includes 100 automatic entries. Limit 1 per person.
                  </p>
                </div>
              </div>
            </section>

            {/* Surprise Stack Process */}
            <section className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
              <h3 className="font-black uppercase tracking-widest text-sm text-primary mb-4 italic">4. The "Surprise Stack" Selection Process</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Every new, active subscriber sequence is logged in our Turso SQL transaction database in real-time. Whenever the subscriber counter hits a multiple of nine (e.g., #9, #18, #27, #36, #45, #54, #63, #72, #81, #90, and #99), a special digital prize badge is triggered in our fulfillment system. The fulfillment team, overseen by our CEO, will manually place a customized physical "Surprise Stack" item inside that shipment before it is double-boxed, insured, and dispatched.
              </p>
            </section>

            {/* Viral Multipliers */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2 text-accent mb-2">
                <Zap size={18} className="fill-current" />
                <h3 className="font-black uppercase tracking-widest text-sm">5. Viral Unboxing Multipliers</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Participants can multiply their active entries by sharing a raw, authentic unboxing video of their Stack Your Gold™ delivery:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface border border-border p-5 rounded-2xl">
                  <div className="text-2xl font-black text-white italic mb-1">2X ENTRIES</div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Share & Tag us on ONE platform.</p>
                </div>
                <div className="bg-surface border border-border p-5 rounded-2xl border-accent/30 shadow-lg shadow-accent/5">
                  <div className="text-2xl font-black text-accent italic mb-1">3X ENTRIES</div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Share & Tag us on THREE or more platforms.</p>
                </div>
              </div>
              <p className="text-[10px] text-text-muted italic border-l-2 border-border pl-4">
                * To claim the multiplier, participants must email verification@stackyourgold.com with a link or screenshot and their order number.
              </p>
            </section>

            {/* Logistics */}
            <section className="space-y-4 border-t border-border pt-12">
              <h3 className="font-black uppercase tracking-widest text-sm text-white">6. Drawing & Logistics</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                The Grand Giveaway drawing will be conducted on September 9, 2026. The winner will be notified via email and phone within 24 hours. All prizes consist of real, physical gold, silver, or brand merchandise and are fully insured for transit at no cost to the winner.
              </p>
            </section>

            <div className="text-center py-12 border-t border-border">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-1 border-t border-primary/30"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Stack Your Gold™</p>
                <div className="w-10 h-1 border-t border-primary/30"></div>
              </div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">
                Your Future. Your Stack. Your Legacy.™
              </p>
            </div>
          </div>
          
          {/* Footer CTA */}
          <div className="p-6 border-t border-border bg-background/50 flex justify-center">
            <button 
              onClick={onClose}
              className="bg-primary text-background px-12 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              Acknowledged
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Rules;
