/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { Wine } from '../constant';

export interface CartItem {
  wine: Wine;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'processing' | 'receipt'>('cart');
  
  // Checkout Shipping Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postal, setPostal] = useState('');

  // Checkout Payment Form States
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('11/30');
  const [cardCvv, setCardCvv] = useState('123');

  const [receiptCode, setReceiptCode] = useState('');

  // Cost equations
  const subtotal = cartItems.reduce((acc, item) => acc + item.wine.price * item.quantity, 0);
  const shipping = subtotal > 300 ? 0 : 25;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const handleNextToShipping = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep('shipping');
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address) return;
    setCheckoutStep('payment');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) return;

    setCheckoutStep('processing');
    
    // Simulate luxury transaction
    setTimeout(() => {
      const code = 'LW-ORD-' + Math.floor(100000 + Math.random() * 900000);
      setReceiptCode(code);
      setCheckoutStep('receipt');
    }, 2200);
  };

  const handleReceiptComplete = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950 backdrop-blur-xs"
          ></motion.div>

          {/* Drawer Right-hand panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-screen max-w-md bg-white text-stone-900 shadow-2xl border-l border-gold-300 flex flex-col justify-between h-full"
            >
              
              {/* Header Container */}
              <div className="px-6 py-5 bg-stone-950 text-stone-100 flex items-center justify-between border-b border-wine-900/40">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-gold-400" />
                  <span className="font-serif text-sm tracking-widest uppercase text-gold-300">
                    {checkoutStep === 'cart' && 'Cellar Cart'}
                    {checkoutStep === 'shipping' && 'Shipping Coordinates'}
                    {checkoutStep === 'payment' && 'Secure Check'}
                    {checkoutStep === 'processing' && 'Cellar Ledger'}
                    {checkoutStep === 'receipt' && 'Order Secured'}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-stone-850 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* DRAW PANEL SCROLL SECTION */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* 1. CART LIST VIEW */}
                {checkoutStep === 'cart' && (
                  <>
                    {cartItems.length === 0 ? (
                      <div className="py-20 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full border border-dashed border-stone-300 flex items-center justify-center mx-auto text-stone-400">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                        <p className="font-serif text-lg text-stone-500">Your basket is currently cellared empty.</p>
                        <button
                          onClick={onClose}
                          className="px-6 py-2.5 bg-stone-900 text-stone-100 hover:bg-wine-800 font-serif text-xs uppercase tracking-widest transition-luxury"
                        >
                          Return to Shop
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={item.wine.id}
                            className="flex gap-4 p-4 border border-stone-100 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                          >
                            {/* Product picture background */}
                            <div className="w-16 h-20 bg-stone-100 shrink-0 flex items-center justify-center p-1.5 border border-stone-200">
                              <img
                                src={item.wine.image}
                                alt={item.wine.name}
                                referrerPolicy="no-referrer"
                                className="h-full object-contain filter drop-shadow-md"
                              />
                            </div>

                            {/* Details, quantity modification controls */}
                            <div className="flex-1 flex flex-col justify-between">
                              <div className="space-y-0.5">
                                <span className="font-mono text-[9px] text-[#a17743] font-semibold uppercase">{item.wine.type} Wine • {item.wine.year}</span>
                                <h4 className="font-serif text-sm font-semibold text-stone-950 line-clamp-1">{item.wine.name}</h4>
                                <p className="font-serif text-sm text-wine-800 font-bold">${item.wine.price}</p>
                              </div>

                              {/* Plus/minus buttons */}
                              <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2 border border-stone-200 bg-white px-2 py-0.5 scale-90 origin-left">
                                  <button
                                    onClick={() => onUpdateQuantity(item.wine.id, item.quantity - 1)}
                                    className="p-0.5 text-stone-500 hover:text-stone-950 cursor-pointer"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="font-serif text-xs px-2 text-center font-bold">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.wine.id, item.quantity + 1)}
                                    className="p-0.5 text-stone-500 hover:text-stone-950 cursor-pointer"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => onRemoveItem(item.wine.id)}
                                  className="text-stone-400 hover:text-wine-600 p-1 scale-90 cursor-pointer"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* 2. SHIPPING DETAILS DETAILS */}
                {checkoutStep === 'shipping' && (
                  <form onSubmit={handleNextToPayment} className="space-y-5">
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-widest text-[#a17743] font-bold uppercase font-sans">Checkout Step 1 of 2</p>
                      <h3 className="font-serif text-xl font-light text-stone-950">Shipping Destination</h3>
                      <div className="w-10 h-[1.5px] bg-gold-450 mt-1"></div>
                    </div>

                    <div className="space-y-3 font-sans text-xs text-stone-600">
                      
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Lord Charles Sterling"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-wine-500 focus:outline-none font-sans text-sm"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="charles@sterlingheritage.com"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-wine-500 focus:outline-none font-sans text-sm"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Courier Phone</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 321-4924"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-wine-500 focus:outline-none font-sans text-sm"
                        />
                      </div>

                      {/* Address */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Street Address</label>
                        <textarea
                          required
                          rows={2}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="120 Vintage Row Road, Vineyard Hills"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-wine-500 focus:outline-none font-sans text-sm resize-none"
                        />
                      </div>

                      {/* Postal */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Postal / Zip Code</label>
                        <input
                          type="text"
                          required
                          value={postal}
                          onChange={(e) => setPostal(e.target.value)}
                          placeholder="94574"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-wine-500 focus:outline-none font-sans text-sm"
                        />
                      </div>

                    </div>

                    <div className="pt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('cart')}
                        className="flex-1 py-3 border border-stone-200 hover:border-gold-500 text-stone-600 font-serif text-xs uppercase tracking-widest transition-luxury rounded-none text-center"
                      >
                        Back to Basket
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-stone-900 hover:bg-wine-800 text-stone-100 font-serif text-xs uppercase tracking-widest transition-luxury rounded-none flex items-center justify-center gap-1.5"
                      >
                        Payment Methods <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

                {/* 3. PAYMENT SYSTEM SHIELD */}
                {checkoutStep === 'payment' && (
                  <form onSubmit={handleProcessPayment} className="space-y-5">
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-widest text-[#a17743] font-bold uppercase font-sans">Checkout Step 2 of 2</p>
                      <h3 className="font-serif text-xl font-light text-stone-950">Certified Secure Pay</h3>
                      <div className="w-10 h-[1.5px] bg-gold-450 mt-1"></div>
                    </div>

                    {/* Visually representation of classic credit card layout */}
                    <div className="bg-gradient-to-br from-stone-950 to-stone-850 text-white rounded-none p-5 shadow-2xl space-y-6 border border-gold-300 relative overflow-hidden font-sans">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-wine-700/10 rounded-full blur-2xl -mr-10"></div>
                      
                      <div className="flex justify-between items-center z-10 relative">
                        <CreditCard className="w-8 h-8 text-gold-300" />
                        <span className="font-serif text-[9px] tracking-widest text-gold-400 font-bold uppercase">HERITAGE RESERVE CARD</span>
                      </div>

                      {/* Display Card digits */}
                      <div className="py-2 z-10 relative font-mono text-base tracking-[0.25em] text-stone-100">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex justify-between text-xs z-10 relative text-stone-400">
                        <div>
                          <p className="uppercase text-[8px] tracking-widest">Card Holder</p>
                          <p className="text-stone-200 font-semibold truncate max-w-[150px]">{fullName || 'Arthur Sterling'}</p>
                        </div>
                        <div>
                          <p className="uppercase text-[8px] tracking-widest">VAL EXP</p>
                          <p className="text-stone-200 font-semibold">{cardExpiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3 font-sans text-xs">
                      
                      {/* Card digits input */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Card Number Number</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4111 2222 3333 4444"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-wine-500 focus:outline-none font-sans text-sm font-mono"
                        />
                      </div>

                      {/* Row Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Expiration date</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-wine-500 focus:outline-none font-sans text-sm font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Secret CVV</label>
                          <input
                            type="password"
                            required
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-wine-500 focus:outline-none font-sans text-sm font-mono"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Certified safety text */}
                    <div className="flex items-start gap-2 text-[10px] text-stone-500 bg-stone-50 border border-stone-150 p-3 italic">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Funds are protected by AES-256 merchant military standards. Secure tokenization manages data.</span>
                    </div>

                    {/* Step selection */}
                    <div className="pt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('shipping')}
                        className="flex-1 py-3 border border-stone-200 hover:border-gold-500 text-stone-600 font-serif text-xs uppercase tracking-widest transition-luxury rounded-none text-center"
                      >
                        Adjust Address
                      </button>
                      <button
                        type="submit"
                        id="btn-trigger-payment-approval"
                        className="flex-1 py-3 bg-wine-700 hover:bg-wine-800 text-stone-100 font-serif text-xs uppercase tracking-widest transition-luxury rounded-none font-bold"
                      >
                        Secure Pay ${total}
                      </button>
                    </div>
                  </form>
                )}

                {/* 4. PROCESSING TRANSACTION LAYOUT */}
                {checkoutStep === 'processing' && (
                  <div className="py-24 flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-2 border-stone-100 border-t-gold-500 animate-spin"></div>
                    <p className="font-serif text-base text-stone-700">Executing bank ledger checkout...</p>
                    <p className="font-sans text-[10px] tracking-widest text-stone-400 uppercase">Saving authentic voucher</p>
                  </div>
                )}

                {/* 5. ORDER RECEIVED RECEIPT */}
                {checkoutStep === 'receipt' && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mb-2">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-xl text-emerald-800 font-bold">Transaction Confirmed!</h4>
                      <p className="font-sans text-xs text-stone-500 font-light">Your private voucher has been cellared</p>
                    </div>

                    {/* Receipt breakdown board */}
                    <div className="border border-stone-200 bg-stone-50 p-6 space-y-4 font-sans text-xs">
                      <div className="flex justify-between border-b border-stone-200 pb-3">
                        <span className="font-bold uppercase tracking-wider text-[10px] text-[#a17743]">Receipt Summary</span>
                        <span className="font-mono text-stone-800 font-bold">{receiptCode}</span>
                      </div>

                      <div className="space-y-2 max-h-40 overflow-y-auto divide-y divide-stone-100 pr-1">
                        {cartItems.map((item) => (
                          <div key={item.wine.id} className="flex justify-between py-2 text-stone-700 items-center">
                            <div>
                              <p className="font-semibold text-stone-900">{item.wine.name}</p>
                              <p className="text-[10px] text-stone-450">{item.quantity} Bottle(s) × ${item.wine.price}</p>
                            </div>
                            <span className="font-semibold">${item.wine.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Calculations breakdown */}
                      <div className="border-t border-stone-200 pt-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Subtotal</span>
                          <span className="font-semibold text-stone-900">${subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Estate Courier Shipping</span>
                          <span className="font-semibold text-stone-900">
                            {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Reserve Excise Tax (8%)</span>
                          <span className="font-semibold text-stone-900">${tax}</span>
                        </div>
                        <div className="flex justify-between border-t border-stone-200 pt-2 font-serif text-base font-bold text-wine-800">
                          <span>Total Paid Bill</span>
                          <span>${total}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-100 text-[11px] font-sans text-[#825a33] rounded-none">
                      <p className="font-semibold">Est. Courier Hand Delivery:</p>
                      <p className="font-light mt-0.5">Your vintage wooden casks will be hand-delivered in temperature-stabilized trucks within 3 to 5 business days. Our sommelier courier will email your shipping tracker code shortly.</p>
                    </div>

                    <button
                      onClick={handleReceiptComplete}
                      id="btn-checkout-complete-clear"
                      className="w-full py-3.5 bg-stone-950 hover:bg-wine-800 text-stone-100 font-serif text-xs uppercase tracking-widest transition-luxury"
                    >
                      Clear Cart & Return Home
                    </button>
                  </div>
                )}

              </div>

              {/* FOOTER TOTAL PRICE CALCULATION SECTION (ONLY FOR CART/SHIPPING STAGES) */}
              {(checkoutStep === 'cart' || checkoutStep === 'shipping') && cartItems.length > 0 && (
                <div className="bg-stone-50 p-6 border-t border-stone-150 space-y-4">
                  <div className="space-y-1.5 font-sans text-xs">
                    <div className="flex justify-between items-center text-stone-500">
                      <span>Subtotal</span>
                      <span className="font-serif text-sm font-semibold text-stone-900">${subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-500">
                      <span>Estate Courier Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[10px] text-wine-600 font-light italic">Spend over $300 to activate free concierge transport.</p>
                    )}
                    <div className="flex justify-between items-center text-stone-500">
                      <span>Reserve Excise Tax (8%)</span>
                      <span>${tax}</span>
                    </div>
                    <div className="w-full h-[0.5px] bg-stone-200 my-2"></div>
                    <div className="flex justify-between items-center font-serif text-lg font-bold text-stone-950">
                      <span>Grand Estimate Total</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  {checkoutStep === 'cart' && (
                    <button
                      id="btn-cart-drawer-checkout-next"
                      onClick={handleNextToShipping}
                      className="w-full py-4 bg-gold-600 hover:bg-gold-550 text-stone-950 font-serif font-bold text-xs uppercase tracking-widest transition-luxury flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Proceed to Shipping
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
