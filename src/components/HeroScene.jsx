import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Bottle from "./Bottle";
import SideVideos from "./SideVideos";
import MovingBgText from "./MovingBgText";

const HeroScene = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  // Bottle subtle scale
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center"
    >
      {/* Floating text */}
      <MovingBgText />

      {/* Bottle + side videos container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Side videos */}
        <SideVideos scrollYProgress={scrollYProgress} stayVisible />

        {/* Center bottle */}
        <motion.div style={{ scale: bottleScale }}>
          <Bottle scrollYProgress={scrollYProgress} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroScene;
