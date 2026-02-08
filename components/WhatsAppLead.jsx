'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, User, ArrowRight, CheckCircle, Clock } from 'lucide-react';

const WhatsAppLead = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Welcome, 2: Name, 3: Interest, 4: Contact, 5: Complete
  const [formData, setFormData] = useState({
    name: '',
    interest: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Show button after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const interests = [
    { id: 'retail', label: 'Buy for Home', icon: '🏠' },
    { id: 'bulk', label: 'Bulk/Corporate Order', icon: '🏢' },
    { id: 'distributor', label: 'Become a Distributor', icon: '🚚' },
    { id: 'cafe', label: 'Stock in My Cafe/Store', icon: '☕' }
  ];

  const handleOpen = () => {
    setIsOpen(true);
    // Track event
    if (window.gtag) {
      window.gtag('event', 'whatsapp_open', {
        event_category: 'engagement',
        event_label: 'WhatsApp Chat Opened'
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep(1);
    setFormData({ name: '', interest: '', phone: '', email: '' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Send to backend for WhatsApp API integration
    try {
      const response = await fetch('https://api.zfo.co.in/whatsapp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: window.location.pathname,
          userAgent: navigator.userAgent
        })
      });

      if (response.ok) {
        setStep(5);
        // Trigger WhatsApp message via API
        await sendWhatsAppMessage(formData);
        
        // Track conversion
        if (window.gtag) {
          window.gtag('event', 'whatsapp_lead', {
            send_to: 'AW-CONVERSION_ID',
            value: 5.0,
            currency: 'INR'
          });
        }
      }
    } catch (error) {
      console.error('WhatsApp lead submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendWhatsAppMessage = async (data) => {
    // This would integrate with WhatsApp Business API
    // For now, we'll prepare the message
    const message = `Hi! I'm ${data.name} and I'm interested in ${interests.find(i => i.id === data.interest)?.label}. Please contact me at ${data.phone}`;
    
    // Open WhatsApp Web/App with pre-filled message
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Quick Chat on WhatsApp</h3>
            <p className="text-white/60 text-sm mb-6">
              Get instant replies! Tell us what you're looking for and we'll get back to you in under 5 minutes.
            </p>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              Start Chat <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white font-medium">What's your name?</span>
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
            />
            <button
              onClick={() => formData.name && setStep(3)}
              disabled={!formData.name}
              className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Send className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white font-medium">What brings you here?</span>
            </div>
            <div className="space-y-2">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => {
                    setFormData({ ...formData, interest: interest.id });
                    setStep(4);
                  }}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-colors flex items-center gap-3"
                >
                  <span className="text-2xl">{interest.icon}</span>
                  <span className="text-white">{interest.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white font-medium">Where can we reach you?</span>
            </div>
            <div className="space-y-3">
              <input
                type="tel"
                placeholder="WhatsApp Number (e.g., +91 98765 43210)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!formData.phone || isSubmitting}
              className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <><Clock className="w-5 h-5 animate-spin" /> Connecting...</>
              ) : (
                <>Open WhatsApp <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        );

      case 5:
        return (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp Opening!</h3>
            <p className="text-white/60 text-sm mb-4">
              We've prepared a message for you. Send it to connect with our team instantly!
            </p>
            <div className="bg-white/5 rounded-lg p-3 mb-4">
              <p className="text-white/80 text-sm text-left">
                "Hi! I'm {formData.name} and I'm interested in {interests.find(i => i.id === formData.interest)?.label}. Please contact me at {formData.phone}"
              </p>
            </div>
            <button
              onClick={() => {
                const message = `Hi! I'm ${formData.name} and I'm interested in ${interests.find(i => i.id === formData.interest)?.label}. Please contact me at ${formData.phone}`;
                window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
            >
              Send Message
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleOpen}
            className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-green-500 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-green-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">ZfO Support</h3>
                    <p className="text-green-100 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                      Typically replies instantly
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 min-h-[300px]">
                {renderStep()}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 text-center">
                <p className="text-white/40 text-xs">
                  Powered by WhatsApp Business API
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppLead;

