'use client';

import dynamic from 'next/dynamic';
import PromoSection from '@/components/PromoSection';
import ProductDetails from '@/components/ProductDetails';
import FizzroomTeaser from '@/components/FizzroomTeaser';
import SEOFeatures from '@/components/SEOFeatures';
import LaunchTeaser from '@/components/LaunchTeaser';

// Dynamic import — prevents SSR for GSAP + R3F
const ScrollStory = dynamic(() => import('@/components/ScrollStory'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-screen bg-[#050508] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-4 h-4 rounded-full bg-[#ffcc00] animate-ping mb-12" />
      <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
        ZfO - Modern Indian Craft Soda
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold text-[#ffcc00] mb-8">
        Enter The Fizz. Masala Soda. Electric Nimbu. Jeera Storm.
      </h2>
      <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
        Bold masala soda crafted for the modern Indian palate. Real spices, no artificial nonsense, bottled in premium glass. We are building the next generation of mid-premium beverage experiences.
      </p>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      {/* Hero replaces with full WebGL scroll experience */}
      <ScrollStory />

      {/* Regular sections scroll below */}
      <div id="about">
        <PromoSection />
      </div>
      <ProductDetails />
      <SEOFeatures />
      <FizzroomTeaser />
      <LaunchTeaser />
    </>
  );
}
