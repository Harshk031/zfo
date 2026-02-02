/**
 * ZfO Service Worker
 * Multi-layered caching strategy for optimal performance
 * Version: 1.0.0
 */

const CACHE_VERSION = '1.0.0';
const CACHE_NAMES = {
  static: `zfo-static-${CACHE_VERSION}`,
  images: `zfo-images-${CACHE_VERSION}`,
  dynamic: `zfo-dynamic-${CACHE_VERSION}`,
  fonts: `zfo-fonts-${CACHE_VERSION}`
};

// Assets to pre-cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo.png',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
];

// Image assets to cache
const IMAGE_ASSETS = [
  '/bottle3.png',
  '/article-1-thumbnail.jpg',
  '/article-2-thumbnail.png',
  '/article-3-thumbnail.png',
  '/article-4-thumbnail.png',
  '/truth-bomb-thumbnail.jpg'
];

// Font assets
const FONT_ASSETS = [];

// Install event - Pre-cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker v' + CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(CACHE_NAMES.static).then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache images
      caches.open(CACHE_NAMES.images).then(cache => {
        console.log('[SW] Caching image assets');
        return cache.addAll(IMAGE_ASSETS);
      })
    ])
    .then(() => {
      console.log('[SW] Pre-caching complete');
      return self.skipWaiting();
    })
    .catch(err => console.error('[SW] Pre-caching failed:', err))
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker v' + CACHE_VERSION);
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete caches that don't match current version
          if (!Object.values(CACHE_NAMES).includes(cacheName)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[SW] Old caches cleaned up');
      return self.clients.claim();
    })
  );
});

// Fetch event - Multi-layered caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;
  
  // Strategy 1: Cache First for Static Assets
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAMES.static));
    return;
  }
  
  // Strategy 2: Cache First for Images
  if (isImage(request)) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAMES.images));
    return;
  }
  
  // Strategy 3: Stale While Revalidate for Fonts
  if (isFont(request)) {
    event.respondWith(staleWhileRevalidateStrategy(request, CACHE_NAMES.fonts));
    return;
  }
  
  // Strategy 4: Network First for API calls
  if (isAPI(request)) {
    event.respondWith(networkFirstStrategy(request, CACHE_NAMES.dynamic));
    return;
  }
  
  // Strategy 5: Stale While Revalidate for everything else
  event.respondWith(staleWhileRevalidateStrategy(request, CACHE_NAMES.dynamic));
});

// Helper functions
function isStaticAsset(url) {
  return STATIC_ASSETS.includes(url.pathname) || 
         url.pathname.endsWith('.js') || 
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.json');
}

function isImage(request) {
  return request.destination === 'image' ||
         /\.(jpe?g|png|gif|svg|webp|avif)$/i.test(new URL(request.url).pathname);
}

function isFont(request) {
  return request.destination === 'font' ||
         /\.(woff2?|ttf|otf|eot)$/i.test(new URL(request.url).pathname);
}

function isAPI(request) {
  return request.url.includes('/api/') || request.url.includes('script.google.com');
}

// Cache First Strategy - Good for static assets that don't change often
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('[SW] Cache hit:', request.url);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Network First Strategy - Good for API calls that need fresh data
async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy - Good for content that can be slightly outdated
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Return cached version immediately
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(err => {
    console.error('[SW] Stale while revalidate fetch failed:', err);
  });
  
  return cachedResponse || fetchPromise;
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-leads') {
    event.waitUntil(syncLeads());
  }
});

async function syncLeads() {
  // Get leads from IndexedDB and sync when back online
  console.log('[SW] Syncing leads in background');
}

// Push notification support (future enhancement)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/logo.png',
    badge: '/logo.png',
    vibrate: [100, 50, 100],
    data: {
      url: event.data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('ZfO', options)
  );
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});