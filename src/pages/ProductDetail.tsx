import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { Product } from '../context/StoreContext';
import { Calendar, Globe, ArrowLeft, Mail, ChevronRight, Award, History, ClipboardList } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { selectedProduct, setSelectedProduct, products, inquireProduct, setActivePage } = useStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fallback if no product selected
  if (!selectedProduct) {
    return (
      <div className="py-24 text-center bg-[#FAF7F2] text-[#120B06]">
        <h2 className="font-luxury-serif text-2xl mb-4">No Antique Selected</h2>
        <button
          onClick={() => {
            setActivePage('collections');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-[#120B06] text-[#FAF7F2] border border-[#D4AF37] px-6 py-3 text-xs uppercase tracking-widest"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  // If no related products in the same category, get any products
  const finalRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : products.filter((p) => p.id !== selectedProduct.id).slice(0, 3);

  const handleBackClick = () => {
    setActivePage('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF7F2] text-[#120B06] pb-24">
      {/* Breadcrumb / Back button */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between border-b border-[#120B06]/5">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37] hover:text-[#120B06] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
        <div className="flex items-center space-x-2 text-[10px] text-[#120B06]/55 uppercase tracking-widest font-medium">
          <span>Showroom</span>
          <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
          <span>{selectedProduct.category}</span>
          <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
          <span className="text-[#120B06] font-semibold">{selectedProduct.name}</span>
        </div>
      </div>

      {/* Main Core Showcase */}
      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Grid: High Fidelity Image Gallery */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Main Visual Window */}
          <div className="bg-[#FAF8F5] border border-[#120B06]/5 aspect-[4/3] flex items-center justify-center overflow-hidden relative shadow-sm group">
            <img
              src={selectedProduct.images[activeImageIndex]}
              alt={selectedProduct.name}
              className="max-w-full max-h-full object-contain filter brightness-105 transform group-hover:scale-102 transition-transform duration-500 ease-out"
            />
            {/* Visual Glass Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FAF7F2]/5 to-[#D4AF37]/5 pointer-events-none" />
          </div>

          {/* Image Thumbnail Selector Strip */}
          {selectedProduct.images.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-28 aspect-[4/3] flex items-center justify-center bg-[#FAF8F5] border transition-all duration-300 relative rounded-none shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30'
                      : 'border-[#120B06]/10 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${selectedProduct.name} angle ${idx + 1}`}
                    className="max-w-full max-h-full object-cover"
                  />
                  {activeImageIndex !== idx && (
                    <div className="absolute inset-0 bg-white/30" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Grid: Primary Details & Acquisition Suite */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="flex items-center justify-between text-[11px] text-[#D4AF37] uppercase tracking-[0.25em] font-bold mb-4">
            <span>{selectedProduct.category} Catalog</span>
            <span className="flex items-center">
              <Globe className="w-3.5 h-3.5 mr-1" />
              {selectedProduct.origin}
            </span>
          </div>

          <h1 className="font-luxury-serif text-3xl md:text-5xl font-semibold leading-tight text-[#120B06] mb-6 tracking-wide">
            {selectedProduct.name}
          </h1>

          <div className="flex items-center space-x-6 text-sm text-[#120B06]/70 mb-8 border-y border-[#120B06]/5 py-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4.5 h-4.5 text-[#D4AF37]" />
              <span><strong>Period Era:</strong> {selectedProduct.year}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#F2EDE2] border-l-4 border-[#D4AF37] p-6 mb-8">
            <span className="text-[10px] uppercase text-[#120B06]/55 tracking-widest block mb-1">Listed Valuation</span>
            <div className="flex items-baseline space-x-3">
              <span className="font-luxury-serif text-3xl font-bold tracking-wider text-[#120B06]">
                ${selectedProduct.price.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase text-[#D4AF37] font-bold tracking-widest">USD</span>
            </div>
            <p className="text-[10px] text-[#120B06]/65 mt-2 leading-relaxed uppercase tracking-wider">
              Price includes customized wooden transport crating and lifetime authentication registry.
            </p>
          </div>

          {/* Brief Overview text */}
          <p className="text-sm md:text-base text-[#120B06]/85 font-light leading-relaxed mb-8">
            {selectedProduct.description}
          </p>

          {/* Call to Actions (Inquire / WhatsApp) */}
          <div className="flex flex-col space-y-3.5 w-full">
            <button
              onClick={() => inquireProduct(selectedProduct)}
              className="w-full bg-[#D4AF37] hover:bg-[#FAF7F2] text-[#120B06] border border-[#D4AF37] py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Instant WhatsApp Inquiry</span>
            </button>
            <a
              href={`mailto:inquiry@antiqueheritage.com?subject=Inquiry regarding: ${selectedProduct.name}&body=Hi Antique Heritage, I would like to request private details regarding the catalog item: "${selectedProduct.name}" (${selectedProduct.year}).`}
              className="w-full bg-transparent hover:bg-[#120B06] hover:text-[#FAF7F2] border border-[#120B06]/20 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#120B06] text-center transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Email Gallery Expert</span>
            </a>
          </div>

          {/* Assurance bullet checklist */}
          <div className="mt-8 space-y-3.5 border-t border-[#120B06]/10 pt-6">
            <div className="flex items-start space-x-3 text-xs text-[#120B06]/75 uppercase tracking-wide">
              <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Includes Lifetime Signed Certificate of Authenticity</span>
            </div>
            <div className="flex items-start space-x-3 text-xs text-[#120B06]/75 uppercase tracking-wide">
              <History className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Archived in the International Provenance Database</span>
            </div>
          </div>

        </div>
      </section>

      {/* Storytelling & Historical Background Plates */}
      <section className="bg-[#1E150F] text-[#FAF7F2] border-y border-[#D4AF37]/20 py-20 px-6 mt-24 relative overflow-hidden">
        {/* Studio radial texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-stretch">
          {/* Story details */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-6">
              <History className="w-5.5 h-5.5 text-[#D4AF37]" />
              <h3 className="font-luxury-serif text-lg text-[#D4AF37] uppercase tracking-wider">Historical Provenance</h3>
            </div>
            <h2 className="font-luxury-serif text-3xl font-medium tracking-wide mb-6 text-[#FAF7F2]">
              The Legend & Lineage
            </h2>
            <p className="text-sm md:text-base text-[#FAF7F2]/80 leading-relaxed font-light mb-6 whitespace-pre-line">
              {selectedProduct.story}
            </p>
            <p className="text-xs text-[#D4AF37] font-semibold italic uppercase tracking-wider">
              Verified by Antique Heritage Curation Team • St. James, London
            </p>
          </div>

          {/* Vertical divider on desktop */}
          <div className="hidden md:block md:col-span-1 flex items-center justify-center">
            <div className="w-[1px] h-48 bg-[#D4AF37]/25" />
          </div>

          {/* Technical Specs Plate */}
          <div className="md:col-span-4 bg-[#120B06]/65 border border-[#D4AF37]/15 p-8 flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-6">
              <ClipboardList className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="font-luxury-serif text-sm text-[#D4AF37] uppercase tracking-wider">Curation Specs</h4>
            </div>
            <ul className="space-y-4 text-xs font-light text-[#FAF7F2]/75">
              {selectedProduct.specs.map((spec, idx) => (
                <li key={idx} className="border-b border-[#FAF7F2]/10 pb-2">
                  <span className="block text-[9px] uppercase tracking-widest text-[#FAF7F2]/40 mb-1">Parameter {idx + 1}</span>
                  <span className="font-medium text-[#FAF7F2]">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related Masterpieces Carousel/Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
            Acquisitions Matching
          </span>
          <h2 className="font-luxury-serif text-3xl md:text-4xl text-[#120B06] font-medium tracking-wide">
            Related Curated Treasures
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {finalRelated.map((product) => (
            <div key={product.id} onClick={() => handleProductSelect(product)}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
