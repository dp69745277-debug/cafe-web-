import React, { useEffect, useState } from 'react';
import { ArrowDownRight, Clock, MapPin, MessageCircle, Star } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';
import { getCafeIstStatus } from '../utils/cafeStatus';
import { BlurText } from './motion/BlurText';
import { ClickSpark } from './motion/ClickSpark';
import { CountUp } from './motion/CountUp';
import { AnimatedContent } from './motion/AnimatedContent';

export const HeroSection: React.FC = () => {
  const [istStatus, setIstStatus] = useState(() => getCafeIstStatus());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIstStatus(getCafeIstStatus());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#110E0C] pt-24 pb-6 sm:pb-8"
    >
      {/* Full-bleed moody café hero background */}
      <div className="absolute inset-0">
        <img
          src={CAFE_DATA.heroImage}
          alt="Warm moody interior of Raj Cafe Dhawa with artisan espresso ambiance"
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-center scale-[1.02]"
        />
        {/* Layered espresso vignettes for effortless editorial readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#110E0C]/95 via-[#110E0C]/76 to-[#110E0C]/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#110E0C] via-transparent to-[#110E0C]/65"
        />
      </div>

      {/* Main Editorial Content */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="max-w-2xl">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C99A3B]/40 bg-[#1B1613]/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C99A3B] backdrop-blur-sm">
              {CAFE_DATA.heroEyebrow}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#1B1613]/75 px-3 py-1.5 text-[11px] font-medium text-[#F7F2EA]/90 backdrop-blur-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  istStatus.isOpen ? 'bg-emerald-400' : 'bg-[#D97736]'
                }`}
              />
              <span>{istStatus.label}</span>
              <span className="text-[#F7F2EA]/45">·</span>
              <span className="tabular-nums text-[#F7F2EA]/75">{istStatus.istTimeFormatted} IST</span>
            </span>
          </div>

          <BlurText
            as="h1"
            text={CAFE_DATA.tagline}
            className="font-editorial text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-[#F7F2EA] sm:text-6xl lg:text-[4.5rem]"
          />

          <AnimatedContent delay={0.18}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F7F2EA]/82 sm:text-lg">
              Tucked away on the 2nd floor above Dada Mirchi Masala on Sinli Road, Dhawa. Settle
              into private curtained cabins for freshly brewed coffee, sizzling Schezwan noodles,
              wood-style pizza, creamy pasta, and thick shakes.
            </p>
          </AnimatedContent>

          <AnimatedContent delay={0.28}>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <ClickSpark sparkColor="#F7F2EA">
                <a
                  href="#menu"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#C99A3B] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#110E0C] transition-[background-color,transform] duration-200 hover:bg-[#d8ab4c] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EA]"
                >
                  <span>Explore Menu</span>
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </ClickSpark>

              <ClickSpark sparkColor="#C99A3B">
                <a
                  href="#booking"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-sm font-semibold tracking-wide text-[#F7F2EA] backdrop-blur-md transition-[background-color,border-color,transform] duration-200 hover:border-[#C99A3B]/60 hover:bg-white/14 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3B]"
                >
                  <MessageCircle className="h-4 w-4 text-[#C99A3B]" />
                  <span>Book a Cabin on WhatsApp</span>
                </a>
              </ClickSpark>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* Bottom Floating Glass Info Strip */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedContent delay={0.34}>
          <div className="grid grid-cols-1 divide-y divide-white/10 rounded-2xl border border-white/12 bg-[#1B1613]/78 backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C99A3B]/30 bg-[#C99A3B]/12 text-[#C99A3B]">
                <Star className="h-4.5 w-4.5 fill-[#C99A3B]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#F7F2EA] sm:text-base">
                  <CountUp to={4.4} decimals={1} suffix=" ★" /> Google Rated
                </div>
                <div className="text-xs text-[#F7F2EA]/65">
                  {CAFE_DATA.google.reviewsCountText} · Guest Favorite
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C99A3B]/30 bg-[#C99A3B]/12 text-[#C99A3B]">
                <Clock className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="tabular-nums text-sm font-semibold text-[#F7F2EA] sm:text-base">
                  {CAFE_DATA.hours.short}
                </div>
                <div className="text-xs text-[#F7F2EA]/65">
                  {CAFE_DATA.hours.days} · Dine-In &amp; Delivery
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C99A3B]/30 bg-[#C99A3B]/12 text-[#C99A3B]">
                <MapPin className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#F7F2EA] sm:text-base">
                  Private Cabins &amp; Free Parking
                </div>
                <div className="text-xs text-[#F7F2EA]/65">
                  Pocket-Friendly <CountUp to={200} prefix="₹1–₹" /> · Sinli Road
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};
