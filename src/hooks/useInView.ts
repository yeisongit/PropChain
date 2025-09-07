import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseInViewOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export default function useInView(options: UseInViewOptions = { threshold: 0.1 }): [(node: Element | null) => void, boolean] {
  const { root = null, rootMargin = '50px', threshold = 0.1 } = options;
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const refCallback = useCallback((node: Element | null) => {
    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      console.log('Setting up observer for element:', node);
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            console.log('Intersection observed:', {
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              threshold
            });
            setInView(entry.isIntersecting);
          }
        },
        { root, rootMargin, threshold }
      );
      
      observerRef.current.observe(node);
    }
  }, [root, rootMargin, threshold]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [refCallback, inView];
}
