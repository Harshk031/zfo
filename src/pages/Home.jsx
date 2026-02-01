import VideoHero from "../components/VideoHero";
import PromoSection from "../components/PromoSection";
import LaunchTeaser from "../components/LaunchTeaser";
import HeroScene from "../components/HeroScene";
import ProductDetails from "../components/ProductDetails";
import FizzroomTeaser from "../components/FizzroomTeaser";

const Home = () => {
    return (
        <>
            <VideoHero />
            <PromoSection />
            <ProductDetails />
            <FizzroomTeaser />
            <HeroScene />
            <LaunchTeaser />
        </>
    );
};

export default Home;
