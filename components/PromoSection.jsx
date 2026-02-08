'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PromoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="promosection"
      className="relative py-32 md:py-48 bg-[#f5f5f0] flex flex-col items-center text-center px-6 overflow-hidden"
    >
      {/* DECORATIVE BACKGROUND TEXT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03]">
        <span className="text-[15vw] md:text-[20vw] font-black leading-none text-black select-none">
          FIZZ
        </span>
      </div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // smooth easeOutQuint-ish
        className="relative z-10 text-6xl sm:text-8xl md:text-[10rem] font-black text-black tracking-[-0.05em] leading-[0.85] uppercase"
      >
        SODA <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black">
          UNFILTERED
        </span>
      </motion.h2>

      {/* Supporting Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-12 md:mt-16 flex flex-col items-center"
      >
        <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 max-w-4xl px-4 leading-tight tracking-tight">
          "They gave you <span className="text-gray-400 line-through decoration-2 decoration-red-500 decoration-wavy">NPC energy</span>. <br className="hidden md:block" />
          We gave you <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 font-black italic">MAIN CHARACTER ENERGY</span>."
        </p>

        {/* Separator */}
        <div className="w-1 bg-black/10 h-24 my-10 md:my-16" />

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg font-black text-gray-800 max-w-lg px-6 leading-relaxed uppercase tracking-widest">
          No plastic. No chemical icks. <br className="hidden md:block" />
          Just immaculate vibes in glass.
        </p>
      </motion.div>
    </section>
  );
};

export default PromoSection;


