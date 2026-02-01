import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PromoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="promosection"
      className="relative py-32 md:py-48 bg-[#f5f5f0] flex flex-col items-center text-center px-6 overflow-hidden"
    >
      {/* DECORATIVE BACKGROUND TEXT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03]">
        <span className="text-[15vw] md:text-[20vw] font-black leading-none text-black select-none">
          FIZZ
        </span>
      </div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // smooth easeOutQuint-ish
        className="relative z-10 text-5xl sm:text-7xl md:text-9xl font-black text-black tracking-tighter leading-[0.9]"
      >
        THE ART <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
          OF FIZZ
        </span>
      </motion.h2>

      {/* Supporting Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-12 md:mt-16 flex flex-col items-center"
      >
        <p className="text-2xl sm:text-3xl md:text-5xl font-light text-gray-900 max-w-4xl px-4 italic leading-tight">
          "Crafted soda. Honest flavour. <br className="hidden md:block" />
          <span className="font-bold not-italic text-black">Real refreshment.</span>"
        </p>

        {/* Separator */}
        <div className="w-1 bg-black/10 h-24 my-10 md:my-16" />

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 max-w-lg px-6 leading-relaxed uppercase tracking-widest">
          ZfO reimagines Indian soda culture with balanced fizz, refined masala,
          and a premium glass bottle experience.
        </p>
      </motion.div>
    </section>
  );
};

export default PromoSection;
