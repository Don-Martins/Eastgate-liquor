/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, MapPin, DollarSign, Check, X, ShieldCheck, Ticket } from 'lucide-react';
import { EVENTS, WineEvent } from '../constant';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<WineEvent | null>(null);
  const [reservationStep, setReservationStep] = useState<'form' | 'loading' | 'ticket'>('form');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [seatsCount, setSeatsCount] = useState(2);
  const [bookedPass, setBookedPass] = useState<{
    code: string;
    event: WineEvent;
    name: string;
    email: string;
    seats: number;
    total: number;
  } | null>(null);

  const handleOpenBooking = (event: WineEvent) => {
    setSelectedEvent(event);
    setReservationStep('form');
    setGuestName('');
    setGuestEmail('');
    setSeatsCount(2);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    // Transition to loading animation
    setReservationStep('loading');

    setTimeout(() => {
      // Create reservation pass
      const code = 'LW-' + Math.floor(100000 + Math.random() * 900000);
      setBookedPass({
        code,
        event: selectedEvent!,
        name: guestName,
        email: guestEmail,
        seats: seatsCount,
        total: selectedEvent!.price * seatsCount
      });
      setReservationStep('ticket');
    }, 1800);
  };

  return (
    <section id="events" className="py-24 bg-transparent text-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] font-bold uppercase">Estate Experiences</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-tight">
            Exclusive <span className="font-serif-ital text-[#D4AF37]">Events & Tastings</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto my-4"></div>
          <p className="font-sans text-sm text-stone-300 font-light leading-relaxed">
            Unveil the secrets of viticulture with curated gatherings. From moody underground vault tastings to gourmet vineyard sunset dinners.
          </p>
        </div>

        {/* Events Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl group"
            >
              {/* Photo top */}
              <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                <img
                  src={event.image}
                  alt={event.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual pricing banner */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-[#D4AF37] text-xs font-serif font-bold tracking-widest px-3 py-1.5 uppercase border border-white/10">
                  ${event.price} / Guest
                </div>
              </div>

              {/* Event Details Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 items-center text-xs text-stone-400 font-sans font-medium">
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 text-stone-300 border border-white/5">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1 bg-red-800/15 text-red-300 font-bold px-2 py-0.5 border border-red-850/20">
                      <Users className="w-3.5 h-3.5 text-red-400" />
                      Only {event.availableSlots} Seats Left
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                    {event.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Locations details */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-sans text-stone-400">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs font-sans text-stone-400">
                    <span className="font-semibold text-stone-205">Time:</span>
                    <span>{event.time}</span>
                  </div>

                  <button
                    id={`btn-book-event-${event.id}`}
                    onClick={() => handleOpenBooking(event)}
                    className="w-full py-3 bg-white/10 hover:bg-[#D4AF37] hover:text-black hover:font-bold text-white border border-white/10 font-serif text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                  >
                    Reserve Guest Ticket
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Reservation booking interactive Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-[#0F0A0A] backdrop-blur-xs"
            ></motion.div>

            {/* Modal Body card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative bg-[#0F0A0A]/95 backdrop-blur-md text-[#F5F2ED] w-full max-w-xl shadow-2xl border border-white/15 overflow-hidden z-10"
            >
              
              {/* Top accent badge */}
              <div className="bg-black/40 text-[#F5F2ED] px-6 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-serif text-sm tracking-widest uppercase text-[#D4AF37]">Experience Booking</span>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Steps display */}
              <div className="p-6 sm:p-8">
                
                {/* 1. INPUT FORM */}
                {reservationStep === 'form' && (
                  <form onSubmit={handleConfirmBooking} className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-widest text-[#D4AF37] font-bold uppercase font-sans">You are attending</p>
                      <h4 className="font-serif text-2xl font-light text-white">{selectedEvent.title}</h4>
                      <p className="text-xs text-stone-400 font-sans font-light">{selectedEvent.date} @ {selectedEvent.time}</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/10">
                      
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-450 font-sans">Full Name</label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Lord/Lady Sterling"
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:border-[#D4AF37] focus:outline-none text-sm font-sans"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-450 font-sans">Email Address</label>
                        <input
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="connoisseur@eastgateliquidgate.com"
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:border-[#D4AF37] focus:outline-none text-sm font-sans"
                        />
                      </div>

                      {/* Seat Count Selection */}
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 font-sans">Guest Attendance</label>
                          <p className="text-xs text-stone-450 font-light">Price list is ${selectedEvent.price} / seat</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setSeatsCount(Math.max(1, seatsCount - 1))}
                            className="w-8 h-8 rounded-full border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center font-bold text-[#F5F2ED] bg-transparent cursor-pointer transition-colors"
                          >
                            -
                          </button>
                          <span className="font-serif text-lg font-bold w-4 text-center text-white">{seatsCount}</span>
                          <button
                            type="button"
                            onClick={() => setSeatsCount(Math.min(8, seatsCount + 1))}
                            className="w-8 h-8 rounded-full border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center font-bold text-[#F5F2ED] bg-transparent cursor-pointer transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Subtotal Calculation */}
                    <div className="bg-white/5 border border-white/10 p-4 flex items-center justify-between">
                      <span className="font-sans text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Total Bill Estimate</span>
                      <span className="font-serif text-2xl font-bold text-white">${selectedEvent.price * seatsCount}</span>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      id="btn-confirm-booking-submit"
                      className="w-full py-4 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    >
                      Authenticate My Pass
                    </button>
                  </form>
                )}

                {/* 2. LOADING SPIN */}
                {reservationStep === 'loading' && (
                  <div className="py-12 flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#D4AF37] animate-spin"></div>
                    <p className="font-serif text-base text-stone-200">Verifying cellar availability...</p>
                    <p className="font-sans text-[10px] tracking-widest text-[#D4AF37] uppercase">Avenge transaction security</p>
                  </div>
                )}

                {/* 3. FINAL BOARDING TICKET RECEIVED */}
                {reservationStep === 'ticket' && bookedPass && (
                  <div className="space-y-6">
                    {/* Visual Success */}
                    <div className="text-center space-y-2">
                      <div className="mx-auto w-12 h-12 bg-emerald-700/10 text-emerald-400 border border-emerald-700/30 rounded-full flex items-center justify-center mb-2">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-2xl text-emerald-400 font-medium">Reservation Sealed!</h4>
                      <p className="font-sans text-xs text-stone-400 font-light">We sent a confirmation voucher to {bookedPass.email}</p>
                    </div>

                    {/* Custom boarding Ticket shape */}
                    <div className="border border-white/15 bg-white/5 text-white rounded-none relative overflow-hidden shadow-xl">
                      {/* Ticket notches on left and right borders */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#0F0A0A] border-r border-white/15 rounded-r-full -ml-2 z-20"></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#0F0A0A] border-l border-white/15 rounded-l-full -mr-2 z-20"></div>

                      <div className="p-6 border-b border-dashed border-white/10 space-y-2 relative">
                        <span className="font-sans text-[9px] tracking-[0.25em] text-[#D4AF37] font-bold uppercase block">Official Pass receipt</span>
                        <h5 className="font-serif text-lg text-white tracking-wide">{bookedPass.event.title}</h5>
                        <div className="flex flex-wrap gap-4 text-xs font-sans text-stone-400 pt-1">
                          <span>{bookedPass.event.date}</span>
                          <span>|</span>
                          <span>{bookedPass.event.time}</span>
                        </div>
                      </div>

                      <div className="p-6 grid grid-cols-2 gap-4 text-xs font-sans">
                        <div>
                          <p className="text-stone-450 uppercase tracking-widest text-[9px]">Attendee</p>
                          <p className="text-white font-semibold mt-1">{bookedPass.name}</p>
                        </div>
                        <div>
                          <p className="text-stone-450 uppercase tracking-widest text-[9px]">Pass Identifier</p>
                          <p className="text-[#D4AF37] font-mono font-bold mt-1">{bookedPass.code}</p>
                        </div>
                        <div>
                          <p className="text-stone-450 uppercase tracking-widest text-[9px]">Guest Count</p>
                          <p className="text-white font-semibold mt-1">{bookedPass.seats} Seats Reserved</p>
                        </div>
                        <div>
                          <p className="text-stone-450 uppercase tracking-widest text-[9px]">Status</p>
                          <p className="text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> PAID CERTIFIED
                          </p>
                        </div>
                      </div>

                      {/* Fake code display strip */}
                      <div className="bg-black/40 px-6 py-4 flex justify-between items-center border-t border-white/10">
                        <div className="font-mono text-stone-500 tracking-[0.3em] select-none text-[10px]">
                          *LW-{bookedPass.code}-ESTATE*
                        </div>
                        <span className="font-serif text-sm font-bold text-[#D4AF37]">${bookedPass.total}</span>
                      </div>
                    </div>

                    {/* OK button */}
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="w-full py-3.5 bg-white/10 hover:bg-[#D4AF37] hover:text-black hover:font-bold text-white border border-white/10 font-serif text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    >
                      Print and Close Voucher
                    </button>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
