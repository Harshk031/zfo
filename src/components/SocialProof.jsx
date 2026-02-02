import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Users, Clock, MapPin, Star, TrendingUp } from 'lucide-react';

const SocialProof = () => {
  const [notifications, setNotifications] = useState([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [showWidget, setShowWidget] = useState(false);

  // Simulated purchase data - Replace with real data from your backend
  const purchaseData = [
    { name: "Rahul from Mumbai", product: "Masala Soda - 12 Pack", time: "2 minutes ago", location: "Mumbai, MH" },
    { name: "Priya from Bangalore", product: "Kala Khatta Soda", time: "5 minutes ago", location: "Bangalore, KA" },
    { name: "Amit from Delhi", product: "Jeera Soda - 6 Pack", time: "8 minutes ago", location: "Delhi, DL" },
    { name: "Sneha from Pune", product: "Masala Soda", time: "12 minutes ago", location: "Pune, MH" },
    { name: "Vikram from Hyderabad", product: "Kala Khatta - 12 Pack", time: "15 minutes ago", location: "Hyderabad, TS" },
    { name: "Neha from Chennai", product: "Jeera Soda", time: "18 minutes ago", location: "Chennai, TN" },
    { name: "Arjun from Kolkata", product: "Masala Soda - 6 Pack", time: "22 minutes ago", location: "Kolkata, WB" },
    { name: "Meera from Ahmedabad", product: "Kala Khatta Soda", time: "25 minutes ago", location: "Ahmedabad, GJ" },
  ];

  const stats = {
    totalOrders: 1247,
    happyCustomers: 1089,
    avgRating: 4.8,
    recentBuyers: 23
  };

  // Real-time visitor count simulation
  useEffect(() => {
    const baseCount = 47;
    const updateVisitorCount = () => {
      const variation = Math.floor(Math.random() * 10) - 5;
      setVisitorCount(baseCount + variation);
    };

    updateVisitorCount();
    const interval = setInterval(updateVisitorCount, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show notifications periodically
  useEffect(() => {
    let notificationIndex = 0;
    
    const showNotification = () => {
      const notification = {
        id: Date.now(),
        ...purchaseData[notificationIndex % purchaseData.length]
      };
      
      setNotifications(prev => [...prev.slice(-2), notification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
      
      notificationIndex++;
    };

    // Initial delay
    const initialDelay = setTimeout(() => {
      showNotification();
      // Continue showing every 15-25 seconds
      const interval = setInterval(showNotification, 15000 + Math.random() * 10000);
      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  // Show widget after page load
  useEffect(() => {
    const timer = setTimeout(() => setShowWidget(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!showWidget) return null;

  return (
    <>
      {/* Floating Visitor Counter */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ffcc00]/20 to-[#ff6b35]/20 backdrop-blur-md rounded-full border border-[#ffcc00]/30"
      >
        <div className="relative">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
        </div>
        <Users className="w-4 h-4 text-[#ffcc00]" />
        <span className="text-white text-sm font-medium">
          {visitorCount} people viewing now
        </span>
      </motion.div>

      {/* Live Purchase Notifications */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-white/10 shadow-xl max-w-sm"
            >
              <div className="p-2 bg-[#ffcc00]/20 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-[#ffcc00]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {notification.name}
                </p>
                <p className="text-white/60 text-xs">
                  Purchased {notification.product}
                </p>
                <p className="text-[#ffcc00] text-xs flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  {notification.time}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Trust Badges Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-t border-white/10 py-3 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {/* Trust Badge 1 */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#ffcc00] fill-[#ffcc00]" />
              ))}
            </div>
            <span className="text-white/80 text-sm">
              <strong className="text-white">{stats.avgRating}</strong> Rated by {stats.happyCustomers}+ customers
            </span>
          </div>

          {/* Trust Badge 2 */}
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#ff6b35]" />
            <span className="text-white/80 text-sm">
              <strong className="text-white">{stats.totalOrders.toLocaleString()}</strong> orders delivered
            </span>
          </div>

          {/* Trust Badge 3 */}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-white/80 text-sm">
              <strong className="text-white">{stats.recentBuyers}</strong> bought in last hour
            </span>
          </div>

          {/* Trust Badge 4 */}
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-white/80 text-sm">
              Pan India Delivery
            </span>
          </div>
        </div>
      </motion.div>

      {/* Urgency Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#ff6b35] via-[#ffcc00] to-[#ff6b35] py-2 px-4 text-center"
      >
        <p className="text-black font-bold text-sm md:text-base">
          🔥 Flash Sale: 20% OFF First Order • Only {Math.max(0, 47 - Math.floor(Date.now() / 100000) % 50)} codes left!
        </p>
      </motion.div>
    </>
  );
};

export default SocialProof;