'use client';

// Pure CSS ticker strip — zero JS, zero GSAP, compositor-thread-only
// Runs at full 60fps without touching the main thread at all

const MESSAGES = [
  '🔥 GRAB UR ZfO!!',
  '⚡ GRAB NOWW!!',
  '🫧 MASALA SODA IS HERE',
  '🔔 LIMITED BATCH LIVE',
  '🚀 ORDER NOW — ZFO.CO.IN',
  '🍶 275ML GLASS BOTTLE',
  '🌶️ REAL SPICES. REAL SODA.',
  '⚡ GRAB UR ZfO!!',
  '🔥 GRAB NOWW!!',
  '🫧 INDIA\'S BOLDEST CRAFT SODA',
  '🚀 SHIPPING NATIONWIDE',
  '🔔 GRAB UR ZfO!!',
];

export default function TickerStrip() {
  const text = MESSAGES.join('  ·  ');
  // Duplicate for seamless loop
  const fullText = `${text}  ·  ${text}  ·  `;

  return (
    <div
      style={{
        width: '100%',
        background: '#ffcc00',
        borderTop: '2px solid rgba(0,0,0,0.08)',
        borderBottom: '2px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 50,
        padding: '10px 0',
      }}
    >
      {/* BREAKING label */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#000',
          color: '#ffcc00',
          fontWeight: 900,
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}
      >
        🚨 LIVE NOW
      </div>

      {/* Scrolling content — pure CSS animation, no JS */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          animation: 'ticker-scroll 28s linear infinite',
          willChange: 'transform',
          paddingLeft: '110px', // space for the LIVE NOW badge
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#000',
          }}
        >
          {fullText}
        </span>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
