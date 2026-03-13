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
    <div className="w-full h-screen bg-[#050508] flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-white animate-ping" />
    </div>
  ),
});

export default function Home() {
  return (
    <>
      {/* SEO-Only Server Rendered Text (Invisible to humans, read by Googlebot) */}
      <div className="sr-only">
        <h1>ZfO - Modern Indian Craft Soda</h1>
        <p>
          Bold masala soda crafted for the modern Indian palate. Real spices, no artificial nonsense, 
          bottled in premium glass. Send the fizz, taste the Jeera Storm, Electric Nimbu, and Masala Mojito.
        </p>
      </div>

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
