'use client';

import { motion, useTransform } from "framer-motion";

const SideVideos = ({ scrollYProgress }) => {
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);

  return (
    <>
      {/* LEFT video */}
      <motion.div
        style={{ y: leftY, opacity }}
        className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 z-40"
      >
        <video
          src="/polar-bear.mp4"
          className="w-72 h-96 rounded-xl object-cover transition-opacity duration-700 opacity-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={(e) => e.currentTarget.style.opacity = 1}
        >
          <source src="/polar-bear.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* RIGHT video */}
      <motion.div
        style={{ y: rightY, opacity }}
        className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 z-40"
      >
        <video
          src="/polar-bear.mp4"
          className="w-72 h-96 rounded-xl object-cover transition-opacity duration-700 opacity-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={(e) => e.currentTarget.style.opacity = 1}
        >
          <source src="/polar-bear.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </>
  );
};

export default SideVideos;
