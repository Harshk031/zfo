/**
 * OptimizedImage Component
 * Comprehensive image optimization with WebP/AVIF support,
 * blur-up placeholders, lazy loading, and responsive srcsets
 */

import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes = '100vw',
  objectFit = 'cover',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef(null);
  
  // Generate responsive srcset with WebP/AVIF fallbacks
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    const widths = [320, 640, 768, 1024, 1280, 1920];
    const ext = baseSrc.split('.').pop();
    const baseWithoutExt = baseSrc.replace(`.${ext}`, '');
    
    return widths
      .map(w => `${baseWithoutExt}-${w}w.${ext} ${w}w`)
      .join(', ');
  };

  // Generate modern format sources
  const generateSources = (baseSrc) => {
    if (!baseSrc) return [];
    
    const ext = baseSrc.split('.').pop();
    const baseWithoutExt = baseSrc.replace(`.${ext}`, '');
    
    return [
      {
        type: 'image/avif',
        srcSet: generateSrcSet(`${baseWithoutExt}.avif`),
      },
      {
        type: 'image/webp',
        srcSet: generateSrcSet(`${baseWithoutExt}.webp`),
      },
    ];
  };

  // Lazy loading with intersection observer (unless priority)
  const [ref, isVisible] = useIntersectionObserver(
    { threshold: 0, rootMargin: '200px' },
    !priority
  );

  // Set initial source without causing cascading renders
  if ((priority || isVisible) && !currentSrc) {
    setCurrentSrc(src);
  }

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Calculate aspect ratio for layout stability
  const aspectRatio = width && height ? `${width} / ${height}` : '16 / 9';
  
  // Generate blur placeholder
  const blurPlaceholder = blurDataURL || 
    `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width || 100} ${height || 100}">
        <rect fill="#1a1a1a" width="100%" height="100%"/>
      </svg>
    `)}`;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio,
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={blurPlaceholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 transition-opacity duration-500"
          style={{ opacity: isLoaded ? 0 : 1 }}
        />
      )}
      
      {/* Actual image with modern formats */}
      {(priority || isVisible) && !hasError && (
        <picture>
          {/* AVIF - Best compression */}
          <source
            type="image/avif"
            srcSet={generateSrcSet(src.replace(/\.[^.]+$/, '.avif'))}
            sizes={sizes}
          />
          
          {/* WebP - Good compression, wider support */}
          <source
            type="image/webp"
            srcSet={generateSrcSet(src.replace(/\.[^.]+$/, '.webp'))}
            sizes={sizes}
          />
          
          {/* Fallback JPEG/PNG */}
          <img
            ref={imgRef}
            src={currentSrc}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchpriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit }}
            {...props}
          />
        </picture>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;