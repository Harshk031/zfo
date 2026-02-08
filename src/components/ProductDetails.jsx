import React from "react";
import ProgressiveImage from "./ProgressiveImage";

const products = [
  {
    name: "The Legacy",
    tagline: "Where it all started",
    headings: ["From street corners to craft movement"],
    description:
      "Masala soda used to mean something. Glass bottles that clinked. Crown caps that hissed. Spices you could <span className='font-bold text-black'>actually taste</span>. Then mass production turned it into <span className='font-bold text-black line-through'>fizzy regret</span>. We're bringing back the ritual—crafted with real ingredients, balanced flavor profiles, and the kind of <span className='font-black text-black'>attention to detail</span> your childhood drink deserved all along.",
    image: "/product-1.jpeg",
  },
  {
    name: "The Craft",
    tagline: "Obsessive attention to detail",
    headings: ["When soda becomes culinary art"],
    description:
      "We don't fill bottles and call it a day. Every batch starts with <span className='font-bold italic text-black'>real spices</span>—not flavor extracts. Carbonation levels are dialed in with precision. Acid balance gets tasted, adjusted, tasted again. This is what happens when you treat masala soda like a <span className='font-black text-black'>craft product</span>, not a commodity. The result? Layers of flavor that actually deserve your attention.",
    image: "/product-2.jpeg",
  },
  {
    name: "The Experience",
    tagline: "Made for moments that matter",
    headings: ["Your drink grew up with you"],
    description:
      "Whether you're at a street food joint, unwinding after work, or just scrolling through life—this isn't background noise. Clean citrus notes. Warm spice depth. A finish that doesn't leave you thirsty again in 5 minutes. No <span className='font-bold text-black line-through'>sugar crash</span>. No artificial aftertaste. Just a masala soda that <span className='font-black text-black'>passes the vibe check</span> every single time.",
    image: "/product-1.jpeg",
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
                    className="text-lg font-bold mb-4 uppercase tracking-wider text-black border-l-2 border-black pl-4"
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
