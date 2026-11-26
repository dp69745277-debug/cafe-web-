import React, { useState } from 'react';
import { BrandMark } from './BrandMark';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  overlayClassName?: string;
}

/**
 * Curated photo wrapper with smooth load transition, warm editorial tinting,
 * and a dark espresso fallback if offline or blocked.
 */
export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  eager = false,
  overlayClassName = 'bg-gradient-to-t from-[#110E0C]/75 via-[#110E0C]/15 to-transparent',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#1B1613] ${className}`}>
      {!errored ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1B1613] to-[#110E0C] p-6 text-center">
          <BrandMark size={38} className="opacity-70" />
          <span className="mt-2 text-xs tracking-[0.16em] uppercase text-[#F7F2EA]/50">
            Raj Cafe Dhawa
          </span>
        </div>
      )}
      {overlayClassName && (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${overlayClassName}`} />
      )}
    </div>
  );
};
