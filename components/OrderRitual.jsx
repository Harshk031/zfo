'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';

const WebGLScene = dynamic(() => import('@/components/webgl/WebGLScene'), { ssr: false });

const FLAVOURS = [
  {
    id: 'masala-mojito',
    name: 'Masala Mojito',
    sub: 'Mint meets masala',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.4)',
    burst: 0.3,
    emoji: '🌿',
  },
  {
    id: 'electric-nimbu',
    name: 'Electric Nimbu',
    sub: 'Citrus. Charged.',
    color: '#facc15',
    glow: 'rgba(250,204,21,0.5)',
    burst: 0.4,
    emoji: '⚡',
  },
  {
    id: 'jeera-storm',
    name: 'Jeera Storm',
    sub: 'Earthy. Explosive.',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.4)',
    burst: 0.35,
    emoji: '🌪️',
  },
  {
    id: 'spicy-cola',
    name: 'Spicy Cola',
    sub: 'Dark side. Bold side.',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.4)',
    burst: 0.38,
    emoji: '🔥',
  },
];

const CTA_TEXTS = [
  'SEND THE FIZZ →',
  'DROP THE BOTTLE →',
  'FUEL MY THIRST →',
  'LET IT POP →',
];

export default function OrderRitual() {
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | hover | summon | confirmed
  const [ctaText] = useState(() => CTA_TEXTS[Math.floor(Math.random() * CTA_TEXTS.length)]);
  const [quantity, setQuantity] = useState(1);
  const containerRef = useRef(null);
  const bottleRef = useRef(null);
  const confirmRef = useRef(null);

  const handleFlavourHover = (f) => setSelected(f);
  const handleFlavourLeave = () => { if (phase !== 'summon') setSelected(null); };

  const handleSummon = () => {
    if (!selected) return;
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

  const activeFlavour = selected || FLAVOURS[1];
  const scrollP = activeFlavour.burst;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#050508] flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
    >
      {/* WebGL background */}
      <div className="absolute inset-0">
        <WebGLScene scrollProgress={scrollP} burstActive={phase === 'summon'} />
      </div>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.9) 100%)' }} />

      {phase !== 'confirmed' && (
        <div className="relative z-10 w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-white/30 uppercase tracking-[0.4em] text-xs font-bold mb-4">
              The Summoning
            </p>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-4">
              Choose Your Fizz
            </h1>
            <p className="text-white/50 text-lg font-light">
              Select a flavour. Watch it awaken.
            </p>
          </div>

          {/* Flavour selection — living objects */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {FLAVOURS.map((f) => {
              const isActive = activeFlavour?.id === f.id;
              return (
                <button
                  key={f.id}
                  onMouseEnter={() => handleFlavourHover(f)}
                  onMouseLeave={handleFlavourLeave}
                  onClick={() => { setSelected(f); setPhase('hover'); }}
                  className="group relative rounded-2xl border transition-all duration-500 p-6 text-left overflow-hidden"
                  style={{
                    borderColor: isActive ? f.color : 'rgba(255,255,255,0.08)',
                    background: isActive ? `rgba(${f.glow.slice(5,-1)}, 0.08)` : 'rgba(255,255,255,0.02)',
                    boxShadow: isActive ? `0 0 40px ${f.glow}, inset 0 0 30px ${f.glow.replace('0.4', '0.05')}` : 'none',
                  }}
                >
                  {/* Particle glow corner */}
                  <div
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl transition-opacity duration-500"
                    style={{ background: f.color, opacity: isActive ? 0.5 : 0.1 }}
                  />

                  <span className="text-3xl mb-3 block">{f.emoji}</span>
                  <h3 className="text-white font-black uppercase tracking-tight text-sm mb-1">
                    {f.name}
                  </h3>
                  <p className="text-white/40 text-xs font-light">{f.sub}</p>

                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-full"
                      style={{ background: `linear-gradient(to right, transparent, ${f.color}, transparent)` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quantity + Order */}
          <div className="flex flex-col items-center gap-6">
            {/* Quantity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-white transition-colors flex items-center justify-center text-lg"
              >−</button>
              <span className="text-white font-black text-2xl w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(12, q + 1))}
                className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-white transition-colors flex items-center justify-center text-lg"
              >+</button>
              <span className="text-white/40 text-sm ml-2">bottles</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-white/30 text-xl line-through">₹{80 * quantity}</span>
              <span
                className="text-4xl font-black"
                style={{ color: activeFlavour?.color || 'white' }}
              >
                ₹{45 * quantity}
              </span>
              <span className="text-white/40 text-sm">incl. delivery</span>
            </div>

            {/* CTA */}
            <button
              ref={bottleRef}
              onClick={handleSummon}
              disabled={!selected}
              className="relative group px-14 py-5 rounded-full font-black text-black uppercase tracking-widest text-base transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
              style={{
                background: selected
                  ? `linear-gradient(135deg, ${activeFlavour.color}, white)`
                  : 'white',
                boxShadow: selected
                  ? `0 0 60px ${activeFlavour.glow}, 0 0 120px ${activeFlavour.glow}`
                  : '0 0 30px rgba(255,255,255,0.1)',
              }}
            >
              <span className="relative z-10">{ctaText}</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>

            {!selected && (
              <p className="text-white/30 text-sm animate-pulse">← Select a flavour to unlock</p>
            )}

            {/* WhatsApp fallback */}
            <a
              href={`https://wa.me/919999999999?text=Hi! I want ${quantity} bottle(s) of ${selected?.name || 'Freshozz'} at ₹${45 * quantity}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 text-xs uppercase tracking-widest underline underline-offset-4 transition-colors"
            >
              Or order via WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Confirmation screen */}
      {phase === 'confirmed' && (
        <div ref={confirmRef} className="relative z-10 text-center opacity-0 max-w-2xl">
          <div className="text-6xl mb-8 animate-bounce">🍾</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
            Your Fizz Has Escaped The Factory.
          </h2>
          <p className="text-white/50 text-lg mb-2">
            {quantity}× {selected?.name} · ₹{45 * quantity}
          </p>
          <p className="text-white/30 text-sm mb-12">
            Tracking: #FIZZ-{Math.random().toString(36).slice(2, 9).toUpperCase()}
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
