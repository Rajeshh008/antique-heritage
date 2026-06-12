import React, { useState } from 'react';
import { Eye, X, ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  category: 'Showroom' | 'Restoration' | 'Events';
  url: string;
  title: string;
  description: string;
}

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Showroom', 'Restoration', 'Events'];

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      category: 'Showroom',
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      title: 'Flagship Showroom Chambers',
      description: 'A grand view of our main showrooms showcasing 18th-century French marquetry and standing grandfather clocks on Bond Street, London.'
    },
    {
      id: 'gal-2',
      category: 'Restoration',
      url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
      title: 'Mercury Fire-Gilding Revival',
      description: 'Our master restorer delicately cleaning the gilded bronze contours of a late Louis XV cartouche clock dial.'
    },
    {
      id: 'gal-3',
      category: 'Events',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      title: 'Autumn Collector Preview Gala',
      description: 'A private evening welcoming museum directors and elite acquisitions representatives to inspect new estate acquisitions in Mayfair.'
    },
    {
      id: 'gal-4',
      category: 'Showroom',
      url: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
      title: 'Ming Porcelain Staging',
      description: 'Fine blue and white porcelain collections from the Wanli period presented under cool museum-grade cold fiber-optic lighting.'
    },
    {
      id: 'gal-5',
      category: 'Restoration',
      url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      title: '17th Century Cabinet Pinning',
      description: 'Carefully carving and inserting aged walnut pegs to reinforce joints during a comprehensive structural restoration of a baroque credenza.'
    },
    {
      id: 'gal-6',
      category: 'Events',
      url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
      title: 'Le Marais Salon Opening',
      description: 'Founders Evelyn & Arthur Sinclair hosting an intimate reception celebrating the opening of our Parisian private consultation chambers.'
    }
  ];

  // Filter gallery items reactively
  const filteredItems = galleryItems.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const handleOpenLightbox = (itemId: string) => {
    // Find index of clicked item within the CURRENT filtered set
    const idx = filteredItems.findIndex((item) => item.id === itemId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24 text-[#120B06]">
      {/* Page Header */}
      <section className="relative py-20 px-6 bg-[#120B06] text-[#FAF7F2] text-center border-b border-[#D4AF37]/25">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] block mb-3 font-semibold">
            Visual Archive
          </span>
          <h1 className="font-luxury-serif text-3xl md:text-5xl font-medium tracking-wide">
            Curation Gallery & Chambers
          </h1>
          <p className="text-xs md:text-sm text-[#FAF7F2]/60 mt-3 tracking-widest uppercase">
            A Peek into Showrooms, Delicate Restorations, and Private Events
          </p>
        </div>
      </section>

      {/* Category Navigation Pills */}
      <div className="max-w-7xl mx-auto px-6 mt-12 flex justify-center flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 rounded-none cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#120B06] text-[#FAF7F2] border border-[#120B06]'
                : 'bg-transparent text-[#120B06]/70 border border-[#120B06]/15 hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* Grid Showcase */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleOpenLightbox(item.id)}
                className="group relative aspect-[4/3] overflow-hidden bg-[#120B06] cursor-pointer border border-[#120B06]/5 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Visual Glass Overlay */}
                <div className="absolute inset-0 bg-[#120B06]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6" />

                {/* Floating zoom indicator */}
                <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#120B06]/85 border border-[#D4AF37]/35 flex items-center justify-center text-[#FAF7F2] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4 text-[#D4AF37]" />
                </div>

                {/* Captions shown on hover */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-luxury-serif text-base text-[#FAF7F2] font-semibold tracking-wide">
                    {item.title}
                  </h3>
                </div>

                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-100 group-hover:brightness-75 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Curation Standards Disclaimer */}
      <section className="max-w-4xl mx-auto mt-24 px-6 text-center">
        <Award className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-75" />
        <h3 className="font-luxury-serif text-xl tracking-wide uppercase mb-3 text-[#120B06]">Preservation Protocols</h3>
        <p className="text-xs md:text-sm text-[#120B06]/65 leading-relaxed font-light uppercase tracking-wider max-w-xl mx-auto">
          All cleaning, horological adjustments, and transport packing displayed are carried out strictly in accordance with international historic material curation standards.
        </p>
      </section>

      {/* Lightbox Slider Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#120B06]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none"
            onClick={handleCloseLightbox}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 z-55 bg-[#FAF7F2]/5 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/25 text-[#FAF7F2] p-2.5 rounded-full cursor-pointer transition-colors"
              title="Close Gallery"
            >
              <X className="w-6 h-6 text-[#D4AF37]" />
            </button>

            {/* Slider Controls - Left */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-6 z-55 bg-[#FAF7F2]/5 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/25 text-[#FAF7F2] p-3.5 rounded-full cursor-pointer transition-colors"
              title="Previous Image"
            >
              <ArrowLeft className="w-5 h-5 text-[#D4AF37]" />
            </button>

            {/* Main Stage */}
            <div
              className="max-w-5xl max-h-[75vh] relative flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[lightboxIndex].url}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[65vh] object-contain border border-[#D4AF37]/20 shadow-2xl"
              />
              
              {/* Caption Suite */}
              <div className="text-center mt-6 max-w-2xl px-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
                  {filteredItems[lightboxIndex].category} Archive
                </span>
                <h2 className="font-luxury-serif text-xl md:text-2xl text-[#FAF7F2] font-semibold tracking-wide mb-2">
                  {filteredItems[lightboxIndex].title}
                </h2>
                <p className="text-xs md:text-sm text-[#FAF7F2]/75 leading-relaxed font-light">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </div>

            {/* Slider Controls - Right */}
            <button
              onClick={handleNextLightbox}
              className="absolute right-6 z-55 bg-[#FAF7F2]/5 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/25 text-[#FAF7F2] p-3.5 rounded-full cursor-pointer transition-colors"
              title="Next Image"
            >
              <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
