import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const features = [
    {
        title: "Premium Glass Bottles",
        description: "Taste purity in every sip. Glass preserves the authentic flavor, keeps it colder, and is 100% recyclable. Zero plastic, zero leaching—just premium craft soda.",
        keywords: ["glass bottles", "premium soda", "craft beverages", "recyclable packaging"]
    },
    {
        title: "Authentic Masala Flavors",
        description: "Real spices, real taste. No fake flavors or artificial nasties. We reimagined traditional masala soda with balanced fizz and honest ingredients that respect the heritage.",
        keywords: ["masala soda", "Indian soda", "authentic flavors", "natural ingredients"]
    },
    {
        title: "Craft Soda Excellence",
        description: "Soda treated as culinary art. Controlled carbonation, layered spice profiles, and artisanal quality. A craft beverage that stands tall against the world's best.",
        keywords: ["craft soda", "premium beverages", "artisanal soda", "Indian craft drinks"]
    },
    {
        title: "Perfect for Every Occasion",
        description: "From street food to sophisticated dinners. ZfO elevates the moment. Whether it's spicy chaat or a house party, it's the ultimate refreshment.",
        keywords: ["beverage pairing", "refreshing drinks", "premium soft drinks", "glass bottle soda"]
    }
];

const SEOFeatures = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="bg-black py-20 md:py-32 px-6"
            aria-label="ZfO Premium Soda Features and Benefits"
        >
            <div className="max-w-7xl mx-auto">
                {/* SEO-Optimized Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Why Choose ZfO Premium <br className="hidden md:block" />
                        <span className="text-[#ffcc00]">Craft Soda in Glass Bottles</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        India's finest masala soda crafted with authentic ingredients, premium quality, and sustainable glass packaging. Experience the best soda in glass bottles.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-white/70 leading-relaxed mb-6">
                                {feature.description}
                            </p>
                            {/* SEO Keywords (hidden but crawlable) */}
                            <div className="sr-only" aria-hidden="true">
                                {feature.keywords.join(", ")}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional SEO Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 md:mt-24 text-center"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        The Best Soda in Glass Bottles - Made in India
                    </h3>
                    <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
                        ZfO represents the pinnacle of Indian craft beverages. Our premium masala soda combines traditional flavors with modern craftsmanship, delivered in sustainable glass bottles. Every sip celebrates India's rich beverage heritage while setting new standards for quality, taste, and environmental responsibility. Choose ZfO for an authentic, premium soda experience that's unapologetically bold.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default SEOFeatures;
