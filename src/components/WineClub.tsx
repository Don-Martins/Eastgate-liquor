/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, X, Shield, Star, Award, HeartHandshake } from 'lucide-react';
import { CLUB_TIERS, ClubTier } from '../constant';

export default function WineClub() {
  const [selectedTier, setSelectedTier] = useState<ClubTier | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');
  const [winePreference, setWinePreference] = useState<'reds' | 'whites' | 'mixed'>('mixed');
  const [clubFormStep, setClubFormStep] = useState<'details' | 'success'>('details');

  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const calculatePrice = (basePrice: number) => {
    if (billingPeriod === 'annually') {
      const yearTotalWithDiscount = basePrice * 12 * 0.8; // 20% discount
      return Math.round(yearTotalWithDiscount / 12);
    }
    return basePrice;
  };

  const handleOpenClubSignup = (tier: ClubTier) => {
    setSelectedTier(tier);
    setClubFormStep('details');
    setShippingName('');
    setShippingEmail('');
    setShippingAddress('');
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingEmail || !shippingAddress) return;
    setClubFormStep('success');
  };

  return (
    <section id="club" className="py-24 bg-transparent text-[#F5F2ED] overflow-hidden relative">
      {/* Decorative background vectors */}
      <div className="absolute inset-0 bg-transparent z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] font-bold uppercase">The Alliance</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-tight">
            The Sovereign <span className="font-serif-ital text-[#D4AF37]">Wine Clubs</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto my-4"></div>
          <p className="font-sans text-sm text-stone-300 font-light leading-relaxed">
            Sovereignty has its privileges. Secure private vintage assignments, direct vintner access, estate lounge passes, and bespoke local deliveries.
          </p>
        </div>

        {/* Annual vs Monthly Toggle controller */}
        <div className="flex justify-center mb-16">
          <div className="bg-black/40 border border-white/10 p-1.5 flex items-center backdrop-blur-md">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 font-serif text-xs uppercase tracking-widest transition-all duration-300 rounded-none cursor-pointer ${
                billingPeriod === 'monthly'
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Deliver Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annually')}
              className={`px-6 py-2.5 font-serif text-xs uppercase tracking-widest transition-all duration-300 rounded-none cursor-pointer flex items-center gap-1.5 ${
                billingPeriod === 'annually'
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Annually (Save 20%)
              <span className="bg-red-800/20 text-red-300 text-[8px] font-sans px-1.5 py-0.5 font-bold uppercase tracking-normal border border-red-800/10">Offer</span>
            </button>
          </div>
        </div>

        {/* Pricing tiers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLUB_TIERS.map((tier) => {
            const calculatedPrice = calculatePrice(tier.price);
            const totalAnnuallyText = billingPeriod === 'annually' ? `Billed $${calculatedPrice * 12}/year` : 'Billed monthly';
            
            return (
              <div
                key={tier.id}
                className={`bg-white/5 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-2xl ${
                  tier.popular
                    ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30 lg:scale-[1.03] lg:-translate-y-1'
                    : 'border-white/10'
                }`}
              >
                {/* Popular banner badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[9px] tracking-widest uppercase py-1.5 px-6 font-sans font-black rotate-45 translate-x-7 translate-y-3 shadow-sm">
                    Revered
                  </div>
                )}

                <div className="p-8 sm:p-10 space-y-6">
                  {/* Badge & Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#D4AF37]" />
                      <span className="font-sans text-[10px] tracking-widest text-[#D4AF37] font-bold uppercase">
                        {tier.badge} Tier Privilege
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-light text-white">{tier.name}</h3>
                    <p className="font-sans text-xs text-stone-300 font-light leading-relaxed min-h-[40px]">
                      {tier.tagline}
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-white/10"></div>

                  {/* Price display tag */}
                  <div className="space-y-1">
                    <div className="flex items-baseline">
                      <span className="font-serif text-4xl font-bold font-serif-ital text-[#D4AF37]">${calculatedPrice}</span>
                      <span className="font-sans text-stone-400 text-sm ml-2">/ month</span>
                    </div>
                    <span className="block font-sans text-[10px] tracking-wider text-[#D4AF37]/60 uppercase">
                      {totalAnnuallyText}
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-white/10"></div>

                  {/* Highlights benefits */}
                  <ul className="space-y-3 text-xs sm:text-sm font-sans text-stone-250 font-light">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscribing CTA */}
                <div className="p-8 sm:p-10 pt-0">
                  <button
                    id={`btn-join-club-${tier.id}`}
                    onClick={() => handleOpenClubSignup(tier)}
                    className={`w-full py-4 font-serif text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      tier.popular
                        ? 'bg-[#D4AF37] hover:bg-[#c49f27] text-black font-bold'
                        : 'bg-white/10 border border-white/10 hover:border-[#D4AF37] text-white hover:text-black hover:font-bold'
                    }`}
                  >
                    Enroll in {tier.name}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Club Joining Interactive Form Drawer/Modal */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTier(null)}
              className="fixed inset-0 bg-[#0F0A0A] backdrop-blur-xs"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative bg-[#0F0A0A]/95 backdrop-blur-md text-[#F5F2ED] w-full max-w-xl border border-white/15 shadow-2xl overflow-hidden z-10"
            >
              
              {/* Header */}
              <div className="bg-black/40 px-6 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-serif text-xs uppercase tracking-widest text-[#D4AF37]">{selectedTier.name} Enrollment</span>
                </div>
                <button
                  onClick={() => setSelectedTier(null)}
                  className="p-1 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                
                {/* DETAILS STEP REGISTRATION */}
                {clubFormStep === 'details' && (
                  <form onSubmit={handleJoinSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl text-white font-light">Confirm Your Membership details</h4>
                      <p className="font-sans text-xs text-stone-450 leading-relaxed">
                        Become a selective member. Monthly boxes contain hand-sealed estate vintages paired with deep sommelier literature.
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/10">
                      
                      {/* Form Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-405 font-sans">Full Name</label>
                          <input
                            type="text"
                            required
                            value={shippingName}
                            onChange={(e) => setShippingName(e.target.value)}
                            placeholder="Arthur de Sterling"
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none text-sm text-white placeholder-stone-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-405 font-sans">Email Address</label>
                          <input
                            type="email"
                            required
                            value={shippingEmail}
                            onChange={(e) => setShippingEmail(e.target.value)}
                            placeholder="arthur@sterling.com"
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none text-sm text-white placeholder-stone-500"
                          />
                        </div>
                      </div>

                      {/* Shipments preference */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 font-sans">Wine Selections Preference</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'reds', label: 'All Reds' },
                            { id: 'whites', label: 'All Whites' },
                            { id: 'mixed', label: 'Mixed Select' }
                          ].map((pref) => (
                            <button
                              key={pref.id}
                              type="button"
                              onClick={() => setWinePreference(pref.id as any)}
                              className={`py-2 text-center text-xs font-serif transition-colors rounded-none border cursor-pointer ${
                                winePreference === pref.id
                                  ? 'bg-white/10 border-[#D4AF37] text-[#D4AF37]'
                                  : 'bg-transparent border-white/10 text-stone-400 hover:border-white/20'
                              }`}
                            >
                              {pref.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Shipping address */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 font-sans">Private Delivery Address</label>
                        <textarea
                          required
                          rows={2}
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="St. Helena High Road, Napa Valley CA 94574"
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#D4AF37] focus:outline-none text-sm text-white resize-none placeholder-stone-500"
                        />
                      </div>

                    </div>

                    {/* Costing calculation brief */}
                    <div className="bg-black/40 p-4 border border-white/10 flex items-center justify-between text-xs sm:text-sm font-sans">
                      <div>
                        <p className="text-[#D4AF37] font-serif font-bold uppercase tracking-widest text-[9px]">{selectedTier.name}</p>
                        <p className="text-stone-400 font-light">
                          {billingPeriod === 'annually' ? 'Annual Subscription' : 'Monthly Subscription'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-xl font-bold text-white">${calculatePrice(selectedTier.price)}</span>
                        <span className="text-stone-400 text-xs font-light">/mo</span>
                      </div>
                    </div>

                    {/* Submit Register */}
                    <button
                      type="submit"
                      id="btn-confirm-club-submit"
                      className="w-full py-4 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    >
                      Authenticate Membership
                    </button>
                  </form>
                )}

                {/* SUCCESS SEALS REGISTRATION */}
                {clubFormStep === 'success' && (
                  <div className="space-y-6 text-center">
                    
                    {/* Visual Stamp Certificate representation */}
                    <div className="border border-[#D4AF37]/45 p-8 bg-black/40 rounded-none space-y-4 max-w-sm mx-auto relative overflow-hidden backdrop-blur-md">
                      {/* Golden crest detail */}
                      <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center mx-auto mb-2 bg-white/5">
                        <Award className="w-8 h-8 text-[#D4AF37] animate-pulse" />
                      </div>

                      <div className="space-y-1">
                        <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-[#D4AF37] block leading-none">Official Covenant</span>
                        <h5 className="font-serif text-xl text-stone-100 tracking-wider">CERTIFICATE of ALLIANCE</h5>
                        <p className="font-sans text-[9px] text-stone-450 italic">The Sovereign Cabinet Reserve Council</p>
                      </div>

                      <div className="w-12 h-[0.5px] bg-[#D4AF37]/30 mx-auto"></div>

                      <p className="font-serif text-sm text-stone-300 font-light leading-relaxed">
                        Hereby certifies that <span className="font-bold text-white block underline py-1 font-serif-ital">{shippingName}</span> is inducted into the esteemed order of <span className="font-bold text-[#D4AF37] block">{selectedTier.name}</span>.
                      </p>

                      <div className="pt-2 flex justify-between items-center text-[10px] font-sans text-stone-500">
                        <span>SERIES CA-1895</span>
                        <span>ISSUED IN NAPA</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl text-[#D4AF37] font-light">Welcome to the Vintage Order!</h4>
                      <p className="font-sans text-xs text-stone-450 max-w-md mx-auto leading-relaxed">
                        Your verification was successful and your VIP profile code is now active. Your first batch of reserve {winePreference} is scheduled for carbon-neutral estate delivery this Thursday.
                      </p>
                    </div>

                    {/* Finish CTA */}
                    <button
                      onClick={() => setSelectedTier(null)}
                      className="w-full py-3.5 bg-white/10 hover:bg-[#D4AF37] hover:text-black hover:font-bold text-white border border-white/10 font-serif text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    >
                      Step Inside the Vault
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
