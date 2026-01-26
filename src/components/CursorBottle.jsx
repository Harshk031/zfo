import { motion, useMotionValue, useTransform } from "framer-motion";

const CursorBottle = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // STRONGER 3D ROTATION
  const rotateY = useTransform(x, [-300, 300], [-45, 45]);
  const rotateX = useTransform(y, [-300, 300], [35, -35]);

  return (
    <div
      className="relative z-20 perspective-"
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
        src="/bottle3.png"
        alt="ZfO Premium Masala Soda Glass Bottle - Artisanal Indian Craft Beverage"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateZ: [0, 3, -3, 0] }}
        transition={{
          rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" },
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
