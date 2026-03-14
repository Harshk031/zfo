'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Burst canvas lazy loaded
const WebGLScene = dynamic(() => import('@/components/webgl/WebGLScene'), { ssr: false });

const LaunchTeaser = () => {
  const [burst, setBurst] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered heading reveal
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleBurst = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#050508] flex flex-col items-center justify-center text-center overflow-hidden px-6"
    >
      {/* WebGL particle burst canvas */}
      <div className="absolute inset-0">
        <WebGLScene
          scrollProgress={0.38}   // citrus chapter always shown
          burstActive={burst}
        />
      </div>

      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.85) 100%)' }} />

      <div ref={headingRef} className="relative z-10 max-w-4xl opacity-0">
        <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold mb-6">
          Built to last
        </p>
        <h2 className="text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-tighter mb-8 leading-none uppercase">
          BUILT TO LAST.
        </h2>

        <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          ZfO is not built to shout. It&apos;s built to last. We&apos;re just getting started.
        </p>

        <a
          href="https://www.instagram.com/drinkzfo"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block px-10 py-5 rounded-full bg-white text-black font-black tracking-widest uppercase text-sm hover:bg-[#ffcc00] transition-all duration-500 shadow-[0_0_60px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,204,0,0.4)] overflow-hidden"
        >
          <span className="relative z-10">FOLLOW THE JOURNEY →</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </a>
      </div>
    </section>
  );
};

export default LaunchTeaser;
