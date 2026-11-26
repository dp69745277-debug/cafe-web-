import React from 'react';

interface BrandMarkProps {
  className?: string;
  size?: number;
}

/**
 * Minimalist custom SVG emblem inspired by Raj Cafe Dhawa's real crest:
 * a stylized pine/stag silhouette enclosed in a burnished-gold border.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({ className = '', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="14"
        fill="#110E0C"
        stroke="#C99A3B"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <rect
        x="6.5"
        y="6.5"
        width="51"
        height="51"
        rx="10.5"
        stroke="#C99A3B"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      {/* Stylized Pine Crest & Stag Antler Crown */}
      <path
        d="M32 14L24.5 24.5H29L21.5 34.5H28L20 43.5H44L36 34.5H42.5L35 24.5H39.5L32 14Z"
        stroke="#C99A3B"
        strokeWidth="1.75"
        strokeLinejoin="round"
        fill="#C99A3B"
        fillOpacity="0.08"
      />
      {/* Subtle Antler Flourish */}
      <path
        d="M25 14C25.5 11.5 27.5 10.2 29.5 10.8M39 14C38.5 11.5 36.5 10.2 34.5 10.8"
        stroke="#C99A3B"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M32 43.5V49.5" stroke="#C99A3B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 50.5H40" stroke="#C99A3B" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
};

interface BrandLockupProps {
  compact?: boolean;
  tone?: 'light' | 'dark';
}

export const BrandLockup: React.FC<BrandLockupProps> = ({
  compact = false,
  tone = 'light',
}) => {
  const primaryText = tone === 'light' ? 'text-[#F7F2EA]' : 'text-[#1C1612]';
  const subText = tone === 'light' ? 'text-[#C99A3B]' : 'text-[#9A6F1E]';

  return (
    <div className="flex items-center gap-3 select-none">
      <BrandMark size={compact ? 36 : 42} className="shrink-0" />
      <div className="leading-none">
        <span
          className={`font-editorial block tracking-[0.06em] font-semibold uppercase ${
            compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
          } ${primaryText}`}
        >
          Raj Cafe
        </span>
        <span
          className={`block text-[10px] font-medium tracking-[0.22em] uppercase mt-1 ${subText}`}
        >
          Dhawa · Jodhpur
        </span>
      </div>
    </div>
  );
};
