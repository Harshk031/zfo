import { motion } from "framer-motion";
import CursorBottle from "./CursorBottle";
import { heroLines } from "../data/text";
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
    <section className="relative h-screen bg-black overflow-hidden">

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* ❌ BubbleLayer removed from Hero */}

      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* TEXT BLOCK */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-left z-10 pt-20 md:pt-0"
        >
          {/* Brand identity */}
          <p className="text-sm md:text-xl font-bold tracking-[0.2em] text-white/60 mb-4 ml-1">
            EST. 2024
          </p>

          {/* Hero emotion line */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 leading-[0.9] tracking-tighter mix-blend-screen drop-shadow-2xl">
            {heroLines[index]}
          </h1>

          {/* SUB-TEXT / DESCRIPTION */}
          <p className="mt-6 text-white/80 text-lg md:text-xl font-light max-w-sm leading-relaxed">
            Indian craft soda. Small batch. <br className="hidden md:block" />
            Big character.
          </p>

          {/* MAGNETIC CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 rounded-full border border-yellow-400/30 bg-yellow-400/10 backdrop-blur-md text-yellow-400 font-bold tracking-widest uppercase text-sm hover:bg-yellow-400 hover:text-black transition-all duration-300 relative group overflow-hidden"
          >
            <span className="relative z-10">Experience the Fizz</span>
            <div className="absolute inset-0 bg-yellow-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </motion.button>
        </motion.div>

        {/* CURSOR BOTTLE */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative z-0">
          {/* Mobile glow behind bottle */}
          <div className="absolute inset-0 bg-yellow-500/20 blur-[80px] md:hidden rounded-full transform scale-75" />

          <div className="scale-[0.85] sm:scale-90 md:scale-110 md:translate-x-12 translate-y-4 md:translate-y-0">
            <CursorBottle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
