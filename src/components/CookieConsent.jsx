import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { initGA, initMetaPixel } from '../utils/tracking';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('syg_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      initGA();
      initMetaPixel();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('syg_cookie_consent', 'accepted');
    initGA();
    initMetaPixel();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('syg_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto bg-surface/95 backdrop-blur-md border border-primary/30 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-widest text-white mb-1 italic leading-tight">
                    Privacy Protection <span className="text-primary">.999 Fine</span>
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
                    We value your legacy and your privacy. We use essential cookies and tracking scripts to optimize your experience and protect your digital assets. By accepting, you consent to our use of GA4 and Meta Pixel for performance and security insights.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                <button
                  onClick={handleDecline}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="w-full sm:w-auto bg-primary text-background px-8 py-3 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                >
                  Secure & Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
