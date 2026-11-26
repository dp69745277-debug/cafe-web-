import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * React Bits-inspired word-by-word BlurText reveal, 60fps & reduced-motion safe.
 */
export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = '',
  delay = 0,
  as = 'h1',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.055,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block mr-[0.26em] last:mr-0 will-change-[transform,opacity,filter]"
          variants={{
            hidden: {
              opacity: 0,
              y: 16,
              filter: 'blur(8px)',
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.58,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
};
