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
          RARE
        </span>
      </div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-4xl sm:text-6xl md:text-[5rem] font-black text-black tracking-[-0.03em] leading-[0.95] uppercase max-w-5xl"
      >
        WE GREW UP WITH
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">
          TWO BAD CHOICES.
        </span>
      </motion.h2>

      {/* Supporting Text - Premium Innovation Story */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-12 md:mt-16 flex flex-col items-center"
      >
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 max-w-4xl px-4 leading-relaxed tracking-tight">
          Cheap ₹10 sodas that tasted loud but empty.
          <br className="hidden md:block" />
          Or global colas that didn't feel Indian at all.
        </p>

        {/* Separator */}
        <div className="w-1 bg-black/10 h-16 my-8 md:my-12" />

        {/* Description - Premium Craft */}
        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 max-w-3xl px-6 leading-relaxed">
          There was no mid-premium Indian soda — one that respected flavor, respected branding, and didn't treat consumers like they wouldn't notice.
          <br /><br />
          <span className="font-bold text-black text-xl md:text-2xl">ZfO was built to fill that gap.</span>
        </p>
      </motion.div>
    </section>
  );
};

export default PromoSection;
