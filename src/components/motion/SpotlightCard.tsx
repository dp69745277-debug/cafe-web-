import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

/**
 * React Bits-inspired SpotlightCard with warm-gold pointer-tracking illumination.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  spotlightColor = 'rgba(201, 154, 59, 0.16)',
  className = '',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [coords, setCoords] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setCoords((prev) => ({ ...prev, active: false }))}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: coords.active ? 1 : 0,
            background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 72%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
