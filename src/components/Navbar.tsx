import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { BrandLockup } from './BrandMark';
import { CAFE_DATA } from '../data/cafeData';
import { getCafeIstStatus } from '../utils/cafeStatus';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Cabins & Vibe', href: '#vibe' },
  { label: 'Review QR', href: '#review-qr' },
  { label: 'Location', href: '#location' },
];

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [istStatus, setIstStatus] = useState(() => getCafeIstStatus());
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIstStatus(getCafeIstStatus());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const handlePrimaryCta = () => {
    setMobileOpen(false);
    if (cartCount > 0) {
      onOpenCart();
      return;
    }
    const target = document.getElementById('booking');
    target?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || mobileOpen
          ? 'backdrop-blur-md bg-[#110E0C]/85 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.32)]'
          : 'bg-gradient-to-b from-[#110E0C]/80 via-[#110E0C]/40 to-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label="Raj Cafe Dhawa Home"
          className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3B]"
        >
          <BrandLockup compact tone="light" />
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#F7F2EA]/80 transition-colors hover:text-[#C99A3B] focus:outline-none focus-visible:text-[#C99A3B]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Status + Primary Action */}
        <div className="hidden md:flex items-center gap-3">
          <div
            title={istStatus.subLabel}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#1B1613]/80 px-3 py-1.5 text-xs font-medium text-[#F7F2EA]/90"
          >
            <span className="relative flex h-2 w-2">
              {istStatus.isOpen && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  istStatus.isOpen ? 'bg-emerald-400' : 'bg-[#D97736]'
                }`}
              />
            </span>
            <span>{istStatus.label}</span>
          </div>

          {cartCount > 0 && (
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open order bag with ${cartCount} items`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C99A3B]/45 bg-[#1B1613] px-3 py-2 text-xs font-semibold text-[#F7F2EA] transition-colors hover:border-[#C99A3B] hover:text-[#C99A3B] cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-[#C99A3B]" />
              <span className="tabular-nums">{cartCount}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePrimaryCta}
            className="inline-flex items-center justify-center rounded-full bg-[#C99A3B] px-5 py-2.5 text-xs font-semibold tracking-wide text-[#110E0C] transition-[background-color,transform] duration-200 hover:bg-[#d8ab4c] active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EA]"
          >
            Order / Book
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[#1B1613]/85 px-2.5 py-1 text-[11px] font-medium text-[#F7F2EA]">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                istStatus.isOpen ? 'bg-emerald-400' : 'bg-[#D97736]'
              }`}
            />
            <span>{istStatus.isOpen ? 'Open Now' : '10:30 AM'}</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#1B1613]/80 text-[#F7F2EA] transition-colors hover:border-[#C99A3B]/60"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-white/10 bg-[#110E0C]/95 backdrop-blur-lg px-4 pb-6 pt-4"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-[#F7F2EA]/90 transition-colors hover:bg-white/5 hover:text-[#C99A3B]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-xs text-[#F7F2EA]/70">
                <span>{istStatus.subLabel}</span>
                <span className="tabular-nums text-[#C99A3B]">{istStatus.istTimeFormatted} IST</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={CAFE_DATA.contact.primaryPhoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#1B1613] px-4 py-3 text-xs font-semibold text-[#F7F2EA]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C99A3B]" />
                  <span>Call Cafe</span>
                </a>
                <button
                  type="button"
                  onClick={handlePrimaryCta}
                  className="inline-flex items-center justify-center rounded-xl bg-[#C99A3B] px-4 py-3 text-xs font-semibold text-[#110E0C]"
                >
                  Order / Book
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
