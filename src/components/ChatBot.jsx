import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Clock, CheckCircle, Sparkles } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState({});
  const [qualificationStep, setQualificationStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const messagesEndRef = useRef(null);

  // Show chat button after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Message handlers
  const addBotMessage = (message) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', ...message, timestamp: new Date() }]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }]);
  };

  // Initial welcome message - using ref to track if message was sent
  const hasSentWelcomeRef = useRef(false);

  useEffect(() => {
    if (isOpen && messages.length === 0 && !hasSentWelcomeRef.current) {
      hasSentWelcomeRef.current = true;
      setTimeout(() => {
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
      }, 100);
    }
  }, [isOpen, messages.length]);

  // Qualification Flow Logic
  const handleQualification = (value, text) => {
    const newUserData = { ...userData, intent: value, intentText: text };
    setUserData(newUserData);

    switch (qualificationStep) {
      case 0: // Initial intent captured
        if (value === 'browse') {
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

      case 1: // Name captured
        setUserData({ ...newUserData, name: value });
        if (newUserData.intent === 'home') {
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
        } else if (newUserData.intent === 'bulk') {
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

      case 2: // Flavor preference for home buyers
        setUserData({ ...newUserData, flavor: value });
        addBotMessage({
          text: "Excellent choice! 🎯 Let me get you an exclusive offer. What's your email or WhatsApp number?",
          input: true,
          placeholder: "Email or WhatsApp number..."
        });
        setQualificationStep(4);
        break;

      case 3: // Quantity for bulk orders
        setUserData({ ...newUserData, quantity: value });
        addBotMessage({
          text: "Perfect! For bulk orders, I'll connect you with our sales team. What's your email or phone number?",
          input: true,
          placeholder: "Email or phone..."
        });
        setQualificationStep(4);
        break;

      case 4: // Contact captured - Complete qualification
        setUserData({ ...newUserData, contact: value });
        addBotMessage({
          text: "🎉 Awesome! I've noted your details. Our team will contact you within 2 hours with a personalized quote. Want a 10% discount code right now?",
          options: [
            { label: "Yes, send me the code!", value: "discount_yes", icon: "🎁" },
            { label: "No thanks", value: "discount_no", icon: "👍" }
          ]
        });
        setQualificationStep(5);
        
        // Send lead to CRM
        submitLeadToCRM({ ...newUserData, contact: value });
        break;

      case 5: // Discount offer response
        if (value === 'discount_yes') {
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
      // Track qualified lead
      if (window.gtag) {
        window.gtag('event', 'qualified_lead', {
          event_category: 'lead',
          event_label: data.intent,
          value: 10,
          custom_parameter_1: data.flavor || data.quantity || 'general',
          custom_parameter_2: data.intent
        });
      }

      // Store in localStorage (works without backend)
      const leadData = {
        ...data,
        source: 'chatbot',
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        qualificationScore: calculateLeadScore(data),
        type: 'chat_qualified'
      };
      
      const existingLeads = JSON.parse(localStorage.getItem('zfo_leads') || '[]');
      existingLeads.push(leadData);
      localStorage.setItem('zfo_leads', JSON.stringify(existingLeads));
      
      // Optional: Send to Google Sheets
      try {
        await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        });
      } catch (e) {
        console.log('Google Sheets optional:', e);
      }
    } catch (error) {
      console.error('CRM submission failed:', error);
    }
  };

  const calculateLeadScore = (data) => {
    let score = 0;
    if (data.intent === 'bulk') score += 25;
    if (data.intent === 'distributor') score += 30;
    if (data.intent === 'retail') score += 20;
    if (data.intent === 'home') score += 15;
    if (data.quantity === '500+') score += 20;
    if (data.quantity === '100-500') score += 15;
    if (data.contact?.includes('@')) score += 10;
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
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-36 right-4 z-50 w-14 h-14 bg-gradient-to-r from-[#ffcc00] to-[#ff6b35] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform group"
          >
            <Bot className="w-7 h-7 text-black" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a] animate-pulse" />
            
            {/* Tooltip */}
            <div className="absolute right-16 bg-white text-black px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Chat with us!
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white rotate-45" />
            </div>
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md h-[600px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#ffcc00] to-[#ff6b35] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-black font-bold">ZfO Assistant</h3>
                    <p className="text-black/70 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Online • Replies instantly
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-black/70 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-[#ffcc00] text-black' : 'bg-white/10 text-white'} rounded-2xl p-3`}>
                      {message.type === 'bot' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-4 h-4 text-[#ffcc00]" />
                          <span className="text-xs text-white/50">ZfO Assistant</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      
                      {/* Options */}
                      {message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option, optIndex) => (
                            <button
                              key={optIndex}
                              onClick={() => handleOptionClick(option)}
                              className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left flex items-center gap-3 transition-colors"
                            >
                              <span>{option.icon}</span>
                              <span className="text-sm">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Timestamp */}
                      <p className="text-xs text-white/30 mt-2 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 rounded-2xl p-3 flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#ffcc00]" />
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#ffcc00] transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="p-3 bg-gradient-to-r from-[#ffcc00] to-[#ff6b35] text-black rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-white/30 text-xs mt-2">
                  Powered by AI • Responses may take a moment
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;