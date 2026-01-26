import { useEffect } from "react";

const BubbleCursor = () => {
  useEffect(() => {
    const bubble = document.createElement("div");
    bubble.className = "bubble-cursor";
    document.body.appendChild(bubble);

    const move = (e) => {
      bubble.style.left = `${e.clientX}px`;
      bubble.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return null;
};

export default BubbleCursor;
