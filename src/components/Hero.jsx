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
          className="w-full md:w-1/2 text-left max-w-xl px-4 md:px-0"
        >
          {/* Brand identity */}
          <p className="text-lg md:text-2xl font-extrabold tracking-[0.1em] md:tracking-[0.12em] text-white/90 mb-3">
            ZFO — The Art of Fizz
          </p>

          {/* Hero emotion line */}
          <h1 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-6xl font-bold text-yellow-400 leading-tight">
            {heroLines[index]}
          </h1>
        </motion.div>

        {/* CURSOR BOTTLE */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
          <div className="scale-90 sm:scale-100">
            <CursorBottle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
