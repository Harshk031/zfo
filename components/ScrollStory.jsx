'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lazy-load the WebGL canvas — no SSR, deferred for fast first paint
const WebGLScene = dynamic(() => import('@/components/webgl/WebGLScene'), {
  ssr: false,
  loading: () => null,
});

const CHAPTERS = [
  {
    progress: 0,
    title: null,
    sub: null,
  },
  {
    progress: 0.0,
    title: 'ENTER THE FIZZ',
    sub: 'A new kind of soda just woke up.',
    className: 'text-white',
  },
  {
    progress: 0.2,
    title: 'MASALA AWAKES',
    sub: 'Spices from 12 regions. Brewing chaos.',
    className: 'text-orange-300',
  },
  {
    progress: 0.38,
    title: 'CAFFEINE HITS DIFFERENT',
    sub: 'Not just fizzy. Electrically alive.',
    className: 'text-yellow-300',
  },
  {
    progress: 0.55,
    title: 'FRESHOZZ',
    sub: 'Masala Soda. With Caffeine. In Glass.',
    className: 'text-white',
    cta: false,
  },
  {
    progress: 0.75,
    title: 'BOLD. BALANCED. ALIVE.',
    sub: 'Built for a generation that refuses average.',
    className: 'text-white',
  },
  {
    progress: 0.9,
    title: null,
    sub: null,
    cta: true,
  },
];

export default function ScrollStory() {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const textRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [burstActive, setBurstActive] = useState(false);
  const [webglReady, setWebglReady] = useState(false);

  // Delay WebGL init slightly for fast first paint
  useEffect(() => {
    const t = setTimeout(() => setWebglReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: '+=600%',
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Find current chapter
          let ch = 0;
          for (let i = 0; i < CHAPTERS.length; i++) {
            if (p >= CHAPTERS[i].progress) ch = i;
          }
          setActiveChapter(ch);

          // Trigger burst at chapter 3
          if (p > 0.36 && p < 0.42) {
            setBurstActive(true);
          } else {
            setBurstActive(false);
          }
        },
      });

      // Chapter text transition — fade + slide
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: '+=600%',
        scrub: true,
        onUpdate: () => {
          if (textRef.current) {
            gsap.to(textRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: true,
            });
          }
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const chapter = CHAPTERS[activeChapter] || CHAPTERS[0];

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: '100vh' }}>
      {/* Scroll driver — extra height outside the pinned window */}
      <div style={{ height: '700vh', position: 'absolute', top: 0, left: 0, width: '1px', pointerEvents: 'none' }} />

      {/* Full-screen WebGL canvas */}
      <div className="absolute inset-0 bg-[#050508]">
        {webglReady && (
          <WebGLScene scrollProgress={scrollProgress} burstActive={burstActive} />
        )}
        {/* Loading state — shown before WebGL is ready */}
        {!webglReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
        )}
      </div>

      {/* Gradient vignette overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,8,0.7) 100%)' }}
      />

      {/* Chapter text overlay — HTML on top of WebGL */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-32 pointer-events-none px-6">
        <div ref={textRef} key={activeChapter} className="text-center max-w-3xl">
          {chapter.title && (
            <h2
              className={`font-black uppercase tracking-tighter leading-none mb-4 ${chapter.className || 'text-white'}`}
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', textShadow: '0 0 40px rgba(255,255,255,0.2)' }}
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
                className="inline-block px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-[#ffcc00] transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
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

      {/* Brand mark — always visible */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <span className="text-white/90 font-black uppercase tracking-widest text-sm"
          style={{ letterSpacing: '0.25em' }}>
          FRESHOZZ
        </span>
        <div className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">
          Masala Soda · Caffeine · Glass
        </div>
      </div>
    </div>
  );
}
