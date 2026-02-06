import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { f as fizzPosts } from "./fizzroomData-BWGCZBJz.js";
import { Link } from "react-router-dom";
import "react";
import { B as Breadcrumb } from "./ABTestedCTA-Dp1Fb36Q.js";
import { u as useSEO } from "./useSEO-DQijVuiu.js";
const FizzCard = ({ post, index }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1 },
      viewport: { once: true },
      className: "group relative block",
      children: /* @__PURE__ */ jsxs(Link, { to: `/fizzroom/${post.id}`, className: "block h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden aspect-[4/5] md:aspect-square mb-4 rounded-lg bg-white/5 border border-white/10 group-hover:border-gray-400/50 transition-colors duration-500", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: post.image,
              alt: post.title,
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-gray-300 text-black text-xs font-bold px-3 py-1 uppercase tracking-widest transform -skew-x-12", children: post.category })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-white/40 text-xs tracking-widest uppercase font-mono", children: [
            /* @__PURE__ */ jsx("span", { children: post.date }),
            /* @__PURE__ */ jsx("span", { children: "•" }),
            /* @__PURE__ */ jsx("span", { children: "By Team ZFO" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-black leading-tight group-hover:text-gray-300 transition-colors uppercase tracking-tighter", children: post.title }),
          /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm line-clamp-2 font-light", children: post.excerpt }),
          /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx("span", { className: "inline-block border-b border-white/30 text-xs uppercase tracking-widest group-hover:border-gray-400 group-hover:text-gray-300 transition-all pb-0.5", children: "SPILL THE TEA →" }) })
        ] })
      ] })
    }
  );
};
const Fizzroom = () => {
  useSEO({
    title: "The Fizzroom | ZfO Craft Soda Blog - Articles on Craft Beverages",
    description: "Explore the ZfO Fizzroom - our craft soda blog featuring articles on sustainable beverages, glass bottle packaging, masala soda history, and craft vs corporate soda. Written by ZfO team.",
    keywords: ["craft soda blog", "sustainable beverages", "glass bottle soda", "masala soda", "craft vs corporate soda", "ZfO articles"],
    ogType: "website",
    canonicalUrl: `${window.location.origin}/fizzroom`
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen pt-24 pb-20 px-4 md:px-12 bg-black text-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [
        { label: "Home", url: `${window.location.origin}/` },
        { label: "Fizzroom", url: `${window.location.origin}/fizzroom` }
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-20 text-center", children: [
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 },
            className: "text-5xl md:text-7xl font-light uppercase tracking-widest mb-4 text-transparent bg-clip-text bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 drop-shadow-lg",
            children: "FIZZROOM. / STORIES"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.8, delay: 0.2 },
            className: "text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light uppercase tracking-wider",
            children: "Latest articles & perspectives"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16", children: fizzPosts.map((post, index) => /* @__PURE__ */ jsx(FizzCard, { post, index }, post.id)) })
    ] })
  ] });
};
export {
  Fizzroom as default
};
