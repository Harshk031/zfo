const Bubbles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-20">
      {Array.from({ length: 16 }).map((_, i) => {
        const size = 30 + Math.random() * 30; // BIG bubbles

        return (
          <div
            key={i}
            className="bubble animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 40}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${2 + Math.random() * 2}s`, // 🔥 FAST
              animationDelay: `${Math.random() * 1.5}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Bubbles;
