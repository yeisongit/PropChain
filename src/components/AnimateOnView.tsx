import React, { useEffect, useState, useRef } from 'react';
import { AnimateOnViewProvider } from './AnimateOnViewContext';

interface AnimateOnViewProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  once?: boolean;
  startVisible?: boolean;
}

const AnimateOnView: React.FC<AnimateOnViewProps> = ({ 
  children, 
  className = '', 
  threshold = 0.1,
  delay = 0,
  once = false, // Cambiado a false por defecto para permitir repetición
  startVisible = false
}) => {
  const [isVisible, setIsVisible] = useState(startVisible);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          // Elemento está visible y supera el threshold
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else {
          // Elemento no está visible o está por debajo del threshold
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold: [0, threshold], // Observar tanto cuando está completamente fuera como cuando supera nuestro threshold
        rootMargin: '0px' // Removemos rootMargin para mayor precisión
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  return (
    <AnimateOnViewProvider value={isVisible}>
      <div 
        ref={elementRef}
        className={className} 
        data-inview={isVisible ? 'true' : 'false'}
        style={{
          transitionDelay: delay ? `${delay}ms` : undefined
        }}
      >
        {children}
      </div>
    </AnimateOnViewProvider>
  );
};

export default AnimateOnView;
