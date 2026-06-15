/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Wine, Compass, Calendar, Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenClub: () => void;
}

export default function Navbar({
  activeSection,
  setActiveSection,
  cartCount,
  onOpenCart,
  onOpenClub
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'collection', label: 'Wine Shop', icon: Wine },
    { id: 'story', label: 'Our Vineyard', icon: Award },
    { id: 'events', label: 'Events & Tastings', icon: Calendar },
    { id: 'club', label: 'Wine Club', icon: Star }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav
        id="luxury-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/40 backdrop-blur-md shadow-lg border-b border-white/10 py-3 text-[#F5F2ED]'
            : 'bg-transparent border-b border-white/5 py-5 text-[#F5F2ED]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-gold-400 group-hover:border-wine-500 transition-colors duration-500">
                <Wine className="w-6 h-6 text-gold-400 group-hover:text-gold-200 transition-colors duration-500" />
                <div className="absolute inset-0.5 rounded-full border border-dashed border-gold-500/30 group-hover:animate-spin" style={{ animationDuration: '20s' }}></div>
              </div>
              <div>
                <span className="block font-serif text-xl tracking-widest text-[#f3e6e8] uppercase font-bold leading-none">
                  EASTGATE LIQUID GATE
                </span>
                <span className="block font-sans text-[9px] tracking-[0.3em] uppercase text-gold-400/80 mt-1">
                  ESTD 1895 • CELLARS
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 font-serif text-[15px] tracking-wider transition-colors duration-300 flex items-center gap-1.5 ${
                      isActive ? 'text-gold-300' : 'text-stone-300 hover:text-stone-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 opacity-70" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-4 right-4 h-[1px] bg-gold-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Buttons: Club CTA and Cart */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                id="btn-nav-join-club"
                onClick={onOpenClub}
                className="hidden lg:inline-flex px-5 py-2 border border-[#D4AF37] hover:bg-white/10 backdrop-blur-md text-[#D4AF37] hover:text-white font-serif text-xs uppercase tracking-widest rounded-none transition-luxury duration-300 cursor-pointer"
              >
                Join Sovereign Club
              </button>
              
              <button
                id="btn-nav-cart"
                onClick={onOpenCart}
                className="relative p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-none transition-luxury duration-300 focus:outline-none cursor-pointer"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-800 text-[10px] font-sans font-bold text-white shadow-md ring-1 ring-black"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Mobile Side Controls */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                id="btn-nav-cart-mobile"
                onClick={onOpenCart}
                className="relative p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-none"
              >
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-800 text-[9px] font-sans font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                id="btn-nav-burger"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 rounded-none cursor-pointer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#0F0A0A]/95 backdrop-blur-md border-b border-white/10"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`nav-mobile-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-none flex items-center gap-3 font-serif text-lg tracking-wide cursor-pointer ${
                        isActive
                          ? 'bg-white/10 text-[#D4AF37] border-l-2 border-[#D4AF37]'
                          : 'text-stone-300 hover:bg-white/5'
                      }`}
                    >
                      <IconComp className="w-5 h-5 opacity-70" />
                      {item.label}
                    </button>
                  );
                })}
                <div className="pt-4 border-t border-white/10 flex justify-between gap-2 px-4">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenClub();
                    }}
                    className="flex-1 py-2.5 text-center bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold text-xs uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                  >
                    Join Sovereign Club
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
