/**
 * Intersection Observer Hooks
 * For lazy loading, progressive loading, and performance optimization
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useIntersectionObserver - Custom hook for lazy loading
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} triggerOnce - Whether to only trigger once
 * @returns {[React.RefObject, boolean]} - [ref, isIntersecting]
 */
export const useIntersectionObserver = (options = {}, triggerOnce = true) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If triggerOnce and already triggered, skip
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        setIsIntersecting(intersecting);
        
        if (intersecting && triggerOnce) {
          hasTriggered.current = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.rootMargin, options.threshold, triggerOnce]);

  return [elementRef, isIntersecting];
};

/**
 * useLazyLoad - Hook for lazy loading images/components
 * @param {string} placeholderSrc - Placeholder image URL
 * @returns {Object} - { ref, src, isLoaded }
 */
export const useLazyLoad = (placeholderSrc = '') => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '100px', // Start loading 100px before it enters viewport
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return {
    ref: elementRef,
    shouldLoad,
    isLoaded,
    handleLoad,
  };
};

/**
 * useDeferUntilVisible - Defers rendering until element is visible
 * @param {number} delay - Delay after becoming visible (ms)
 * @returns {[React.RefObject, boolean]}
 */
export const useDeferUntilVisible = (delay = 0) => {
  const [shouldRender, setShouldRender] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setShouldRender(true), delay);
          } else {
            setShouldRender(true);
          }
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return [elementRef, shouldRender];
};

/**
 * useInfiniteScroll - Hook for infinite scroll pagination
 * @param {Function} onIntersect - Callback when bottom is reached
 * @param {boolean} hasMore - Whether there are more items to load
 * @returns {React.RefObject}
 */
export const useInfiniteScroll = (onIntersect, hasMore = true) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold: 0,
        rootMargin: '200px', // Start loading 200px before bottom
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [onIntersect, hasMore]);

  return elementRef;
};

/**
 * useProgressiveImage - Progressive image loading
 * @param {string} src - Image source
 * @param {string} placeholder - Placeholder/blur image
 * @returns {Object}
 */
export const useProgressiveImage = (src, placeholder) => {
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { src: currentSrc, isLoading };
};

export default {
  useIntersectionObserver,
  useLazyLoad,
  useDeferUntilVisible,
  useInfiniteScroll,
  useProgressiveImage,
};