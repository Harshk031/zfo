import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({});
  const [qualificationStep, setQualificationStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 6e3);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage({
        text: "Hi there! 👋 I'm ZfO Assistant. I can help you find the perfect soda or answer any questions. What brings you here today?",
        options: [
          { label: "Buy for Home", value: "home", icon: "🏠" },
          { label: "Bulk/Corporate Order", value: "bulk", icon: "🏢" },
          { label: "Become a Distributor", value: "distributor", icon: "🚚" },
          { label: "Stock in My Store", value: "retail", icon: "🏪" },
          { label: "Just Browsing", value: "browse", icon: "👀" }
        ]
      });
    }
  }, [isOpen]);
  const addBotMessage = (message) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", ...message, timestamp: /* @__PURE__ */ new Date() }]);
      setIsTyping(false);
    }, 800);
  };
  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: "user", text, timestamp: /* @__PURE__ */ new Date() }]);
  };
  const handleQualification = (value, text) => {
    const newUserData = { ...userData, intent: value, intentText: text };
    setUserData(newUserData);
    switch (qualificationStep) {
      case 0:
        if (value === "browse") {
          addBotMessage({
            text: "No worries! Take your time exploring. 😊 Here are some quick links to get you started:",
            options: [
              { label: "View Our Flavors", value: "flavors", icon: "🥤" },
              { label: "Read Our Story", value: "story", icon: "📖" },
              { label: "See Pricing", value: "pricing", icon: "💰" },
              { label: "Chat with Human", value: "human", icon: "👤" }
            ]
          });
        } else {
          addBotMessage({
            text: `Great! You're interested in ${text}. To help you better, may I know your name?`,
            input: true,
            placeholder: "Type your name..."
          });
          setQualificationStep(1);
        }
        break;
      case 1:
        setUserData({ ...newUserData, name: value });
        if (newUserData.intent === "home") {
          addBotMessage({
            text: `Nice to meet you, ${value}! 🎉 Which flavor interests you?`,
            options: [
              { label: "Masala Soda", value: "masala", icon: "🌶️" },
              { label: "Kala Khatta", value: "kalakhatta", icon: "🫐" },
              { label: "Jeera Soda", value: "jeera", icon: "🌿" },
              { label: "All Flavors", value: "all", icon: "🎁" }
            ]
          });
          setQualificationStep(2);
        } else if (newUserData.intent === "bulk") {
          addBotMessage({
            text: `Thanks, ${value}! For bulk orders, what's the quantity you're looking for?`,
            options: [
              { label: "50-100 bottles", value: "50-100", icon: "📦" },
              { label: "100-500 bottles", value: "100-500", icon: "📦📦" },
              { label: "500+ bottles", value: "500+", icon: "📦📦📦" },
              { label: "Not sure yet", value: "unsure", icon: "🤔" }
            ]
          });
          setQualificationStep(3);
        } else {
          addBotMessage({
            text: `Thanks, ${value}! What's the best email/phone to reach you?`,
            input: true,
            placeholder: "Enter email or phone..."
          });
          setQualificationStep(4);
        }
        break;
      case 2:
        setUserData({ ...newUserData, flavor: value });
        addBotMessage({
          text: "Excellent choice! 🎯 Let me get you an exclusive offer. What's your email or WhatsApp number?",
          input: true,
          placeholder: "Email or WhatsApp number..."
        });
        setQualificationStep(4);
        break;
      case 3:
        setUserData({ ...newUserData, quantity: value });
        addBotMessage({
          text: "Perfect! For bulk orders, I'll connect you with our sales team. What's your email or phone number?",
          input: true,
          placeholder: "Email or phone..."
        });
        setQualificationStep(4);
        break;
      case 4:
        setUserData({ ...newUserData, contact: value });
        addBotMessage({
          text: "🎉 Awesome! I've noted your details. Our team will contact you within 2 hours with a personalized quote. Want a 10% discount code right now?",
          options: [
            { label: "Yes, send me the code!", value: "discount_yes", icon: "🎁" },
            { label: "No thanks", value: "discount_no", icon: "👍" }
          ]
        });
        setQualificationStep(5);
        submitLeadToCRM({ ...newUserData, contact: value });
        break;
      case 5:
        if (value === "discount_yes") {
          addBotMessage({
            text: "🎁 Here's your exclusive 10% discount code: **CHAT10**\n\nUse it at checkout or show it to our team when they call! Valid for 48 hours.",
            options: [
              { label: "Thanks! Visit Shop", value: "shop", icon: "🛒" },
              { label: "I have more questions", value: "more_q", icon: "❓" }
            ]
          });
        } else {
          addBotMessage({
            text: "No problem at all! 😊 Is there anything else I can help you with?",
            options: [
              { label: "View Products", value: "shop", icon: "🛒" },
              { label: "Chat with Human", value: "human", icon: "👤" },
              { label: "That's all, thanks!", value: "bye", icon: "👋" }
            ]
          });
        }
        break;
      default:
        addBotMessage({
          text: "Is there anything else I can help you with?",
          options: [
            { label: "Browse Products", value: "shop", icon: "🛒" },
            { label: "Talk to Human", value: "human", icon: "👤" },
            { label: "Goodbye!", value: "bye", icon: "👋" }
          ]
        });
    }
  };
  const submitLeadToCRM = async (data) => {
    try {
      if (window.gtag) {
        window.gtag("event", "qualified_lead", {
          event_category: "lead",
          event_label: data.intent,
          value: 10,
          custom_parameter_1: data.flavor || data.quantity || "general",
          custom_parameter_2: data.intent
        });
      }
      const leadData = {
        ...data,
        source: "chatbot",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        pageUrl: window.location.href,
        qualificationScore: calculateLeadScore(data),
        type: "chat_qualified"
      };
      const existingLeads = JSON.parse(localStorage.getItem("zfo_leads") || "[]");
      existingLeads.push(leadData);
      localStorage.setItem("zfo_leads", JSON.stringify(existingLeads));
      try {
        await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData)
        });
      } catch (e) {
      }
    } catch (error) {
    }
  };
  const calculateLeadScore = (data) => {
    let score = 0;
    if (data.intent === "bulk") score += 25;
    if (data.intent === "distributor") score += 30;
    if (data.intent === "retail") score += 20;
    if (data.intent === "home") score += 15;
    if (data.quantity === "500+") score += 20;
    if (data.quantity === "100-500") score += 15;
    if (data.contact?.includes("@")) score += 10;
    return Math.min(score, 100);
  };
  const handleOptionClick = (option) => {
    addUserMessage(option.label);
    handleQualification(option.value, option.label);
  };
  const handleSend = () => {
    if (!inputValue.trim()) return;
    addUserMessage(inputValue);
    handleQualification(inputValue, inputValue);
    setInputValue("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: showButton && !isOpen && /* @__PURE__ */ jsxs(
      motion.button,
      {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
        onClick: () => setIsOpen(true),
        className: "fixed bottom-36 right-4 z-50 w-14 h-14 bg-gradient-to-r from-[#ffcc00] to-[#ff6b35] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform group",
        children: [
          /* @__PURE__ */ jsx(Bot, { className: "w-7 h-7 text-black" }),
          /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a] animate-pulse" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute right-16 bg-white text-black px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity", children: [
            "Chat with us!",
            /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white rotate-45" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
        onClick: () => setIsOpen(false),
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0, y: 20 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.9, opacity: 0, y: 20 },
            className: "relative w-full max-w-md h-[600px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#ffcc00] to-[#ff6b35] p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-black/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Bot, { className: "w-5 h-5 text-black" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-black font-bold", children: "ZfO Assistant" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-black/70 text-xs flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
                      "Online • Replies instantly"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setIsOpen(false),
                    className: "p-2 text-black/70 hover:text-black transition-colors",
                    children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
                messages.map((message, index) => /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    className: `flex ${message.type === "user" ? "justify-end" : "justify-start"}`,
                    children: /* @__PURE__ */ jsxs("div", { className: `max-w-[80%] ${message.type === "user" ? "bg-[#ffcc00] text-black" : "bg-white/10 text-white"} rounded-2xl p-3`, children: [
                      message.type === "bot" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                        /* @__PURE__ */ jsx(Bot, { className: "w-4 h-4 text-[#ffcc00]" }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs text-white/50", children: "ZfO Assistant" })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm whitespace-pre-line", children: message.text }),
                      message.options && /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: message.options.map((option, optIndex) => /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => handleOptionClick(option),
                          className: "w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left flex items-center gap-3 transition-colors",
                          children: [
                            /* @__PURE__ */ jsx("span", { children: option.icon }),
                            /* @__PURE__ */ jsx("span", { className: "text-sm", children: option.label })
                          ]
                        },
                        optIndex
                      )) }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-white/30 mt-2 text-right", children: message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                    ] })
                  },
                  index
                )),
                isTyping && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    className: "flex justify-start",
                    children: /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-2xl p-3 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Bot, { className: "w-4 h-4 text-[#ffcc00]" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
                        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white/50 rounded-full animate-bounce", style: { animationDelay: "0ms" } }),
                        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white/50 rounded-full animate-bounce", style: { animationDelay: "150ms" } }),
                        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white/50 rounded-full animate-bounce", style: { animationDelay: "300ms" } })
                      ] })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-white/10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: inputValue,
                      onChange: (e) => setInputValue(e.target.value),
                      onKeyPress: handleKeyPress,
                      placeholder: "Type your message...",
                      className: "flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#ffcc00] transition-colors"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: handleSend,
                      disabled: !inputValue.trim(),
                      className: "p-3 bg-gradient-to-r from-[#ffcc00] to-[#ff6b35] text-black rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed",
                      children: /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-center text-white/30 text-xs mt-2", children: "Powered by AI • Responses may take a moment" })
              ] })
            ]
          }
        )
      }
    ) })
  ] });
};
export {
  ChatBot as default
};
