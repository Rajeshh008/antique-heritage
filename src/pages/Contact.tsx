import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Compass, Mail, Phone, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Contact: React.FC = () => {
  const { submitInquiry } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    const completed = await submitInquiry(formData);
    setLoading(false);
    if (completed) {
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24 text-[#120B06]">
      {/* Page Header */}
      <section className="relative py-20 px-6 bg-[#120B06] text-[#FAF7F2] text-center border-b border-[#D4AF37]/25">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] block mb-3 font-semibold">
            Concierge Suite
          </span>
          <h1 className="font-luxury-serif text-3xl md:text-5xl font-medium tracking-wide">
            Request Private Consultation
          </h1>
          <p className="text-xs md:text-sm text-[#FAF7F2]/60 mt-3 tracking-widest uppercase">
            Visit our chambers or request a private valuation viewing
          </p>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Business Details */}
        <div className="lg:col-span-5 flex flex-col space-y-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
              Showrooms Chambers
            </span>
            <h2 className="font-luxury-serif text-2xl md:text-3xl text-[#120B06] font-medium mb-6">
              Connect With Our Curators
            </h2>
            <p className="text-sm text-[#120B06]/75 leading-relaxed font-light">
              Whether you are looking to acquire a rare timepiece, discuss institutional museum loans, or verify family estate heirs collections, our expert team is available globally to assist.
            </p>
          </div>

          <ul className="space-y-6 text-sm font-light text-[#120B06]/85">
            <li className="flex items-start">
              <Compass className="w-5.5 h-5.5 mr-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-[#120B06] mb-1 font-semibold">Address</strong>
                <span className="leading-relaxed">
                  12 Elegant Chambers, Bond Street<br />
                  London, W1S 1SR, United Kingdom
                </span>
              </div>
            </li>
            <li className="flex items-start">
              <Phone className="w-5.5 h-5.5 mr-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-[#120B06] mb-1 font-semibold">Acquisitions Hotline</strong>
                <a href="tel:+442079460192" className="hover:text-[#D4AF37] transition-colors leading-relaxed block">+44 (0) 20 7946 0192</a>
              </div>
            </li>
            <li className="flex items-start">
              <Mail className="w-5.5 h-5.5 mr-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-[#120B06] mb-1 font-semibold">Email Concierge</strong>
                <a href="mailto:inquiry@antiqueheritage.com" className="hover:text-[#D4AF37] transition-colors leading-relaxed block">inquiry@antiqueheritage.com</a>
              </div>
            </li>
            <li className="flex items-start">
              <Clock className="w-5.5 h-5.5 mr-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-[#120B06] mb-1 font-semibold">Showroom Viewing Hours</strong>
                <span className="leading-relaxed block text-xs">Mon - Fri: 10:00 AM - 6:00 PM</span>
                <span className="leading-relaxed block text-xs">Saturday: 11:00 AM - 5:00 PM</span>
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold block mt-1">Sundays by Private Appointment Only</span>
              </div>
            </li>
          </ul>

          {/* Quick WhatsApp Connect Panel */}
          <div className="bg-[#F2EDE2] border border-[#D4AF37]/20 p-6 flex items-start space-x-4">
            <MessageSquare className="w-6.5 h-6.5 text-[#25D366] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-luxury-serif text-sm font-semibold uppercase tracking-wider text-[#120B06] mb-1">WhatsApp Quick Connect</h4>
              <p className="text-xs text-[#120B06]/70 leading-relaxed font-light mb-3">
                Chat immediately with our showroom acquisitions representative regarding availability.
              </p>
              <a
                href="https://wa.me/15550199?text=Hello%20Antique%20Heritage,%20I%20would%20like%20to%20schedule%20a%20private%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-[#D4AF37] hover:underline font-bold"
              >
                Start Chat Session →
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Contact Form */}
        <div className="lg:col-span-7 bg-[#F2EDE2] border border-[#120B06]/5 p-8 md:p-10 rounded-none shadow-sm relative">
          
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col space-y-6"
              >
                <div>
                  <h3 className="font-luxury-serif text-xl font-semibold uppercase tracking-wider text-[#120B06] mb-2">Request Consultation</h3>
                  <p className="text-xs text-[#120B06]/65 leading-relaxed font-light uppercase tracking-wider">
                    Please complete the registry details below. Our curators will respond within 4 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#120B06]/70 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF7F2] border border-[#120B06]/15 px-4 py-3 text-xs uppercase tracking-widest rounded-none focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#120B06]/70 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF7F2] border border-[#120B06]/15 px-4 py-3 text-xs uppercase tracking-widest rounded-none focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-[#120B06]/70 mb-2">Telephone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF7F2] border border-[#120B06]/15 px-4 py-3 text-xs uppercase tracking-widest rounded-none focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-[#120B06]/70 mb-2">Inquiry Details *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="DESCRIBE THE SPECIFIC ART PIECE OR HEIRLOOM APPRAISAL REQUEST..."
                    className="w-full bg-[#FAF7F2] border border-[#120B06]/15 px-4 py-3 text-xs uppercase tracking-widest rounded-none focus:outline-none focus:border-[#D4AF37] placeholder-[#120B06]/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#120B06] hover:bg-[#D4AF37] hover:text-[#120B06] text-[#FAF7F2] border border-[#D4AF37] py-4 text-xs font-semibold uppercase tracking-[0.25em] rounded-none transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>{loading ? 'Sending Request...' : 'Submit Consultation Request'}</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center flex flex-col items-center justify-center"
              >
                <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mb-6 animate-bounce" />
                <h3 className="font-luxury-serif text-2xl text-[#120B06] uppercase tracking-wider mb-3">
                  Consultation Registered
                </h3>
                <p className="text-sm text-[#120B06]/75 max-w-md mx-auto leading-relaxed font-light mb-8">
                  We have registered your consultation details. A senior acquisitions expert has been assigned to your request and will contact you directly within 4 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-transparent border border-[#120B06]/20 px-6 py-3 text-xs uppercase tracking-widest hover:border-[#D4AF37] transition-all"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Google Maps Integration Placeholder */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="border border-[#120B06]/10 p-2.5 bg-[#F2EDE2]">
          <div className="relative aspect-[21/9] w-full bg-[#120B06]/5 flex items-center justify-center overflow-hidden">
            {/* Embedded Google Maps with custom responsive styling */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0232598363765!2d-0.14441092338271775!3d51.512781471815856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d50275ccab%3A0xe21d603a958e0a6d!2sBond%20St%2C%20London%2C%20UK!5e0!3m2!1sen!2s!4v1716949019234!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) contrast(1.1) invert(0.9)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Antique Heritage Gallery Map"
            />
            {/* Visual Glass Overlay */}
            <div className="absolute inset-0 bg-[#D4AF37]/5 pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};
