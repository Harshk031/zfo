/**
 * Media Utilities
 * Helper functions for image/video optimization, srcset generation,
 * and responsive media handling
 */

// Generate responsive srcset for images
export const generateSrcSet = (src, widths = [320, 640, 768, 1024, 1280, 1920]) => {
  if (!src) return '';
  
  const ext = src.split('.').pop();
  const baseWithoutExt = src.replace(`.${ext}`, '');
  
  return widths
    .map(width => `${baseWithoutExt}-${width}w.${ext} ${width}w`)
    .join(', ');
};

// Generate responsive srcset with density descriptors (1x, 2x, 3x)
export const generateDensitySrcSet = (src, densities = [1, 2, 3]) => {
  if (!src) return '';
  
  const ext = src.split('.').pop();
  const baseWithoutExt = src.replace(`.${ext}`, '');
  
  return densities
    .map(density => {
      const suffix = density === 1 ? '' : `@${density}x`;
      return `${baseWithoutExt}${suffix}.${ext} ${density}x`;
    })
    .join(', ');
};

// Generate sources for modern formats
export const generateSources = (src, options = {}) => {
  if (!src) return [];
  
  const { widths = [320, 640, 768, 1024, 1280, 1920] } = options;
  const ext = src.split('.').pop();
  const baseWithoutExt = src.replace(`.${ext}`, '');
  
  return [
    {
      type: 'image/avif',
      srcSet: generateSrcSet(`${baseWithoutExt}.avif`, widths),
    },
    {
      type: 'image/webp',
      srcSet: generateSrcSet(`${baseWithoutExt}.webp`, widths),
    },
  ];
};

// Generate video sources
export const generateVideoSources = (src) => {
  if (!src) return [];
  
  const baseWithoutExt = src.replace(/\.[^.]+$/, '');
  
  return [
    { src: `${baseWithoutExt}.webm`, type: 'video/webm' },
    { src: `${baseWithoutExt}.mp4`, type: 'video/mp4' },
  ];
};

// Get optimal image size for viewport
export const getOptimalImageSize = () => {
  const width = window.innerWidth;
  
  if (width <= 320) return 320;
  if (width <= 640) return 640;
  if (width <= 768) return 768;
  if (width <= 1024) return 1024;
  if (width <= 1280) return 1280;
  return 1920;
};

// Generate sizes attribute
export const generateSizes = (breakpoints = {}) => {
  const defaults = {
    sm: '100vw',    // < 640px
    md: '50vw',     // 640px - 768px
    lg: '33vw',     // 768px - 1024px
    xl: '25vw',     // > 1024px
  };
  
  const config = { ...defaults, ...breakpoints };
  
  return [
    `(max-width: 640px) ${config.sm}`,
    `(max-width: 768px) ${config.md}`,
    `(max-width: 1024px) ${config.lg}`,
    config.xl,
  ].join(', ');
};

// Calculate aspect ratio
export const calculateAspectRatio = (width, height) => {
  if (!width || !height) return '16 / 9';
  return `${width} / ${height}`;
};

// Generate blur placeholder
export const generateBlurPlaceholder = (width = 100, height = 100, color = '#1a1a1a') => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <rect fill="${color}" width="100%" height="100%"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Check if browser supports WebP
export const supportsWebP = () => {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

// Check if browser supports AVIF
export const supportsAVIF = () => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

// Preload critical images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = (sources) => {
  return Promise.all(sources.map(src => preloadImage(src)));
};

// Get file extension
export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

// Check if file is image
export const isImage = (filename) => {
  const ext = getFileExtension(filename);
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'].includes(ext);
};

// Check if file is video
export const isVideo = (filename) => {
  const ext = getFileExtension(filename);
  return ['mp4', 'webm', 'ogv', 'mov'].includes(ext);
};

// Media breakpoints for responsive design
export const mediaBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Match media query
export const matchMediaQuery = (breakpoint) => {
  const width = mediaBreakpoints[breakpoint];
  if (!width) return false;
  return window.matchMedia(`(min-width: ${width}px)`).matches;
};

export default {
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
  matchMediaQuery,
};