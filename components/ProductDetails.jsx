'use client';

import React from "react";
import bottle1 from "../assets/b.png.png";
import ProgressiveImage from "@/components/ProgressiveImage";

const products = [
  {
    name: "NO CAP.",
    tagline: "The Lore Behind the Fizz",
    headings: ["Reclaiming the soul of soda"],
    description:
      "Soda was never meant to be a <span className='font-bold text-red-500'>sugar bomb</span> in plastic. It began as a ritual — glass bottles, crown caps, and immaculate vibes. Mass production gave us the ick. ZfO is the <span className='font-bold text-black'>clapback</span>. Crafted thoughtfully, balanced carefully, for people who pass the vibe check.",
    image: bottle1,
  },
  {
    name: "The Art of Fizz",
    tagline: "Where craft meets restraint",
    headings: ["Soda treated like a culinary product"],
    description:
      "ZfO treats soda as high art, not content. From controlled carbonation to layered spice profiles, every element is engineered for <span className='font-bold italic'>sensory satisfaction</span>. This is fizz with depth, not noise. It's giving <span className='font-black'>luxury</span>.",
    image: bottle1,
  },
  {
    name: "Masala Soda, Reimagined",
    tagline: "India’s classic, refined",
    headings: ["A modern expression of a street icon"],
    description:
      "Our first drop redefines masala soda for modern taste. Crisp citrus acidity, subtle spice warmth, and a clean finish — no syrupy heaviness, no artificial punch. It hits different at street food spots, cafés, or just <span className='font-bold text-yellow-600'>doomscrolling</span> at home.",
    image: bottle1,
  },
];

const ProductDetails = () => {
  return (
    <section id="productdetails" className="bg-[#f5f5f0] py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="sr-only">Our Premium Soda Collection</h2>
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
                    alt="ZfO Premium Craft Soda in Glass Bottle - Authentic Masala Soda with Natural Ingredients"
                    className="relative object-contain h-[120%] -rotate-12 hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>
              </div>

              {/* TEXT SIDE */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <span className="inline-block py-1 px-3 border border-black/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-black/60">
                  0{index + 1}
                </span>

                <h3 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-black leading-[0.9] tracking-tighter">
                  {prod.name}
                </h3>

                <p className="text-xl sm:text-2xl font-serif italic text-gray-500 mb-8">
                  {prod.tagline}
                </p>

                {prod.headings.map((heading, idx) => (
                  <h4
                    key={idx}
                    className="text-lg font-bold mb-4 uppercase tracking-wider text-black border-l-2 border-yellow-400 pl-4"
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


