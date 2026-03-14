// SERVICE WORKER KILL-SWITCH
// This file replaces the old Vite/PWA 'sw.js' that was incorrectly caching the entire old site
// and causing "Failed to fetch dynamically imported module" errors.
// When browsers check for SW updates, they will download this file,
// which aggressively deletes all old caches and unregisters itself.

self.addEventListener('install', (event) => {
  // Force the new kill-switch SW to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // 1. Delete ALL existing caches from the old site
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('[SW Kill Switch] Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // 2. Take control of all clients immediately
      return self.clients.claim();
    }).then(() => {
      // 3. Force all open windows to reload to get the new Next.js site
      return self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          // Tell the client to reload
          client.navigate(client.url);
        });
      });
    }).then(() => {
      // 4. Finally, securely unregister this service worker itself so it disappears forever
      return self.registration.unregister();
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Fallback: act as a pass-through network-only SW for any requests made before unregister completes
  event.respondWith(fetch(event.request));
});