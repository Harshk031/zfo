import { motion } from "framer-motion";
import { useMemo } from "react";

// Utility function to generate bubble data outside of render
const generateBubbleData = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 35 + 25,
    left: Math.random() * 100,
    duration: Math.random() * 6 + 6,
    blur: Math.random() * 2 + 1,
    xVariation: Math.random() * 30 - 15,
    delay: Math.random() * 2
  }));
};

const BubbleLayer = () => {
  // Generate bubble data with useMemo and empty dependency array
  // This ensures the random values are generated only once
  const bubbles = useMemo(() => generateBubbleData(18), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {bubbles.map((bubble) => (
        <motion.span
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: "-15%",
            filter: `blur(${bubble.blur}px)`,
            background: `
              radial-gradient(
                circle at 25% 25%,
                rgba(255,255,255,0.95),
                rgba(255,255,255,0.45) 40%,
                rgba(255,255,255,0.15) 65%,
                rgba(255,255,255,0.05)
              )
            `,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: "-120vh",
            x: [0, bubble.xVariation, 0],
            opacity: [0, 0.85, 0.6, 0],
            scale: [0.85, 1.05, 0.95],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default BubbleLayer;
