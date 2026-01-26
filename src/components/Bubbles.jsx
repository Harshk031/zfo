import { useMemo } from "react";

// Utility function to generate bubble data outside of render
const generateBubbleData = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 30 + Math.random() * 30, // BIG bubbles
    left: Math.random() * 100,
    bottom: Math.random() * 40,
    duration: 2 + Math.random() * 2, // 🔥 FAST
    delay: Math.random() * 1.5
  }));
};

const Bubbles = () => {
  // Generate bubble data with useMemo and empty dependency array
  const bubbles = useMemo(() => generateBubbleData(16), []);

  return (
    <div className="absolute inset-0 overflow-hidden z-20">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble animate-bubble"
          style={{
            left: `${bubble.left}%`,
            bottom: `-${bubble.bottom}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
