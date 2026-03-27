'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lazy-load the WebGL canvas — deferred for fast first paint
const WebGLScene = dynamic(() => import('@/components/webgl/WebGLScene'), {
  ssr: false,
  loading: () => null,
});

const CHAPTERS = [
  { progress: 0,    title: null,                  sub: null },
  { progress: 0.0,  title: 'ENTER THE FIZZ',      sub: 'A new kind of soda just woke up.',          className: 'text-white' },
  { progress: 0.2,  title: 'MASALA AWAKES',        sub: 'Spices from 12 regions. Brewing chaos.',    className: 'text-orange-300' },
  { progress: 0.38, title: 'SPICE MEETS FIZZ',     sub: 'Not just fizzy. Electrically alive.',       className: 'text-yellow-300' },
  { progress: 0.55, title: 'ZfO',                  sub: 'Masala Soda. In Glass. For Real Ones.',     className: 'text-white', cta: false },
  { progress: 0.75, title: 'BOLD. BALANCED. ALIVE.',sub: 'Built for a generation that refuses average.', className: 'text-white' },
  { progress: 0.9,  title: null,                   sub: null, cta: true },
];

export default function ScrollStory() {
  const wrapperRef  = useRef(null);
  const textRef     = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter]   = useState(0);
  const [burstActive, setBurstActive]       = useState(false);
  const [webglReady, setWebglReady]         = useState(false);

  // Delay WebGL init to unblock first paint
  useEffect(() => {
    const t = setTimeout(() => setWebglReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  // SINGLE ScrollTrigger — was two before (double setState per tick = double React renders)
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: '+=600%',
        pin: true,
        scrub: 0.8,           // was 1.2 — smaller value = more responsive feel
        onUpdate: (self) => {
          const p = self.progress;

          setScrollProgress(p);

          // Chapter detection
          let ch = 0;
          for (let i = 0; i < CHAPTERS.length; i++) {
            if (p >= CHAPTERS[i].progress) ch = i;
          }
          setActiveChapter(ch);

          // Burst window
          setBurstActive(p > 0.36 && p < 0.42);
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const chapter = CHAPTERS[activeChapter] || CHAPTERS[0];

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: '100vh' }}>
      {/* Scroll driver — 700vh tall invisible stripe */}
      <div style={{ height: '700vh', position: 'absolute', top: 0, left: 0, width: '1px', pointerEvents: 'none' }} />

      {/* WebGL canvas — loaded after first paint */}
      <div
        className="bg-[#050508]"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
      >
        {webglReady && (
          <WebGLScene scrollProgress={scrollProgress} burstActive={burstActive} />
        )}
        {!webglReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
        )}
      </div>

      {/* Gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,8,0.65) 100%)' }}
      />

      {/* Chapter text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-32 pointer-events-none px-6">
        <div ref={textRef} key={activeChapter} className="text-center max-w-3xl">
          {chapter.title && (
            <h2
              className={`font-black uppercase tracking-tighter leading-none mb-4 ${chapter.className || 'text-white'}`}
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', textShadow: '0 0 40px rgba(255,255,255,0.15)' }}
            >
              {chapter.title}
            </h2>
          )}
          {chapter.sub && (
            <p className="text-white/60 text-lg md:text-xl font-light tracking-wide leading-relaxed">
              {chapter.sub}
            </p>
          )}
          {chapter.cta && (
            <div className="pointer-events-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/order"
                className="inline-block px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-[#ffcc00] transition-colors duration-300"
              >
                SEND THE FIZZ →
              </a>
              <a
                href="#about"
                className="inline-block px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:border-white hover:bg-white/5 transition-all duration-300"
              >
                OUR STORY
              </a>
            </div>
          )}
        </div>

        {/* Scroll progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[0.0, 0.2, 0.38, 0.55, 0.75, 0.9].map((p, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full transition-all duration-500"
              style={{
                height: activeChapter === i + 1 ? '24px' : '6px',
                background: activeChapter === i + 1 ? 'white' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Brand mark */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <img
          src="/logo.png"
          alt="ZfO"
          style={{ height: '72px', width: 'auto', filter: 'invert(1) brightness(2)' }}
        />
      </div>

      {/* Permanent Order Now CTA — centered on screen, always visible */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center z-10">
        <a
          href="/order"
          style={{
            background: 'linear-gradient(135deg, #00e5ff 0%, #7c4dff 100%)',
            boxShadow: '0 0 30px rgba(0,229,255,0.5), 0 0 60px rgba(124,77,255,0.3)',
            color: '#fff',
            fontWeight: 900,
            fontSize: '0.8rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '14px 44px',
            borderRadius: '999px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.25s ease',
            border: '1px solid rgba(0,229,255,0.4)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(0,229,255,0.7), 0 0 90px rgba(124,77,255,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.5), 0 0 60px rgba(124,77,255,0.3)'; }}
        >
          ⚡ ORDER NOW
        </a>
      </div>
    </div>

  );
}
