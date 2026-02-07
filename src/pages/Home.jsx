import SEO from "../components/SEO";
import Hero from "../components/Hero";
import PromoSection from "../components/PromoSection";
import LaunchTeaser from "../components/LaunchTeaser";
import HeroScene from "../components/HeroScene";
import ProductDetails from "../components/ProductDetails";
import FizzroomTeaser from "../components/FizzroomTeaser";
import SEOFeatures from "../components/SEOFeatures";

const Home = () => {
    return (
        <>
            <SEO
                title="Premium Craft Masala Soda"
                description="ZfO - India's premium craft soda in glass bottles. Experience the finest beverage with authentic masala flavors, zero artificial ingredients."
                keywords="ZfO, premium soda, craft soda, masala soda, glass bottles, Indian beverages, natural soda"
            />
            <Hero />
            <PromoSection />
            <ProductDetails />
            <SEOFeatures />
            <FizzroomTeaser />
            <HeroScene />
            <LaunchTeaser />
        </>
    );
};

export default Home;
