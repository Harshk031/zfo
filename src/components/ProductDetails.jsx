import React from "react";
import ProgressiveImage from "./ProgressiveImage";

const products = [
  {
    name: "Look, This Made Us Angry",
    tagline: "Why we started",
    headings: ["Masala soda deserved better than this"],
    description:
      "We grew up on this stuff. <span className='font-bold text-black'>Actual glass bottles</span>. The sound of the cap popping off. Spices that hit different. Then we watched it turn into... what? Overly sweet garbage in plastic. We tried everything on the market. All disappointing. So one day we just said screw it, <span className='font-bold text-black'>let's make what we actually want to drink</span>. Took forever to get right. Worth every late night.",
    image: "/product-1.jpeg",
  },
  {
    name: "We Got Obsessed",
    tagline: "Honestly can't help it",
    headings: ["When good enough isn't good enough"],
    description:
      "Listen, we know we're too intense about this. We've heard it. But when you care about something, you just... care. Spent <span className='font-bold italic text-black'>months</span> on the carbonation alone. Every spice gets tested, like, dozens of times. Our friends make fun of us for how many versions we tasted before launching. But you know what? When you crack open a bottle and it's <span className='font-black text-black'>exactly what you wanted</span>—that feeling is everything. That's why we do this.",
    image: "/product-2.jpeg",
  },
  {
    name: "It's Just... Right",
    tagline: "Hard to explain, you'll see",
    headings: ["When you know, you know"],
    description:
      "First sip, you'll get it. That <span className='font-bold text-black'>clean citrus hit</span>. Then the spices come through—not overpowering, just there. Doesn't matter if you're having it with street food or after work or just because. It works. And here's the thing—it doesn't make you feel gross after. No sugar crash. No weird aftertaste. Just leaves you thinking 'yeah, that was <span className='font-black text-black'>actually good</span>.' Which is literally all we wanted. Mission accomplished.",
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
