'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
    accent: 'rgba(250,204,21,0.12)',
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
    accent: 'rgba(249,115,22,0.12)',
    savings: 47,
  },
];

// Iconic Hinglish validation messages
const GADBAD_MSGS = [
  { title: 'Kuch toh gadbad hai, Dayaa! 🤔', sub: 'Seedha baat, naam daalna bhool gaye?' },
  { title: 'Arre yaar, kahan gaye tum? 🙈', sub: 'Form bhi fill karna padta hai bhai.' },
  { title: 'Intezaar mat karwao! ⚡', sub: 'Thoda sa detail doge toh soda aayega na?' },
  { title: 'Alert: Missing Vibes 🚨', sub: 'Naam, phone, pata — teen bandhe chahiye.' },
];

// Simple field validation
function validateDetails(details) {
  const errors = {};
  if (!details.name.trim() || details.name.trim().length < 2)
    errors.name = 'Naam toh batao yaar';
  if (!details.phone.trim() || !/^\d{10}$/.test(details.phone.replace(/\s/g, '')))
    errors.phone = 'Valid 10-digit phone chahiye';
  if (!details.address.trim() || details.address.trim().length < 10)
    errors.address = 'Proper address likhna hai na?';
  return errors;
}

/* ─────────────────────────────────────────
   Gadbad Alert Component
───────────────────────────────────────── */
function GadbadAlert({ msg, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
    const t = setTimeout(() => {
      gsap.to(ref.current, { y: 80, opacity: 0, scale: 0.9, duration: 0.4, ease: 'power3.in', onComplete: onClose });
    }, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed bottom-8 left-1/2 z-[9999] pointer-events-auto"
      style={{ transform: 'translateX(-50%)', minWidth: 320, maxWidth: 420 }}
    >
      <div
        className="rounded-2xl p-5 flex items-start gap-4 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(220,38,38,0.08))',
          border: '1px solid rgba(239,68,68,0.4)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px rgba(239,68,68,0.3)',
        }}
      >
        {/* Animated warning icon */}
        <div
          className="text-3xl flex-shrink-0"
          style={{ animation: 'wobble 0.5s ease-in-out 2' }}
        >
          ⚠️
        </div>
        <div className="flex-1">
          <p className="text-white font-black text-base leading-tight mb-1">{msg.title}</p>
          <p className="text-white/50 text-sm">{msg.sub}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/30 hover:text-white text-xl leading-none ml-2 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Order Page
───────────────────────────────────────── */
export default function OrderRitual() {
  const [selectedId, setSelectedId] = useState('single');
  const [phase, setPhase] = useState('idle');
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [gadbadMsg, setGadbadMsg] = useState(null);
  const [gadbadKey, setGadbadKey] = useState(0);

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const confirmRef = useRef(null);
  const cardRefs = useRef([]);
  const fieldRefs = useRef({});

  const selectedOption = OPTIONS.find(o => o.id === selectedId) || OPTIONS[0];

  // Reactive cursor glow
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setGlowPos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Card selection animation
  useEffect(() => {
    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const isActive = OPTIONS[i].id === selectedId;
      gsap.to(ref, { scale: isActive ? 1.03 : 1, y: isActive ? -4 : 0, duration: 0.35, ease: 'power3.out' });
    });
  }, [selectedId]);

  const showGadbad = useCallback((errors) => {
    // Pick a random gadbad message
    const msg = GADBAD_MSGS[Math.floor(Math.random() * GADBAD_MSGS.length)];
    // Customize sub-text based on specific missing field
    const keys = Object.keys(errors);
    const field = fieldRefs.current[keys[0]];
    if (field) {
      gsap.fromTo(field, { x: -8 }, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.3)', repeat: 4, yoyo: true });
    }
    // Shake form
    if (formRef.current) {
      gsap.fromTo(formRef.current, { x: -6 }, { x: 0, duration: 0.3, ease: 'elastic.out(1,0.3)', repeat: 2, yoyo: true });
    }
    setGadbadMsg(msg);
    setGadbadKey(k => k + 1);
  }, []);

  const handlePayment = async () => {
    const errors = validateDetails(customerDetails);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      showGadbad(errors);
      return;
    }
    setFieldErrors({});
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

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }

      const order = await res.json();
      if (!order || !order.id) throw new Error('Invalid order response from server');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: selectedOption.price * 100,
        currency: 'INR',
        name: 'ZfO',
        description: `${selectedOption.name} — ${selectedOption.sub}`,
        image: 'https://www.zfo.co.in/logo.png',
        order_id: order.id,
        handler: async (response) => {
          try {
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
            if (verifyRes.ok) {
              handleSuccess();
            } else {
              alert('Payment verification failed. Your money is safe — contact us at beverages@zfo.co.in');
              setPhase('idle');
            }
          } catch {
            alert('Verification error. Contact us at beverages@zfo.co.in');
            setPhase('idle');
          }
        },
        prefill: { name: customerDetails.name, contact: customerDetails.phone },
        theme: { color: selectedOption.glow },
        modal: { ondismiss: () => setPhase('idle') },
      };

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh the page.');
      }

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (r) => {
        alert('Payment failed: ' + (r?.error?.description || 'Unknown error'));
        setPhase('idle');
      });
      rzp.open();

    } catch (err) {
      console.error('Payment error:', err);
      alert('Error: ' + err.message);
      setPhase('idle');
    }
  };

  const handleSuccess = () => {
    setPhase('confirmed');
    setTimeout(() => {
      if (confirmRef.current) {
        gsap.fromTo(confirmRef.current,
          { opacity: 0, scale: 0.85, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.7)' }
        );
      }
    }, 50);
  };

  // ── Confirmation screen ──
  if (phase === 'confirmed') {
    return (
      <div className="relative min-h-screen bg-[#050508] flex items-center justify-center overflow-hidden">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <div className="fixed inset-0 w-screen h-screen pointer-events-none" style={{ zIndex: 0 }}>
          <WebGLScene scrollProgress={0.8} burstActive={true} />
        </div>
        <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
        <div ref={confirmRef} className="relative z-10 text-center px-6 max-w-xl mx-auto opacity-0">
          <div className="text-7xl mb-8">🍾</div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 leading-none">
            IT'S FIZZING<br/>
            <span style={{ color: selectedOption.glow }}>YOUR WAY.</span>
          </h1>
          <p className="text-white/50 text-lg mb-2">
            Order confirmed for <span className="text-white font-bold">{customerDetails.name}</span>
          </p>
          <p className="text-white/40 mb-12">{selectedOption.name} · ₹{selectedOption.price} paid 🎉</p>
          <a
            href="/"
            className="inline-block px-10 py-4 border border-white/20 text-white/70 font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            ← Back to the Universe
          </a>
        </div>
      </div>
    );
  }

  // ── Main order screen ──
  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050508] overflow-hidden" style={{ cursor: 'none' }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Gadbad alert */}
      {gadbadMsg && (
        <GadbadAlert key={gadbadKey} msg={gadbadMsg} onClose={() => setGadbadMsg(null)} />
      )}

      {/* Full-bleed WebGL background */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none" style={{ zIndex: 0 }}>
        <WebGLScene scrollProgress={selectedOption.burst} burstActive={phase === 'loading'} />
      </div>

      {/* Cursor glow orb */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${selectedOption.glow}25 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          left: `${glowPos.x}%`,
          top: `${glowPos.y}%`,
          zIndex: 1,
          transition: 'left 0.1s, top 0.1s, background 0.5s',
        }}
      />
      {/* Cursor dot */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: selectedOption.glow,
          transform: 'translate(-50%, -50%)',
          left: `${glowPos.x}%`,
          top: `${glowPos.y}%`,
          zIndex: 9999,
          boxShadow: `0 0 16px ${selectedOption.glow}`,
          transition: 'background 0.5s',
        }}
      />

      {/* Dark overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 2, background: 'radial-gradient(ellipse at 50% 50%, rgba(5,5,8,0.25) 0%, rgba(5,5,8,0.88) 100%)' }}
      />

      {/* ── Main content ── */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20" style={{ zIndex: 10 }}>

        {/* Hero heading */}
        <div className="text-center mb-10">
          <p className="text-white/20 uppercase tracking-[0.5em] text-[10px] font-bold mb-3">
            ZfO · Masala Soda · 275ml
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none"
            style={{ textShadow: `0 0 80px ${selectedOption.glow}40`, transition: 'text-shadow 0.5s' }}
          >
            ORDER<br/>
            <span style={{ color: selectedOption.glow, transition: 'color 0.5s' }}>
              THE<br/>FIZZ
            </span>
          </h1>
        </div>

        {/* Option cards */}
        <div className="flex flex-col sm:flex-row gap-5 mb-10 w-full max-w-2xl">
          {OPTIONS.map((opt, i) => {
            const isActive = selectedId === opt.id;
            return (
              <button
                key={opt.id}
                ref={el => cardRefs.current[i] = el}
                onClick={() => setSelectedId(opt.id)}
                className="relative flex-1 rounded-3xl p-7 text-left overflow-hidden transition-colors duration-300"
                style={{
                  background: isActive ? opt.accent : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? opt.glow : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive ? `0 0 60px ${opt.glow}30, inset 0 1px 0 ${opt.glow}20` : 'none',
                  transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
                }}
              >
                <div
                  className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                  style={{ background: opt.glow + '20', color: opt.glow, border: `1px solid ${opt.glow}40` }}
                >
                  SAVE {opt.savings}%
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2"
                  style={{ color: isActive ? opt.glow : 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}>
                  {opt.tagline}
                </p>
                <h3 className="text-3xl font-black uppercase text-white mb-1">{opt.name}</h3>
                <p className="text-white/30 text-xs mb-6">{opt.sub}</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black" style={{ color: isActive ? opt.glow : 'white', transition: 'color 0.3s' }}>
                    ₹{opt.price}
                  </span>
                  <span className="text-white/20 text-sm line-through mb-1">₹{opt.originalPrice}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <div ref={formRef} className="w-full max-w-2xl">
          <div
            className="rounded-3xl p-px mb-5"
            style={{ background: `linear-gradient(135deg, ${selectedOption.glow}40, rgba(255,255,255,0.06), ${selectedOption.glow}15)`, transition: 'background 0.5s' }}
          >
            <div className="rounded-[calc(1.5rem-1px)] bg-[#0a0a10] p-6">
              <p className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold mb-5">
                Drop your details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', placeholder: 'Your Name', type: 'text', span: false },
                  { key: 'phone', placeholder: 'Phone Number (10 digits)', type: 'tel', span: false },
                  { key: 'address', placeholder: 'Full Delivery Address', type: 'text', span: true },
                ].map(({ key, placeholder, type, span }) => {
                  const hasError = !!fieldErrors[key];
                  return (
                    <div key={key} className={span ? 'col-span-full' : ''}>
                      <input
                        ref={el => fieldRefs.current[key] = el}
                        type={type}
                        placeholder={placeholder}
                        className="w-full px-5 py-4 rounded-xl text-white text-sm placeholder-white/20 outline-none transition-all duration-300"
                        style={{
                          background: hasError
                            ? 'rgba(239,68,68,0.08)'
                            : activeField === key ? `${selectedOption.glow}10` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${hasError
                            ? 'rgba(239,68,68,0.6)'
                            : activeField === key ? selectedOption.glow + '60' : 'rgba(255,255,255,0.08)'}`,
                        }}
                        value={customerDetails[key]}
                        onChange={(e) => {
                          setCustomerDetails({ ...customerDetails, [key]: e.target.value });
                          if (fieldErrors[key]) {
                            setFieldErrors(prev => { const n = {...prev}; delete n[key]; return n; });
                          }
                        }}
                        onFocus={() => setActiveField(key)}
                        onBlur={() => setActiveField(null)}
                      />
                      {hasError && (
                        <p className="text-red-400 text-[11px] mt-1 ml-2 font-medium">
                          ⚠ {fieldErrors[key]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Total + CTA */}
          <div className="flex items-stretch gap-4">
            <div
              className="flex-1 rounded-2xl px-6 py-4 border flex flex-col justify-center"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Total</p>
              <p className="text-3xl font-black text-white">₹{selectedOption.price}</p>
            </div>

            <button
              onClick={handlePayment}
              disabled={phase === 'loading'}
              className="flex-[2] relative overflow-hidden rounded-2xl py-5 font-black uppercase tracking-widest text-base transition-all duration-500 disabled:opacity-60 group"
              style={{
                background: `linear-gradient(135deg, ${selectedOption.glow}, ${selectedOption.glow}cc)`,
                color: '#050508',
                boxShadow: `0 0 50px ${selectedOption.glow}50`,
                transition: 'background 0.5s, box-shadow 0.5s',
              }}
            >
              <span className="relative z-10 pointer-events-none">
                {phase === 'loading' ? '⚡ LAUNCHING...' : `LET IT POP → ₹${selectedOption.price}`}
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none" />
            </button>
          </div>

          <p className="text-center text-white/15 text-xs mt-4 uppercase tracking-widest">
            🔒 Secure payments via Razorpay
          </p>
        </div>

      </div>

      {/* Wobble keyframe */}
      <style>{`
        @keyframes wobble {
          0%,100% { transform: rotate(0); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
      `}</style>
    </div>
  );
}
