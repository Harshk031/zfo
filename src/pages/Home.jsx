import SEO from "../components/SEO";

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
