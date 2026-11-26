import React from 'react';

interface MarqueeStripProps {
  items: string[];
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({ items }) => {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden border-y border-[#C99A3B]/25 bg-[#15110E] py-3.5 select-none"
      aria-label="Raj Cafe Dhawa highlights"
    >
      <div className="animate-rcd-marquee flex items-center whitespace-nowrap">
        {repeated.map((item, idx) => (
          <span key={idx} className="inline-flex items-center">
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-[#F7F2EA]/85 px-4 sm:px-6">
              {item}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#C99A3B] shrink-0"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
};
