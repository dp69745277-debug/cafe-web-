import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';
import { MENU_ITEMS } from '../data/menu';
import { buildOrderWhatsAppUrl, type OrderServiceMode } from '../utils/cafeStatus';
import { ClickSpark } from './motion/ClickSpark';

interface WhatsAppOrderDrawerProps {
  cart: Record<string, number>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const SERVICE_MODES: OrderServiceMode[] = ['Dine-In', 'Takeout', 'Delivery'];

export const WhatsAppOrderDrawer: React.FC<WhatsAppOrderDrawerProps> = ({
  cart,
  isOpen,
  onOpen,
  onClose,
  onAdd,
  onRemove,
  onClear,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [serviceMode, setServiceMode] = useState<OrderServiceMode>('Dine-In');
  const [guestName, setGuestName] = useState('');
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);

  const cartLines = useMemo(() => {
    return MENU_ITEMS.filter((item) => (cart[item.id] ?? 0) > 0).map((item) => ({
      ...item,
      quantity: cart[item.id]!,
    }));
  }, [cart]);

  const totalCount = useMemo(
    () => cartLines.reduce((sum, item) => sum + item.quantity, 0),
    [cartLines],
  );

  const totalPrice = useMemo(
    () => cartLines.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartLines],
  );

  const whatsappUrl = useMemo(
    () =>
      buildOrderWhatsAppUrl({
        whatsappNumberDigits: CAFE_DATA.contact.whatsappDigits,
        items: cartLines.map((l) => ({
          name: l.name,
          price: l.price,
          quantity: l.quantity,
        })),
        total: totalPrice,
        serviceMode,
        guestName,
        note,
      }),
    [cartLines, totalPrice, serviceMode, guestName, note],
  );

