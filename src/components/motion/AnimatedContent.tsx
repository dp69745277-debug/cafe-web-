import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedContentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

/**
 * Scroll-triggered subtle editorial reveal (16px rise + opacity fade).
 */
export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  className = '',
  delay = 0,
  distance = 16,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
