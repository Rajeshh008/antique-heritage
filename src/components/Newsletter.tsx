import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate premium mailing list subscription
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="bg-[#120B06] border-y border-[#D4AF37]/20 py-20 px-6 relative overflow-hidden">
      {/* Background visual texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_80%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] block mb-3 font-semibold">
            Private Registry
          </span>
          <h2 className="font-luxury-serif text-3xl md:text-5xl text-[#FAF7F2] font-semibold tracking-wide mb-4">
            Join the Heritage Guild
          </h2>
          <p className="text-sm md:text-base text-[#FAF7F2]/75 max-w-2xl mx-auto font-light leading-relaxed">
            Subscribe to receive private viewing invitations, catalogs of newly acquired historical masterpieces, and exclusive reports on antique restoration insights.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!subscribed ? (
            <motion.form
              key="subscription-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch justify-center max-w-lg mx-auto space-y-3 sm:space-y-0 sm:space-x-2"
            >
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4.5 w-4.5 text-[#D4AF37]" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[#1E150F] text-[#FAF7F2] border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none pl-11 pr-4 py-3.5 text-sm uppercase tracking-widest placeholder-[#FAF7F2]/30 rounded-none transition-colors duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#D4AF37] hover:bg-[#FAF7F2] text-[#120B06] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] rounded-none transition-colors duration-300 flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Request Invitation'}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="subscription-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto bg-[#1E150F] border border-[#D4AF37]/40 p-6 flex flex-col items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mb-4 animate-bounce" />
              <h3 className="font-luxury-serif text-lg text-[#FAF7F2] uppercase tracking-wider mb-2">
                Invitation Registered
              </h3>
              <p className="text-xs text-[#FAF7F2]/75 text-center leading-relaxed font-light uppercase tracking-wider">
                We have registered your invitation to the Heritage Guild. The upcoming catalog preview has been sent to your inbox.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[10px] text-[#FAF7F2]/30 mt-6 tracking-widest uppercase">
          We honor your privacy • Unsubscribe at any time
        </p>
      </div>
    </section>
  );
};
