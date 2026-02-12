'use client';

import { useState } from "react";
import { motion } from "framer-motion";

const LaunchTeaser = () => {
  const [bubbles, setBubbles] = useState([]);

  const explodeFizz = () => {
    const newBubbles = Array.from({ length: 70 }).map((_, i) => {
      const size = Math.random() * 30 + 12;

      return {
        id: Date.now() + i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        driftX: (Math.random() - 0.5) * 300,
        driftY: -(Math.random() * 400 + 150),
        blur: Math.random() * 2 + 0.5,
        duration: Math.max(3, 7 - size / 40),
      };
    });

    setBubbles((b) => [...b, ...newBubbles]);
  };

  return (
    <section className="relative h-screen bg-black flex flex-col items-center justify-center text-center overflow-hidden px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl"
      >
        <h2 className="text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500 tracking-tighter mb-8 leading-none uppercase">
          BUILT TO LAST.
        </h2>

        <p className="text-white/60 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          ZfO is not built to shout. It's built to last. We're just getting started.
        </p>

        <motion.button
          onClick={explodeFizz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 rounded-full bg-gray-200 text-black font-black tracking-widest uppercase text-lg hover:bg-white transition-colors duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
        >
          FOLLOW THE JOURNEY →
        </motion.button>
      </motion.div>

      {bubbles.map((b) => (
        <motion.span
          key={b.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
            filter: `blur(${b.blur}px)`,
            background: `
              radial-gradient(
                circle at 25% 25%,
                rgba(255,255,255,0.95),
                rgba(255,255,255,0.45) 35%,
                rgba(255,255,255,0.15) 60%,
                rgba(255,255,255,0.05)
              )
            `,
          }}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{
            scale: [0.3, 1, 1.05, 0.85],
            x: [0, b.driftX * 0.4, b.driftX],
            y: [0, b.driftY * 0.6, b.driftY],
            opacity: [0.9, 0.7, 0.3, 0],
          }}
          transition={{
            duration: b.duration,
            ease: "easeOut",
          }}
        />
      ))}
    </section>
  );
};

export default LaunchTeaser;
