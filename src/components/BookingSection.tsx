import React, { useMemo, useState } from 'react';
import { CalendarClock, CheckCircle2, Lock, MessageCircle, Users } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';
import { buildBookingWhatsAppUrl } from '../utils/cafeStatus';
import { AnimatedContent } from './motion/AnimatedContent';
import { SpotlightCard } from './motion/SpotlightCard';
import { ClickSpark } from './motion/ClickSpark';
import { EditorialImage } from './EditorialImage';

const GUEST_OPTIONS = ['2 Guests', '3–4 Guests', '5–6 Guests', '7+ Group'];
const TIME_SLOTS = [
  '11:30 AM',
  '1:00 PM',
  '3:30 PM',
  '5:00 PM',
  '6:30 PM',
  '8:00 PM',
  '9:00 PM',
];

export const BookingSection: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [guestsCount, setGuestsCount] = useState('2 Guests');
  const [preferredTime, setPreferredTime] = useState('6:30 PM');
  const [seatingPreference, setSeatingPreference] = useState<'Private Cabin' | 'Open Group Booth'>(
    'Private Cabin',
  );
  const [occasionNote, setOccasionNote] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const bookingUrl = useMemo(
    () =>
      buildBookingWhatsAppUrl({
        whatsappNumberDigits: CAFE_DATA.contact.whatsappDigits,
        guestName,
        guestsCount,
        preferredTime,
        seatingPreference,
        occasionNote,
      }),
    [guestName, guestsCount, preferredTime, seatingPreference, occasionNote],
  );

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedNotice(true);
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="booking" className="bg-[#110E0C] py-20 sm:py-28 text-[#F7F2EA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <SpotlightCard
            spotlightColor="rgba(201, 154, 59, 0.16)"
            className="rounded-3xl border border-[#C99A3B]/25 bg-[#1B1613] shadow-[0_24px_65px_rgba(0,0,0,0.45)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Atmospheric Visual & Cabin Promise */}
              <div className="relative flex flex-col justify-between overflow-hidden lg:col-span-5">
                <div className="absolute inset-0">
                  <EditorialImage
                    src={CAFE_DATA.cabinBookingImage}
                    alt="Warm private wooden cabin seating at Raj Cafe Dhawa"
                    className="h-full w-full"
                    overlayClassName="bg-gradient-to-t from-[#110E0C] via-[#110E0C]/75 to-[#110E0C]/45"
                  />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 min-h-[300px]">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#C99A3B]/40 bg-[#110E0C]/75 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#C99A3B] backdrop-blur-sm">
                      <Lock className="h-3 w-3" />
                      <span>Private Cabins &amp; Booths</span>
                    </span>
                    <h2 className="font-editorial mt-5 text-3xl font-semibold leading-[1.08] text-[#F7F2EA] sm:text-4xl">
                      Book Your Cozy Corner Before You Arrive
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#F7F2EA]/80">
                      Reserve a curtained cabin for quiet two-person evenings or a wide wooden
                      group booth for birthdays and college catch-ups on Sinli Road.
                    </p>
                  </div>

                  <div className="mt-8 space-y-2.5 border-t border-white/15 pt-5 text-xs text-[#F7F2EA]/80">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C99A3B]" />
                      <span>Zero reservation fee · Instant confirmation on WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CalendarClock className="h-4 w-4 shrink-0 text-[#C99A3B]" />
                      <span>Daily hours: {CAFE_DATA.hours.window}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 4-Field WhatsApp Quick Booking Form */}
              <form
                onSubmit={handleConfirm}
                className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-7"
              >
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C99A3B]">
                      WhatsApp Quick Booking
                    </span>
                    <h3 className="font-editorial mt-1.5 text-2xl font-semibold text-[#F7F2EA] sm:text-3xl">
                      Reserve in Under 15 Seconds
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* 1. Your Name */}
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-medium text-[#F7F2EA]/80 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-white/12 bg-[#110E0C] px-4 py-3 text-sm text-[#F7F2EA] placeholder:text-[#F7F2EA]/35 focus:border-[#C99A3B] focus:outline-none"
                      />
                    </div>

                    {/* 2. Guests Count */}
                    <div>
                      <label
                        htmlFor="booking-guests"
                        className="block text-xs font-medium text-[#F7F2EA]/80 mb-2"
                      >
                        Guests Count
                      </label>
                      <div className="relative">
                        <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C99A3B]" />
                        <select
                          id="booking-guests"
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-white/12 bg-[#110E0C] pl-10 pr-4 py-3 text-sm text-[#F7F2EA] focus:border-[#C99A3B] focus:outline-none"
                        >
                          {GUEST_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 3. Preferred Time */}
                  <div>
                    <span className="block text-xs font-medium text-[#F7F2EA]/80 mb-2">
                      Preferred Time (Today · 10:30 AM – 10:00 PM)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredTime(slot)}
                          className={`tabular-nums rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                            preferredTime === slot
                              ? 'border-[#C99A3B] bg-[#C99A3B] text-[#110E0C]'
                              : 'border-white/12 bg-[#110E0C] text-[#F7F2EA]/80 hover:border-[#C99A3B]/50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Seating Preference */}
                  <div>
                    <span className="block text-xs font-medium text-[#F7F2EA]/80 mb-2">
                      Seating Preference
                    </span>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(['Private Cabin', 'Open Group Booth'] as const).map((option) => {
                        const active = seatingPreference === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSeatingPreference(option)}
                            className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-colors cursor-pointer ${
                              active
                                ? 'border-[#C99A3B] bg-[#C99A3B]/14'
                                : 'border-white/12 bg-[#110E0C]/70 hover:border-white/25'
                            }`}
                          >
                            <span
                              className={`text-sm font-semibold ${
                                active ? 'text-[#C99A3B]' : 'text-[#F7F2EA]'
                              }`}
                            >
                              {option}
                            </span>
                            <span className="mt-1 text-xs text-[#F7F2EA]/65">
                              {option === 'Private Cabin'
                                ? 'Curtained wooden privacy for 2–4 guests'
                                : 'Spacious open booth for friends & celebrations'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Optional Note */}
                  <div>
                    <label
                      htmlFor="booking-note"
                      className="block text-xs font-medium text-[#F7F2EA]/75 mb-1.5"
                    >
                      Occasion or Special Request (Optional)
                    </label>
                    <input
                      id="booking-note"
                      type="text"
                      value={occasionNote}
                      onChange={(e) => setOccasionNote(e.target.value)}
                      placeholder="e.g. Small birthday setup, window booth, extra chairs"
                      className="w-full rounded-xl border border-white/12 bg-[#110E0C] px-4 py-2.5 text-sm text-[#F7F2EA] placeholder:text-[#F7F2EA]/35 focus:border-[#C99A3B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div className="text-xs text-[#F7F2EA]/65">
                    {submittedNotice ? (
                      <span className="text-emerald-400 font-medium">
                        Opening WhatsApp to {CAFE_DATA.contact.primaryPhone}...
                      </span>
                    ) : (
                      <span>
                        Sends to{' '}
                        <span className="tabular-nums text-[#F7F2EA]/90 font-medium">
                          {CAFE_DATA.contact.primaryPhone}
                        </span>
                      </span>
                    )}
                  </div>

                  <ClickSpark sparkColor="#F7F2EA">
                    <button
                      type="submit"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#C99A3B] px-7 py-3.5 text-sm font-semibold text-[#110E0C] transition-[background-color,transform] duration-200 hover:bg-[#d8ab4c] active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EA]"
                    >
                      <MessageCircle className="h-4.5 w-4.5" />
                      <span>Confirm on WhatsApp</span>
                    </button>
                  </ClickSpark>
                </div>
              </form>
            </div>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  );
};
