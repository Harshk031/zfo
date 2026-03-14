'use client';

import dynamic from 'next/dynamic';

// Client wrapper — ssr: false is only valid inside client components
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
        ZfO is India&apos;s boldest craft masala soda — 275ml glass bottles, authentic spices, zero compromise.
      </p>
    </div>
  ),
});

export default function HeroClient() {
  return <ScrollStory />;
}
