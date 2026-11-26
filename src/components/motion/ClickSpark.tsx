import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface SparkBurst {
  id: number;
  x: number;
  y: number;
}

interface ClickSparkProps {
  children: React.ReactNode;
  className?: string;
  sparkColor?: string;
}

const SPARK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * React Bits-inspired subtle warm-gold micro-spark on primary CTA clicks.
 */
export const ClickSpark: React.FC<ClickSparkProps> = ({
  children,
  className = 'inline-block',
  sparkColor = '#C99A3B',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [bursts, setBursts] = useState<SparkBurst[]>([]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
      const y = e.clientY ? e.clientY - rect.top : rect.height / 2;
      const id = Date.now() + Math.random();
      setBursts((prev) => [...prev.slice(-2), { id, x, y }]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 520);
    },
    [prefersReducedMotion],
  );

  return (
    <div onPointerDown={handlePointerDown} className={`relative ${className}`}>
      {children}
      {!prefersReducedMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-visible"
        >
          <AnimatePresence>
            {bursts.map((burst) => (
              <span
                key={burst.id}
                className="absolute"
                style={{ left: burst.x, top: burst.y }}
              >
                {SPARK_ANGLES.map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const dist = 22;
                  const tx = Math.cos(rad) * dist;
                  const ty = Math.sin(rad) * dist;
                  return (
                    <motion.span
                      key={angle}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 0.95 }}
                      animate={{ x: tx, y: ty, scale: 0.35, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ backgroundColor: sparkColor }}
                    />
                  );
                })}
              </span>
            ))}
          </AnimatePresence>
        </span>
      )}
    </div>
  );
};
