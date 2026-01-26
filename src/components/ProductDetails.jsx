import React from "react";
import bottle1 from "../assets/b.png.png";

const products = [
  {
    name: "Why ZfO Exists",
    tagline: "The philosophy behind the fizz",
    headings: ["Reclaiming the soul of soda"],
    description:
      "Soda was never meant to be a sugar bomb in plastic bottles. It began as a ritual — glass bottles, crown caps, sharp fizz, citrus brightness, and spice warmth. Over time, mass production replaced character. ZfO was born from a simple belief: soda can feel honest again. Crafted thoughtfully, balanced carefully, and designed for people who care about what they drink.",
    image: bottle1,
  },
  {
    name: "The Art of Fizz",
    tagline: "Where craft meets restraint",
    headings: ["Soda treated like a culinary product"],
    description:
      "ZfO treats soda as a craft — not a commodity. From controlled carbonation and layered spice profiles to clean sweetness and aroma release, every element is engineered for sensory satisfaction. This is fizz with depth, not noise. Refreshment that respects flavour, experience, and balance.",
    image: bottle1,
  },
  {
    name: "Masala Soda, Reimagined",
    tagline: "India’s classic, refined",
    headings: ["A modern expression of a street icon"],
    description:
      "Our first expression redefines masala soda for modern taste. Crisp citrus acidity, subtle spice warmth, smooth carbonation, and a clean finish — no syrupy heaviness, no artificial punch. Built for street food pairings, café culture, summer heat, and slow sipping alike.",
    image: bottle1,
  },
];

const ProductDetails = () => {
  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {products.map((prod, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center mb-16 md:mb-28 ${!isEven ? "md:flex-row-reverse" : ""
                }`}
            >
              <div className="relative md:w-1/2 flex justify-center mb-8 md:mb-0">
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-black flex items-center justify-center relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="object-contain w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
                  />
                  <span className="absolute w-10 h-10 bg-black rounded-full -top-4 -left-4"></span>
                  <span className="absolute w-8 h-8 bg-black rounded-full -bottom-4 -right-6"></span>
                  <span className="absolute w-6 h-6 bg-black rounded-full top-4 right-14"></span>
                </div>
              </div>

              <div className="md:w-1/2 md:px-12 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">
                  {prod.name}
                </h3>

                <p className="italic text-base sm:text-lg mb-4 text-gray-700">
                  {prod.tagline}
                </p>

                {prod.headings.map((heading, idx) => (
                  <h4
                    key={idx}
                    className="text-xl sm:text-2xl font-semibold mb-3 text-black"
                  >
                    {heading}
                  </h4>
                ))}

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {prod.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductDetails;
