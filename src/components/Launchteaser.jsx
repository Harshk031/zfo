
import { useState } from "react";
import { motion } from "framer-motion";

const LaunchTeaser = () => {
  const [bubbles, setBubbles] = useState([]);

  const explodeFizz = () => {
    const newBubbles = Array.from({ length: 70 }).map((_, i) => {
      const size = Math.random() * 30 + 12; // 👈 size reduced

      return {
        id: Date.now() + i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        driftX: (Math.random() - 0.5) * 300,
        driftY: -(Math.random() * 400 + 150),
        blur: Math.random() * 2 + 0.5, // 👈 thoda blur bhi kam
        duration: Math.max(3, 7 - size / 40),
      };
    });

    setBubbles(newBubbles);
    setTimeout(() => setBubbles([]), 5000);
  };

  return (
    <section className="relative h-screen bg-black flex flex-col items-center justify-center text-center overflow-hidden">
      <h1 className="text-5xl font-bold text-yellow-400 relative z-10">
        ZfO is arriving soon.
      </h1>

      <button
        onClick={explodeFizz}
        className="mt-10 px-12 py-4 rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition relative z-10"
      >
        FEEL THE FIZZ
      </button>

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
