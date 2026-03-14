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
    name: 'Single',
    tagline: 'THE SOLO MISSION',
    sub: '275ml Glass Breezer Bottle',
    price: 45,
    originalPrice: 80,
    burst: 0.3,
    glow: '#facc15',
    accent: 'rgba(250,204,21,0.15)',
    savings: 44,
  },
  {
    id: 'combo',
    qty: 4,
    name: 'Combo ×4',
    tagline: 'SQUAD GOALS',
    sub: '4 × 275ml Glass Bottles',
    price: 169,
    originalPrice: 320,
    burst: 0.55,
    glow: '#f97316',
    accent: 'rgba(249,115,22,0.15)',
    savings: 47,
  },
];

export default function OrderRitual() {
  const [selectedId, setSelectedId] = useState('single');
  const [phase, setPhase] = useState('idle');
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '' });
  const [activeField, setActiveField] = useState(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const confirmRef = useRef(null);
  const cardRefs = useRef([]);

  const selectedOption = OPTIONS.find(o => o.id === selectedId) || OPTIONS[0];

  // Reactive cursor glow on the page
  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGlowPos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Animate card selection
  useEffect(() => {
    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const isActive = OPTIONS[i].id === selectedId;
      gsap.to(ref, {
        scale: isActive ? 1.03 : 1,
        y: isActive ? -4 : 0,
        duration: 0.4,
        ease: 'power3.out',
      });
    });
  }, [selectedId]);

  const handlePayment = async () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      // Shake the form
      gsap.fromTo(formRef.current,
        { x: -8 }, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.3)', repeat: 3, yoyo: true }
      );
      return;
    }
    setPhase('loading');

    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          optionId: selectedOption.id,
          amount: selectedOption.price,
          customerDetails,
        }),
      });
      const order = await res.json();
      if (!order || !order.id) throw new Error('Failed to create order');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: selectedOption.price * 100,
        currency: 'INR',
        name: 'ZfO',
        description: `${selectedOption.name} — ${selectedOption.sub}`,
        image: 'https://www.zfo.co.in/logo.png',
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              internalOrderId: order.internalId,
            }),
          });
          if (verifyRes.ok) handleSuccess();
          else { alert('Verification failed. Refund will be processed.'); setPhase('idle'); }
        },
        prefill: { name: customerDetails.name, contact: customerDetails.phone },
        theme: { color: selectedOption.glow },
        modal: { ondismiss: () => setPhase('idle') },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (r) => { alert('Payment Failed: ' + r.error.description); setPhase('idle'); });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
      setPhase('idle');
    }
  };

  const handleSuccess = () => {
    setPhase('confirmed');
    setTimeout(() => {
      if (confirmRef.current) {
        gsap.fromTo(confirmRef.current, { opacity: 0, scale: 0.85, y: 40 }, {
          opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.7)',
        });
      }
    }, 50);
  };

  if (phase === 'confirmed') {
    return (
      <div className="relative min-h-screen bg-[#050508] flex items-center justify-center overflow-hidden" ref={containerRef}>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <div className="absolute inset-0" style={{ width: '100vw', height: '100vh' }}>
          <WebGLScene scrollProgress={0.8} burstActive={true} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
        <div ref={confirmRef} className="relative z-10 text-center px-6 max-w-xl mx-auto opacity-0">
          <div className="text-7xl mb-8">🍾</div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 leading-none">
            IT'S FIZZING<br/>
            <span style={{ color: selectedOption.glow }}>YOUR WAY.</span>
          </h1>
          <p className="text-white/50 text-lg mb-2">Order confirmed for <span className="text-white font-bold">{customerDetails.name}</span></p>
          <p className="text-white/40 mb-12">{selectedOption.name} · ₹{selectedOption.price} paid</p>
          <a href="/" className="inline-block px-10 py-4 border border-white/20 text-white/70 font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:text-black transition-all duration-300">
            ← Back to the Universe
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#050508] overflow-hidden"
      style={{ cursor: 'none' }}
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* FULL-BLEED WebGL canvas — position fixed so it truly fills viewport */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none" style={{ zIndex: 0 }}>
        <WebGLScene scrollProgress={selectedOption.burst} burstActive={phase === 'loading'} />
      </div>

      {/* Reactive cursor glow orb */}
      <div
        className="fixed pointer-events-none transition-opacity duration-300"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${selectedOption.glow}30 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          left: `${glowPos.x}%`,
          top: `${glowPos.y}%`,
          zIndex: 1,
        }}
      />

      {/* Custom cursor dot */}
      <div
        className="fixed pointer-events-none transition-all duration-75"
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: selectedOption.glow,
          transform: 'translate(-50%, -50%)',
          left: `${glowPos.x}%`,
          top: `${glowPos.y}%`,
          zIndex: 9999,
          boxShadow: `0 0 20px ${selectedOption.glow}`,
        }}
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: 'radial-gradient(ellipse at 50% 50%, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.85) 100%)' }} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">

        {/* Top label */}
        <div className="text-center mb-12">
          <p className="text-white/20 uppercase tracking-[0.5em] text-[10px] font-bold mb-3">
            ZfO · Masala Soda · 275ml
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none"
            style={{ textShadow: `0 0 80px ${selectedOption.glow}40` }}>
            ORDER<br/>
            <span style={{ color: selectedOption.glow, WebkitTextStroke: '1px transparent' }}>
              THE<br/>FIZZ
            </span>
          </h1>
        </div>

        {/* Option Cards - Horizontal */}
        <div className="flex flex-col sm:flex-row gap-5 mb-12 w-full max-w-2xl">
          {OPTIONS.map((opt, i) => {
            const isActive = selectedId === opt.id;
            return (
              <button
                key={opt.id}
                ref={el => cardRefs.current[i] = el}
                onClick={() => setSelectedId(opt.id)}
                className="relative flex-1 rounded-3xl p-7 text-left transition-all duration-300 overflow-hidden group"
                style={{
                  background: isActive ? opt.accent : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? opt.glow : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive ? `0 0 60px ${opt.glow}30, inset 0 1px 0 ${opt.glow}20` : 'none',
                }}
              >
                {/* Savings badge */}
                <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                  style={{ background: opt.glow + '20', color: opt.glow, border: `1px solid ${opt.glow}40` }}>
                  SAVE {opt.savings}%
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2"
                  style={{ color: isActive ? opt.glow : 'rgba(255,255,255,0.3)' }}>
                  {opt.tagline}
                </p>
                <h3 className="text-3xl font-black uppercase text-white mb-1">{opt.name}</h3>
                <p className="text-white/30 text-xs mb-6">{opt.sub}</p>

                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black" style={{ color: isActive ? opt.glow : 'white' }}>
                    ₹{opt.price}
                  </span>
                  <span className="text-white/20 text-sm line-through mb-1">₹{opt.originalPrice}</span>
                </div>

                {/* Glow border sweep on active */}
                {isActive && (
                  <div className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ boxShadow: `inset 0 0 40px ${opt.glow}10` }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Details Form */}
        <div ref={formRef} className="w-full max-w-2xl">
          <div className="rounded-3xl p-1 mb-5"
            style={{ background: `linear-gradient(135deg, ${selectedOption.glow}30, rgba(255,255,255,0.05), ${selectedOption.glow}10)` }}>
            <div className="rounded-[20px] bg-[#0a0a10] p-6">
              <p className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold mb-5">
                Drop your details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', placeholder: 'Your Name', type: 'text', span: false },
                  { key: 'phone', placeholder: 'Phone Number', type: 'tel', span: false },
                  { key: 'address', placeholder: 'Delivery Address', type: 'text', span: true },
                ].map(({ key, placeholder, type, span }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    className={`px-5 py-4 rounded-xl text-white text-sm placeholder-white/20 outline-none transition-all duration-300 ${span ? 'col-span-full' : ''}`}
                    style={{
                      background: activeField === key ? `${selectedOption.glow}10` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${activeField === key ? selectedOption.glow + '60' : 'rgba(255,255,255,0.08)'}`,
                    }}
                    value={customerDetails[key]}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, [key]: e.target.value })}
                    onFocus={() => setActiveField(key)}
                    onBlur={() => setActiveField(null)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Total + CTA */}
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/5 rounded-2xl px-6 py-4 border border-white/8">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Total</p>
              <p className="text-3xl font-black text-white">₹{selectedOption.price}</p>
            </div>

            <button
              onClick={handlePayment}
              disabled={phase === 'loading'}
              className="flex-[2] relative overflow-hidden rounded-2xl py-5 font-black uppercase tracking-widest text-base transition-all duration-300 disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, ${selectedOption.glow}, ${selectedOption.glow}cc)`,
                color: '#050508',
                boxShadow: `0 0 50px ${selectedOption.glow}50`,
              }}
            >
              <span className="relative z-10">
                {phase === 'loading' ? '⚡ LAUNCHING...' : `LET IT POP → ₹${selectedOption.price}`}
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            </button>
          </div>

          <p className="text-center text-white/15 text-xs mt-4 uppercase tracking-widest">
            🔒 Secure payments via Razorpay
          </p>
        </div>

      </div>
    </div>
  );
}
