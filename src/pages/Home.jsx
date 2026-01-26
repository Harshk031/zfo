import Hero from "../components/Hero";
import PromoSection from "../components/PromoSection";
import LaunchTeaser from "../components/LaunchTeaser";
import HeroScene from "../components/HeroScene";
import ProductDetails from "../components/ProductDetails";
import FizzroomTeaser from "../components/FizzroomTeaser";

const Home = () => {
    return (
        <>
            <Hero />
            <PromoSection />
            <ProductDetails />
            <HeroScene />
            <FizzroomTeaser />
            <LaunchTeaser />
        </>
    );
};

export default Home;
