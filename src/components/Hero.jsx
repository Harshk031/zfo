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
    <section className="relative h-screen bg-[#0a0a0a]">

      {/* Background Video - Polar Bear Launch Announcement */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        poster="/logo.png"
      >
        <source src="/polar-bear.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* TEXT BLOCK */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-left z-10 pt-20 md:pt-0 px-4 sm:px-0 overflow-visible"
        >
          {/* Brand identity */}
          <p className="subtitle-script text-[#c41e3a] mb-2 uppercase tracking-widest text-sm font-bold">
            UNAPOLOGETICALLY BOLD.
          </p>

          {/* Hero emotion line - Lagunitas Style with Texture */}
          <h1 className="headline-xl text-distressed drop-shadow-2xl break-words" style={{backgroundColor: '#fafafa'}}>
            {heroLines[index]}
          </h1>

          {/* SUB-TEXT / DESCRIPTION */}
          <p className="mt-6 text-[#a0a0a0] text-lg md:text-xl font-light max-w-sm leading-relaxed">
            Masala craft soda. <br className="hidden md:block" />
            Zero fake. All bite.
          </p>
        </motion.div>

        {/* CURSOR BOTTLE */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative z-0">
          {/* Mobile glow behind bottle */}
          <div className="absolute inset-0 bg-white/10 blur-[80px] md:hidden rounded-full transform scale-75" />

          <div className="scale-[0.85] sm:scale-90 md:scale-110 md:translate-x-12 translate-y-4 md:translate-y-0">
            <CursorBottle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
