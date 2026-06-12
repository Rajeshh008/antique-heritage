import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Collections: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    currentPage,
    setCurrentPage,
  } = useStore();

  const categories = ['All', 'Furniture', 'Timepieces', 'Silverware', 'Jewelry', 'Art'];
  const itemsPerPage = 6;

  // Filter products reactively
  const filteredProducts = products.filter((product) => {
    // 1. Category filter
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;

    // 2. Search query filter
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.year.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Price range filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    }
    if (sortOption === 'price-desc') {
      return b.price - a.price;
    }
    if (sortOption === 'newest') {
      // Sort chronologically by year (approximated by parsing out the first 4-digit number)
      const yearA = parseInt(a.year.match(/\d+/)?.[0] || '0', 10);
      const yearB = parseInt(b.year.match(/\d+/)?.[0] || '0', 10);
      return yearB - yearA; // Older items first? Actually, "newest" as in late era vs earlier era, or chronologically. Let's do b - a
    }
    // Default 'featured': Featured items first
    const featA = a.isFeatured ? 1 : 0;
    const featB = b.isFeatured ? 1 : 0;
    return featB - featA;
  });

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceChange = (maxVal: number) => {
    setPriceRange([0, maxVal]);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSortOption('featured');
    setPriceRange([0, 50000]);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24 text-[#120B06]">
      {/* Page Header */}
      <section className="relative py-20 px-6 bg-[#120B06] text-[#FAF7F2] text-center border-b border-[#D4AF37]/25">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] block mb-3 font-semibold">
            Showroom Vault
          </span>
          <h1 className="font-luxury-serif text-3xl md:text-5xl font-medium tracking-wide">
            The Antique Curation Catalog
          </h1>
          <p className="text-xs md:text-sm text-[#FAF7F2]/60 mt-3 tracking-widest uppercase">
            Browse Our Collection of Certified Antiques
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Filter Sidebar */}
        <aside className="lg:col-span-3 flex flex-col space-y-8 bg-[#F2EDE2] border border-[#120B06]/5 p-6 h-fit rounded-none">
          <div className="flex items-center justify-between border-b border-[#120B06]/10 pb-4">
            <h3 className="font-luxury-serif text-base uppercase tracking-wider font-semibold flex items-center">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-[#D4AF37]" />
              Filter Studio
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[10px] uppercase tracking-widest text-[#D4AF37] hover:underline font-bold"
            >
              Reset All
            </button>
          </div>

          {/* Search Box */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-3 text-[#120B06]/70">Search Curation</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Search era, origin..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-[#FAF7F2] border border-[#120B06]/15 pl-10 pr-4 py-2.5 text-xs uppercase tracking-widest rounded-none focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#D4AF37]" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-[#120B06]/40 hover:text-[#120B06]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#120B06]/70">Max Valuation</h4>
              <span className="font-mono text-xs font-semibold text-[#D4AF37]">
                ${priceRange[1].toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="50000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full h-1 bg-[#120B06]/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex justify-between text-[9px] text-[#120B06]/45 uppercase mt-2 font-mono">
              <span>$2,000</span>
              <span>$50,000+</span>
            </div>
          </div>

          {/* Curation Standard Note */}
          <div className="border-t border-[#120B06]/10 pt-6">
            <div className="bg-[#FAF7F2] p-4 border-l-2 border-[#D4AF37] text-[11px] leading-relaxed font-light text-[#120B06]/70 uppercase tracking-wider flex items-start space-x-2">
              <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Each acquired artifact includes a complete provenance archive and detailed master restorer\'s logs.</span>
            </div>
          </div>
        </aside>

        {/* Right Column: Catalog Grid */}
        <section className="lg:col-span-9 flex flex-col">
          {/* Grid Toolbar Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#120B06]/10 pb-6 mb-8 gap-4">
            {/* Category Pills (Tabs) */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest font-medium transition-all duration-300 rounded-none cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#120B06] text-[#FAF7F2] border border-[#120B06]'
                      : 'bg-transparent text-[#120B06]/75 border border-[#120B06]/15 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center space-x-2 self-start sm:self-auto shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-widest text-[#120B06]/55">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-[10px] uppercase tracking-widest font-bold text-[#120B06] focus:outline-none border-b border-[#120B06]/20 pb-1 cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Era: Chronological</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-xs uppercase tracking-widest text-[#120B06]/50 mb-6 flex justify-between items-center">
            <span>Showing {paginatedProducts.length} of {sortedProducts.length} Masterpieces</span>
            {searchQuery && (
              <span className="text-[#D4AF37] font-semibold">Filtered by search: "{searchQuery}"</span>
            )}
          </div>

          {/* The Catalog Cards Grid */}
          <AnimatePresence mode="wait">
            {paginatedProducts.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery + sortOption + priceRange[1] + currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center border border-[#120B06]/5 bg-[#F2EDE2]"
              >
                <span className="font-luxury-serif text-lg text-[#120B06]/60 italic block mb-3">
                  No antiques matched your criteria.
                </span>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#120B06] text-[#FAF7F2] border border-[#D4AF37] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#D4AF37] hover:text-[#120B06] transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Paginator */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-3 mt-16 border-t border-[#120B06]/10 pt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold border border-[#120B06]/10 disabled:opacity-30 disabled:pointer-events-none hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center text-xs font-semibold transition-all border ${
                    currentPage === page
                      ? 'bg-[#120B06] text-[#FAF7F2] border-[#120B06]'
                      : 'border-[#120B06]/10 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold border border-[#120B06]/10 disabled:opacity-30 disabled:pointer-events-none hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer"
              >
                Next →
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
