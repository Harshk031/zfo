import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, CheckCircle, Phone, Clock, ArrowRight, Send, User } from "lucide-react";
const WhatsAppLead = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    interest: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 4e3);
    return () => clearTimeout(timer);
  }, []);
  const interests = [
    { id: "retail", label: "Buy for Home", icon: "🏠" },
    { id: "bulk", label: "Bulk/Corporate Order", icon: "🏢" },
    { id: "distributor", label: "Become a Distributor", icon: "🚚" },
    { id: "cafe", label: "Stock in My Cafe/Store", icon: "☕" }
  ];
  const handleOpen = () => {
    setIsOpen(true);
    if (window.gtag) {
      window.gtag("event", "whatsapp_open", {
        event_category: "engagement",
        event_label: "WhatsApp Chat Opened"
      });
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setStep(1);
    setFormData({ name: "", interest: "", phone: "", email: "" });
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.zfo.co.in/whatsapp-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          source: window.location.pathname,
          userAgent: navigator.userAgent
        })
      });
      if (response.ok) {
        setStep(5);
        await sendWhatsAppMessage(formData);
        if (window.gtag) {
          window.gtag("event", "whatsapp_lead", {
            send_to: "AW-CONVERSION_ID",
            value: 5,
            currency: "INR"
          });
        }
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };
  const sendWhatsAppMessage = async (data) => {
    const message = `Hi! I'm ${data.name} and I'm interested in ${interests.find((i) => i.id === data.interest)?.label}. Please contact me at ${data.phone}`;
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return /* @__PURE__ */ jsxs("div", { className: "text-center py-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-8 h-8 text-green-400" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Quick Chat on WhatsApp" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm mb-6", children: "Get instant replies! Tell us what you're looking for and we'll get back to you in under 5 minutes." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setStep(2),
              className: "w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2",
              children: [
                "Start Chat ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
              ]
            }
          )
        ] });
      case 2:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-green-400" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: "What's your name?" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Your name",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => formData.name && setStep(3),
              disabled: !formData.name,
              className: "w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
              children: "Continue"
            }
          )
        ] });
      case 3:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 text-green-400" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: "What brings you here?" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: interests.map((interest) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setFormData({ ...formData, interest: interest.id });
                setStep(4);
              },
              className: "w-full p-3 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-colors flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-2xl", children: interest.icon }),
                /* @__PURE__ */ jsx("span", { className: "text-white", children: interest.label })
              ]
            },
            interest.id
          )) })
        ] });
      case 4:
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-green-400" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: "Where can we reach you?" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                placeholder: "WhatsApp Number (e.g., +91 98765 43210)",
                value: formData.phone,
                onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Email (optional)",
                value: formData.email,
                onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSubmit,
              disabled: !formData.phone || isSubmitting,
              className: "w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2",
              children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 animate-spin" }),
                " Connecting..."
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Open WhatsApp ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
              ] })
            }
          )
        ] });
      case 5:
        return /* @__PURE__ */ jsxs("div", { className: "text-center py-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8 text-white" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "WhatsApp Opening!" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm mb-4", children: "We've prepared a message for you. Send it to connect with our team instantly!" }),
          /* @__PURE__ */ jsx("div", { className: "bg-white/5 rounded-lg p-3 mb-4", children: /* @__PURE__ */ jsxs("p", { className: "text-white/80 text-sm text-left", children: [
            `"Hi! I'm `,
            formData.name,
            " and I'm interested in ",
            interests.find((i) => i.id === formData.interest)?.label,
            ". Please contact me at ",
            formData.phone,
            '"'
          ] }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                const message = `Hi! I'm ${formData.name} and I'm interested in ${interests.find((i) => i.id === formData.interest)?.label}. Please contact me at ${formData.phone}`;
                window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, "_blank");
              },
              className: "px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors",
              children: "Send Message"
            }
          )
        ] });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: showButton && !isOpen && /* @__PURE__ */ jsxs(
      motion.button,
      {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
        onClick: handleOpen,
        className: "fixed bottom-20 right-4 z-50 w-14 h-14 bg-green-500 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform",
        children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "w-7 h-7 text-white" }),
          /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
        onClick: handleClose,
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0, y: 20 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.9, opacity: 0, y: 20 },
            className: "relative w-full max-w-md bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-green-600 p-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5 text-white" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-white font-bold", children: "ZfO Support" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-green-100 text-xs flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-300 rounded-full animate-pulse" }),
                      "Typically replies instantly"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleClose,
                    className: "p-2 text-white/70 hover:text-white transition-colors",
                    children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "p-6 min-h-[300px]", children: renderStep() }),
              /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-white/10 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-white/40 text-xs", children: "Powered by WhatsApp Business API" }) })
            ]
          }
        )
      }
    ) })
  ] });
};
export {
  WhatsAppLead as default
};
