import { jsx, jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { f as fizzPosts } from "./fizzroomData-BWGCZBJz.js";
import { motion } from "framer-motion";
import "react";
import { B as Breadcrumb } from "./ABTestedCTA-Dp1Fb36Q.js";
import { u as useSEO } from "./useSEO-DQijVuiu.js";
const FizzroomPost = () => {
  const { id } = useParams();
  const post = fizzPosts.find((p) => p.id === parseInt(id));
  if (!post) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-black text-white pt-32 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white mb-4", children: "Article Not Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70", children: "The article you're looking for doesn't exist." })
    ] }) });
  }
  useSEO({
    title: post.title + " | ZfO Fizzroom",
    description: post.excerpt,
    keywords: post.keywords || [post.category, "craft soda", "ZfO"],
    ogType: "article",
    article: {
      publishedTime: post.date,
      author: post.author || "ZfO Team",
      section: post.category,
      tag: post.keywords || [post.category]
    },
    canonicalUrl: "https://www.zfo.co.in/fizzroom/" + id
  });
  const breadcrumbItems = [
    { label: "Home", url: "https://www.zfo.co.in/" },
    { label: "Fizzroom", url: "https://www.zfo.co.in/fizzroom" },
    { label: post.title, url: "https://www.zfo.co.in/fizzroom/" + id }
  ];
  return /* @__PURE__ */ jsx("article", { className: "min-h-screen bg-black text-white pt-32 pb-20", itemScope: true, itemType: "https://schema.org/Article", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx(Breadcrumb, { items: breadcrumbItems }),
    /* @__PURE__ */ jsxs(
      motion.header,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-block px-4 py-1 bg-[#c41e3a] text-white font-bold tracking-[0.3em] uppercase mb-6 text-xs rounded-full",
              itemProp: "articleSection",
              children: post.category
            }
          ),
          /* @__PURE__ */ jsx(
            "h1",
            {
              className: "headline-xl text-distressed mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
              style: { backgroundColor: "#fafafa" },
              itemProp: "headline",
              children: post.title
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 text-[#a0a0a0] text-sm mb-12 border-b border-white/10 pb-8", children: [
            /* @__PURE__ */ jsx("time", { dateTime: post.date, itemProp: "datePublished", children: post.date }),
            /* @__PURE__ */ jsx("span", { className: "text-[#c41e3a]", children: "•" }),
            /* @__PURE__ */ jsx("span", { itemProp: "timeRequired", children: "2 Min Read" }),
            /* @__PURE__ */ jsx("meta", { itemProp: "author", content: "ZfO Team" }),
            /* @__PURE__ */ jsx("meta", { itemProp: "publisher", content: "ZfO" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.figure,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, delay: 0.2 },
        className: "w-full aspect-video rounded-xl overflow-hidden mb-12 border border-white/10",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: post.image,
            alt: `Illustration for: ${post.title}`,
            className: "w-full h-full object-cover",
            itemProp: "image",
            loading: "eager"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, delay: 0.4 },
        className: "space-y-8",
        itemProp: "articleBody",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl md:text-4xl font-bold text-[#c41e3a] leading-tight tracking-tight", children: post.excerpt }),
          /* @__PURE__ */ jsx("div", { className: "text-[#fafafa] text-lg md:text-xl font-medium leading-loose space-y-6 whitespace-pre-line", children: post.content.split("\n\n").map((paragraph, index) => /* @__PURE__ */ jsx(
            motion.p,
            {
              className: "border-l-2 border-[#c41e3a] pl-6 hover:border-white transition-colors duration-300",
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.1 * index },
              children: paragraph
            },
            index
          )) })
        ]
      }
    ),
    post.relatedArticles && post.relatedArticles.length > 0 && /* @__PURE__ */ jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.6 },
        className: "mt-16 pt-12 border-t border-white/10",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-8", children: "Related Articles" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: post.relatedArticles.map((relatedId) => {
            const relatedPost = fizzPosts.find((p) => p.id === relatedId);
            if (!relatedPost) return null;
            return /* @__PURE__ */ jsxs(
              "a",
              {
                href: `/fizzroom/${relatedId}`,
                className: "block p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[#c41e3a] text-xs font-bold uppercase tracking-wider mb-2 block", children: relatedPost.category }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: relatedPost.title }),
                  /* @__PURE__ */ jsxs("p", { className: "text-white/60 text-sm", children: [
                    relatedPost.excerpt.substring(0, 100),
                    "..."
                  ] })
                ]
              },
              relatedId
            );
          }) })
        ]
      }
    )
  ] }) });
};
export {
  FizzroomPost as default
};
