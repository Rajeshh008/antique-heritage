import React from 'react';
import { BookOpen, UserCheck, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const timelineEvents = [
    {
      year: "1982",
      title: "Chambers Foundation",
      description: "Founded by Arthur & Evelyn Sinclair as a small boutique clock-restoration shop in Camden Town, London."
    },
    {
      year: "1995",
      title: "Bond Street Relocation",
      description: "Expanded our catalog into French Baroque and Victorian furniture, relocating to our flagship chambers in Mayfair, London."
    },
    {
      year: "2008",
      title: "Paris & Milan Salons",
      description: "Established private evaluation salons in Paris (Le Marais) and Milan (Brera) to service Continental European collections."
    },
    {
      year: "2018",
      title: "Historical Dossier Initiative",
      description: "Launched the world's first complete 'Provenance Dossier' framework, setting a global standard in verification trust."
    },
    {
      year: "Present",
      title: "Global Curation Leader",
      description: "Leading curators for over 40 museums and 500 private estates worldwide, maintaining carbon-neutral white-glove couriers."
    }
  ];

  const values = [
    {
      icon: BookOpen,
      title: "Historical Providence",
      text: "We believe antiques are not merely ornaments, but physical chapters of history. Our priority is documenting and safeguarding the exact story of each piece."
    },
    {
      icon: Landmark,
      title: "Museum Standards",
      text: "Our cleaning, wood seasoning, horology servicing, and packing protocols strictly adhere to international museum preservation guidelines."
    },
    {
      icon: UserCheck,
      title: "Unwavering Trust",
      text: "Every item we sell is backed by our lifetime authenticity guarantee. We work strictly with certified specialists to verify marks and materials."
    }
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#120B06]">
      {/* Page Header */}
      <section className="relative py-28 px-6 bg-[#120B06] text-[#FAF7F2] text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] block mb-4 font-semibold">
            About Our House
          </span>
          <h1 className="font-luxury-serif text-4xl md:text-6xl font-medium tracking-wide mb-6">
            Our Legacy & Philosophy
          </h1>
          <p className="text-sm md:text-base text-[#FAF7F2]/75 max-w-xl mx-auto font-light tracking-wide leading-relaxed">
            Discover the dedication, historical research, and craftsmanship that makes Antique Heritage Collection a trusted global name.
          </p>
        </div>
      </section>

      {/* Intro & Founder Segment */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Visual Frame */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-4 border border-[#D4AF37]/45 z-10 pointer-events-none transform -translate-x-2 translate-y-2"></div>
          <img
            src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80"
            alt="Showroom Restorations"
            className="w-full h-[450px] object-cover filter brightness-95 shadow-xl relative z-0"
          />
        </div>

        {/* Narrative */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3">
            Since 1982
          </span>
          <h2 className="font-luxury-serif text-3xl md:text-5xl text-[#120B06] font-medium mb-6 leading-snug">
            Curators Driven By Historical Passion
          </h2>
          <p className="text-sm md:text-base text-[#120B06]/75 leading-relaxed font-light mb-6">
            Antique Heritage Collection was founded on a simple realization: that modern luxury has lost its connection to history. What began as a passionate quest by Evelyn and Arthur Sinclair to salvage Victorian mechanical timepieces has grown into a world-renowned antiquarian house.
          </p>
          <p className="text-sm md:text-base text-[#120B06]/75 leading-relaxed font-light mb-8">
            Today, our team of horologists, fine art historians, and cabinetmakers work together across three European salons. We inspect thousands of objects annually, curating only those of impeccable design, high materials standards, and documented integrity. When you acquire a piece from us, you acquire certified provenance and a lifetime guarantee of authenticity.
          </p>

          <div className="border-t border-[#120B06]/10 pt-6 w-full flex items-center space-x-6">
            <div>
              <h4 className="font-luxury-serif text-base text-[#120B06] font-semibold">Arthur Sinclair</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest mt-1">Founder & Master Horologist</p>
            </div>
            <div className="h-8 w-[1px] bg-[#120B06]/10" />
            <div>
              <h4 className="font-luxury-serif text-base text-[#120B06] font-semibold">Evelyn Sinclair</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest mt-1">Founder & Fine Arts Historian</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-6 bg-[#F2EDE2] border-y border-[#120B06]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
              Curation Standard
            </span>
            <h2 className="font-luxury-serif text-3xl md:text-4xl text-[#120B06] font-medium tracking-wide">
              The Pillars of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="bg-[#FAF7F2] p-8 border border-[#120B06]/5 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6 bg-[#FAF7F2]">
                  <v.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-luxury-serif text-lg font-semibold uppercase tracking-wider text-[#120B06] mb-4">
                  {v.title}
                </h3>
                <p className="text-xs md:text-sm text-[#120B06]/70 leading-relaxed font-light">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Timeline Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
            Chronology
          </span>
          <h2 className="font-luxury-serif text-3xl md:text-4xl text-[#120B06] font-medium tracking-wide">
            Our Historic Path
          </h2>
        </div>

        <div className="relative border-l border-[#D4AF37]/35 pl-8 space-y-12 ml-4 md:ml-12">
          {timelineEvents.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Bullet */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border border-[#D4AF37] bg-[#FAF7F2] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></div>
              </div>

              {/* Event Content */}
              <span className="text-sm font-semibold tracking-wider font-mono text-[#D4AF37] block mb-1">
                {event.year}
              </span>
              <h3 className="font-luxury-serif text-xl text-[#120B06] font-semibold mb-2">
                {event.title}
              </h3>
              <p className="text-xs md:text-sm text-[#120B06]/75 font-light leading-relaxed max-w-2xl">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
