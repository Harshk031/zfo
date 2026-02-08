import { motion, useTransform } from "framer-motion";
import ProgressiveImage from "./ProgressiveImage";

const Bottle = ({ scrollYProgress }) => {
  // ENHANCED 360-DEGREE ROTATION - FULL CIRCLE COMPLETION
  const rotate = useTransform(scrollYProgress, [0, 0.8], [0, 360]); // Full rotation from 0 to 80% scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);  // subtle scale

  return (
    <motion.div
      style={{ rotate, scale }}
      className="flex items-center justify-center w-full h-full pointer-events-none"
    >
      <ProgressiveImage
        src="/product-0bg.png?v=2"
        alt="ZfO Masala Soda Bottle - PREMIUM 360 ROTATION - Premium Glass Bottle Craft Beverage"
        bgColor="bg-transparent"
        className="h-[70vh] object-contain z-20 mx-auto"
      />
    </motion.div>
  );
};

export default Bottle;
