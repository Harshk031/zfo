'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import Script from 'next/script';

const WebGLScene = dynamic(() => import('@/components/webgl/WebGLScene'), { ssr: false });

const OPTIONS = [
  {
    id: 'single',
    qty: 1,
    name: 'Single Bottle',
    sub: '275ml Glass Breezer Bottle',
    price: 45,
    originalPrice: 80,
    burst: 0.3,
    glow: 'rgba(250,204,21,0.5)',
    color: '#facc15',
  },
  {
    id: 'combo',
    qty: 4,
    name: 'Combo of 4',
    sub: '4 × 275ml Glass Bottles',
    price: 169,
    originalPrice: 320,
    burst: 0.4,
    glow: 'rgba(239,68,68,0.5)',
    color: '#ef4444',
  },
];

const CTA_TEXTS = [
  'SEND THE FIZZ →',
  'DROP THE BOTTLE →',
  'FUEL MY THIRST →',
  'LET IT POP →',
];

export default function OrderRitual() {
  const [selectedId, setSelectedId] = useState('single');
  const [phase, setPhase] = useState('idle'); // idle | loading | confirmed | error
  const [ctaText] = useState(() => CTA_TEXTS[Math.floor(Math.random() * CTA_TEXTS.length)]);
  
  // Custom details for the order
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', email: '', address: '' });
  
  const containerRef = useRef(null);
  const bottleRef = useRef(null);
  const confirmRef = useRef(null);

  const selectedOption = OPTIONS.find(o => o.id === selectedId) || OPTIONS[0];

  const handlePayment = async () => {
    // Basic validation
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      alert("Please fill your basic details to summon the bottle.");
      return;
    }

    setPhase('loading');
    
    try {
      // 1. Create order on our backend
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          optionId: selectedOption.id,
          amount: selectedOption.price,
          customerDetails
        }),
      });
      
      const order = await res.json();
      
      if (!order || !order.id) {
        throw new Error("Failed to create Razorpay Order");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // fallback to prevent crash in dev
        amount: selectedOption.price * 100, // amount in paise
        currency: 'INR',
        name: 'Freshozz (ZfO)',
        description: `Order for ${selectedOption.name}`,
        image: 'https://www.zfo.co.in/logo.png',
        order_id: order.id,
        handler: async function (response) {
          // Payment Success
          
          // Verify signature on backend
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              internalOrderId: order.internalId
            })
          });
          
          if (verifyRes.ok) {
            handleSuccess();
          } else {
            alert("Payment verification failed. If money was deducted, it will be refunded.");
            setPhase('idle');
          }
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email || '',
          contact: customerDetails.phone
        },
        theme: {
          color: '#facc15'
        },
        modal: {
          ondismiss: function() {
            setPhase('idle');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        alert("Payment Failed: " + response.error.description);
        setPhase('idle');
      });
      rzp.open();
      
    } catch (error) {
      console.error(error);
      alert("Something went wrong initializing the payment.");
      setPhase('idle');
    }
  };

  const handleSuccess = () => {
    setPhase('summon');
    if (bottleRef.current) {
      gsap.to(bottleRef.current, {
        scale: 1.08, y: -12, duration: 0.5, ease: 'power2.out',
        yoyo: true, repeat: 1,
      });
    }
    setTimeout(() => {
      setPhase('confirmed');
      if (confirmRef.current) {
        gsap.fromTo(confirmRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }
        );
      }
    }, 1800);
  };

  const scrollP = selectedOption.burst;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#050508] flex flex-col items-center justify-center px-6 py-16 overflow-x-hidden"
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* WebGL background */}
      <div className="absolute inset-0">
        <WebGLScene scrollProgress={scrollP} burstActive={phase === 'summon'} />
      </div>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.9) 100%)' }} />

      {phase !== 'confirmed' && (
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start justify-center pt-10">
          
          {/* LEFT: Product Selection */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-white/30 uppercase tracking-[0.4em] text-xs font-bold mb-4">
              Masala Soda
            </p>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-4">
              Send The Fizz
            </h1>
            <p className="text-white/50 text-base font-light mb-8 max-w-sm">
              Real spices. Glass bottles. Caffeine kick. Crafted for the modern palate.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-sm">
              {OPTIONS.map((opt) => {
                const isActive = selectedId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedId(opt.id)}
                    className="group relative rounded-2xl border transition-all duration-300 p-5 text-left overflow-hidden flex justify-between items-center"
                    style={{
                      borderColor: isActive ? opt.color : 'rgba(255,255,255,0.08)',
                      background: isActive ? `rgba(${opt.glow.slice(5,-1)}, 0.08)` : 'rgba(255,255,255,0.02)',
                      boxShadow: isActive ? `0 0 40px ${opt.glow}, inset 0 0 20px ${opt.glow.replace('0.5', '0.05')}` : 'none',
                    }}
                  >
                    <div className="relative z-10">
                      <h3 className="text-white font-black uppercase tracking-tight text-lg mb-1">{opt.name}</h3>
                      <p className="text-white/40 text-xs font-light">{opt.sub}</p>
                    </div>
                    
                    <div className="relative z-10 text-right">
                      <p className="text-white/30 text-xs line-through mb-0.5">₹{opt.originalPrice}</p>
                      <p className="text-2xl font-black" style={{ color: isActive ? opt.color : 'white' }}>₹{opt.price}</p>
                    </div>

                    {/* Particle glow corner */}
                    <div
                      className="absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"
                      style={{ background: opt.color, opacity: isActive ? 0.3 : 0 }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Delivery Details */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 max-w-sm mt-8 md:mt-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-white uppercase font-bold tracking-widest text-sm mb-4 border-b border-white/10 pb-4">Summoning Details</h3>
              
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                />
                
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                />
                
                <textarea 
                  placeholder="Delivery Address" 
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-white/50 text-sm">Total to pay:</span>
              <span className="text-3xl font-black text-white">₹{selectedOption.price}</span>
            </div>

            {/* CTA */}
            <button
              ref={bottleRef}
              onClick={handlePayment}
              disabled={phase === 'loading'}
              className="relative group w-full py-5 rounded-full font-black text-black uppercase tracking-widest text-base transition-all duration-500 overflow-hidden disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, ${selectedOption.color}, white)`,
                boxShadow: `0 0 40px ${selectedOption.glow}`
              }}
            >
              <span className="relative z-10 text-center block w-full">
                {phase === 'loading' ? 'SUMMONING...' : `${ctaText} ₹${selectedOption.price}`}
              </span>
              <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
            <p className="text-white/20 text-xs text-center">Secure payments via Razorpay</p>
          </div>
          
        </div>
      )}

      {/* Confirmation screen */}
      {phase === 'confirmed' && (
        <div ref={confirmRef} className="relative z-10 text-center opacity-0 max-w-2xl mx-auto">
          <div className="text-6xl mb-8 animate-bounce">🍾</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
            Your Fizz Has Escaped The Factory.
          </h2>
          <p className="text-white/50 text-lg mb-2">
            Order confirmed for {customerDetails.name}
          </p>
          <p className="text-white/70 font-bold text-xl mb-12">
            {selectedOption.name} · Paid ₹{selectedOption.price}
          </p>
          <a
            href="/"
            className="inline-block px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Back to the Universe
          </a>
        </div>
      )}
    </div>
  );
}
