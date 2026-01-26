import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BubbleCursor from "./components/BubbleCursor";
import Home from "./pages/Home";
import Fizzroom from "./pages/Fizzroom";
import FizzroomPost from "./pages/FizzroomPost";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <BubbleCursor />

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
