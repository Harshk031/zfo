'use client';

import { motion } from "framer-motion";
import CursorBottle from "@/components/CursorBottle";
import { heroLines } from "@/data/text";
import { useEffect, useState } from "react";

const Hero = () => {
  const [index, setIndex] = useState(0);

  // rotating hero lines
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroLines.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />

      <div className="relative z-20 min-h-screen w-full flex flex-col md:flex-row items-center justify-center md:justify-between py-20 md:py-0">

        {/* TEXT BLOCK */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-left z-10 mb-8 md:mb-0"
        >
          {/* Brand identity */}
          <p className="subtitle-script text-[#c41e3a] mb-3 md:mb-2 uppercase tracking-widest text-xs sm:text-sm font-bold">
            MODERN INDIAN CRAFT BEVERAGE.
          </p>

          {/* Hero headline - Rotates via text.js */}
          <h1 className="headline-xl text-distressed drop-shadow-2xl break-words text-white px-2 md:px-0 leading-[0.9]">
            {heroLines[index]}
          </h1>

          {/* SUB-TEXT / DESCRIPTION - New Tone */}
          <p className="mt-6 md:mt-8 text-[#a0a0a0] text-lg sm:text-xl md:text-2xl font-light max-w-lg leading-relaxed tracking-wide">
            ZfO is a modern Indian craft beverage brand starting with a <span className="text-white font-medium">bold, balanced masala soda</span> in a glass bottle — built for a generation that wants <span className="text-[#ffcc00] font-medium">better taste</span>, not louder marketing.
          </p>

          {/* PRICE REVEAL - PREMIUM STYLE */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6 justify-start">
            <div className="flex items-baseline gap-4">
              <span className="text-2xl text-white/40 line-through decoration-red-500/80 decoration-2 font-light">₹80</span>
              <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffcc00] to-white drop-shadow-[0_0_15px_rgba(255,204,0,0.3)]">
                ₹45
              </span>
            </div>

            <div className="h-px w-12 bg-white/20 hidden md:block" />

            <p className="text-white/60 text-sm tracking-wide font-light max-w-[200px] text-left">
              Exclusive launch price. <br />
              <span className="text-white/90 font-medium">Limited batch only.</span>
            </p>
          </div>
        </motion.div>

        {/* CURSOR BOTTLE */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative z-0">
          {/* Mobile glow behind bottle */}
          <div className="absolute inset-0 bg-white/10 blur-[80px] md:hidden rounded-full transform scale-75" />

          <div className="scale-75 sm:scale-85 md:scale-110 md:translate-x-12">
            <CursorBottle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


