import { motion } from "framer-motion";

const statements = ["NO CAP", "MAIN CHARACTER ENERGY", "GATEKEEPING FLAVOR", "RED FLAG: PLASTIC"];

const MovingBgText = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap text-[20vw] md:text-[8vw] font-black uppercase tracking-tighter gap-10 md:gap-20"
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
