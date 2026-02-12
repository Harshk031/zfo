'use client';

import React from "react";
import ProgressiveImage from "@/components/ProgressiveImage";

const products = [
  {
    name: "THE GAP",
    tagline: "Massive market. Zero respectable options.",
    headings: ["India's beverage dilemma"],
    description: "At the bottom: <span class='font-bold text-black'>cheap, high-sugar, mass sodas</span>. At the top: international brands with <span class='italic'>standardized flavors</span>. ZfO is built exactly in the middle. Clean flavor. Modern presentation. Respect for the Indian palate.",
    image: "/bottle3.webp",
  },
  {
    name: "THE PRODUCT",
    tagline: "A layered flavor experience",
    headings: ["Not aggressive. Just balanced."],
    description: "First, <span class='font-bold text-black'>citrus brightness</span>. Then, <span class='font-bold text-black'>spice warmth</span> opens up. Finally, a clean finish without syrupy heaviness. It's carbonated. It's sharp. It's Indian. But it's controlled.",
    image: "/bottle3.webp",
  },
  {
    name: "THE STRATEGY",
    tagline: "honest growth. no fake hype.",
    headings: ["Built inside college ecosystems"],
    description: "We aren't buying celebrity ads. We're launching where it matters—<span class='font-bold text-black'>college festivals</span> and <span class='italic'>student communities</span>. Real testing. Real data. We build repeat buyers first, then we scale. ZfO is built to last, not just to shout.",
    image: "/bottle3.webp",
  },
];

const ProductDetails = () => {
  return (
    <section id="productdetails" className="bg-[#f5f5f0] py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="sr-only">Premium Craft Masala Soda - ZfO Limited Batches</h2>
        {products.map((prod, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center mb-24 md:mb-40 gap-10 md:gap-20 ${!isEven ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* IMAGE SIDE */}
              <div className="relative w-full md:w-1/2 flex justify-center">
                {/* Abstract Shape Behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] pb-[80%] rounded-full border border-black/5 bg-gradient-to-b from-white to-transparent" />

                <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black rounded-full scale-90" />
                  <ProgressiveImage
                    src={prod.image}
                    alt="ZfO Premium Small-Batch Craft Masala Soda in Glass - Limited Edition"
                    className="relative object-contain h-[120%] -rotate-12 hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ mixBlendMode: 'screen', filter: 'brightness(1.3) contrast(1.2) saturate(1.1)' }}
                  />
                </div>
              </div>

              {/* TEXT SIDE - Premium Positioning */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <span className="inline-block py-1 px-3 border border-black/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-black/60">
                  Act {index + 1}
                </span>

                <h3 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-black leading-[0.95] tracking-tight">
                  {prod.name}
                </h3>

                <p className="text-lg sm:text-xl font-medium italic text-gray-500 mb-8">
                  {prod.tagline}
                </p>

                {prod.headings.map((heading, idx) => (
                  <h4
                    key={idx}
                    className="text-base font-bold mb-4 uppercase tracking-wider text-black/70 border-l-2 border-gray-400 pl-4"
                  >
                    {heading}
                  </h4>
                ))}

                <p
                  className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0"
                  dangerouslySetInnerHTML={{ __html: prod.description }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductDetails;
