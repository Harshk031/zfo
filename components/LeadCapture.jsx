'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Mail, Sparkles, Download, Clock } from 'lucide-react';

const LeadCapture = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState('exit'); // 'exit', 'scroll', 'time', 'content'
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShownExit, setHasShownExit] = useState(false);
  const [hasShownScroll, setHasShownScroll] = useState(false);
  const [hasShownTime, setHasShownTime] = useState(false);

  // Lead magnets configuration
  const leadMagnets = {
    exit: {
      title: "Wait! Don't Leave Empty-Handed",
      subtitle: "Get Our Secret Masala Soda Recipe",
      description: "Join 10,000+ fizz enthusiasts and get the authentic street-style masala soda recipe + 3 exclusive flavor variations.",
      cta: "Send Me The Recipe",
      incentive: "Free PDF • Instant Download",
      icon: <Gift className="w-12 h-12 text-[#ffcc00]" />,
      successTitle: "Recipe Incoming! 🎉",
      successMessage: "Check your inbox in 2 minutes. We've also added a special surprise for you!"
    },
    scroll: {
      title: "Loving What You're Reading?",
      subtitle: "Get Our Hydration Guide FREE",
      description: "Discover the science-backed hydration habits that changed our team's energy levels. Plus: A 7-day hydration challenge tracker.",
      cta: "Get The Guide",
      incentive: "Free Guide + Tracker • No Spam",
      icon: <Download className="w-12 h-12 text-[#ffcc00]" />,
      successTitle: "You're In! 💧",
      successMessage: "Your hydration guide is on its way. Get ready to glow up!"
    },
    time: {
      title: "Still Here? You Deserve Something Special",
      subtitle: "VIP Early Access + 20% Off",
      description: "Be the first to try limited editions and get exclusive subscriber-only discounts. No generic soda, just craft.",
      cta: "Join VIP List",
      incentive: "20% Off First Order • Early Access",
      icon: <Sparkles className="w-12 h-12 text-[#ffcc00]" />,
      successTitle: "Welcome to VIP! ✨",
      successMessage: "Your 20% discount code: VIP20. Valid for 48 hours!"
    },
    content: {
      title: "Want The Full Story?",
      subtitle: "Download Our Complete Soda Industry Report",
      description: "20-page deep dive into the ₹400B soda industry, hidden ingredients exposed, and the craft revolution.",
      cta: "Download Report",
      incentive: "20 Pages • Data-Backed • Free",
      icon: <Mail className="w-12 h-12 text-[#ffcc00]" />,
      successTitle: "Report Sent! 📊",
      successMessage: "Your comprehensive report is being emailed now. Knowledge is power!"
    }
  };

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShownExit && !isVisible) {
        setModalType('exit');
        setIsVisible(true);
        setHasShownExit(true);
        localStorage.setItem('zfo_exit_shown', 'true');
      }
    };

    const hasShownBefore = localStorage.getItem('zfo_exit_shown');
    if (hasShownBefore) setHasShownExit(true);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExit, isVisible]);

  // Scroll depth trigger (50%)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && !hasShownScroll && !isVisible && !hasShownExit) {
        setModalType('scroll');
        setIsVisible(true);
        setHasShownScroll(true);
        localStorage.setItem('zfo_scroll_shown', 'true');
      }
    };

    const hasShownBefore = localStorage.getItem('zfo_scroll_shown');
    if (hasShownBefore) setHasShownScroll(true);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownScroll, isVisible, hasShownExit]);

  // Time-based trigger (30 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownTime && !isVisible && !hasShownExit && !hasShownScroll) {
        setModalType('time');
        setIsVisible(true);
        setHasShownTime(true);
        localStorage.setItem('zfo_time_shown', 'true');
      }
    }, 30000);

    const hasShownBefore = localStorage.getItem('zfo_time_shown');
    if (hasShownBefore) setHasShownTime(true);

    return () => clearTimeout(timer);
  }, [hasShownTime, isVisible, hasShownExit, hasShownScroll]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Store lead in localStorage (works without backend)
    const leadData = {
      email,
      name,
      source: modalType,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      pageUrl: window.location.href
    };
    
    // Get existing leads
    const existingLeads = JSON.parse(localStorage.getItem('zfo_leads') || '[]');
    existingLeads.push(leadData);
    localStorage.setItem('zfo_leads', JSON.stringify(existingLeads));
    
    // Option 1: Google Sheets Integration (free, no backend needed)
    // Replace with your Google Apps Script URL
    try {
      await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
    } catch (error) {
      console.log('Google Sheets submission (optional):', error);
    }
    
    // Option 2: Email service providers (Mailchimp, ConvertKit, etc.)
    // These have client-side APIs you can use directly
    
    setIsSubmitted(true);
    
    // Track conversion in analytics
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'engagement',
        event_label: modalType,
        value: 1
      });
    }
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: modalType,
        value: 1.00,
        currency: 'INR'
      });
    }
  };

  const closeModal = () => {
    setIsVisible(false);
    setIsSubmitted(false);
    setEmail('');
    setName('');
  };

  const currentMagnet = leadMagnets[modalType];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ffcc00] via-[#ff6b35] to-[#ffcc00]" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ffcc00]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#ff6b35]/10 rounded-full blur-3xl" />

            <div className="p-8">
              {!isSubmitted ? (
                <>
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      {currentMagnet.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <p className="text-[#ffcc00] text-sm font-medium mb-2 uppercase tracking-wider">
                      {currentMagnet.subtitle}
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {currentMagnet.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {currentMagnet.description}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#ffcc00] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#ffcc00] transition-colors"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-[#ffcc00] to-[#ff6b35] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#ffcc00]/20 transition-all transform hover:scale-[1.02]"
                    >
                      {currentMagnet.cta}
                    </button>
                  </form>

                  {/* Trust Badge */}
                  <div className="mt-4 text-center">
                    <p className="text-white/40 text-xs flex items-center justify-center gap-2">
                      <Clock className="w-3 h-3" />
                      {currentMagnet.incentive}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {currentMagnet.successTitle}
                  </h3>
                  <p className="text-white/60">
                    {currentMagnet.successMessage}
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-6 px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                  >
                    Continue Reading
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCapture;

