import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BubbleCursor from "./components/BubbleCursor";

// Lazy load lead generation components for code splitting
const LeadCapture = lazy(() => import("./components/LeadCapture"));
const SocialProof = lazy(() => import("./components/SocialProof"));
const WhatsAppLead = lazy(() => import("./components/WhatsAppLead"));
const ChatBot = lazy(() => import("./components/ChatBot"));

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const Fizzroom = lazy(() => import("./pages/Fizzroom"));
const FizzroomPost = lazy(() => import("./pages/FizzroomPost"));
const FAQ = lazy(() => import("./pages/FAQ"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffcc00]"></div>
  </div>
);

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Build Version: v0.0.3 - PERFORMANCE_OPTIMIZED - TIMESTAMP: " + new Date().toISOString());
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
      
      {/* Lead Generation Infrastructure - Lazy Loaded */}
      <Suspense fallback={null}>
        <LeadCapture />
        <SocialProof />
      </Suspense>
      
      {/* Defer non-critical components */}
      <Suspense fallback={null}>
        <div style={{ contentVisibility: 'auto' }}>
          <WhatsAppLead />
          <ChatBot />
        </div>
      </Suspense>

      {/* Main Routes with Code Splitting */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fizzroom" element={<Fizzroom />} />
          <Route path="/fizzroom/:id" element={<FizzroomPost />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;