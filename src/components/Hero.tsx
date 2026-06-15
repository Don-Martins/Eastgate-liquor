/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, CalendarDays, Award, ArrowRight, ArrowLeft } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
    tag: 'LIMITED ARCHIVE COLLECTION',
    title: 'Pristine Vintages, Crafted by Hand',
    subtitle: 'Nurtured in optimal microclimates and refined in deep French Oak vaults.',
    cta: 'Explore Wine Shop',
    target: 'collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1543418219-44e30b057fc5?auto=format&fit=crop&w=1600&q=85',
    tag: 'ESTATE TOURS & SENSORY MASTERCLASSES',
    title: '120 Years of Vine Custodianship',
    subtitle: 'Experience the romantic history of wine-making with our master sommeliers.',
    cta: 'Reserve Tasting Session',
    target: 'events'
  },
  {
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1600&q=85',
    tag: 'THE SOVEREIGN CELLAR CLUB',
    title: 'An Elite Alliance of Modern Connoisseurs',
    subtitle: 'Receive pre-release shipments, vintage library slots, and continuous VIP perks.',
    cta: 'Join Sovereign Circle',
    target: 'club'
  }
];

export default function Hero({ onNavigate }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section id="home" className="relative min-h-screen bg-stone-950 text-white overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>
        {/* Fine Cinematic Shading Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-stone-950/30"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-stone-950/45 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-stone-950 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-24 pb-12">
        <div className="max-w-3xl">
          {/* Animated Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-gold-400"></span>
                <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] text-gold-300 uppercase">
                  {SLIDES[currentSlide].tag}
                </p>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light tracking-wide text-stone-105 leading-none">
                {SLIDES[currentSlide].title.split(' ').map((word, i) => {
                  const isHighlighted = i === 2 || i === 3; // italic highlights
                  return (
                    <span key={i} className={isHighlighted ? 'font-serif-ital text-gold-200' : ''}>
                      {word}{' '}
                    </span>
                  );
                })}
              </h1>

              <p className="font-sans text-base sm:text-lg text-stone-300 font-light max-w-2xl leading-relaxed">
                {SLIDES[currentSlide].subtitle}
              </p>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  id={`btn-hero-cta-${currentSlide}`}
                  onClick={() => onNavigate(SLIDES[currentSlide].target)}
                  className="px-8 py-4 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-black text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-3 rounded-none cursor-pointer group"
                >
                  {SLIDES[currentSlide].cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('story')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-white/20 font-serif text-sm tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer"
                >
                  Our Philosophy
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Slider Navigation Controls */}
        <div className="mt-16 flex items-center justify-between">
          {/* Slide Indicator bullets */}
          <div className="flex items-center gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 rounded-none ${
                  currentSlide === i ? 'w-10 h-1 bg-gold-400' : 'w-2 h-2 rounded-full bg-stone-600 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${i+1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-3 border border-stone-800 hover:border-gold-500 bg-stone-950/60 hover:text-gold-300 transition-luxury"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 border border-stone-800 hover:border-gold-500 bg-stone-950/60 hover:text-gold-300 transition-luxury"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Welcome Strip / Classic Stat Board */}
      <div className="relative -mt-10 md:-mt-20 z-25 bg-black/40 backdrop-blur-md border-t border-b border-white/10 py-12 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4 flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-white/5 border border-white/10 rounded-full mb-2">
              <Award className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl font-light text-stone-150">120 Years</h3>
            <p className="font-sans text-xs tracking-wider text-[#D4AF37]/80 uppercase">Continuous Winemaking Heritage</p>
          </div>
          
          <div className="p-4 flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-white/5 border border-white/10 rounded-full mb-2">
              <Compass className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl font-light text-stone-150">350 Acres</h3>
            <p className="font-sans text-xs tracking-wider text-[#D4AF37]/80 uppercase">Premium Sunlit Soil Parcels</p>
          </div>

          <div className="p-4 flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-white/5 border border-white/10 rounded-full mb-2">
              <CalendarDays className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl font-light text-stone-150">25+ Honors</h3>
            <p className="font-sans text-xs tracking-wider text-[#D4AF37]/80 uppercase">Paris and London Grand Master Gold</p>
          </div>
        </div>
      </div>
    </section>
  );
}
