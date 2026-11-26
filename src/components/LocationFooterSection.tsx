import React, { useEffect, useState } from 'react';
import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';
import { getCafeIstStatus } from '../utils/cafeStatus';
import { AnimatedContent } from './motion/AnimatedContent';
import { BrandLockup } from './BrandMark';

const CURRENT_YEAR = new Date().getFullYear();

export const LocationFooterSection: React.FC = () => {
  const [istStatus, setIstStatus] = useState(() => getCafeIstStatus());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIstStatus(getCafeIstStatus());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      {/* Section 8A: Location & Interactive Map */}
      <section
        id="location"
        className="border-t border-[#1C1612]/10 bg-[#F8F3EB] py-20 sm:py-28 text-[#1C1612]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
            {/* Left Details Column */}
            <AnimatedContent className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A6F1E]">
                    Find Us in Dhawa
                  </span>
                  <h2 className="font-editorial mt-2 text-3xl font-semibold leading-[1.08] text-[#1C1612] sm:text-5xl">
                    Visit Raj Cafe Dhawa
                  </h2>
                </div>

                {/* Address Block */}
                <div className="rounded-2xl border border-[#1C1612]/10 bg-[#EFE7DA] p-5 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#110E0C] text-[#C99A3B]">
                      <MapPin className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[#1C1612]">
                        {CAFE_DATA.address.floor}
                      </div>
                      <div className="mt-1 text-sm text-[#4B3E34]">
                        {CAFE_DATA.address.street}, {CAFE_DATA.address.cityStatePin}
                      </div>
                      <div className="mt-1.5 inline-block rounded-md bg-[#F8F3EB] px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-[#7A5B1F]">
                        Plus Code: {CAFE_DATA.address.plusCode}
                      </div>
                    </div>
                  </div>

                  {/* Hours Block */}
                  <div className="flex items-start gap-3.5 border-t border-[#1C1612]/10 pt-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#110E0C] text-[#C99A3B]">
                      <Clock className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-[#1C1612]">
                          {CAFE_DATA.hours.days}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#110E0C] px-2.5 py-0.5 text-[11px] font-medium text-[#F7F2EA]">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              istStatus.isOpen ? 'bg-emerald-400' : 'bg-[#D97736]'
                            }`}
                          />
                          {istStatus.label}
                        </span>
                      </div>
                      <div className="tabular-nums mt-1 text-sm font-medium text-[#4B3E34]">
                        {CAFE_DATA.hours.window}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clickable Call & WhatsApp Buttons */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <a
                      href={CAFE_DATA.contact.primaryPhoneHref}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1C1612]/15 bg-[#EFE7DA] px-4 py-3 text-xs sm:text-sm font-semibold text-[#1C1612] transition-colors hover:border-[#1C1612] hover:bg-[#1C1612] hover:text-[#F7F2EA]"
                    >
                      <Phone className="h-4 w-4 text-[#9A6F1E]" />
                      <span className="tabular-nums">{CAFE_DATA.contact.primaryPhone}</span>
                    </a>

                    <a
                      href={CAFE_DATA.contact.secondaryPhoneHref}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1C1612]/15 bg-[#EFE7DA] px-4 py-3 text-xs sm:text-sm font-semibold text-[#1C1612] transition-colors hover:border-[#1C1612] hover:bg-[#1C1612] hover:text-[#F7F2EA]"
                    >
                      <Phone className="h-4 w-4 text-[#9A6F1E]" />
                      <span className="tabular-nums">{CAFE_DATA.contact.secondaryPhone}</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <a
                      href={CAFE_DATA.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1C1612]/15 bg-[#FAF6F0] px-5 py-3.5 text-sm font-semibold text-[#1C1612] transition-colors hover:border-[#C99A3B] hover:bg-[#EFE7DA]"
                    >
                      <MessageCircle className="h-4 w-4 text-[#9A6F1E]" />
                      <span>WhatsApp Us</span>
                    </a>

                    <a
                      href={CAFE_DATA.google.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#110E0C] px-5 py-3.5 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#C99A3B] hover:text-[#110E0C]"
                    >
                      <Navigation className="h-4 w-4" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedContent>

            {/* Right Styled Map Embed */}
            <AnimatedContent delay={0.12} className="lg:col-span-7">
              <div className="relative h-full min-h-[360px] sm:min-h-[440px] overflow-hidden rounded-3xl border-2 border-[#110E0C]/12 bg-[#1B1613] shadow-[0_20px_50px_rgba(28,22,18,0.12)]">
                <iframe
                  title="Raj Cafe Dhawa Location on Google Maps"
                  src={CAFE_DATA.google.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full min-h-[360px] sm:min-h-[440px] border-0 grayscale-[15%] contrast-[1.04]"
                />
                <div className="pointer-events-none absolute left-4 bottom-4 hidden sm:inline-flex items-center gap-2 rounded-xl border border-[#C99A3B]/40 bg-[#110E0C]/92 px-3.5 py-2 text-xs text-[#F7F2EA] backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#C99A3B]" />
                  <span>2nd Floor, Above Dada Mirchi Masala · Sinli Road</span>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Section 8B: Minimalist Footer */}
      <footer className="border-t border-white/10 bg-[#110E0C] text-[#F7F2EA]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
            <div>
              <BrandLockup tone="light" />
              <p className="mt-3 text-xs text-[#F7F2EA]/65">
                {CAFE_DATA.hindiName} ({CAFE_DATA.shortMark}) · Sinli Road, Dhawa, Jodhpur
              </p>
            </div>

            <nav aria-label="Footer quick links" className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
              <a href="#menu" className="text-[#F7F2EA]/75 transition-colors hover:text-[#C99A3B]">
                Menu
              </a>
              <a href="#vibe" className="text-[#F7F2EA]/75 transition-colors hover:text-[#C99A3B]">
                Cabins &amp; Vibe
              </a>
              <a
                href="#booking"
                className="text-[#F7F2EA]/75 transition-colors hover:text-[#C99A3B]"
              >
                Book a Cabin
              </a>
              <a
                href="#review-qr"
                className="text-[#F7F2EA]/75 transition-colors hover:text-[#C99A3B]"
              >
                Review QR
              </a>
              <a
                href="#location"
                className="text-[#F7F2EA]/75 transition-colors hover:text-[#C99A3B]"
              >
                Location
              </a>
              <a
                href={CAFE_DATA.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C99A3B] transition-colors hover:text-[#F7F2EA]"
              >
                {CAFE_DATA.social.instagramHandle}
              </a>
            </nav>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 text-xs text-[#F7F2EA]/55 sm:flex-row sm:items-center">
            <p>
              © {CURRENT_YEAR} {CAFE_DATA.brandName}. All rights reserved.
            </p>
            <p>Dine-In · Private Cabins · Takeout · No-Contact Delivery · UPI / NFC</p>
          </div>
        </div>
      </footer>
    </>
  );
};
