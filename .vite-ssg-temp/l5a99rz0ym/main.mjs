var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import React, { useState, useEffect, lazy, Suspense, Component } from "react";
import ReactDOM from "react-dom/client";
import { Link, useLocation, Routes, Route, BrowserRouter } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaBars, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AlertTriangle, RefreshCw, Home as Home$1 } from "lucide-react";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/#promosection" },
  { name: "Flavours", href: "/#productdetails" },
  { name: "The Fizzroom", href: "/fizzroom" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "#footer" }
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuVariants = {
    closed: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
        // Custom easing for premium feel
      }
    },
    open: {
      y: "0%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };
  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 50 }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: () => setIsOpen(!isOpen),
        className: "fixed top-6 right-6 z-50 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white text-xl shadow-lg hover:bg-white/20 transition-colors cursor-pointer",
        whileTap: { scale: 0.9 },
        "aria-label": "Toggle Menu",
        children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isOpen ? /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { rotate: -90, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            exit: { rotate: 90, opacity: 0 },
            transition: { duration: 0.2 },
            children: /* @__PURE__ */ jsx(FaTimes, {})
          },
          "close"
        ) : /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { rotate: 90, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            exit: { rotate: -90, opacity: 0 },
            transition: { duration: 0.2 },
            children: /* @__PURE__ */ jsx(FaBars, {})
          },
          "menu"
        ) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed top-6 left-6 z-50", children: /* @__PURE__ */ jsx("span", { className: "text-xl font-extrabold tracking-[0.2em] text-white mix-blend-difference", children: "ZFO" }) }),
    /* @__PURE__ */ jsxs(
      motion.nav,
      {
        initial: "closed",
        animate: isOpen ? "open" : "closed",
        variants: menuVariants,
        className: "fixed inset-0 bg-black z-40 flex flex-col justify-center items-center overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-yellow-500/10 rounded-full blur-2xl md:blur-3xl -translate-y-1/2 translate-x-1/2" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-56 md:w-80 h-56 md:h-80 bg-blue-500/10 rounded-full blur-2xl md:blur-3xl translate-y-1/2 -translate-x-1/2" }),
          /* @__PURE__ */ jsx(
            motion.ul,
            {
              variants: containerVariants,
              className: "relative z-10 text-center space-y-4 md:space-y-6",
              children: navLinks.map((link, index) => /* @__PURE__ */ jsx(
                motion.li,
                {
                  variants: itemVariants,
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: link.href,
                      onClick: () => setIsOpen(false),
                      className: "block text-4xl sm:text-5xl md:text-7xl font-extrabold text-white hover:text-yellow-400 transition-colors tracking-tight uppercase",
                      children: [
                        /* @__PURE__ */ jsxs("span", { className: "text-xs sm:text-sm md:text-lg font-light text-white/40 align-top mr-2 md:mr-4", children: [
                          "0",
                          index + 1
                        ] }),
                        link.name
                      ]
                    }
                  )
                },
                link.name
              ))
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: itemVariants,
              className: "absolute bottom-12 text-white/30 text-xs sm:text-sm tracking-widest",
              children: "CRAFTED IN INDIA"
            }
          )
        ]
      }
    )
  ] });
};
const Footer = () => {
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      id: "footer",
      className: "relative bg-black text-white pt-20 md:pt-32 pb-10 px-6 overflow-hidden flex flex-col justify-between",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-0 w-full text-center text-[25vw] font-black text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter", children: "ZFO" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto w-full relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-12", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-[0.2em] text-white mb-2", children: "ZFO" }),
              /* @__PURE__ */ jsx("p", { className: "text-white/50 text-sm tracking-wide uppercase", children: "The Art of Fizz · Est. 2024" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-8", children: [
              { icon: /* @__PURE__ */ jsx(FaInstagram, {}), href: "https://www.instagram.com/drinkzfo" },
              { icon: /* @__PURE__ */ jsx(FaLinkedinIn, {}), href: "https://www.linkedin.com/company/freshozz-beverages/" }
            ].map((social, i) => /* @__PURE__ */ jsx(
              "a",
              {
                href: social.href,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-2xl text-white/40 hover:text-gray-300 transition-colors duration-300",
                children: social.icon
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full h-px bg-white/10 my-10" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between text-xs sm:text-sm text-white/30 tracking-widest uppercase gap-4", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " ZfO Beverages."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-center", children: [
              /* @__PURE__ */ jsx(Link, { to: "/faq", className: "hover:text-white transition-colors", children: "FAQ" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:beverages@zfo.co.in", className: "hover:text-white transition-colors", children: "Contact" }),
              /* @__PURE__ */ jsx("span", { className: "text-white/50 text-lg", children: "®" })
            ] })
          ] })
        ] })
      ]
    }
  );
};
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
const LeadCapture = lazy(() => import("./assets/js/LeadCapture-BAPThiFP.js"));
const SocialProof = lazy(() => import("./assets/js/SocialProof-CjYsF449.js"));
const WhatsAppLead = lazy(() => import("./assets/js/WhatsAppLead-DVPPRt0n.js"));
const ChatBot = lazy(() => import("./assets/js/ChatBot-D8zBH07f.js"));
const Home = lazy(() => import("./assets/js/Home-DNzyH3VR.js"));
const Fizzroom = lazy(() => import("./assets/js/Fizzroom-CxSg5eOM.js"));
const FizzroomPost = lazy(() => import("./assets/js/FizzroomPost-By8_tN5v.js"));
const FAQ = lazy(() => import("./assets/js/FAQ-yaUdskAz.js"));
const Infographics = lazy(() => import("./assets/js/Infographics-dl7NBTq2.js"));
const PageLoader = () => /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-black", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffcc00]" }) });
const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title
      });
    }
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-black text-white overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(BubbleCursor, {}),
    /* @__PURE__ */ jsxs(Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsx(LeadCapture, {}),
      /* @__PURE__ */ jsx(SocialProof, {})
    ] }),
    /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsxs("div", { style: { contentVisibility: "auto" }, children: [
      /* @__PURE__ */ jsx(WhatsAppLead, {}),
      /* @__PURE__ */ jsx(ChatBot, {})
    ] }) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(PageLoader, {}), children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/fizzroom", element: /* @__PURE__ */ jsx(Fizzroom, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/fizzroom/:id", element: /* @__PURE__ */ jsx(FizzroomPost, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/faq", element: /* @__PURE__ */ jsx(FAQ, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/infographics/:slug", element: /* @__PURE__ */ jsx(Infographics, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "attemptRecovery", () => {
      try {
        sessionStorage.removeItem("zfo_cache");
        localStorage.removeItem("zfo_error_state");
      } catch (e) {
      }
    });
    __publicField(this, "handleRetry", () => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null
      });
    });
    __publicField(this, "handleReload", () => {
      window.location.reload();
    });
    __publicField(this, "handleGoHome", () => {
      window.location.href = "/";
    });
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState((prevState) => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));
    if (window.gtag) {
      window.gtag("event", "exception", {
        description: `${error.toString()} ${errorInfo.componentStack}`,
        fatal: true
      });
    }
    if (this.state.errorCount < 3) {
      this.attemptRecovery();
    }
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: "min-h-screen flex items-center justify-center bg-black text-white p-4",
          role: "alert",
          "aria-live": "assertive",
          children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-16 h-16 text-red-500 mx-auto", "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Something went wrong" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "We apologize for the inconvenience. Our team has been notified." }),
            false,
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: this.handleRetry,
                  className: "flex items-center justify-center gap-2 px-6 py-3 bg-[#ffcc00] text-black rounded-lg font-medium hover:bg-[#ffdb4d] transition-colors",
                  "aria-label": "Try again",
                  children: [
                    /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4" }),
                    "Try Again"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: this.handleReload,
                  className: "flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors",
                  "aria-label": "Reload page",
                  children: "Reload Page"
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: this.handleGoHome,
                  className: "flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors",
                  "aria-label": "Go to homepage",
                  children: [
                    /* @__PURE__ */ jsx(Home$1, { className: "w-4 h-4" }),
                    "Go Home"
                  ]
                }
              )
            ] }),
            this.state.errorCount > 2 && /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-yellow-500", children: "Multiple errors detected. Please contact support if this persists." })
          ] })
        }
      );
    }
    return this.props.children;
  }
}
const registerSW = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              showUpdateNotification(newWorker);
            }
          });
        });
      }).catch((error) => {
      });
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data === "sw-update") {
        }
      });
    });
  } else {
  }
};
const showUpdateNotification = (worker) => {
  window.dispatchEvent(new CustomEvent("sw-update-available", {
    detail: { worker }
  }));
};
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  registerSW();
}
if (typeof window !== "undefined") {
  ReactDOM.createRoot(document.getElementById("root")).render(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(App, {}) }) }) })
  );
}
