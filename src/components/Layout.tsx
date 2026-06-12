import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Menu, X, Compass, Mail, Phone, Clock, Award, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { activePage, setActivePage, cartCount } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'collections', label: 'Collections' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#120B06]">
      {/* Top Banner */}
      <div className="bg-[#120B06] text-[#E6DFD3] text-center text-xs py-2 tracking-[0.2em] border-b border-[#D4AF37]/20 uppercase">
        Established 1982 • Curation of Exquisite Historical Treasures
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#120B06]/95 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/20 text-[#FAF7F2]'
            : 'bg-transparent text-[#120B06] border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-start focus:outline-none group text-left"
          >
            <span className="font-luxury-serif text-2xl md:text-3xl font-semibold tracking-wide uppercase group-hover:text-[#D4AF37] transition-colors duration-300">
              Antique Heritage
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#D4AF37] -mt-1 font-sans">
              Collection
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                  activePage === item.id || (activePage === 'product-detail' && item.id === 'collections')
                    ? 'text-[#D4AF37] font-semibold'
                    : scrolled ? 'text-[#FAF7F2]/80 hover:text-[#D4AF37]' : 'text-[#120B06]/85 hover:text-[#D4AF37]'
                }`}
              >
                {item.label}
                {(activePage === item.id || (activePage === 'product-detail' && item.id === 'collections')) && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => handleNavClick('contact')}
              className={`border px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                scrolled
                  ? 'border-[#D4AF37] text-[#FAF7F2] hover:bg-[#D4AF37] hover:text-[#120B06]'
                  : 'border-[#120B06] text-[#120B06] hover:bg-[#120B06] hover:text-[#FAF7F2]'
              }`}
            >
              Inquire
            </button>
            {cartCount > 0 && (
              <div className="relative">
                <span className="absolute -top-2 -right-3 bg-[#D4AF37] text-[#120B06] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
                <Compass className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#120B06]/75 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-[#1E150F] text-[#FAF7F2] p-8 flex flex-col justify-between border-l border-[#D4AF37]/20"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h3 className="font-luxury-serif text-xl tracking-wide uppercase">Antique Heritage</h3>
                    <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">Collection</p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-md text-[#FAF7F2] hover:text-[#D4AF37] transition-colors"
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>

                <div className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left text-lg tracking-[0.2em] uppercase transition-colors duration-300 ${
                        activePage === item.id || (activePage === 'product-detail' && item.id === 'collections')
                          ? 'text-[#D4AF37] font-semibold'
                          : 'text-[#FAF7F2]/80 hover:text-[#D4AF37]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#FAF7F2]/10 pt-8">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-[#D4AF37] text-[#120B06] py-3 uppercase tracking-[0.2em] text-xs font-semibold text-center hover:bg-[#FAF7F2] transition-colors duration-300"
                >
                  Inquire Now
                </button>
                <p className="text-[10px] text-center text-[#FAF7F2]/40 mt-4 tracking-widest">
                  Est. 1982 • London • Paris • Milan
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Luxury Footer */}
      <footer className="bg-[#120B06] text-[#FAF7F2] border-t border-[#D4AF37]/20 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Introduction */}
          <div>
            <h3 className="font-luxury-serif text-2xl tracking-wide uppercase mb-3">Antique Heritage</h3>
            <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-6">Collection</p>
            <p className="text-sm text-[#FAF7F2]/70 leading-relaxed font-light mb-6">
              Curators of fine 16th to 19th-century furniture, clocks, silverware, fine jewelry, and ceramics. Dedicated to preserving historical narratives and architectural masterpieces.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#FAF7F2]/80 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#FAF7F2]/80 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#FAF7F2]/80 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-luxury-serif text-lg text-[#D4AF37] tracking-wider uppercase mb-6">Curation Navigation</h4>
            <ul className="space-y-4 text-sm font-light text-[#FAF7F2]/80">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="hover:text-[#D4AF37] transition-colors duration-300 tracking-wide text-left"
                  >
                    • {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Details */}
          <div>
            <h4 className="font-luxury-serif text-lg text-[#D4AF37] tracking-wider uppercase mb-6">Galley Chambers</h4>
            <ul className="space-y-4 text-sm font-light text-[#FAF7F2]/80">
              <li className="flex items-start">
                <Compass className="w-5 h-5 mr-3 text-[#D4AF37] shrink-0" />
                <span className="tracking-wide">
                  12 Elegant Chambers, Bond Street<br />
                  London, W1S 1SR, United Kingdom
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-[#D4AF37] shrink-0" />
                <a href="tel:+442079460192" className="hover:text-[#D4AF37] transition-colors">+44 (0) 20 7946 0192</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-[#D4AF37] shrink-0" />
                <a href="mailto:inquiry@antiqueheritage.com" className="hover:text-[#D4AF37] transition-colors">inquiry@antiqueheritage.com</a>
              </li>
            </ul>
          </div>

          {/* Curation Hours */}
          <div>
            <h4 className="font-luxury-serif text-lg text-[#D4AF37] tracking-wider uppercase mb-6">Viewing Hours</h4>
            <ul className="space-y-4 text-sm font-light text-[#FAF7F2]/80">
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-[#D4AF37] shrink-0" />
                <span className="tracking-wide">
                  <strong>Monday - Friday:</strong><br />
                  10:00 AM - 6:00 PM
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-[#D4AF37] shrink-0" />
                <span className="tracking-wide">
                  <strong>Saturday:</strong><br />
                  11:00 AM - 5:00 PM
                </span>
              </li>
              <li className="flex items-center">
                <Award className="w-4 h-4 mr-3 text-[#D4AF37] shrink-0" />
                <span className="tracking-wide text-xs text-[#D4AF37] font-semibold uppercase">By Private Appointment Available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-[#FAF7F2]/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#FAF7F2]/40 tracking-wider">
          <p>© {new Date().getFullYear()} Antique Heritage Collection. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Authentication Standards</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Shipping & Returns</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp Quick Connect) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#120B06] hover:bg-[#D4AF37] text-[#FAF7F2] hover:text-[#120B06] w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shadow-lg transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <a
          href="https://wa.me/15550199?text=Hello%20Antique%20Heritage,%20I%20have%20an%20inquiry%20regarding%20your%20antique%20collections."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 duration-300"
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp custom SVG icon for high fidelity */}
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.13-1.347a9.96 9.96 0 004.887 1.343l.005-.001c5.505 0 9.988-4.478 9.99-9.985 0-2.667-1.037-5.176-2.92-7.061A9.925 9.925 0 0012.012 2zm5.835 14.126c-.3.84-1.545 1.527-2.128 1.62-.513.08-1.18.15-3.39-.773-2.83-1.18-4.63-4.08-4.77-4.27-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07 1-2.35.27-.28.6-.35.8-.35.2 0 .4 0 .57.01.18.01.41-.01.64.53.24.57.81 1.99.88 2.14.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.32.4-.45.54-.15.15-.3.32-.13.61.17.29.77 1.28 1.66 2.07.9.8 1.66 1.05 1.96 1.2.3.15.48.12.66-.08.18-.2.78-.9 1-1.2.22-.3.44-.25.74-.14.3.11 1.91.9 2.24 1.07.33.16.55.24.63.38.08.14.08.82-.22 1.66z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
