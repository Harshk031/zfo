import { motion, useMotionValue, useTransform } from "framer-motion";

const CursorBottle = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // STRONGER 3D ROTATION
  const rotateY = useTransform(x, [-300, 300], [-45, 45]);
  const rotateX = useTransform(y, [-300, 300], [35, -35]);

  return (
    <div
      className="relative z-20 perspective-1000"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.img
        src="/product-0bg.jpeg"
        alt="ZfO Premium Masala Soda Glass Bottle - ARTISANAL 360 ROTATION - Artisanal Indian Craft Beverage"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateZ: 360 }}
        transition={{
          rotateZ: { duration: 20, repeat: Infinity, ease: "linear" },
          type: "spring",
          stiffness: 120,
          damping: 14,
        }}
        className="w-55 md:w-70 drop-shadow-2xl"
      />
    </div>
  );
};

export default CursorBottle;
