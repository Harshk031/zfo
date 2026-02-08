'use client';

import { motion } from "framer-motion";

const FloatingText = () => {
  return (
    <motion.div
      className="absolute text-[10vw] font-extrabold text-gray-300/15 select-none z-0"
      animate={{ y: [-40, 40] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      THE ART OF FIZZ
    </motion.div>
  );
};

export default FloatingText;


