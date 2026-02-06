import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { u as useSEO } from "./useSEO-DQijVuiu.js";
const Infographics = () => {
  useSEO({
    title: "Craft Soda vs Regular Soda: The Complete Comparison Infographic | ZfO",
    description: "A comprehensive infographic comparing craft soda and regular soda. Learn about ingredients, sustainability, health impacts, and more. Shareable data for education.",
    keywords: ["craft soda vs regular soda", "soda comparison infographic", "glass bottle vs plastic", "sustainable beverage guide", "healthy soda alternatives"],
    ogType: "article",
    canonicalUrl: `${window.location.origin}/infographics/craft-soda-vs-regular-soda`
  });
  useEffect(() => {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Craft Soda vs Regular Soda: The Complete Comparison",
      "description": "A comprehensive infographic comparing craft soda and regular soda across multiple dimensions.",
      "author": {
        "@type": "Organization",
        "name": "ZfO"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ZfO",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      },
      "datePublished": "2024-01-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${window.location.origin}/infographics/craft-soda-vs-regular-soda`
      }
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(articleSchema, null, 2);
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);
  const comparisonData = [
    {
      category: "Ingredients",
      craftSoda: ["Real cane sugar", "Natural fruit extracts", "Traditional spices", "No artificial flavors"],
      regularSoda: ["High fructose corn syrup", "Artificial flavors", "Chemical preservatives", "Caffeine"]
    },
    {
      category: "Packaging",
      craftSoda: ["100% recyclable glass", "Returnable bottles", "Zero microplastics", "Premium presentation"],
      regularSoda: ["Single-use plastic", "Non-recyclable caps", "Microplastic leaching", "Cheap appearance"]
    },
    {
      category: "Environmental Impact",
      craftSoda: ["Carbon neutral production", "Local sourcing", "Minimal waste", "Glass recycling"],
      regularSoda: ["High carbon footprint", "Global supply chain", "Massive plastic waste", "450-year decomposition"]
    },
    {
      category: "Health Impact",
      craftSoda: ["No artificial sweeteners", "Real ingredients", "Lower processed sugar", "Natural spices benefits"],
      regularSoda: ["Artificial sweeteners", "Processed ingredients", "High glycemic load", "Empty calories"]
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-black text-white pt-32 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx("nav", { className: "mb-8 text-sm", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center space-x-2 text-white/50", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { className: "text-white/30", children: "/" }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/fizzroom", className: "hover:text-white transition-colors", children: "Fizzroom" }) }),
      /* @__PURE__ */ jsx("li", { className: "text-white/30", children: "/" }),
      /* @__PURE__ */ jsx("li", { className: "text-white", "aria-current": "page", children: "Infographics" })
    ] }) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block px-4 py-1 bg-[#c41e3a] text-white font-bold tracking-[0.3em] uppercase mb-4 text-xs rounded-full", children: "Shareable Content" }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6", style: { backgroundColor: "#fafafa", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: "Craft Soda vs Regular Soda" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-white/70 max-w-3xl mx-auto", children: "A comprehensive comparison guide. Feel free to share this infographic with proper attribution." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        className: "bg-white/5 rounded-2xl p-8 mb-16 border border-white/10",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Want to embed this on your site?" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 mb-4", children: "Copy the code below to share this infographic:" }),
          /* @__PURE__ */ jsx("div", { className: "bg-black rounded-lg p-4 overflow-x-auto", children: /* @__PURE__ */ jsx("code", { className: "text-green-400 text-sm whitespace-pre-wrap", children: `<a href="https://www.zfo.co.in/infographics/craft-soda-vs-regular-soda">
  <img src="https://www.zfo.co.in/infographic-preview.jpg" alt="Craft Soda vs Regular Soda - Complete Comparison">
</a>
<p>Source: <a href="https://www.zfo.co.in">ZfO - India's First Craft Soda</a></p>` }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "space-y-12", children: comparisonData.map((section, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: index * 0.1 },
        className: "bg-gradient-to-br from-white/5 to-transparent rounded-2xl overflow-hidden border border-white/10",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#c41e3a] px-8 py-6 bg-white/5 border-b border-white/10", children: section.category }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-[#ffcc00] mb-6 flex items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-[#ffcc00] rounded-full mr-3" }),
                "Craft Soda"
              ] }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: section.craftSoda.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
                /* @__PURE__ */ jsx("span", { className: "text-green-400 mr-3 text-lg", children: "✓" }),
                /* @__PURE__ */ jsx("span", { className: "text-white/80", children: item })
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white/50 mb-6 flex items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-white/30 rounded-full mr-3" }),
                "Regular Soda"
              ] }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: section.regularSoda.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
                /* @__PURE__ */ jsx("span", { className: "text-red-400 mr-3 text-lg", children: "✗" }),
                /* @__PURE__ */ jsx("span", { className: "text-white/60", children: item })
              ] }, i)) })
            ] })
          ] })
        ]
      },
      section.category
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.4 },
        className: "mt-16 grid md:grid-cols-4 gap-6",
        children: [
          { value: "450+", label: "Years for plastic to decompose", color: "#c41e3a" },
          { value: "1M+", label: "Plastic bottles used per minute", color: "#ffcc00" },
          { value: "0", label: "Artificial ingredients in ZfO", color: "#c41e3a" },
          { value: "100%", label: "Recyclable packaging", color: "#ffcc00" }
        ].map((stat, index) => /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-white/5 rounded-xl border border-white/10", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold mb-2", style: { color: stat.color }, children: stat.value }),
          /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm", children: stat.label })
        ] }, index))
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.6 },
        className: "mt-16 text-center p-12 bg-gradient-to-br from-[#c41e3a]/20 to-[#ffcc00]/10 rounded-2xl border border-white/10",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Experience the Difference" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 mb-8 max-w-xl mx-auto", children: "Try ZfO craft soda and taste what real ingredients and sustainable packaging mean." }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/#productdetails",
              className: "inline-block px-8 py-4 bg-[#c41e3a] text-white font-bold tracking-wider uppercase rounded-full hover:bg-[#a01830] transition-all transform hover:scale-105",
              children: "Explore Flavors"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 p-6 bg-white/5 rounded-xl border border-white/10", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "How to Cite This Infographic" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm mb-4", children: "If you're using this content for research or reference, please cite as:" }),
      /* @__PURE__ */ jsx("div", { className: "bg-black rounded-lg p-4", children: /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm", children: 'ZfO. (2024). "Craft Soda vs Regular Soda: The Complete Comparison Infographic." Retrieved from https://www.zfo.co.in/infographics/craft-soda-vs-regular-soda' }) })
    ] })
  ] }) });
};
export {
  Infographics as default
};
