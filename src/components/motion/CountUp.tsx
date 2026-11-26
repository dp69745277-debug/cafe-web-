import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  to: number;
  from?: number;
  decimals?: number;
  durationMs?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * Viewport-triggered tabular-nums CountUp metric animation.
 */
export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  decimals = 0,
  durationMs = 950,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState<number>(prefersReducedMotion ? to : from);

  useEffect(() => {
    if (prefersReducedMotion || !inView) return;

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, to, from, durationMs, prefersReducedMotion]);

  const activeValue = prefersReducedMotion ? to : value;
  const formatted = decimals > 0 ? activeValue.toFixed(decimals) : Math.round(activeValue).toString();

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
