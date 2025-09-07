import React, { useEffect, useRef, useState } from 'react';
import useInView from '@/hooks/useInView';
import useAnimateInView from '@/components/useAnimateInView';
export interface NumberCounterProps {
  value: number;
  duration?: number; // milliseconds
  formatter?: (n: number) => string;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  once?: boolean; // if true, animate only the first time
}

const NumberCounter: React.FC<NumberCounterProps> = ({
  value,
  duration = 1200,
  formatter,
  className,
  prefix,
  suffix,
  decimals = 0,
  once = false,
}) => {
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const externalInView = useAnimateInView();
  // call local hook unconditionally to obey rules of hooks; we may ignore its value if external provided
  const [localRef, localInView] = useInView({ threshold: 0.3 });
  // choose ref: if external context is present, we don't need localRef; but keep a no-op ref when using external
  const ref = externalInView === undefined ? localRef : (() => {}) as (node: Element | null) => void;
  const inView = externalInView === undefined ? localInView : externalInView;
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // cancel any existing animation
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startRef.current = null;

    // only start animation when component is in view
    if (!inView) {
      // if we should allow re-animation, reset state when leaving view
      if (!once) {
        setCurrent(0);
        startRef.current = null;
      }
      return;
    }

    if (once && hasAnimatedRef.current) return;

    const start = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - (startRef.current || 0);
      const progress = Math.min(1, elapsed / Math.max(1, duration));

      // easeOutCubic for nicer feeling
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = parseFloat((value * eased).toFixed(decimals));
      setCurrent(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(start);
      } else {
        rafRef.current = null;
        hasAnimatedRef.current = true;
      }
    };

    rafRef.current = requestAnimationFrame(start);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, decimals, inView, once]);

  // useInView hook handles observation; we react to inView changes in the animation effect

  const display = formatter
    ? formatter(current)
    : new Intl.NumberFormat(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: 0 }).format(current);

  return (
    <span ref={ref as React.RefCallback<HTMLSpanElement>} className={className} aria-live="polite" aria-atomic="true">
      {prefix}
      <span className="number-counter" aria-hidden="false">
        {display}
      </span>
      {suffix}
    </span>
  );
};

export default NumberCounter;
