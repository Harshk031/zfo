import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: './',

  // Build optimizations
  build: {
    // Enable minification with esbuild (faster and more reliable)
    minify: 'esbuild',

    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          // Animation libraries
          'animation': ['framer-motion']
        },
        // Chunk file naming with content hash
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.css$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },

    // Target modern browsers for smaller bundles
    target: 'es2020',

    // Optimize chunks
    chunkSizeWarningLimit: 500,

    // CSS optimization
    cssCodeSplit: true,
    cssMinify: true,

    // Source maps for production debugging (optional)
    sourcemap: false,
  },

  // Development optimizations
  server: {
    // Enable compression
    compress: true,
    // Optimize deps
    preTransformRequests: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion'
    ],
    exclude: [],
  },

  // Performance features
  esbuild: {
    // Drop console in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },

  // CSS optimization
  css: {
    devSourcemap: true,
  },
})
