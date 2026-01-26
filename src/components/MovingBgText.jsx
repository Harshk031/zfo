import { motion } from "framer-motion";

const statements = ["CRACK THE FIZZ", "DRINK THE CHAOS", "GEN-Z ENERGY"];

const MovingBgText = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap text-[4vw] font-medium uppercase tracking-[0.25em] gap-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: "linear",
        }}
      >
        {[...statements, ...statements, ...statements].map((text, i) => (
          <span
            key={i}
            className={i % 2 === 0 ? "text-white/70" : "text-yellow-400/50"}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MovingBgText;
