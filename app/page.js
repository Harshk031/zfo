import dynamic from 'next/dynamic';
import PromoSection from '@/components/PromoSection';
import ProductDetails from '@/components/ProductDetails';
import FizzroomTeaser from '@/components/FizzroomTeaser';
import SEOFeatures from '@/components/SEOFeatures';
import LaunchTeaser from '@/components/LaunchTeaser';

// Dynamic import prevents SSR for WebGL/GSAP canvas
const ScrollStory = dynamic(() => import('@/components/ScrollStory'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-screen bg-[#050508] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-4 h-4 rounded-full bg-[#ffcc00] animate-ping mb-12" />
      <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
        ZfO — Modern Indian Craft Soda
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold text-[#ffcc00] mb-8">
        Real Masala. Real Spices. Glass Bottles.
      </h2>
      <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
        ZfO is India&apos;s boldest craft masala soda. Bottled in premium 275ml glass bottles with authentic
        spices from 12 regions — no artificial flavours, no plastic, no compromise. The soda India deserved.
      </p>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      {/*
        SEO-FIRST CONTENT BLOCK
        Rendered server-side so Googlebot reads it on first visit even before JS loads.
        The WebGL hero loads after JS, but this content is always present in the HTML.
      */}
      <main>
        {/* Hidden from sighted users but fully visible to crawlers via HTML source */}
        <article
          aria-label="ZfO – India's premium masala soda brand overview"
          className="sr-only"
        >
          <h1>ZfO — Premium Masala Soda in Glass Bottles | India&apos;s Finest Craft Soda</h1>
          <p>
            ZfO is a modern Indian craft soda brand founded in Delhi in 2024. We make premium masala soda
            in 275ml glass breezer bottles using real spices from across India. No HFCS. No artificial
            flavors. Just honest ingredients and exceptional taste.
          </p>
          <h2>Buy Masala Soda Online — ZfO Glass Bottle Soda India</h2>
          <p>
            Order ZfO Masala Soda today. Single bottle at ₹45 or Combo of 4 for ₹169. Nationwide delivery
            across India. Secure payment via Razorpay. The only masala soda crafted for the modern palate.
          </p>
          <h2>Why ZfO Craft Soda is Different</h2>
          <ul>
            <li>Real cane sugar — no high fructose corn syrup</li>
            <li>Premium 275ml glass breezer bottles — no plastic</li>
            <li>Authentic masala blend from 12 Indian spice regions</li>
            <li>Zero artificial flavors or colors</li>
            <li>Mid-premium craft soda for the discerning Indian consumer</li>
          </ul>
          <h2>ZfO Fizzroom — India&apos;s Soda Culture Blog</h2>
          <p>
            Read honest takes on the Indian beverage industry. Real talk about ingredients, soda culture,
            and why glass bottles are the only green flag.
          </p>
        </article>

        {/* Hero — full WebGL experience for real users */}
        <ScrollStory />

        {/* Regular sections scroll below */}
        <div id="about">
          <PromoSection />
        </div>
        <ProductDetails />
        <SEOFeatures />
        <FizzroomTeaser />
        <LaunchTeaser />
      </main>
    </>
  );
}
