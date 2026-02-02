import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BubbleCursor from "./components/BubbleCursor";
import LeadCapture from "./components/LeadCapture";
import SocialProof from "./components/SocialProof";
import WhatsAppLead from "./components/WhatsAppLead";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import Fizzroom from "./pages/Fizzroom";
import FizzroomPost from "./pages/FizzroomPost";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Build Version: v0.0.2 - LEAD_GEN_INFRASTRUCTURE - TIMESTAMP: " + new Date().toISOString());
    window.scrollTo(0, 0);
    
    // Track page view in analytics
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title
      });
    }
    
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname]);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <BubbleCursor />
      
      {/* Lead Generation Infrastructure */}
      <LeadCapture />
      <SocialProof />
      <WhatsAppLead />
      <ChatBot />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fizzroom" element={<Fizzroom />} />
        <Route path="/fizzroom/:id" element={<FizzroomPost />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;