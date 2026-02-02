/**
 * Optimized Storage Utilities
 * Handles localStorage, sessionStorage, and IndexedDB operations
 * with fallbacks and error handling for maximum compatibility
 */

const STORAGE_VERSION = '1.0.0';
const STORAGE_PREFIX = 'zfo_';

// Check if storage is available
const isStorageAvailable = (type) => {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// In-memory fallback for private browsing mode
const memoryStorage = new Map();

/**
 * Safe localStorage wrapper with fallback
 */
export const localStore = {
  get(key, defaultValue = null) {
    try {
      if (isStorageAvailable('localStorage')) {
        const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        return item ? JSON.parse(item) : defaultValue;
      }
      return memoryStorage.get(key) || defaultValue;
    } catch (e) {
      console.warn('[Storage] get error:', e);
      return memoryStorage.get(key) || defaultValue;
    }
  },

  set(key, value) {
    try {
      if (isStorageAvailable('localStorage')) {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
      } else {
        memoryStorage.set(key, value);
      }
      return true;
    } catch (e) {
      console.warn('[Storage] set error:', e);
      memoryStorage.set(key, value);
      return false;
    }
  },

  remove(key) {
    try {
      if (isStorageAvailable('localStorage')) {
        localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      }
      memoryStorage.delete(key);
      return true;
    } catch (e) {
      console.warn('[Storage] remove error:', e);
      return false;
    }
  },

  clear() {
    try {
      // Only clear items with our prefix
      if (isStorageAvailable('localStorage')) {
        Object.keys(localStorage)
          .filter(key => key.startsWith(STORAGE_PREFIX))
          .forEach(key => localStorage.removeItem(key));
      }
      memoryStorage.clear();
      return true;
    } catch (e) {
      console.warn('[Storage] clear error:', e);
      return false;
    }
  },

  // Get all leads from storage
  getLeads() {
    return this.get('leads', []);
  },

  // Add a new lead
  addLead(leadData) {
    const leads = this.getLeads();
    leads.push({
      ...leadData,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      timestamp: new Date().toISOString()
    });
    return this.set('leads', leads);
  },

  // Get chat history
  getChatHistory() {
    return this.get('chat_history', []);
  },

  // Add chat message
  addChatMessage(message) {
    const history = this.getChatHistory();
    history.push({
      ...message,
      timestamp: new Date().toISOString()
    });
    // Keep only last 50 messages
    if (history.length > 50) {
      history.shift();
    }
    return this.set('chat_history', history);
  },

  // Check if modal was shown
  wasModalShown(modalType) {
    return this.get(`modal_${modalType}_shown`, false);
  },

  // Mark modal as shown
  markModalShown(modalType) {
    return this.set(`modal_${modalType}_shown`, true);
  },

  // Get user preferences
  getUserPrefs() {
    return this.get('user_prefs', {});
  },

  // Set user preference
  setUserPref(key, value) {
    const prefs = this.getUserPrefs();
    prefs[key] = value;
    return this.set('user_prefs', prefs);
  }
};

/**
 * Session storage wrapper
 */
export const sessionStore = {
  get(key, defaultValue = null) {
    try {
      if (isStorageAvailable('sessionStorage')) {
        const item = sessionStorage.getItem(`${STORAGE_PREFIX}${key}`);
        return item ? JSON.parse(item) : defaultValue;
      }
      return defaultValue;
    } catch (e) {
      console.warn('[Session] get error:', e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      if (isStorageAvailable('sessionStorage')) {
        sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
        return true;
      }
      return false;
    } catch (e) {
      console.warn('[Session] set error:', e);
      return false;
    }
  },

  remove(key) {
    try {
      if (isStorageAvailable('sessionStorage')) {
        sessionStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      }
      return true;
    } catch (e) {
      return false;
    }
  }
};

/**
 * IndexedDB wrapper for larger data storage
 * Used for offline lead queue and large datasets
 */
const DB_NAME = 'ZfoDB';
const DB_VERSION = 1;

export const indexedDBStore = {
  db: null,

  async init() {
    if (!window.indexedDB) {
      console.warn('[IndexedDB] Not supported');
      return false;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('[IndexedDB] Open error');
        resolve(false);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(true);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores
        if (!db.objectStoreNames.contains('leads')) {
          const leadStore = db.createObjectStore('leads', { keyPath: 'id', autoIncrement: true });
          leadStore.createIndex('timestamp', 'timestamp', { unique: false });
          leadStore.createIndex('synced', 'synced', { unique: false });
        }

        if (!db.objectStoreNames.contains('offlineQueue')) {
          const queueStore = db.createObjectStore('offlineQueue', { keyPath: 'id', autoIncrement: true });
          queueStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  },

  // Add lead to offline queue
  async addLeadToQueue(leadData) {
    if (!this.db) await this.init();
    if (!this.db) return false;

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['leads'], 'readwrite');
      const store = transaction.objectStore('leads');
      
      const request = store.add({
        ...leadData,
        timestamp: new Date().toISOString(),
        synced: false
      });

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  },

  // Get unsynced leads
  async getUnsyncedLeads() {
    if (!this.db) await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['leads'], 'readonly');
      const store = transaction.objectStore('leads');
      const index = store.index('synced');
      
      const request = index.getAll(false);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve([]);
    });
  },

  // Mark leads as synced
  async markAsSynced(ids) {
    if (!this.db) return false;

    const transaction = this.db.transaction(['leads'], 'readwrite');
    const store = transaction.objectStore('leads');

    ids.forEach(id => {
      const request = store.get(id);
      request.onsuccess = () => {
        const lead = request.result;
        if (lead) {
          lead.synced = true;
          store.put(lead);
        }
      };
    });

    return true;
  }
};

// Initialize IndexedDB on module load
if (typeof window !== 'undefined') {
  indexedDBStore.init();
}

export default { localStore, sessionStore, indexedDBStore };