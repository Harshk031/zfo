import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// SSG plugin for static site generation
export const ssgOptions = {
  includedRoutes(paths, routes) {
    // Include all routes for pre-rendering
    return routes.flatMap(route => {
      // Generate static routes for dynamic paths
      if (route.path.includes(':id')) {
        // Map fizzroom/:id to actual article IDs
        const articleIds = [1, 2, 3, 4, 5];
        return articleIds.map(id => route.path.replace(':id', id));
      }
      if (route.path.includes(':slug')) {
        return [route.path.replace(':slug', 'craft-soda-vs-regular-soda')];
      }
      return route.path;
    });
  }
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Bundle analyzer (only in analyze mode)
      env.ANALYZE === 'true' && visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    ],
    base: './',
    
    // SSG configuration
    ssgOptions,
    
    // Build optimizations
    build: {
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
      },
      
      // Code splitting
      rollupOptions: {
        output: {
          // Manual chunks for better caching (only for client build, not SSR)
          manualChunks: (id, { getModuleInfo, chunk }) => {
            // Skip manual chunks during SSR build
            if (env.SSR) return;
            
            // React core
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
              return 'vendor';
            }
            // Animation libraries
            if (id.includes('node_modules/framer-motion')) {
              return 'animation';
            }
            // Icons
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
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
        'framer-motion',
        'lucide-react',
      ],
      exclude: [],
    },
    
    // Performance features
    esbuild: {
      // Drop console in production
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    
    // CSS optimization
    css: {
      devSourcemap: true,
    },
  }
})
