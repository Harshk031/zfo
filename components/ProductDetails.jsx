'use client';

import React from "react";
import ProgressiveImage from "@/components/ProgressiveImage";

const products = [
  {
    name: "THE ORIGIN STORY",
    tagline: "Why this even exists",
    headings: ["When you realize your childhood was a scam"],
    description:
      "Remember when masala soda came in <span class='font-bold text-black'>glass bottles</span> from that uncle's thela? The fizz hit different. The spices were <span class='italic'>actually spices</span>. Then Coca-Cola convinced everyone that <span class='font-bold text-red-500'>red dye #40</span> and plastic was progress. We said nah. ZfO is what happens when you refuse to accept downgraded vibes.",
    image: "/bottle.png",
  },
  {
    name: "THE CRAFT",
    tagline: "How we make this thing",
    headings: ["Treating soda like your mom treats biryani"],
    description:
      "Every batch gets the <span class='font-bold italic'>obsessive attention</span> your mom gives masala ratios. We source <span class='font-bold'>premium cumin</span>, <span class='font-bold'>Himalayan black salt</span>, real citrus—ingredients that cost more because they're <span class='italic'>actually real</span>. The carbonation? Controlled down to the bubble. This is what happens when craft beer energy meets Indian  street culture.",
    image: "/bottle.png",
  },
  {
    name: "THE MOMENT",
    tagline: "When you should drink this",
    headings: ["Life's too short for mid beverages"],
    description:
      "That 3pm energy crash when chai isn't cutting it. Post-gym when you earned something better than Sprite. During your doom-scroll sessions when you need <span class='font-bold'>actual refreshment</span>, not sugar water. With <span class='font-bold'>pani puri</span>, <span class='font-bold'>vada pav</span>, or just because you pass the vibe check. Basically, whenever plastic-bottle soda feels like settling.",
    image: "/bottle.png",
  },
];

const ProductDetails = () => {
  return (
    <section id="productdetails" className="bg-[#f5f5f0] py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="sr-only">The ZfO Story - Premium Masala Soda in Glass Bottles</h2>
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
                    alt="ZfO Premium Craft Masala Soda in Glass Bottles - Made with Real Indian Spices"
                    className="relative object-contain h-[120%] -rotate-12 hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>
              </div>

              {/* TEXT SIDE - Story Format */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <span className="inline-block py-1 px-3 border border-black/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-black/60">
                  Chapter 0{index + 1}
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
