'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Client wrapper — ssr: false is only valid inside client components
// Three.js / GSAP bundle is loaded AFTER first paint, not before
const ScrollStory = dynamic(() => import('@/components/ScrollStory'), {
  ssr: false,
  loading: () => <WebGLLoadingFallback />,
});

function WebGLLoadingFallback() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100svh',
        background: '#050508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#ffcc00',
          marginBottom: '3rem',
          animation: 'pulse 1s ease-in-out infinite',
        }}
      />
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 900,
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
          lineHeight: 1,
        }}
      >
        ZfO — Modern Indian Craft Soda
      </h1>
      <p
        style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          fontWeight: 700,
          color: '#ffcc00',
          marginBottom: '2rem',
        }}
      >
        Real Masala. Real Spices. Glass Bottles.
      </p>
      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.8)} }`}</style>
    </div>
  );
}

export default function HeroClient() {
  return (
    <Suspense fallback={<WebGLLoadingFallback />}>
      <ScrollStory />
    </Suspense>
  );
}
