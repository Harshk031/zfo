'use client';

/**
 * LazyLoad Component
 * Wrapper for lazy loading content with Intersection Observer
 * Supports blur-up effect, fade-in animations, and placeholder states
 */

import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const LazyLoad = ({
  children,
  placeholder,
  fallback,
  rootMargin = '200px',
  threshold = 0,
  triggerOnce = true,
  delay = 0,
  className = '',
  onVisible,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasTriggered(true);
              onVisible?.();
              
              if (triggerOnce) {
                observer.disconnect();
              }
            }, delay);
          } else {
            setIsVisible(true);
            setHasTriggered(true);
            onVisible?.();
            
            if (triggerOnce) {
              observer.disconnect();
            }
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered, onVisible]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={style}
    >
      {/* Placeholder shown while not visible */}
      {!isVisible && placeholder && (
        <div className="absolute inset-0">
          {placeholder}
        </div>
      )}
      
      {/* Actual content */}
      <div
        className={`transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          visibility: isVisible ? 'visible' : 'hidden',
        }}
      >
        {isVisible ? children : (fallback || null)}
      </div>
    </div>
  );
};

// Specialized component for lazy loading images
export const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LazyLoad
      className={className}
      placeholder={
        <div 
          className="w-full h-full bg-gray-800 animate-pulse"
          style={{ aspectRatio: width && height ? `${width} / ${height}` : '16 / 9' }}
        />
      }
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </LazyLoad>
  );
};

// Specialized component for lazy loading components
export const LazyComponent = ({
  component: Component,
  fallback,
  ...props
}) => {
  return (
    <LazyLoad
      placeholder={fallback}
      fallback={fallback}
    >
      <Component {...props} />
    </LazyLoad>
  );
};

export default LazyLoad;

