import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PromoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 lg:py-48 bg-white flex flex-col items-center text-center px-6"
    >
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-yellow-400"
      >
        THE ART OF FIZZ
      </motion.h1>

      {/* Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-6 text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 max-w-3xl px-4"
      >
        Crafted soda. Honest flavour. Real refreshment.
      </motion.p>

      {/* Small tagline / description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 text-sm sm:text-base md:text-lg font-medium text-gray-700 max-w-2xl px-4"
      >
        ZfO reimagines Indian soda culture with balanced fizz, refined masala,
        and a premium glass bottle experience — every sip tells a story.
      </motion.p>
    </section>
  );
};

export default PromoSection;
