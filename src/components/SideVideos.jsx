import { motion, useTransform } from "framer-motion";
import video1 from "../assets/video1.mp4";
import video4 from "../assets/video4.mp4";

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
          src={video1}
          className="w-72 h-96 rounded-xl object-cover transition-opacity duration-700 opacity-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={(e) => e.currentTarget.style.opacity = 1}
        >
          <source src={video1} type="video/mp4" />
        </video>
      </motion.div>

      {/* RIGHT video */}
      <motion.div
        style={{ y: rightY, opacity }}
        className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 z-40"
      >
        <video
          src={video4}
          className="w-72 h-96 rounded-xl object-cover transition-opacity duration-700 opacity-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={(e) => e.currentTarget.style.opacity = 1}
        >
          <source src={video4} type="video/mp4" />
        </video>
      </motion.div>
    </>
  );
};

export default SideVideos;
