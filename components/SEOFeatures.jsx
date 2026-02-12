'use client';

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const features = [
    {
        title: "Bold Indian Flavor",
        description: "Masala, citrus, subtle spice. <span className='font-bold text-white'>Not overpowering</span>, not flat. Designed for a generation that knows the difference.",
        keywords: ["bold flavor", "masala soda", "indian craft soda"]
    },
    {
        title: "Balanced Formulation",
        description: "Clean sweetness profile. <span className='font-bold text-gray-300'>No heavy aftertaste.</span> Engineered for sessionability, not just a sugar rush.",
        keywords: ["balanced soda", "clean ingredients", "low sugar feel"]
    },
    {
        title: "Glass Bottle Experience",
        description: "Because some drinks deserve <span className='italic font-bold'>better packaging</span>. Preserving carbonation and flavor integrity.",
        keywords: ["glass bottle", "premium packaging", "sustainable"]
    },
    {
        title: "Community-First",
        description: "Starting with <span className='font-bold text-[#ffcc00]'>college ecosystems</span>. Testing, learning, and refining with the people who matter.",
        keywords: ["community brand", "college launch", "student ecosystem"]
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
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tight">
                        OUR APPROACH <br className="hidden md:block" />
                        <span className="text-[#ffcc00]">CAREFULLY CRAFTED</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        We're not trying to be everything. We're building carefully with bold flavors, balanced formulations, and a community-first mindset.
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
                            <p
                                className="text-white/70 leading-relaxed mb-6"
                                dangerouslySetInnerHTML={{ __html: feature.description }}
                            />
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
                        Mid-Premium Soda for the Modern Indian
                    </h3>
                    <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
                        ZfO bridges the gap between mass-market beverages and luxury imports. We deliver a mid-premium experience that respects your palate and your wallet. Authentic masala soda, elevated.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default SEOFeatures;
