import Hero from "./components/Hero";
import PromoSection from "./components/Promosection";
import LaunchTeaser from "./components/Launchteaser";
import BubbleCursor from "./components/BubbleCursor";
import HeroScene from "./components/Heroscene";
import ProductDetails from "./components/Productdetails";
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
