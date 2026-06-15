/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collection from './components/Collection';
import WineryStory from './components/WineryStory';
import Events from './components/Events';
import WineClub from './components/WineClub';
import CartDrawer, { CartItem } from './components/CartDrawer';
import Footer from './components/Footer';

import { Wine, TESTIMONIALS } from './constant';
import { Quote, Star, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClubFormOpen, setIsClubFormOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Age Gate verification state
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if verified already
    const isVerified = localStorage.getItem('luxury-wine-age-gated');
    if (isVerified === 'true') {
      setAgeVerified(true);
    } else {
      setAgeVerified(false);
    }
  }, []);

  // Update current active section based on DOM wheel scroll intersection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'collection', 'story', 'events', 'club'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (wine: Wine) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.wine.id === wine.id);
      if (existing) {
        return prev.map((item) =>
          item.wine.id === wine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { wine, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (wineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(wineId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.wine.id === wineId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (wineId: string) => {
    setCartItems((prev) => prev.filter((item) => item.wine.id !== wineId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleConfirmAge = () => {
    localStorage.setItem('luxury-wine-age-gated', 'true');
    setAgeVerified(true);
  };

  const handleDeclineAge = () => {
    alert('Access restricted. You must be of legal drinking age to access this premium wine selection.');
  };

  const handleOpenClubCove = () => {
    const element = document.getElementById('club');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Automated rotate reviews
  useEffect(() => {
    if (!ageVerified) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [ageVerified]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 scroll-smooth antialiased selection:bg-wine-900 selection:text-white">
      
      {/* Age verification gate drawer */}
      <AnimatePresence>
        {ageVerified === false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-stone-950/98 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="max-w-md w-full bg-stone-900 border border-gold-300 p-8 sm:p-10 space-y-6 text-center text-stone-100 shadow-2xl relative"
            >
              {/* Crest detail icon */}
              <div className="w-16 h-16 rounded-full border border-gold-400 flex items-center justify-center mx-auto mb-4 text-gold-400">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400 block font-semibold leading-none">
                  Legal Entry Registry
                </span>
                <h1 className="font-serif text-3xl font-light text-stone-100">Welcome to Eastgate Liquid Gate</h1>
                <div className="w-12 h-[1px] bg-gold-500/50 mx-auto my-2"></div>
                <p className="font-sans text-xs text-stone-400 leading-relaxed font-light">
                  To view our fine collection of historic vintage cellar casks and estate events, please verify that you are of legal purchase age.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-800">
                <button
                  id="btn-age-confirm-yes"
                  onClick={handleConfirmAge}
                  className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-stone-950 font-serif font-black text-xs uppercase tracking-widest transition-luxury rounded-none cursor-pointer"
                >
                  I am over 21 Years of Age
                </button>
                <button
                  id="btn-age-confirm-no"
                  onClick={handleDeclineAge}
                  className="w-full py-3.5 bg-transparent border border-stone-800 hover:border-red-650 hover:bg-red-950/20 text-stone-400 hover:text-red-400 font-serif text-xs uppercase tracking-widest transition-luxury rounded-none cursor-pointer"
                >
                  Exit Selection
                </button>
              </div>

              <p className="text-[10px] font-sans text-stone-550 leading-relaxed max-w-xs mx-auto">
                By entering this site, you accept our standard terms of winemaking covenant and cookies preservation directives.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Canvas */}
      {ageVerified && (
        <div className="relative">
          {/* Sticky Elegant Navigation bar */}
          <Navbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenClub={handleOpenClubCove}
          />

          {/* Interactive Hero Carousel Section */}
          <Hero onNavigate={(tgt) => {
            const el = document.getElementById(tgt);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />

          {/* Catalog Selection Wine Boutique Grid */}
          <Collection onAddToCart={handleAddToCart} />

          {/* Estate Narrative story history timeline */}
          <WineryStory />

          {/* Sommelier Tasting & Events booking */}
          <Events />

          {/* Critic Testimonials slider */}
          <section id="reviews" className="py-24 bg-stone-50 border-b border-stone-200 text-stone-900 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              
              <div className="mb-8">
                <Quote className="w-12 h-12 text-gold-400/40 mx-auto" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <p className="font-serif text-2xl sm:text-3xl font-light italic leading-relaxed text-stone-900 max-w-3xl mx-auto">
                    "{TESTIMONIALS[currentTestimonial].quote}"
                  </p>

                  <div className="flex items-center justify-center gap-1.5 text-gold-500">
                    {Array.from({ length: TESTIMONIALS[currentTestimonial].rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-medium text-stone-900">
                      {TESTIMONIALS[currentTestimonial].author}
                    </h4>
                    <p className="font-sans text-xs uppercase tracking-widest text-[#a17743] font-semibold mt-1">
                      {TESTIMONIALS[currentTestimonial].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Critic slide bullet marks */}
              <div className="flex items-center justify-center gap-2 mt-12">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`transition-all duration-300 w-2.5 h-2.5 rounded-full ${
                      currentTestimonial === i ? 'bg-gold-500 scale-120' : 'bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Go to testimonial ${i+1}`}
                  />
                ))}
              </div>

            </div>
          </section>

          {/* Premium Subscription Club pricing models */}
          <WineClub />

          {/* Footer Coordinates and Newsletter subscribe forms */}
          <Footer />

          {/* Sliding Cart list and Billing Wizard drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        </div>
      )}

    </div>
  );
}
