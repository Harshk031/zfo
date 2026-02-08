'use client';

/**
 * OptimizedVideo Component
 * Video optimization with WebM format, poster frames,
 * lazy loading, and progressive loading states
 */

import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const OptimizedVideo = ({
  src,
  poster,
  width,
  height,
  className = '',
  priority = false,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  playsInline = true,
  preload = 'metadata',
  aspectRatio,
  objectFit = 'cover',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const videoRef = useRef(null);
  
  // Generate WebM and fallback MP4 sources
  const baseWithoutExt = src?.replace(/\.[^.]+$/, '');
  const sources = [
    { src: `${baseWithoutExt}.webm`, type: 'video/webm' },
    { src: `${baseWithoutExt}.mp4`, type: 'video/mp4' },
  ];

  // Lazy loading with intersection observer
  const [ref, isVisible] = useIntersectionObserver(
    { threshold: 0, rootMargin: '100px' },
    !priority
  );

  // Set play state based on autoplay and visibility
  if (autoPlay && isVisible && !shouldPlay) {
    setShouldPlay(true);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay && isVisible) {
      video.play().catch(() => {
        // Autoplay blocked, show controls
      });
    } else {
      video.pause();
    }
  }, [shouldPlay, isVisible]);

  const handleCanPlay = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const handlePosterLoad = () => {
    setPosterLoaded(true);
  };

  // Calculate aspect ratio for layout stability
  const calculatedAspectRatio = aspectRatio || (width && height ? `${width} / ${height}` : '16 / 9');

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-gray-900 ${className}`}
      style={{
        aspectRatio: calculatedAspectRatio,
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {/* Poster frame with progressive loading */}
      {poster && (!isLoaded || !shouldPlay) && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            posterLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={poster}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            onLoad={handlePosterLoad}
            loading={priority ? 'eager' : 'lazy'}
          />
          {/* Play button overlay */}
          {(!autoPlay || !shouldPlay) && (
            <button
              onClick={() => setShouldPlay(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group"
              aria-label="Play video"
            >
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg 
                  className="w-6 h-6 text-black ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Video element */}
      {(priority || isVisible) && !hasError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          width={width}
          height={height}
          poster={poster}
          autoPlay={shouldPlay}
          muted={muted}
          loop={loop}
          controls={controls && isLoaded}
          playsInline={playsInline}
          preload={priority ? 'auto' : preload}
          onCanPlay={handleCanPlay}
          onError={handleError}
          {...props}
        >
          {sources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Loading state */}
      {!isLoaded && !hasError && !poster && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ffcc00]" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          <span className="text-sm">Failed to load video</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedVideo;

