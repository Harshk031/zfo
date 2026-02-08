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
          REAL
        </span>
      </div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-5xl sm:text-7xl md:text-[9rem] font-black text-black tracking-[-0.03em] leading-[0.88] uppercase"
      >
        THE STORY
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">
          NOBODY TOLD
        </span>
      </motion.h2>

      {/* Supporting Text - Storytelling */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-12 md:mt-16 flex flex-col items-center"
      >
        <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 max-w-4xl px-4 leading-tight tracking-tight">
          Your nani made masala soda in <span className="font-bold text-black">glass bottles</span> with{" "}
          <span className="font-bold text-black">actual jeera and kala namak</span>.
          <br className="hidden md:block" />
          Then corporations said "nah, plastic and chemicals are cheaper."
        </p>

        {/* Separator */}
        <div className="w-1 bg-black/10 h-20 my-10 md:my-14" />

        {/* Description - Relatable */}
        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-700 max-w-2xl px-6 leading-relaxed tracking-wider">
          We brought back what your family already knew was better.
          <br className="hidden md:block" />
          Real ingredients. Glass that actually feels premium. Zero fake sh*t.
        </p>
      </motion.div>
    </section>
  );
};

export default PromoSection;
