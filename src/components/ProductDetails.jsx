import React from "react";
import ProgressiveImage from "./ProgressiveImage";

const products = [
  {
    name: "How We Got Here",
    tagline: "The honest origin story",
    headings: ["Remember when soda wasn't trash?"],
    description:
      "Yeah, so... masala soda used to be <span className='font-bold text-black'>a whole vibe</span>. Street vendors. Glass bottles. That satisfying hiss when they popped the cap. Real spices you could actually taste. Then somewhere along the way, it became this <span className='font-bold text-black line-through'>overly sweet mess</span> in plastic bottles. We got tired of it. Started making what we wished existed—the masala soda we remembered, but done right. Took us way longer than we thought it would.",
    image: "/product-1.jpeg",
  },
  {
    name: "What We're Doing",
    tagline: "The obsessive part",
    headings: ["Turns out, good soda takes effort"],
    description:
      "Here's the thing—we're a little obsessive. Every batch gets tasted <span className='font-bold italic text-black'>multiple times</span>. Carbonation? We dial it in like it's a science experiment. Spices? Actually ground from real ingredients, not some lab-made extract. The acid balance alone took us months to get right. Is it overkill? Maybe. But when you taste it, you'll get why we're <span className='font-black text-black'>this particular</span> about a bottle of soda.",
    image: "/product-2.jpeg",
  },
  {
    name: "What You Get",
    tagline: "The actual experience",
    headings: ["It just works. Anywhere."],
    description:
      "Works with street food. Works when you're unwinding after a long day. Works when you're just hanging out. Clean citrus up front, warm spices in the back, doesn't leave you feeling gross after. No weird aftertaste that makes you reach for water. Just... <span className='font-black text-black'>tastes good</span>. Which sounds basic, but you'd be surprised how rare that is. We're not claiming it'll change your life. It's just really solid masala soda.",
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
