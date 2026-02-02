/**
 * Service Worker Registration Utility
 * Handles SW registration, updates, and cache management
 */

const SW_VERSION = '1.0.0';

export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('[SW] Registered with scope:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('[SW] New version found, installing...');
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                console.log('[SW] New content available, refreshing...');
                // Optional: Show user a notification about update
                showUpdateNotification(newWorker);
              }
            });
          });
        })
        .catch(error => {
          console.error('[SW] Registration failed:', error);
        });
      
      // Listen for messages from SW
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data === 'sw-update') {
          console.log('[SW] Update ready');
        }
      });
    });
  } else {
    console.log('[SW] Service Worker not supported');
  }
};

// Unregister SW (for debugging)
export const unregisterSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
      console.log('[SW] Unregistered');
    });
  }
};

// Update SW
export const updateSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.update();
      console.log('[SW] Checking for updates...');
    });
  }
};

// Show update notification (optional UI)
const showUpdateNotification = (worker) => {
  // Dispatch custom event that can be caught by React components
  window.dispatchEvent(new CustomEvent('sw-update-available', {
    detail: { worker }
  }));
};

// Cache management utilities
export const clearAllCaches = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('[SW] All caches cleared');
  }
};

// Get cache info
export const getCacheInfo = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    const cacheInfo = {};
    
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      cacheInfo[name] = keys.length;
    }
    
    return cacheInfo;
  }
  return null;
};