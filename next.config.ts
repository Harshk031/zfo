import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Compiler Optimizations ───────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // strip console.log in prod
  },

  // ─── Image Optimization ───────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'], // serve avif first, webp fallback
    minimumCacheTTL: 60 * 60 * 24 * 30,   // 30 days cache
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    dangerouslyAllowSVG: false,
  },

  // ─── HTTP Headers ─────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Cache-bust HTML pages so users always get latest version
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      {
        // Long cache for static assets (images, fonts, videos) — content-hashed by Vercel
        source: '/(.*)\\.(png|jpg|jpeg|gif|webp|avif|svg|woff2|woff|ttf|mp4|webm)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache JS/CSS chunks aggressively (Next.js content-hashes them on every deploy)
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // ─── Compression ─────────────────────────────────────────────────
  compress: true,

  // ─── Experimental ─────────────────────────────────────────────────
  experimental: {
    optimizeCss: true,          // inline critical CSS
    optimizePackageImports: ['gsap', 'three', '@react-three/fiber', '@react-three/drei'],
  },

  // ─── Turbopack (Next.js 16 default bundler) ───────────────────────
  // Turbopack handles bundle splitting automatically — no manual config needed.
  // The empty object here tells Next.js to use Turbopack without webpack fallback.
  turbopack: {},
};

export default nextConfig;
