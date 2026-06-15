/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ShoppingCart, Info, Star, ChevronRight, Check, X } from 'lucide-react';
import { WINES, Wine, WINE_CATEGORIES } from '../constant';

interface CollectionProps {
  onAddToCart: (wine: Wine) => void;
}

export default function Collection({ onAddToCart }: CollectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'year'>('rating');
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filtering list
  const filteredWines = WINES.filter((wine) => {
    const categoryMatch = selectedCategory === 'All' || wine.type === selectedCategory;
    const searchMatch =
      wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.grapes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Sorting list
  const sortedWines = [...filteredWines].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'year') return b.year - a.year;
    return 0;
  });

  const handleAddToCartClick = (wine: Wine, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(wine);
    setJustAddedId(wine.id);
    setTimeout(() => setJustAddedId(null), 1500);
  };

  return (
    <section id="collection" className="py-24 bg-transparent text-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] font-bold uppercase">The Vintage Cellar</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-tight">
            Our Elite Wine <span className="font-serif-ital text-[#D4AF37]">Collection</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto my-4"></div>
          <p className="font-sans text-sm text-stone-305 font-light leading-relaxed">
            Hand-assembled, estate-certified vintages waiting to enrich your private cellar. Each bottle carries our traditional crest of excellence.
          </p>
        </div>

        {/* Searching, Filtering, Sorting bar */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 mb-12 shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1 md:gap-2 justify-center w-full lg:w-auto">
              {WINE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 font-serif text-xs uppercase tracking-widest transition-all rounded-none cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-[#D4AF37] text-black font-bold border border-[#D4AF37]'
                      : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Inputs: Search and Sort */}
            <div className="flex flex-wrap md:flex-nowrap gap-4 w-full lg:w-auto items-center">
              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search grapes, regions, names..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:border-[#D4AF37] focus:outline-none text-sm font-sans"
                />
              </div>

              {/* Sorting dropdown */}
              <div className="relative w-full md:w-52 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-[#0F0A0A]/90 border border-white/10 focus:border-[#D4AF37] focus:outline-[#D4AF37] py-2.5 px-3 text-sm font-sans text-stone-200 cursor-pointer"
                >
                  <option value="rating" className="bg-[#0F0A0A] text-white">Top Rated Vintages</option>
                  <option value="price-asc" className="bg-[#0F0A0A] text-white">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#0F0A0A] text-white">Price: High to Low</option>
                  <option value="year" className="bg-[#0F0A0A] text-white">Vintage Year</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Catalog Wine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {sortedWines.map((wine) => (
              <motion.div
                key={wine.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onClick={() => setSelectedWine(wine)}
                className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#D4AF37] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* Image and badges */}
                <div className="relative bg-white/5 aspect-square overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={wine.image}
                    alt={wine.name}
                    referrerPolicy="no-referrer"
                    className="h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {wine.badge && (
                    <span className="absolute top-3 left-3 bg-red-800 text-stone-100 text-[9px] tracking-widest uppercase py-1 px-2.5 font-sans font-bold">
                      {wine.badge}
                    </span>
                  )}

                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-[#D4AF37] text-[11px] font-sans px-2 py-0.5 font-semibold">
                    {wine.year}
                  </span>

                  {/* Dark hover layer with details hint */}
                  <div className="absolute inset-0 bg-[#0F0A0A]/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-5 py-2.5 bg-[#F5F2ED] text-black font-serif text-xs uppercase tracking-widest shadow-lg flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer">
                      <Info className="w-3.5 h-3.5 text-black" />
                      View Cellar Notes
                    </button>
                  </div>
                </div>

                {/* Wine details content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <p className="font-sans text-[10px] tracking-widest text-[#D4AF37] font-semibold uppercase">{wine.region}</p>
                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-1">
                      {wine.name}
                    </h3>
                    <p className="font-sans text-xs text-stone-300 font-light line-clamp-2 leading-relaxed">
                      {wine.description}
                    </p>
                  </div>

                  {/* Pricing / rating, CTA */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-sm text-stone-400 tracking-wider">USD</span>
                      <span className="font-serif text-2xl font-bold text-white ml-1">${wine.price}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#D4AF37] bg-white/5 px-2 py-0.5 border border-[#D4AF37]/25 font-sans text-xs font-semibold">
                      <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                      {wine.rating}
                    </div>
                  </div>
                </div>

                {/* Purchase buttons */}
                <div className="p-4 pt-0 text-[#F5F2ED]">
                  <button
                    id={`btn-cart-wine-${wine.id}`}
                    onClick={(e) => handleAddToCartClick(wine, e)}
                    className={`w-full py-3 font-serif text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                      justAddedId === wine.id
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white border border-white/10'
                    }`}
                  >
                    {justAddedId === wine.id ? (
                      <>
                        <Check className="w-4 h-4" /> Served to Cellar Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {sortedWines.length === 0 && (
            <div className="col-span-full py-16 text-center border border-dashed border-white/10 bg-white/5">
              <p className="font-serif text-xl text-stone-300">No selective vintages match your query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif text-xs tracking-widest uppercase cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Sommelier Detail Slide Dialog Modal */}
      <AnimatePresence>
        {selectedWine && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWine(null)}
              className="fixed inset-0 bg-stone-950 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Body container */}
            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-4xl bg-[#0F0A0A]/95 backdrop-blur-md text-[#F5F2ED] overflow-hidden shadow-2xl border border-white/15"
              >
                {/* Close Button badge */}
                <button
                  onClick={() => setSelectedWine(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black rounded-full transition-colors cursor-pointer"
                  aria-label="Close notes"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  
                  {/* Photo Showcase Column */}
                  <div className="bg-white/5 p-8 flex flex-col justify-center items-center relative min-h-[300px] md:min-h-full border-r border-white/10">
                    <img
                      src={selectedWine.image}
                      alt={selectedWine.name}
                      referrerPolicy="no-referrer"
                      className="max-h-96 object-contain filter drop-shadow-2xl"
                    />
                    <div className="absolute bottom-4 left-6 right-6 flex justify-between text-stone-400 text-xs font-mono">
                      <span>ORIGINAL CELLAR RELEASE</span>
                      <span>{selectedWine.volume}</span>
                    </div>
                  </div>

                  {/* Sommelier review Column */}
                  <div className="p-8 sm:p-12 space-y-6 flex flex-col justify-between text-[#F5F2ED]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] tracking-widest uppercase font-sans font-bold px-3 py-1">
                          {selectedWine.type} Wine
                        </span>
                        <span className="text-[#D4AF37] font-serif text-sm tracking-wider font-semibold">
                          ESTD {selectedWine.year} VINTAGE
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
                        {selectedWine.name}
                      </h2>

                      {/* Score stars */}
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 self-start">
                        <div className="flex text-[#D4AF37]">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-current text-[#D4AF37]" />
                          ))}
                        </div>
                        <span className="font-sans text-xs text-stone-200 font-semibold border-l border-white/10 pl-2">
                          Sommelier Rating: {selectedWine.rating} / 5.0
                        </span>
                      </div>

                      <p className="font-sans text-sm text-stone-300 font-light leading-relaxed">
                        {selectedWine.longDescription}
                      </p>

                      {/* Technical specifications blocks */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-sans text-xs">
                        <div className="space-y-1">
                          <p className="text-stone-400 uppercase tracking-widest">Grapes</p>
                          <p className="text-white font-bold">{selectedWine.grapes}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-stone-400 uppercase tracking-widest">Appellation</p>
                          <p className="text-white font-bold">{selectedWine.region}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-stone-400 uppercase tracking-widest">Alcohol Strength</p>
                          <p className="text-white font-bold">{selectedWine.alcohol}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-stone-400 uppercase tracking-widest">Wine Profile</p>
                          <p className="text-white font-bold">{selectedWine.body} • {selectedWine.acidity} Acidity</p>
                        </div>
                      </div>
                    </div>

                    {/* Purchase Box */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 mt-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-stone-400 font-sans">Single Bottle Price</p>
                        <p className="font-serif text-3xl font-bold text-[#D4AF37]">${selectedWine.price}</p>
                      </div>

                      <button
                        id="btn-modal-add-cart"
                        onClick={(e) => {
                          handleAddToCartClick(selectedWine, e);
                          setSelectedWine(null);
                        }}
                        className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#c49f27] text-white hover:text-black font-serif text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4 text-black font-bold" /> <span className="text-black font-bold">Transfer to Cart</span>
                      </button>
                    </div>

                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
