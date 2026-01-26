import { motion, useTransform } from "framer-motion";
import bottle from "../assets/bottle.png";

const Bottle = ({ scrollYProgress }) => {
  // Always render, no null check
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]); // small rotation
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);  // subtle scale

  return (
    <motion.div
      style={{ rotate, scale }}
      className="flex items-center justify-center w-full h-full pointer-events-none"
    >
      <img
        src={bottle}
        alt="Freshroz Bottle"
        className="h-[70vh] object-contain z-20 mx-auto"
      />
    </motion.div>
  );
};

export default Bottle;
