import React from 'react';
import { Coffee, Car, Lock, Music, Sparkles } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';
import { MarqueeStrip } from './motion/MarqueeStrip';
import { AnimatedContent } from './motion/AnimatedContent';
import { SpotlightCard } from './motion/SpotlightCard';
import { EditorialImage } from './EditorialImage';

export const VibeSection: React.FC = () => {
  const [cabins, menuHighlight, convenience, ambiance] = CAFE_DATA.vibeHighlights;

  return (
    <>
      <MarqueeStrip items={CAFE_DATA.marqueeItems} />

      <section id="vibe" className="bg-[#F8F3EB] py-20 sm:py-28 text-[#1C1612]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedContent>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A6F1E]">
                  The RCD Vibe · {CAFE_DATA.hindiName}
                </span>
                <h2 className="font-editorial mt-2 text-3xl font-semibold leading-[1.1] tracking-[-0.015em] text-[#1C1612] sm:text-5xl">
                  A Quiet Second-Floor Escape Above Sinli Road
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#57493E] sm:text-base">
                Crafted as Dhawa’s signature hangout—where warm pendant lighting, curtained wooden
                cabins, and honest ₹1–₹200 comfort food turn ordinary evenings into rituals.
              </p>
            </div>
          </AnimatedContent>

          {/* Warm Cream Editorial Bento Grid */}
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* 1. Featured Private Curtained Cabins */}
            <AnimatedContent delay={0.05} className="lg:col-span-7">
              <SpotlightCard
                spotlightColor="rgba(201, 154, 59, 0.22)"
                className="group h-full rounded-3xl border border-[#1C1612]/10 bg-[#1B1613] text-[#F7F2EA] shadow-[0_18px_45px_rgba(28,22,18,0.08)]"
              >
                <div className="grid h-full grid-cols-1 sm:grid-cols-12">
                  <div className="flex flex-col justify-between p-7 sm:col-span-7 sm:p-9">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#C99A3B]/35 bg-[#C99A3B]/12 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#C99A3B]">
                        <Lock className="h-3 w-3" />
                        <span>{cabins.eyebrow}</span>
                      </div>
                      <h3 className="font-editorial mt-4 text-2xl font-semibold text-[#F7F2EA] sm:text-3xl">
                        {cabins.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#F7F2EA]/78">
                        {cabins.description}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                      <span className="text-xs font-medium text-[#C99A3B]">{cabins.meta}</span>
                      <a
                        href="#booking"
                        className="text-xs font-semibold tracking-wide text-[#F7F2EA] underline decoration-[#C99A3B]/60 underline-offset-4 transition-colors hover:text-[#C99A3B]"
                      >
                        Reserve a Cabin →
                      </a>
                    </div>
                  </div>

                  <div className="relative min-h-[220px] sm:col-span-5">
                    <EditorialImage
                      src={cabins.image!}
                      alt="Warmly lit private wooden booth seating at Raj Cafe Dhawa"
                      className="h-full w-full"
                      imgClassName="group-hover:scale-[1.03]"
                      overlayClassName="bg-gradient-to-t sm:bg-gradient-to-r from-[#1B1613]/90 via-[#1B1613]/25 to-transparent"
                    />
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>

            {/* 2. Freshly Made Street-to-Cafe Menu */}
            <AnimatedContent delay={0.1} className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-[#1C1612]/10 bg-[#EFE7DA] p-7 sm:p-9">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9A6F1E]">
                      {menuHighlight.eyebrow}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C1612] text-[#C99A3B]">
                      <Coffee className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  <h3 className="font-editorial mt-4 text-2xl font-semibold text-[#1C1612] sm:text-3xl">
                    {menuHighlight.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B3E34]">
                    {menuHighlight.description}
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-3 gap-2.5 border-t border-[#1C1612]/10 pt-5">
                  <div className="rounded-xl bg-[#F8F3EB] px-3 py-2.5 text-center">
                    <div className="tabular-nums text-base font-bold text-[#1C1612]">₹30</div>
                    <div className="text-[11px] text-[#57493E]">Masala Tea</div>
                  </div>
                  <div className="rounded-xl bg-[#F8F3EB] px-3 py-2.5 text-center">
                    <div className="tabular-nums text-base font-bold text-[#1C1612]">₹80</div>
                    <div className="text-[11px] text-[#57493E]">Cold Coffee</div>
                  </div>
                  <div className="rounded-xl bg-[#F8F3EB] px-3 py-2.5 text-center">
                    <div className="tabular-nums text-base font-bold text-[#1C1612]">₹100</div>
                    <div className="text-[11px] text-[#57493E]">Schezwan</div>
                  </div>
                </div>
              </div>
            </AnimatedContent>

            {/* 3. Dine-In, Takeout & Fast Delivery */}
            <AnimatedContent delay={0.14} className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-[#1C1612]/10 bg-[#EFE7DA] p-7 sm:p-8">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9A6F1E]">
                      {convenience.eyebrow}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C1612] text-[#C99A3B]">
                      <Car className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  <h3 className="font-editorial mt-4 text-2xl font-semibold text-[#1C1612] sm:text-3xl">
                    {convenience.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B3E34]">
                    {convenience.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-[#1C1612]/10 pt-5">
                  {[
                    'Free Parking',
                    'Curbside Pickup',
                    'Drive-Through',
                    'No-Contact Delivery',
                    'UPI / NFC',
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#1C1612]/12 bg-[#F8F3EB] px-3 py-1 text-xs font-medium text-[#1C1612]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedContent>

            {/* 4. Warm Ambient Lighting & Music */}
            <AnimatedContent delay={0.18} className="lg:col-span-7">
              <div className="group grid h-full grid-cols-1 overflow-hidden rounded-3xl border border-[#1C1612]/10 bg-[#FAF6F0] sm:grid-cols-12">
                <div className="relative min-h-[210px] sm:col-span-5">
                  <EditorialImage
                    src={ambiance.image!}
                    alt="Warm hanging lights inside a cozy café space"
                    className="h-full w-full"
                    imgClassName="group-hover:scale-[1.03]"
                    overlayClassName="bg-gradient-to-t from-[#110E0C]/55 via-transparent to-transparent"
                  />
                </div>
                <div className="flex flex-col justify-between p-7 sm:col-span-7 sm:p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9A6F1E]">
                        {ambiance.eyebrow}
                      </span>
                      <Music className="h-4 w-4 text-[#9A6F1E]" />
                    </div>
                    <h3 className="font-editorial mt-4 text-2xl font-semibold text-[#1C1612] sm:text-3xl">
                      {ambiance.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#4B3E34]">
                      {ambiance.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#1C1612]/10 pt-4 text-xs font-medium text-[#57493E]">
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#9A6F1E]" />
                      Plus Code: {CAFE_DATA.address.plusCode}
                    </span>
                    <a
                      href="#location"
                      className="font-semibold text-[#1C1612] underline decoration-[#C99A3B] underline-offset-4 hover:text-[#9A6F1E]"
                    >
                      See Map →
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>
    </>
  );
};
