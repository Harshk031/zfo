import Hero from "./components/Hero";
import PromoSection from "./components/PromoSection";
import LaunchTeaser from "./components/LaunchTeaser";
import BubbleCursor from "./components/BubbleCursor";
import HeroScene from "./components/HeroScene";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <BubbleCursor />
      <Hero />
      <PromoSection />
      <ProductDetails />
      <HeroScene />
      <LaunchTeaser />
      <Footer />
    </div>
  );
};

export default App;
