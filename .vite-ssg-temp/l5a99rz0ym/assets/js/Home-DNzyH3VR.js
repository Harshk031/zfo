import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useMotionValue, useTransform, motion, useInView, useScroll } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaVolumeMute, FaVolumeUp, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { f as fizzPosts } from "./fizzroomData-BWGCZBJz.js";
const CursorBottle = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useTransform(x, [-300, 300], [-45, 45]);
  const rotateX = useTransform(y, [-300, 300], [35, -35]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "relative z-20 perspective-1000",
      onMouseMove: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      },
      onMouseLeave: () => {
        x.set(0);
        y.set(0);
      },
      children: /* @__PURE__ */ jsx(
        motion.img,
        {
          src: "/bottle3.png",
          alt: "ZfO Premium Masala Soda Glass Bottle - ARTISANAL 360 ROTATION - Artisanal Indian Craft Beverage",
          style: {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          },
          animate: { rotateZ: 360 },
          transition: {
            rotateZ: { duration: 20, repeat: Infinity, ease: "linear" },
            type: "spring",
            stiffness: 120,
            damping: 14
          },
          className: "w-55 md:w-70 drop-shadow-2xl"
        }
      )
    }
  );
};
const heroLines = [
  "SODA GOT A REBRAND.",
  "YOUR THIRST CALLED. IT'S PICKY NOW.",
  "TRASH SODA IS CANCELED.",
  "FIZZ THAT HITS DIFFERENT.",
  "GLASS BOTTLE ONLY. NO CAP."
];
const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroLines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const tryAutoplay = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = false;
          await videoRef.current.play();
          setIsMuted(false);
        } catch (err) {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {
            });
          }
          setIsMuted(true);
        }
      }
    };
    tryAutoplay();
  }, []);
  const toggleMute = async () => {
    if (videoRef.current) {
      if (isMuted) {
        try {
          videoRef.current.muted = false;
          await videoRef.current.play();
          setIsMuted(false);
        } catch (err) {
        }
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative h-screen bg-[#0a0a0a] overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      "video",
      {
        ref: videoRef,
        autoPlay: true,
        muted: isMuted,
        loop: true,
        playsInline: true,
        preload: "auto",
        className: "absolute inset-0 w-full h-full object-cover z-0",
        children: [
          /* @__PURE__ */ jsx("source", { src: "/polar-bear.mp4", type: "video/mp4" }),
          "Your browser does not support the video tag."
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 z-10" }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: toggleMute,
        className: "absolute top-6 right-6 z-50 group",
        "aria-label": isMuted ? "Unmute video" : "Mute video",
        children: [
          /* @__PURE__ */ jsx("div", { className: `absolute inset-0 rounded-full blur-md transition-all duration-500 ${isMuted ? "bg-gray-500/30" : "bg-white/20"}` }),
          /* @__PURE__ */ jsx("div", { className: "relative w-11 h-11 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg shadow-black/20 group-hover:border-white/40 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            isMuted ? /* @__PURE__ */ jsx(FaVolumeMute, { className: "text-white/70 text-base group-hover:text-white transition-colors" }) : /* @__PURE__ */ jsx(FaVolumeUp, { className: "text-white text-base transition-colors" }),
            !isMuted && /* @__PURE__ */ jsxs("div", { className: "absolute -right-1 top-1/2 -translate-y-1/2 flex gap-0.5", children: [
              /* @__PURE__ */ jsx("span", { className: "w-0.5 h-2 bg-white/60 rounded-full animate-pulse" }),
              /* @__PURE__ */ jsx("span", { className: "w-0.5 h-3 bg-white/60 rounded-full animate-pulse delay-75" }),
              /* @__PURE__ */ jsx("span", { className: "w-0.5 h-1.5 bg-white/60 rounded-full animate-pulse delay-150" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("span", { className: "absolute top-full mt-2 right-0 text-xs text-white/50 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap", children: isMuted ? "Unmute" : "Mute" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: "easeOut" },
          className: "w-full md:w-1/2 text-left z-30 pt-20 md:pt-0 px-4 sm:px-0 overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("p", { className: "subtitle-script text-[#c41e3a] mb-2 uppercase tracking-widest text-sm font-bold mt-4 md:mt-0", children: "UNAPOLOGETICALLY BOLD." }),
            /* @__PURE__ */ jsx("h1", { className: "headline-xl text-distressed drop-shadow-2xl break-words", style: { backgroundColor: "#fafafa" }, children: heroLines[index] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-6 text-[#a0a0a0] text-lg md:text-xl font-light max-w-sm leading-relaxed", children: [
              "Masala craft soda. ",
              /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
              "Zero fake. All bite."
            ] })
          ]
        },
        index
      ),
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative z-20", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/10 blur-3xl md:blur-[100px] rounded-full transform scale-75" }),
        /* @__PURE__ */ jsx("div", { className: "scale-[0.65] sm:scale-75 md:scale-110 lg:scale-125 md:translate-x-8 lg:translate-x-12 translate-y-2 md:translate-y-0", children: /* @__PURE__ */ jsx(CursorBottle, {}) })
      ] })
    ] })
  ] });
};
const PromoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref,
      id: "promosection",
      className: "relative py-32 md:py-48 bg-[#f5f5f0] flex flex-col items-center text-center px-6 overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03]", children: /* @__PURE__ */ jsx("span", { className: "text-[15vw] md:text-[20vw] font-black leading-none text-black select-none", children: "FIZZ" }) }),
        /* @__PURE__ */ jsxs(
          motion.h2,
          {
            initial: { opacity: 0, y: 40 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            className: "relative z-10 text-5xl sm:text-7xl md:text-9xl font-black text-black tracking-tighter leading-[0.9] uppercase",
            children: [
              "SODA ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black", children: "UNLEARNED" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
            className: "relative z-10 mt-12 md:mt-16 flex flex-col items-center",
            children: [
              /* @__PURE__ */ jsxs("p", { className: "text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 max-w-4xl px-4 leading-tight tracking-tight", children: [
                '"They mass-produced ',
                /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black", children: "mediocrity." }),
                /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
                'We brewed rebellion."'
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-1 bg-black/10 h-24 my-10 md:my-16" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-base md:text-lg font-black text-gray-800 max-w-lg px-6 leading-relaxed uppercase tracking-widest", children: [
                "No plastic. No sugar bombs. ",
                /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
                "Just real masala in real glass."
              ] })
            ]
          }
        )
      ]
    }
  );
};
const LaunchTeaser = () => {
  const [bubbles, setBubbles] = useState([]);
  const explodeFizz = () => {
    const newBubbles = Array.from({ length: 70 }).map((_, i) => {
      const size = Math.random() * 30 + 12;
      return {
        id: Date.now() + i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        driftX: (Math.random() - 0.5) * 300,
        driftY: -(Math.random() * 400 + 150),
        blur: Math.random() * 2 + 0.5,
        // 👈 thoda blur bhi kam
        duration: Math.max(3, 7 - size / 40)
      };
    });
    setBubbles(newBubbles);
    setTimeout(() => setBubbles([]), 5e3);
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative h-screen bg-black flex flex-col items-center justify-center text-center overflow-hidden px-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500 relative z-10 tracking-tighter mb-10 leading-none uppercase", children: "IT'S BREWING." }),
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: explodeFizz,
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        className: "px-10 py-5 rounded-full bg-gray-200 text-black font-black tracking-widest uppercase text-lg hover:bg-white transition-colors duration-300 relative z-10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]",
        children: "DROP ME A HINT →"
      }
    ),
    bubbles.map((b) => /* @__PURE__ */ jsx(
      motion.span,
      {
        className: "absolute rounded-full pointer-events-none",
        style: {
          width: b.size,
          height: b.size,
          left: `${b.x}%`,
          top: `${b.y}%`,
          filter: `blur(${b.blur}px)`,
          background: `
              radial-gradient(
                circle at 25% 25%,
                rgba(255,255,255,0.95),
                rgba(255,255,255,0.45) 35%,
                rgba(255,255,255,0.15) 60%,
                rgba(255,255,255,0.05)
              )
            `
        },
        initial: { scale: 0.2, opacity: 0 },
        animate: {
          scale: [0.3, 1, 1.05, 0.85],
          x: [0, b.driftX * 0.4, b.driftX],
          y: [0, b.driftY * 0.6, b.driftY],
          opacity: [0.9, 0.7, 0.3, 0]
        },
        transition: {
          duration: b.duration,
          ease: "easeOut"
        }
      },
      b.id
    ))
  ] });
};
const bottle = "/assets/images/bottle-BLiGERdH.png";
const Bottle = ({ scrollYProgress }) => {
  const rotate = useTransform(scrollYProgress, [0, 0.8], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: { rotate, scale },
      className: "flex items-center justify-center w-full h-full pointer-events-none",
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: bottle,
          alt: "ZfO Masala Soda Bottle - PREMIUM 360 ROTATION - Premium Glass Bottle Craft Beverage",
          className: "h-[70vh] object-contain z-20 mx-auto"
        }
      )
    }
  );
};
const statements = ["CRACK THE FIZZ", "DRINK THE CHAOS", "GEN-Z ENERGY"];
const MovingBgText = () => {
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none z-0 overflow-hidden", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "flex whitespace-nowrap text-[20vw] md:text-[8vw] font-black uppercase tracking-tighter gap-10 md:gap-20",
      animate: { x: ["0%", "-100%"] },
      transition: {
        repeat: Infinity,
        duration: 14,
        ease: "linear"
      },
      children: [...statements, ...statements, ...statements].map((text, i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: i % 2 === 0 ? "text-white/70" : "text-yellow-400/50",
          children: text
        },
        i
      ))
    }
  ) });
};
const HeroScene = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: heroRef,
      className: "relative min-h-screen bg-black overflow-hidden flex flex-col justify-center",
      children: [
        /* @__PURE__ */ jsx(MovingBgText, {}),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx(motion.div, { style: { scale: bottleScale }, children: /* @__PURE__ */ jsx(Bottle, { scrollYProgress }) }) })
      ]
    }
  );
};
const bottle1 = "/assets/images/b.png-BPbRbMDs.png";
const products = [
  {
    name: "REAL TALK.",
    tagline: "The philosophy behind the fizz",
    headings: ["Reclaiming the soul of soda"],
    description: "Soda was never meant to be a sugar bomb in plastic bottles. It began as a ritual — glass bottles, crown caps, sharp fizz, citrus brightness, and spice warmth. Over time, mass production replaced character. ZfO was born from a simple belief: soda can feel honest again. Crafted thoughtfully, balanced carefully, and designed for people who care about what they drink.",
    image: bottle1
  },
  {
    name: "The Art of Fizz",
    tagline: "Where craft meets restraint",
    headings: ["Soda treated like a culinary product"],
    description: "ZfO treats soda as a craft — not a commodity. From controlled carbonation and layered spice profiles to clean sweetness and aroma release, every element is engineered for sensory satisfaction. This is fizz with depth, not noise. Refreshment that respects flavor, experience, and balance.",
    image: bottle1
  },
  {
    name: "Masala Soda, Reimagined",
    tagline: "India’s classic, refined",
    headings: ["A modern expression of a street icon"],
    description: "Our first expression redefines masala soda for modern taste. Crisp citrus acidity, subtle spice warmth, smooth carbonation, and a clean finish — no syrupy heaviness, no artificial punch. Built for street food pairings, café culture, summer heat, and slow sipping alike.",
    image: bottle1
  }
];
const ProductDetails = () => {
  return /* @__PURE__ */ jsx("section", { id: "productdetails", className: "bg-[#f5f5f0] py-20 md:py-32 relative overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 md:px-8", children: products.map((prod, index) => {
    const isEven = index % 2 === 0;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex flex-col md:flex-row items-center mb-24 md:mb-40 gap-10 md:gap-20 ${!isEven ? "md:flex-row-reverse" : ""}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-1/2 flex justify-center", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] pb-[80%] rounded-full border border-black/5 bg-gradient-to-b from-white to-transparent" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black rounded-full scale-90" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: prod.image,
                  alt: `${prod.name} - ZfO Premium Masala Soda Bottle`,
                  className: "relative object-contain h-[120%] -rotate-12 hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 text-center md:text-left", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-block py-1 px-3 border border-black/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-black/60", children: [
              "0",
              index + 1
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-black leading-none tracking-tight", children: prod.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xl sm:text-2xl font-serif italic text-gray-500 mb-8", children: prod.tagline }),
            prod.headings.map((heading, idx) => /* @__PURE__ */ jsx(
              "h4",
              {
                className: "text-lg font-bold mb-4 uppercase tracking-wider text-black border-l-2 border-yellow-400 pl-4",
                children: heading
              },
              idx
            )),
            /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0", children: prod.description })
          ] })
        ]
      },
      index
    );
  }) }) });
};
const FizzroomTeaser = () => {
  const recentPosts = fizzPosts.slice(0, 3);
  return /* @__PURE__ */ jsxs("section", { className: "py-24 bg-black text-white relative z-20 border-t border-white/10", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-gray-500/5 blur-[100px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-16", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold tracking-[0.2em] text-gray-400 mb-4 uppercase", children: "Reality Check." }),
          /* @__PURE__ */ jsx("h3", { className: "text-4xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40", children: "THE FIZZROOM." })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/fizzroom", className: "hidden md:flex items-center space-x-2 text-white/60 hover:text-gray-300 transition-colors uppercase text-xs tracking-widest border border-white/20 px-6 py-3 rounded-full hover:border-gray-400/50", children: [
          /* @__PURE__ */ jsx("span", { children: "ENTER THE VOID ↗" }),
          /* @__PURE__ */ jsx(FaArrowRight, {})
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: recentPosts.map((post, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: index * 0.1 },
          viewport: { once: true },
          className: "group block",
          children: /* @__PURE__ */ jsxs(Link, { to: `/fizzroom/${post.id}`, children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-lg mb-6 border border-white/10 group-hover:border-gray-400/30 transition-colors", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: post.image,
                alt: post.title,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-xs text-gray-400 font-bold uppercase tracking-widest mb-3", children: [
              /* @__PURE__ */ jsx("span", { children: post.category }),
              /* @__PURE__ */ jsx("span", { className: "text-white/20", children: "•" }),
              /* @__PURE__ */ jsx("span", { className: "text-white/40 font-mono", children: post.date })
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold uppercase leading-tight group-hover:text-gray-300 transition-colors", children: post.title })
          ] })
        },
        post.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 md:hidden", children: /* @__PURE__ */ jsxs(Link, { to: "/fizzroom", className: "flex items-center justify-center space-x-2 text-white hover:text-gray-300 transition-colors uppercase text-sm tracking-widest border border-white/20 py-4 rounded-full w-full", children: [
        /* @__PURE__ */ jsx("span", { children: "DIVE IN ↗" }),
        /* @__PURE__ */ jsx(FaArrowRight, {})
      ] }) })
    ] })
  ] });
};
const Home = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(PromoSection, {}),
    /* @__PURE__ */ jsx(ProductDetails, {}),
    /* @__PURE__ */ jsx(FizzroomTeaser, {}),
    /* @__PURE__ */ jsx(HeroScene, {}),
    /* @__PURE__ */ jsx(LaunchTeaser, {})
  ] });
};
export {
  Home as default
};
