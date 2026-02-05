import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Gift, Clock, Flame } from 'lucide-react';

// A/B Test Configuration
const CTA_VARIANTS = {
  A: {
    id: 'A',
    name: 'Urgency Focus',
    headline: 'Only 47 Spots Left at Launch Price',
    subheadline: 'Join 1,000+ early supporters',
    ctaText: 'Secure Your Spot',
    icon: <Clock className="w-5 h-5" />,
    color: 'from-orange-500 to-red-600',
    badge: '🔥 Selling Fast',
    urgencyMessage: 'Price increases tomorrow'
  },
  B: {
    id: 'B',
    name: 'Value Focus',
    headline: 'Get 20% OFF + Free Shipping',
    subheadline: 'First 100 orders only',
    ctaText: 'Claim Your Discount',
    icon: <Gift className="w-5 h-5" />,
    color: 'from-green-500 to-emerald-600',
    badge: '🎁 Limited Offer',
    urgencyMessage: '47 codes remaining'
  },
  C: {
    id: 'C',
    name: 'Exclusivity Focus',
    headline: 'Join the VIP Early Access List',
    subheadline: 'Be the first to taste ZfO',
    ctaText: 'Get VIP Access',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'from-purple-500 to-pink-600',
    badge: '✨ Exclusive',
    urgencyMessage: 'Doors close in 48 hours'
  },
  D: {
    id: 'D',
    name: 'Social Proof Focus',
    headline: 'Join 1,247 Happy Customers',
    subheadline: '4.8★ Rating from 1,000+ Reviews',
    ctaText: 'Start Your Order',
    icon: <Fire className="w-5 h-5" />,
    color: 'from-yellow-500 to-orange-600',
    badge: '⭐ Rated 4.8/5',
    urgencyMessage: '23 people ordered today'
  }
};

const ABTestedCTA = ({ 
  position = 'hero', // 'hero', 'inline', 'sticky', 'exit'
  variant: forcedVariant = null,
  onConversion = () => {}
}) => {
  const [variant, setVariant] = useState(null);
  const [spotsRemaining, setSpotsRemaining] = useState(47);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [hasConverted, setHasConverted] = useState(false);

  // A/B Test Assignment
  useEffect(() => {
    // Check if variant is forced (for testing) or assign randomly
    if (forcedVariant) {
      setVariant(CTA_VARIANTS[forcedVariant]);
    } else {
      // Get assigned variant from localStorage or assign new one
      let assignedVariant = localStorage.getItem(`zfo_cta_variant_${position}`);
      
      if (!assignedVariant) {
        // Random assignment (A/B/C/D test)
        const variants = Object.keys(CTA_VARIANTS);
        assignedVariant = variants[Math.floor(Math.random() * variants.length)];
        localStorage.setItem(`zfo_cta_variant_${position}`, assignedVariant);
        
        // Track assignment in analytics
        if (window.gtag) {
          window.gtag('event', 'ab_test_assignment', {
            event_category: 'ab_test',
            event_label: `CTA_${position}_${assignedVariant}`,
            custom_parameter_1: assignedVariant
          });
        }
      }
      
      setVariant(CTA_VARIANTS[assignedVariant]);
    }
  }, [forcedVariant, position]);

  // Dynamic countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulated spots counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsRemaining(prev => {
        if (prev > 3 && Math.random() > 0.7) {
          return prev - 1;
        }
        return prev;
      });
    }, 15000); // Decrease every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setHasConverted(true);
    
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'conversion',
        event_label: `CTA_${position}_${variant?.id}`,
        value: 1,
        custom_parameter_1: variant?.id,
        custom_parameter_2: position
      });
    }
    
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: `CTA_${position}`,
        content_category: 'cta_click',
        value: 1.00,
        currency: 'INR'
      });
    }
    
    onConversion(variant);
    
    // Open lead capture modal or redirect
    window.dispatchEvent(new CustomEvent('openLeadCapture', { detail: { source: `cta_${position}` } }));
  };

  if (!variant) return null;

  // Render different styles based on position
  const renderCTA = () => {
    switch (position) {
      case 'hero':
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white border border-white/20">
                {variant.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {variant.headline}
            </h2>
            <p className="text-white/60 text-lg mb-6">
              {variant.subheadline}
            </p>

            {/* Urgency Timer */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex gap-2">
                <div className="bg-white/10 rounded-lg p-2 min-w-[60px]">
                  <div className="text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-white/50">hrs</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2 min-w-[60px]">
                  <div className="text-2xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-white/50">min</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2 min-w-[60px]">
                  <div className="text-2xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-white/50">sec</div>
                </div>
              </div>
              <div className="text-white/60 text-sm ml-4 max-w-[150px]">
                {variant.urgencyMessage}
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${variant.color} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all`}
            >
              {variant.icon}
              {variant.ctaText}
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Spots Counter */}
            <p className="mt-4 text-sm text-white/50">
              Only <span className="text-red-400 font-bold">{spotsRemaining}</span> spots remaining
            </p>
          </motion.div>
        );

      case 'inline':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 my-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white mb-2">
                  {variant.badge}
                </span>
                <h3 className="text-xl font-bold text-white">{variant.headline}</h3>
                <p className="text-white/60 text-sm">{variant.subheadline}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                className={`px-6 py-3 bg-gradient-to-r ${variant.color} text-white font-bold rounded-xl whitespace-nowrap`}
              >
                {variant.ctaText}
              </motion.button>
            </div>
          </motion.div>
        );

      case 'sticky':
        return (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-t border-white/10 p-4"
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <div className="hidden md:block">
                <p className="text-white font-medium">{variant.headline}</p>
                <p className="text-white/60 text-sm">{variant.urgencyMessage}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-red-400 font-bold text-xl">{spotsRemaining}</div>
                  <div className="text-white/50 text-xs">spots left</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClick}
                  className={`px-6 py-3 bg-gradient-to-r ${variant.color} text-white font-bold rounded-xl`}
                >
                  {variant.ctaText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return renderCTA();
};

export default ABTestedCTA;