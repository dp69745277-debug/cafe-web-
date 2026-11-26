import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';
import { AnimatedContent } from './motion/AnimatedContent';
import { SpotlightCard } from './motion/SpotlightCard';
import { EditorialImage } from './EditorialImage';
import { BrandMark } from './BrandMark';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const GalleryInstagramSection: React.FC = () => {
  return (
    <section id="gallery" className="bg-[#110E0C] py-20 sm:py-28 text-[#F7F2EA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C99A3B]">
                Atmosphere &amp; Plates
              </span>
              <h2 className="font-editorial mt-2 text-3xl font-semibold leading-[1.1] text-[#F7F2EA] sm:text-5xl">
                Evenings at Raj Cafe Dhawa
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#F7F2EA]/72">
              Golden Edison light, steaming plates straight off the wok, and frosty shakes shared
              inside Dhawa’s favorite hangout.
            </p>
          </div>
        </AnimatedContent>

        {/* Editorial Bento Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {CAFE_DATA.galleryPhotos.map((photo, index) => {
            let spanClass = 'lg:col-span-4 aspect-[4/3]';
            if (index === 0) spanClass = 'lg:col-span-5 lg:row-span-2 min-h-[280px] lg:min-h-[440px]';
            if (index === 1) spanClass = 'lg:col-span-3 aspect-[4/3] lg:aspect-auto lg:min-h-[212px]';
            if (index === 2) spanClass = 'lg:col-span-4 aspect-[4/3] lg:aspect-auto lg:min-h-[212px]';
            if (index === 3) spanClass = 'lg:col-span-7 aspect-[16/9] lg:aspect-auto lg:min-h-[212px]';
            if (index === 4) spanClass = 'lg:col-span-6 aspect-[16/10]';
            if (index === 5) spanClass = 'lg:col-span-6 aspect-[16/10]';

            return (
              <AnimatedContent key={photo.id} delay={index * 0.05} className={spanClass}>
                <figure className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1B1613]">
                  <EditorialImage
                    src={photo.image}
                    alt={`${photo.title} — ${photo.subtitle}`}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
                    overlayClassName="bg-gradient-to-t from-[#110E0C]/90 via-[#110E0C]/20 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <div className="font-editorial text-xl font-semibold text-[#F7F2EA]">
                      {photo.title}
                    </div>
                    <div className="mt-0.5 text-xs text-[#F7F2EA]/75">{photo.subtitle}</div>
                  </figcaption>
                </figure>
              </AnimatedContent>
            );
          })}
        </div>

        {/* Instagram Connect Banner Card */}
        <AnimatedContent delay={0.15} className="mt-10">
          <SpotlightCard
            spotlightColor="rgba(201, 154, 59, 0.18)"
            className="rounded-3xl border border-[#C99A3B]/30 bg-[#1B1613]"
          >
            <div className="flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-9">
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#C99A3B]/45 bg-[#110E0C]">
                  <BrandMark size={38} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-base font-bold tracking-tight text-[#F7F2EA] sm:text-lg">
                      {CAFE_DATA.social.instagramHandle}
                    </span>
                    <span className="rounded-full border border-[#C99A3B]/35 bg-[#C99A3B]/15 px-2.5 py-0.5 text-xs font-semibold text-[#C99A3B]">
                      {CAFE_DATA.social.instagramBadge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[#F7F2EA]/72">
                    Tag your cabin snapshots, birthday reels &amp; evening coffee pours from Sinli
                    Road, Dhawa.
                  </p>
                </div>
              </div>

              <a
                href={CAFE_DATA.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#F7F2EA] px-6 py-3 text-xs sm:text-sm font-semibold text-[#110E0C] transition-colors hover:bg-[#C99A3B] shrink-0"
              >
                <InstagramIcon className="h-4 w-4" />
                <span>Follow on Instagram</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  );
};
