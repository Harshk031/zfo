import { motion } from "framer-motion";

const BubbleLayer = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {Array.from({ length: 18 }).map((_, i) => {
        const size = Math.random() * 35 + 25;
        const left = Math.random() * 100;
        const duration = Math.random() * 6 + 6;
        const blur = Math.random() * 2 + 1;

        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: "-15%",
              filter: `blur(${blur}px)`,
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
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.85, 0.6, 0],
              scale: [0.85, 1.05, 0.95],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
};

export default BubbleLayer;
