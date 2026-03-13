'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PromoSection() {
  const ref = useRef(null);
  const h2Ref = useRef(null);
  const wordsRef = useRef([]);
  const bodyRef = useRef(null);
  const bgTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered word entrance
      if (wordsRef.current.length) {
        gsap.fromTo(wordsRef.current,
          { opacity: 0, y: 80, rotationX: -30 },
          {
            opacity: 1, y: 0, rotationX: 0,
            duration: 1.0,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 70%',
            },
          }
        );
      }

      // Body text fade
      if (bodyRef.current) {
        gsap.fromTo(bodyRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 60%' },
          }
        );
      }

      // Background watermark parallax
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          x: '-8%',
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  const words = ['WE', 'GREW', 'UP', 'WITH', 'TWO', 'BAD', 'CHOICES.'];

  return (
    <section
      ref={ref}
      id="promosection"
      className="relative py-32 md:py-48 bg-[#f5f5f0] flex flex-col items-center text-center px-6 overflow-hidden"
    >
      {/* GSAP-parallax background watermark */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.035]"
        style={{ willChange: 'transform' }}
      >
        <span className="text-[18vw] font-black leading-none text-black select-none whitespace-nowrap">
          FRESHOZZ FRESHOZZ
        </span>
      </div>

      {/* Staggered heading */}
      <h2 ref={h2Ref} className="relative z-10 flex flex-wrap justify-center gap-x-5 gap-y-2 max-w-5xl mb-0">
        {words.map((w, i) => (
          <span
            key={i}
            ref={el => wordsRef.current[i] = el}
            className={`font-black uppercase tracking-tight leading-none text-black ${
              i >= 4 ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black' : ''
            }`}
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              display: 'inline-block',
              opacity: 0,
              transformOrigin: 'bottom center',
              perspective: '600px',
            }}
          >
            {w}
          </span>
        ))}
      </h2>

      {/* Supporting content */}
      <div ref={bodyRef} className="relative z-10 mt-14 md:mt-20 flex flex-col items-center opacity-0">
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 max-w-4xl px-4 leading-relaxed tracking-tight">
          Cheap ₹10 sodas that tasted loud but empty.
          <br className="hidden md:block" />
          Or global colas that didn&apos;t feel Indian at all.
        </p>

        <div className="w-px bg-black/10 h-16 my-8 md:my-12" />

        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 max-w-3xl px-6 leading-relaxed">
          There was no mid-premium Indian soda — one that respected flavor, branding, and the Indian palate.
          <br /><br />
          <span className="font-black text-black text-xl md:text-2xl">
            Freshozz was built to fill that gap.
          </span>
        </p>
      </div>
    </section>
  );
}
