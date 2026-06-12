import React, { useState } from 'react';
import { ChevronDown, Mail, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: "How do you guarantee the authenticity of your antiques?",
      answer: "Every antique in our collection goes through a rigorous research and testing cycle conducted by art historians and certified appraisers. We verify original wood joinery, maker's hallmarks, metal compositions, and horological movements. Upon acquisition, you receive a certified Provenance Dossier detailing its historic timeline, along with a signed lifetime Certificate of Authenticity."
    },
    {
      question: "What is your shipping and global transport protocol?",
      answer: "Given the delicate nature of historical treasures, we never use standard mailing networks. We partner with white-glove art couriers worldwide. Each item is custom-crated in custom foam-lined wooden boxes built by our in-house preservationists. Shipments are fully insured for transit values and delivered directly to your door, accompanied by professional handlers if necessary."
    },
    {
      question: "Can I view items in person before acquiring them?",
      answer: "Absolutely. Private viewings can be scheduled at any of our three showrooms in London, Paris, or Milan. Additionally, for elite collectors and museum curators, we can arrange for private, fully insured viewings in your home or salon under the supervision of one of our senior curatorial experts."
    },
    {
      question: "What is your return policy for antique curations?",
      answer: "Acquiring an antique is a profound decision, and we want you to feel complete peace of mind. We offer a 14-day return window from the date of delivery. If you decide the piece is not perfectly suited to your space, we will arrange for our specialized white-glove art couriers to collect it. The item must be returned in the identical condition in which it was delivered."
    },
    {
      question: "Are your clocks and marine chronometers in working order?",
      answer: "Yes. All mechanical horology items are fully overhauled by our Master Horologists. We clean, lubricate, and replace worn bushings using period-correct materials and traditional manual methods. Every clock is tested in our showroom chambers for a minimum of 30 days to guarantee precision and anchor escapement reliability before delivery."
    },
    {
      question: "Can we sell our private family heirlooms to Antique Heritage?",
      answer: "We are always interested in acquiring rare antiques of exceptional provenance. If you possess furniture, silverware, estate jewelry, or fine horology from the 16th to 19th centuries, you can contact our acquisitions desk via the Contact form or send high-res photos to acquisitions@antiqueheritage.com. We can also provide private catalog appraisals."
    }
  ];

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24 text-[#120B06]">
      {/* Page Header */}
      <section className="relative py-20 px-6 bg-[#120B06] text-[#FAF7F2] text-center border-b border-[#D4AF37]/25">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] block mb-3 font-semibold">
            Information Desk
          </span>
          <h1 className="font-luxury-serif text-3xl md:text-5xl font-medium tracking-wide">
            Acquisitions & Support FAQ
          </h1>
          <p className="text-xs md:text-sm text-[#FAF7F2]/60 mt-3 tracking-widest uppercase">
            Everything you need to know about provenance, delivery, and restorations
          </p>
        </div>
      </section>

      {/* Main FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-6 mt-16 grid grid-cols-1 gap-6">
        {faqData.map((item, idx) => {
          const isOpen = expandedIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#F2EDE2] border border-[#120B06]/5 rounded-none overflow-hidden transition-all duration-300"
            >
              {/* Question Trigger */}
              <button
                onClick={() => handleToggle(idx)}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between focus:outline-none cursor-pointer"
              >
                <span className="font-luxury-serif text-base md:text-lg font-semibold text-[#120B06] pr-4 tracking-wide leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-500 ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {/* Collapsible Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-[#120B06]/5 pt-4 text-xs md:text-sm text-[#120B06]/75 leading-relaxed font-light font-sans">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Direct support options below */}
      <section className="max-w-4xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-[#120B06]/10 pt-16">
        <div className="flex flex-col items-center">
          <Phone className="w-6 h-6 text-[#D4AF37] mb-3" />
          <h4 className="font-luxury-serif text-sm font-semibold uppercase tracking-wider text-[#120B06] mb-1">Curation Helpline</h4>
          <p className="text-xs text-[#120B06]/65 leading-relaxed">+44 (0) 20 7946 0192</p>
        </div>
        <div className="flex flex-col items-center">
          <Mail className="w-6 h-6 text-[#D4AF37] mb-3" />
          <h4 className="font-luxury-serif text-sm font-semibold uppercase tracking-wider text-[#120B06] mb-1">Email Concierge</h4>
          <p className="text-xs text-[#120B06]/65 leading-relaxed">concierge@antiqueheritage.com</p>
        </div>
        <div className="flex flex-col items-center">
          <Calendar className="w-6 h-6 text-[#D4AF37] mb-3" />
          <h4 className="font-luxury-serif text-sm font-semibold uppercase tracking-wider text-[#120B06] mb-1">Private Consultations</h4>
          <p className="text-xs text-[#120B06]/65 leading-relaxed">Book viewing slot by form</p>
        </div>
      </section>
    </div>
  );
};
