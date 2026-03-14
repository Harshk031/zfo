'use client';

import { Component, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Load the heavy WebGL scene only client-side, after first paint
const ScrollStory = dynamic(() => import('@/components/ScrollStory'), {
  ssr: false,
  loading: () => <StaticHeroFallback />,
});

// ─── Static fallback shown while WebGL loads OR if WebGL crashes ───────────
// This is what Brave users (with WebGL blocked) and slow devices see instantly.
function StaticHeroFallback() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100svh',
        background: 'linear-gradient(180deg, #050508 0%, #0a080f 60%, #050508 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle static bubble particles — pure CSS, no JS required */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'rgba(180,220,255,0.12)',
              width: `${6 + (i % 5) * 4}px`,
              height: `${6 + (i % 5) * 4}px`,
              left: `${(i * 17 + 5) % 95}%`,
              bottom: '-20px',
              animation: `rise ${3 + (i % 4)}s ease-in ${(i * 0.3) % 3}s infinite`,
            }}
          />
        ))}
      </div>

      <img
        src="/logo.png"
        alt="ZfO - The Art of fizz"
        style={{ height: '80px', width: 'auto', filter: 'invert(1) brightness(10)', marginBottom: '2.5rem' }}
      />
      <h1
        style={{
          fontSize: 'clamp(2.2rem, 7vw, 5rem)',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          lineHeight: 1.05,
        }}
      >
        Modern Indian Craft Soda
      </h1>
      <p style={{ fontSize: 'clamp(1rem, 3vw, 1.35rem)', color: '#ffcc00', fontWeight: 700, marginBottom: '0.8rem' }}>
        Real Masala. Real Spices. Glass Bottles.
      </p>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: '520px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
        India's boldest craft masala soda — 275ml glass bottles, authentic spices, zero compromise.
      </p>
      <a
        href="/order"
        style={{
          display: 'inline-block',
          padding: '14px 40px',
          background: '#fff',
          color: '#000',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontSize: '0.85rem',
          borderRadius: '999px',
          textDecoration: 'none',
        }}
      >
        ORDER NOW →
      </a>

      <style>{`
        @keyframes rise {
          0%   { transform: translateY(0) scale(1); opacity: 0.15; }
          80%  { opacity: 0.12; }
          100% { transform: translateY(-100vh) scale(0.7); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── WebGL error boundary — catches Three.js / shader crashes ────────────────
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { crashed: false };
  }

  static getDerivedStateFromError() {
    return { crashed: true };
  }

  componentDidCatch(err) {
    console.warn('[WebGL] Scene crashed, showing static fallback:', err?.message);
  }

  render() {
    if (this.state.crashed) {
      return <StaticHeroFallback />;
    }
    return this.props.children;
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function HeroClient() {
  return (
    <WebGLErrorBoundary>
      <Suspense fallback={<StaticHeroFallback />}>
        <ScrollStory />
      </Suspense>
    </WebGLErrorBoundary>
  );
}
