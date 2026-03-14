// Server Component — NO 'use client' so Googlebot gets full SSR HTML
import HeroClient from '@/components/HeroClient';
import TickerStrip from '@/components/TickerStrip';
import PromoSection from '@/components/PromoSection';
import ProductDetails from '@/components/ProductDetails';
import FizzroomTeaser from '@/components/FizzroomTeaser';
import SEOFeatures from '@/components/SEOFeatures';
import LaunchTeaser from '@/components/LaunchTeaser';

export default function Home() {
  return (
    <main>

      {/* WebGL hero — rendered client-side only via HeroClient wrapper */}
      <HeroClient />

      {/* Breaking news ticker strip */}
      <TickerStrip />

      {/* Regular SSR sections */}
      <div id="about">
        <PromoSection />
      </div>
      <ProductDetails />
      <SEOFeatures />
      <FizzroomTeaser />
      <LaunchTeaser />

      {/* 
        VISIBLE SEO CONTENT BLOCK 
        Moved from the top to avoid hidden text penalties.
      */}
      <article className="bg-[#050508] text-white/40 py-16 px-6 sm:px-12 mt-12 border-t border-white/5 mx-auto text-sm leading-relaxed max-w-7xl">
        <h2 className="text-xl text-white/70 font-bold mb-4">ZfO — Premium Masala Soda in Glass Bottles | India&apos;s Finest Craft Soda</h2>
        <p className="mb-6">
          ZfO is a modern Indian craft soda brand. We make premium masala soda
          in 275ml glass breezer bottles using real spices from across India. No HFCS. No artificial
          flavors. Just honest ingredients and exceptional taste. Buy masala soda online India.
        </p>
        <h3 className="text-lg text-white/70 font-bold mb-3">Buy Masala Soda Online — ZfO Glass Bottle Soda India</h3>
        <p className="mb-6">
          Order ZfO Masala Soda today. Single bottle or Combo of 4 available. Nationwide delivery
          across India. Secure payment via Razorpay. The only masala soda crafted for the modern palate.
        </p>
        <h3 className="text-lg text-white/70 font-bold mb-3">Why ZfO Craft Soda is Different</h3>
        <ul className="list-disc pl-5 mb-6 space-y-1">
          <li>Real cane sugar — no high fructose corn syrup</li>
          <li>Premium 275ml glass breezer bottles — no plastic</li>
          <li>Authentic masala blend from premium Indian spice regions</li>
          <li>Zero artificial flavors or colors</li>
          <li>Mid-premium craft soda for the discerning consumer</li>
        </ul>
        <h3 className="text-lg text-white/70 font-bold mb-3">ZfO Fizzroom — India&apos;s Soda Culture Blog</h3>
        <p>
          Read honest takes on the Indian beverage industry. Real talk about ingredients, soda culture,
          and why glass bottles are the only green flag in drinks.
        </p>
      </article>
    </main>
  );
}
