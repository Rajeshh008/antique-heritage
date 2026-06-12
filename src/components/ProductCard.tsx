import React from 'react';
import { useStore } from '../context/StoreContext';
import type { Product } from '../context/StoreContext';
import { Calendar, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, setActivePage } = useStore();

  const handleCardClick = () => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      onClick={handleCardClick}
      className="group bg-[#FAF7F2] border border-[#120B06]/5 hover:border-[#D4AF37]/50 rounded-none overflow-hidden cursor-pointer flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Product Image Window */}
      <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden border-b border-[#120B06]/5">
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-[#120B06]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

        {/* Action Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
          <span className="bg-[#120B06] text-[#FAF7F2] border border-[#D4AF37] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            View Antique
          </span>
        </div>

        {/* Featured Ribbon Tag */}
        {product.isFeatured && (
          <span className="absolute top-4 left-4 z-20 bg-[#D4AF37] text-[#120B06] text-[9px] font-bold uppercase tracking-widest px-3 py-1 border border-[#120B06]/10">
            Featured
          </span>
        )}

        {/* Image Zoom Hover */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      {/* Product Metadata Info */}
      <div className="p-6 flex flex-col flex-grow bg-[#FAF7F2]">
        <div className="flex items-center justify-between text-[10px] text-[#120B06]/50 uppercase tracking-widest mb-3">
          <span className="text-[#D4AF37] font-semibold">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Globe className="w-3 h-3 text-[#D4AF37]/80" />
            <span>{product.origin.split(',')[1] || product.origin}</span>
          </div>
        </div>

        <h3 className="font-luxury-serif text-lg text-[#120B06] group-hover:text-[#D4AF37] font-medium leading-snug mb-3 tracking-wide transition-colors duration-300 flex-grow">
          {product.name}
        </h3>

        <div className="flex items-center space-x-4 text-xs text-[#120B06]/60 mb-5 border-t border-[#120B06]/5 pt-3">
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-medium">{product.year}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#120B06]/10 pt-4 mt-auto">
          <span className="text-sm font-semibold tracking-wider font-luxury-serif text-[#120B06]">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] group-hover:underline font-bold transition-all duration-300">
            Inquire Now →
          </span>
        </div>
      </div>
    </motion.div>
  );
};
