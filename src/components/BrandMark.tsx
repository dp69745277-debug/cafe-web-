import React, { useState } from 'react';

interface BrandMarkProps {
  className?: string;
  size?: number;
}

/**
 * Renders the café's real logo image from `/logo.png` inside a rounded,
 * burnished-gold-framed container with a clean fallback monogram if missing.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({ className = '', size = 40 }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <span
      style={{ width: size, height: size }}
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#C99A3B]/45 bg-[#110E0C] shadow-sm ${className}`}
    >
      {!imgError ? (
        <img
          src="/logo.png"
          alt="Raj Cafe Dhawa"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-editorial text-xs font-bold tracking-wider text-[#C99A3B]">
          RCD
        </span>
      )}
    </span>
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
      <BrandMark size={compact ? 38 : 44} />
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
