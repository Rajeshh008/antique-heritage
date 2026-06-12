import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ThreeSixty } from '../components/ThreeSixty';
import { Newsletter } from '../components/Newsletter';
import { Award, ShieldCheck, Truck, ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { products, setActivePage, setSelectedProduct, inquireProduct } = useStore();

  // Get the Antique of the Month (featured ormolu-clock)
  const antiqueOfTheMonth = products.find(p => p.id === 'ormolu-clock') || products[0];

  // Get 3 curated featured items for display
  const featuredProducts = products.filter(p => p.id !== 'ormolu-clock').slice(0, 3);

  const testimonials = [
    {
      quote: "The 18th-century French Clock is the crown jewel of our drawing room. The authentication documents were pristine, and the delivery was handled with museum-grade precision.",
      author: "Lord Charles Sinclair",
      location: "Edinburgh, Scotland"
    },
    {
      quote: "Antique Heritage represents the absolute zenith of curation. Their attention to historical background and product provenance is outstanding. A truly premium consulting service.",
      author: "Helena Rostova",
      location: "Geneva, Switzerland"
    },
    {
      quote: "I acquired the Ming Dynasty vase from their private collection. Finding curators who truly understand the craftsmanship of the Wanli period is rare. Highly recommended.",
      author: "Dr. Kenji Sato",
      location: "Kyoto, Japan"
    }
  ];

  const handleExploreClick = () => {
    setActivePage('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquireFeatured = () => {
    inquireProduct(antiqueOfTheMonth);
  };

  const handleLearnStory = () => {
    setSelectedProduct(antiqueOfTheMonth);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-[#120B06] flex items-center justify-center overflow-hidden">
        {/* Parallax Hero Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        
        {/* Luxury Radial Shading */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#120B06_90%)]" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 text-[#FAF7F2]">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs md:text-sm uppercase tracking-[0.45em] text-[#D4AF37] block mb-6 font-semibold"
          >
            Curators of Exquisite Timeless Masterpieces
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-luxury-serif text-4xl md:text-7xl font-medium tracking-wide mb-8 leading-tight"
          >
            Preserving History\'s<br />
            <span className="italic text-[#D4AF37]">Finest Artistry</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-sm md:text-lg text-[#FAF7F2]/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide"
          >
            We acquire, authenticate, and restore rare 16th to 19th-century antiques. Each piece carries an centuries-old legacy, waiting for its next chapter in your collection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button
              onClick={handleExploreClick}
              className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#FAF7F2] text-[#120B06] border border-[#D4AF37] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-none shadow-xl transition-all duration-300 cursor-pointer"
            >
              Explore Collection
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="w-full sm:w-auto bg-transparent hover:bg-[#FAF7F2]/10 text-[#FAF7F2] border border-[#FAF7F2]/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-none transition-all duration-300 cursor-pointer"
            >
              Private Consultation
            </button>
          </motion.div>
        </div>

        {/* Scroll Down Visual Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#FAF7F2]/60 mb-2">Scroll Down</span>
          <div className="w-[1px] h-10 bg-[#D4AF37]/50 animate-bounce" />
        </div>
      </section>

      {/* Brand Excerpt Introduction */}
      <section className="py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-8" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-4">
            Legacy & Expertise
          </span>
          <h2 className="font-luxury-serif text-3xl md:text-5xl text-[#120B06] font-medium mb-8 leading-snug">
            Welcome to the Chambers of<br />Antique Heritage Collection
          </h2>
          <p className="text-base md:text-lg text-[#120B06]/75 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            For over forty years, our experts have traveled globally to source highly unique historical furniture, intricate horology, royal silverware, and fine estate jewelry. Located in the heart of London\'s Bond Street, our showrooms offer a sanctuary for museums and discerning collectors to acquire certified artifacts carrying exceptional provenance.
          </p>
          <button
            onClick={() => setActivePage('about')}
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold hover:text-[#120B06] transition-colors duration-300"
          >
            <span>Read Our Full Story</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Antique of the Month Section with 360° Studio */}
      <section className="bg-[#1E150F] text-[#FAF7F2] border-y border-[#D4AF37]/20 py-24 px-6 relative overflow-hidden">
        {/* Background shading */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.04)_0%,transparent_60%)]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Column 1: Draggable 360 Object Viewer */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <ThreeSixty
              imageUrl={antiqueOfTheMonth.images[0]}
              productName={antiqueOfTheMonth.name}
            />
          </div>

          {/* Column 2: The Story of the Antique */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3">
              Elite Showcase
            </span>
            <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-[#D4AF37]/30 mb-6">
              Antique of the Month
            </span>

            <h2 className="font-luxury-serif text-3xl md:text-5xl text-[#FAF7F2] font-semibold mb-6 tracking-wide leading-tight">
              {antiqueOfTheMonth.name}
            </h2>

            <p className="text-sm md:text-base text-[#FAF7F2]/80 leading-relaxed font-light mb-8 max-w-xl">
              {antiqueOfTheMonth.description}
            </p>

            {/* Historical story spotlight box */}
            <div className="border-l-2 border-[#D4AF37] pl-6 mb-8 py-2 max-w-xl">
              <h4 className="font-luxury-serif text-[#D4AF37] text-sm uppercase tracking-wider mb-2">Historical Background</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed italic font-light">
                "{antiqueOfTheMonth.story.substring(0, 180)}..."
              </p>
            </div>

            {/* Specifications snippet */}
            <div className="w-full max-w-xl grid grid-cols-2 gap-4 border-t border-[#FAF7F2]/10 pt-6 mb-8">
              <div>
                <span className="text-[10px] uppercase text-[#FAF7F2]/45 tracking-widest block">Period Era</span>
                <span className="text-sm font-semibold text-[#FAF7F2]">{antiqueOfTheMonth.year}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#FAF7F2]/45 tracking-widest block">Geographic Origin</span>
                <span className="text-sm font-semibold text-[#FAF7F2]">{antiqueOfTheMonth.origin}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={handleLearnStory}
                className="bg-[#D4AF37] hover:bg-[#FAF7F2] text-[#120B06] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] rounded-none transition-colors duration-300 cursor-pointer"
              >
                Read Historical Story
              </button>
              <button
                onClick={handleInquireFeatured}
                className="bg-transparent border border-[#FAF7F2]/30 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#FAF7F2] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] rounded-none transition-colors duration-300 cursor-pointer"
              >
                WhatsApp Instant Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Curations Grid */}
      <section className="py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
                Curators Choice
              </span>
              <h2 className="font-luxury-serif text-3xl md:text-5xl text-[#120B06] font-medium tracking-wide">
                Featured Masterpieces
              </h2>
            </div>
            <button
              onClick={handleExploreClick}
              className="group flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold mt-4 md:mt-0 hover:text-[#120B06] transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees / Why Choose Us */}
      <section className="py-20 px-6 bg-[#F2EDE2] border-t border-[#120B06]/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center p-6">
            <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 bg-[#FAF7F2] flex items-center justify-center mb-6">
              <Award className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h3 className="font-luxury-serif text-lg font-semibold uppercase tracking-wider text-[#120B06] mb-3">
              Certified Authenticity
            </h3>
            <p className="text-xs md:text-sm text-[#120B06]/70 leading-relaxed font-light max-w-xs">
              Every masterpiece includes a detailed historical dossier, complete provenance details, and a signed Certificate of Authenticity.
            </p>
          </div>

          <div className="flex flex-col items-center p-6">
            <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 bg-[#FAF7F2] flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h3 className="font-luxury-serif text-lg font-semibold uppercase tracking-wider text-[#120B06] mb-3">
              Master Restorations
            </h3>
            <p className="text-xs md:text-sm text-[#120B06]/70 leading-relaxed font-light max-w-xs">
              Our in-house preservationists perform delicate restoration work using period-accurate traditional tools and techniques.
            </p>
          </div>

          <div className="flex flex-col items-center p-6">
            <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 bg-[#FAF7F2] flex items-center justify-center mb-6">
              <Truck className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h3 className="font-luxury-serif text-lg font-semibold uppercase tracking-wider text-[#120B06] mb-3">
              White-Glove Courier
            </h3>
            <p className="text-xs md:text-sm text-[#120B06]/70 leading-relaxed font-light max-w-xs">
              Worldwide door-to-door delivery executed by specialized art couriers, fully insured with specialized custom packing.
            </p>
          </div>
        </div>
      </section>

      {/* Collector Testimonials */}
      <section className="bg-[#120B06] text-[#FAF7F2] py-24 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <MessageSquare className="w-10 h-10 text-[#D4AF37] mx-auto mb-8 opacity-75" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-4">
            Elite Patrons
          </span>
          <h2 className="font-luxury-serif text-3xl md:text-4xl text-[#FAF7F2] font-medium tracking-wide mb-16">
            Acquisitions of Distinction
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-[#1E150F] border border-[#D4AF37]/15 p-8 text-left flex flex-col justify-between"
              >
                <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-light italic mb-8">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-luxury-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase mb-1">
                    {t.author}
                  </h4>
                  <p className="text-[10px] text-[#FAF7F2]/45 tracking-widest uppercase">
                    {t.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Registry Newsletter Invitation */}
      <Newsletter />
    </div>
  );
};