  const handleCopySummary = async () => {
    const summary = [
      `Raj Cafe Dhawa Order (${serviceMode})`,
      guestName.trim() ? `Name: ${guestName.trim()}` : null,
      ...cartLines.map((l) => `- ${l.name} x ${l.quantity} = ₹${l.price * l.quantity}`),
      `Total: ₹${totalPrice}`,
      note.trim() ? `Note: ${note.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <>
      {/* Floating WhatsApp Order Bar */}
      <AnimatePresence>
        {totalCount > 0 && !isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 inset-x-0 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-xl px-1"
          >
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#C99A3B]/45 bg-[#110E0C]/95 p-3 pl-4 text-[#F7F2EA] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C99A3B]/18 text-[#C99A3B]">
                  <ShoppingBag className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-xs text-[#F7F2EA]/70">
                    <span className="tabular-nums font-semibold text-[#F7F2EA]">
                      {totalCount} {totalCount === 1 ? 'item' : 'items'}
                    </span>{' '}
                    in order bag
                  </div>
                  <div className="tabular-nums text-base font-bold text-[#C99A3B]">
                    Total ₹{totalPrice}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpen}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C99A3B] px-4 py-2.5 text-xs font-semibold text-[#110E0C] transition-colors hover:bg-[#d8ab4c] cursor-pointer sm:px-5 sm:text-sm"
              >
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* Drawer Sheet */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Your Raj Cafe Dhawa Order Bag"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 24, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 24, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[90svh] w-full flex-col rounded-t-3xl border border-white/10 bg-[#1B1613] text-[#F7F2EA] shadow-2xl sm:h-full sm:max-h-full sm:max-w-md sm:rounded-none sm:rounded-l-3xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C99A3B]">
                    WhatsApp Order Bag
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold text-[#F7F2EA]">
                    Your Table / Takeout Order
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close order bag"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#F7F2EA]/80 transition-colors hover:border-[#C99A3B] hover:text-[#C99A3B] cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {cartLines.length === 0 ? (
                  <div className="py-16 text-center">
                    <ShoppingBag className="mx-auto h-10 w-10 text-[#C99A3B]/50" />
                    <p className="mt-3 text-sm text-[#F7F2EA]/75">
                      Your order bag is empty. Add your favorite dishes from the menu.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#F7F2EA]/65">
                          Selected Dishes ({totalCount})
                        </span>
                        <button
                          type="button"
                          onClick={onClear}
                          className="inline-flex items-center gap-1 text-xs text-[#F7F2EA]/55 hover:text-[#D97736] cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Clear all</span>
                        </button>
                      </div>

                      <div className="divide-y divide-white/8 rounded-2xl border border-white/10 bg-[#110E0C]/65">
                        {cartLines.map((line) => (
                          <div
                            key={line.id}
                            className="flex items-center justify-between gap-3 px-4 py-3"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-medium text-[#F7F2EA]">
                                {line.name}
                              </div>
                              <div className="tabular-nums text-xs text-[#F7F2EA]/60">
                                ₹{line.price} each · ₹{line.price * line.quantity}
                              </div>
                            </div>

                            <div className="inline-flex items-center rounded-full border border-white/12 bg-[#1B1613] p-0.5">
                              <button
                                type="button"
                                onClick={() => onRemove(line.id)}
                                aria-label={`Decrease quantity of ${line.name}`}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="tabular-nums min-w-[22px] text-center text-xs font-semibold text-[#C99A3B]">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onAdd(line.id)}
                                aria-label={`Increase quantity of ${line.name}`}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Service Mode Selector */}
                    <div>
                      <label className="block text-xs font-medium text-[#F7F2EA]/75 mb-2">
                        Order Type
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {SERVICE_MODES.map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setServiceMode(mode)}
                            className={`rounded-xl border py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                              serviceMode === mode
                                ? 'border-[#C99A3B] bg-[#C99A3B]/18 text-[#C99A3B]'
                                : 'border-white/12 bg-[#110E0C]/50 text-[#F7F2EA]/75 hover:border-white/25'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Guest Details */}
                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="order-guest-name"
                          className="block text-xs font-medium text-[#F7F2EA]/75 mb-1.5"
                        >
                          Your Name
                        </label>
                        <input
                          id="order-guest-name"
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Aarav / Cabin 2"
                          className="w-full rounded-xl border border-white/12 bg-[#110E0C] px-3.5 py-2.5 text-sm text-[#F7F2EA] placeholder:text-[#F7F2EA]/35 focus:border-[#C99A3B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="order-guest-note"
                          className="block text-xs font-medium text-[#F7F2EA]/75 mb-1.5"
                        >
                          Special Note / Delivery Address (Optional)
                        </label>
                        <textarea
                          id="order-guest-note"
                          rows={2}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Less spicy, extra cheese, or Sinli Road delivery landmark..."
                          className="w-full resize-none rounded-xl border border-white/12 bg-[#110E0C] px-3.5 py-2.5 text-sm text-[#F7F2EA] placeholder:text-[#F7F2EA]/35 focus:border-[#C99A3B] focus:outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              {cartLines.length > 0 && (
                <div className="border-t border-white/10 bg-[#110E0C]/90 px-6 py-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#F7F2EA]/75">Estimated Total</span>
                    <span className="tabular-nums text-xl font-bold text-[#C99A3B]">
                      ₹{totalPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      title="Copy itemized order text"
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#1B1613] text-[#F7F2EA]/80 transition-colors hover:border-[#C99A3B] hover:text-[#C99A3B] cursor-pointer"
                    >
                      {copied ? <Check className="h-4.5 w-4.5 text-emerald-400" /> : <Copy className="h-4.5 w-4.5" />}
                    </button>

                    <ClickSpark className="flex-1" sparkColor="#F7F2EA">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C99A3B] px-5 text-sm font-semibold text-[#110E0C] transition-colors hover:bg-[#d8ab4c]"
                      >
                        <MessageCircle className="h-4.5 w-4.5" />
                        <span>Send Order on WhatsApp</span>
                      </a>
                    </ClickSpark>
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
