/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Wine, Navigation, Mail, Phone, Instagram, Facebook, Twitter, Shield, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950/40 text-stone-300 border-t border-white/10 relative backdrop-blur-md">
      
      {/* Decorative top wine glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Newsletter Section bar */}
        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 relative backdrop-blur-md shadow-lg">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h3 className="font-serif text-2xl text-white font-light">Join the Sommelier Review Ledger</h3>
            <p className="font-sans text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              Receive limited release previews, vintage year ratings, and private ticket invites directly to your inbox. No spam. Only poetry.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="text-black bg-[#D4AF37] px-6 py-3 font-serif text-sm font-semibold tracking-wide text-center uppercase">
                Welcome to the Registry List!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="connoisseur@eastgateliquidgate.com"
                  className="px-4 py-3 bg-white/5 text-white placeholder-stone-500 focus:outline-none border border-white/10 focus:border-[#D4AF37] text-sm font-sans w-full sm:w-80"
                />
                <button
                  type="submit"
                  id="btn-footer-newsletter-subscribe"
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif text-xs font-semibold uppercase tracking-widest transition-all duration-300 shrink-0 cursor-pointer"
                >
                  Induct Email
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Core Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-sans text-sm">
          
          {/* Brand/Logo column */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center p-2 text-[#D4AF37] bg-white/5">
                <Wine className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg tracking-widest text-[#f3e6e8] uppercase font-bold">EASTGATE LIQUID GATE</span>
            </div>
            
            <p className="font-light text-stone-400 leading-relaxed text-xs">
              Cultivating premier viticulture and cellaring high-end historical blends inside our private estate valleys since 1895.
            </p>

            <div className="flex items-center gap-3 pt-2 text-stone-400">
              <a href="#instagram" className="hover:text-[#D4AF37] transition-colors" aria-label="Instagram"><Instagram className="w-4.5 h-4.5" /></a>
              <a href="#facebook" className="hover:text-[#D4AF37] transition-colors" aria-label="Facebook"><Facebook className="w-4.5 h-4.5" /></a>
              <a href="#twitter" className="hover:text-[#D4AF37] transition-colors" aria-label="Twitter"><Twitter className="w-4.5 h-4.5" /></a>
            </div>
          </div>

          {/* Quick links navigators */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-white font-medium tracking-wide">Explore Estates</h4>
            <div className="w-6 h-[1.5px] bg-[#D4AF37]/50"></div>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><a href="#home" className="hover:text-[#D4AF37] transition-colors">Home Landing</a></li>
              <li><a href="#collection" className="hover:text-[#D4AF37] transition-colors">Exclusive Catalog</a></li>
              <li><a href="#story" className="hover:text-[#D4AF37] transition-colors">Valley Vineyard Story</a></li>
              <li><a href="#events" className="hover:text-[#D4AF37] transition-colors">Tasting Events</a></li>
              <li><a href="#club" className="hover:text-[#D4AF37] transition-colors">Sovereign Joining Club</a></li>
            </ul>
          </div>

          {/* Sommelier Hours details */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-white font-medium tracking-wide">Visiting Hours</h4>
            <div className="w-6 h-[1.5px] bg-[#D4AF37]/50"></div>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light leading-relaxed">
              <li>
                <span className="block text-[#D4AF37] font-semibold">Tasting Room:</span>
                <span>Thursday – Sunday: 11:00am – 6:00pm</span>
              </li>
              <li>
                <span className="block text-[#D4AF37] font-semibold">Underground Vault:</span>
                <span>Friday – Saturday: 5:00pm – 9:00pm (Reservation Only)</span>
              </li>
              <li>
                <span className="block text-[#D4AF37] font-semibold">Estate Harvest:</span>
                <span>Pre-arranged seasonal schedule</span>
              </li>
            </ul>
          </div>

          {/* Contact coordinates column */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-white font-medium tracking-wide">Contact Us</h4>
            <div className="w-6 h-[1.5px] bg-[#D4AF37]/50"></div>
            <ul className="space-y-3 text-xs text-stone-400 font-light">
              <li className="flex items-start gap-2">
                <Navigation className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Saint Helena High Road, Napa Valley, California, US</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+1 (855) WINE-ESTATE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>reservations@eastgateliquidgate.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits / Back to top bar */}
        <div className="pt-12 mt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500 font-light">
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} Eastgate Liquid Gate Cellars. Private Heritage Reserve rights secured.</span>
            <span>•</span>
            <a href="#terms" className="hover:text-stone-300">Terms of Covenant</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-stone-300">Data Preservation policy</a>
          </div>

          {/* Back to top btn */}
          <button
            onClick={scrollToTop}
            className="p-3 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 group flex items-center gap-2 uppercase tracking-widest text-[9px] font-sans font-bold cursor-pointer bg-white/5 backdrop-blur-md"
            aria-label="Back to Top"
          >
            Ascend Top <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
