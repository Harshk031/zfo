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
      {/*
        SEO CONTENT BLOCK — server-rendered, always in HTML source.
        Googlebot reads this instantly. Real users see the WebGL hero below.
        `sr-only` hides it visually; crawlers still index it.
      */}
      <article aria-label="ZfO – India's premium masala soda brand" className="sr-only">
        <h1>ZfO — Premium Masala Soda in Glass Bottles | India&apos;s Finest Craft Soda</h1>
        <p>
          ZfO is a modern Indian craft soda brand founded in Delhi in 2024. We make premium masala soda
          in 275ml glass breezer bottles using real spices from across India. No HFCS. No artificial
          flavors. Just honest ingredients and exceptional taste. Buy masala soda online India.
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
          and why glass bottles are the only green flag in drinks.
        </p>
      </article>

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
    </main>
  );
}
