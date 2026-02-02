/**
 * Utils Barrel Export
 * Clean centralized exports for all utility functions
 */

export { registerSW, unregisterSW, updateSW, clearAllCaches, getCacheInfo } from './serviceWorker';
export { localStore, sessionStore, indexedDBStore } from './storage';
export { 
  generateSrcSet,
  generateDensitySrcSet,
  generateSources,
  generateVideoSources,
  getOptimalImageSize,
  generateSizes,
  calculateAspectRatio,
  generateBlurPlaceholder,
  supportsWebP,
  supportsAVIF,
  preloadImage,
  preloadImages,
  getFileExtension,
  isImage,
  isVideo,
  mediaBreakpoints,
  matchMediaQuery
} from './mediaUtils';