/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Globe2, Award, History, ArrowRight } from 'lucide-react';
import { TIMELINE } from '../constant';

export default function WineryStory() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <section id="story" className="py-24 bg-transparent text-[#F5F2ED] overflow-hidden relative">
      {/* Editorial Watermark background */}
      <div className="absolute top-10 right-10 pointer-events-none select-none opacity-5 font-serif text-[180px] font-bold text-amber-100 hidden lg:block uppercase">
        ESTD 1895
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <p className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] font-bold uppercase">Our Legacy</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-white">
            Nurtured by Sun, <span className="font-serif-ital text-[#D4AF37]">Refined by Time</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto my-4"></div>
          <p className="font-sans text-sm text-stone-300 font-light leading-relaxed">
            The estate sits on gravelly slopes rich in quartz, absorbing dry coastal breezes in the day and radiating heat at night. Here is how we turned a modest valley field into a globally treasured wine heritage.
          </p>
        </div>

        {/* 2-Column Story Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Photo Montage */}
          <div className="relative">
            {/* Main Picture */}
            <div className="border border-white/15 p-2 sm:p-4 bg-white/5 backdrop-blur-md shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80"
                alt="Beautiful Winery table"
                referrerPolicy="no-referrer"
                className="w-full h-[350px] sm:h-[450px] object-cover filter brightness-90 saturate-75 hover:brightness-100 transition-all duration-700"
              />
            </div>

            {/* Overlapping small picture */}
            <div className="absolute -bottom-10 -right-4 sm:-right-8 w-1/2 border border-white/15 p-2 bg-white/5 backdrop-blur-md hidden sm:block shadow-2xl z-20">
              <img
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=500&q=80"
                alt="Juicy Grapes crop"
                referrerPolicy="no-referrer"
                className="w-full aspect-square object-cover filter saturate-50"
              />
            </div>

            {/* Brass accent emblem */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-white/20 flex items-center justify-center p-3 text-[#D4AF37] font-serif text-center text-[10px] uppercase leading-tight tracking-wider bg-black/60 backdrop-blur-md z-30 hidden lg:flex">
              Est. 1895<br />Napa Valley
            </div>
          </div>

          {/* Description & Brand values */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-3xl font-light text-stone-100">
                Philosophy of Pure Integrity
              </h3>
              <p className="font-sans text-sm text-stone-300 font-light leading-relaxed">
                We believe that great wines are not engineered in modern labs; they are born in the volcanic earth, nurtured by the morning sun, and guided gently into oak by patient human hands.
              </p>
              <p className="font-sans text-sm text-stone-300 font-light leading-relaxed">
                By maintaining exceptionally low yields per acre, our vine roots are forced to tunnel deep into the limestone and quartz minerals, offering our final vintages an unmatched intensity of terroir.
              </p>
            </div>

            {/* Stats row list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-none shrink-0">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#F5F2ED]">Zero Pesticide Soils</h4>
                  <p className="font-sans text-xs text-stone-400 font-light mt-1">100% natural, certified bio-dynamic vineyard management since 1998.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-none shrink-0">
                  <Globe2 className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#F5F2ED]">Old World Oak Aging</h4>
                  <p className="font-sans text-xs text-stone-400 font-light mt-1">Maturation solely utilizing toasted Slavonian and French timber casks.</p>
                </div>
              </div>
            </div>

            {/* Quote block */}
            <div className="bg-white/5 border border-white/10 border-l-2 border-l-[#D4AF37] p-6 italic text-stone-200 text-sm font-serif backdrop-blur-md">
              "A bottle of fine wine is a living time capsule. It catalogs the moisture of the winter, the strength of the summer, and the culture of the hands that held the shear."
              <p className="mt-2 text-right text-xs not-italic uppercase tracking-widest text-[#D4AF37] font-sans font-semibold">— Marcus de Sterling, Vintner Emeritus</p>
            </div>
          </div>

        </div>

        {/* Timeline Interactive Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-10">
            <History className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-2xl font-light text-[#F5F2ED] tracking-wider uppercase">Our Historical Epochs</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Timeline Stepper Buttons */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 lg:border-r border-white/10 pr-0 lg:pr-8 scrollbar-none">
              {TIMELINE.map((milestone, i) => (
                <button
                  key={milestone.year}
                  onClick={() => setActiveMilestone(i)}
                  className={`px-4 py-3 text-left font-serif text-sm tracking-widest uppercase transition-all duration-300 shrink-0 border-b-2 lg:border-b-0 lg:border-l-2 cursor-pointer ${
                    activeMilestone === i
                      ? 'border-[#D4AF37] bg-white/10 text-[#D4AF37]'
                      : 'border-transparent text-stone-400 hover:text-white hover:bg-white/5'
                  }`}
                  id={`btn-timeline-year-${milestone.year}`}
                >
                  <span className="font-sans font-bold text-xs text-[#D4AF37]/60 block mb-0.5">ERA METRIC</span>
                  <span className="text-lg font-medium">{milestone.year} • {milestone.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Stepper Details */}
            <div className="lg:col-span-8 min-h-[180px] flex flex-col justify-center pl-0 lg:pl-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <span className="font-sans text-6xl sm:text-7xl font-bold tracking-tight text-[#D4AF37]/25 block leading-none">
                    {TIMELINE[activeMilestone].year}
                  </span>
                  <h4 className="font-serif text-2xl font-medium text-white leading-relaxed">
                    {TIMELINE[activeMilestone].title}
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-stone-300 font-light leading-relaxed">
                    {TIMELINE[activeMilestone].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
