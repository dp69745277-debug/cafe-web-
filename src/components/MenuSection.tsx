import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus, Sparkles } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, type MenuCategory, type MenuItem } from '../data/menu';
import { AnimatedContent } from './motion/AnimatedContent';
import { SpotlightCard } from './motion/SpotlightCard';
import { EditorialImage } from './EditorialImage';

interface MenuSectionProps {
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

const VegMark: React.FC = () => (
  <span
    aria-label="Vegetarian"
    title="100% Vegetarian"
    className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-[#1E7E45] bg-white/80"
  >
    <span className="h-2 w-2 rounded-full bg-[#1E7E45]" />
  </span>
);

export const MenuSection: React.FC<MenuSectionProps> = ({ cart, onAdd, onRemove }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const prefersReducedMotion = useReducedMotion();

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const renderMenuCard = (item: MenuItem) => {
    const qty = cart[item.id] ?? 0;

    const cardBody = (
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#1C1612]/10 bg-[#FAF6F0] transition-[border-color,box-shadow] duration-200 hover:border-[#C99A3B]/45 hover:shadow-[0_14px_34px_rgba(28,22,18,0.08)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <EditorialImage
            src={item.image}
            alt={`${item.name} at Raj Cafe Dhawa`}
            className="h-full w-full"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
            overlayClassName="bg-gradient-to-t from-[#110E0C]/75 via-[#110E0C]/10 to-transparent"
          />
          {item.badge && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#C99A3B]/50 bg-[#110E0C]/88 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#C99A3B] backdrop-blur-sm">
              <Sparkles className="h-2.5 w-2.5" />
              <span>{item.badge}</span>
            </span>
          )}
          <span className="absolute bottom-3 left-3 rounded-full bg-[#110E0C]/75 px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase text-[#F7F2EA]/85 backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <VegMark />
                <h3 className="font-sans text-base font-semibold leading-snug text-[#1C1612]">
                  {item.name}
                </h3>
              </div>
              <span className="tabular-nums shrink-0 text-base font-bold text-[#1C1612]">
                ₹{item.price}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#57493E] sm:text-[13px]">
              {item.description}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#1C1612]/8 pt-3.5">
            <span className="text-[11px] font-medium text-[#7A685A]">
              Prepared fresh to order
            </span>

            {qty === 0 ? (
              <button
                type="button"
                onClick={() => onAdd(item.id)}
                className="inline-flex items-center gap-1 rounded-full border border-[#1C1612]/15 bg-[#EFE7DA] px-4 py-1.5 text-xs font-semibold text-[#1C1612] transition-colors hover:border-[#1C1612] hover:bg-[#1C1612] hover:text-[#F7F2EA] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3B]"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            ) : (
              <div className="inline-flex items-center rounded-full bg-[#110E0C] p-0.5 text-[#F7F2EA] shadow-sm">
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove one ${item.name}`}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/15 cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="tabular-nums min-w-[24px] text-center text-xs font-semibold text-[#C99A3B]">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => onAdd(item.id)}
                  aria-label={`Add one more ${item.name}`}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/15 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    );

    if (item.signature) {
      return (
        <SpotlightCard
          key={item.id}
          spotlightColor="rgba(201, 154, 59, 0.20)"
          className="group h-full rounded-2xl"
        >
          {cardBody}
        </SpotlightCard>
      );
    }

    return (
      <div key={item.id} className="group h-full">
        {cardBody}
      </div>
    );
  };

  return (
    <section
      id="menu"
      className="border-t border-[#1C1612]/8 bg-[#EFE7DA] py-20 sm:py-28 text-[#1C1612]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A6F1E]">
                Freshly Prepared · 100% Vegetarian
              </span>
              <h2 className="font-editorial mt-2 text-3xl font-semibold leading-[1.1] tracking-[-0.015em] text-[#1C1612] sm:text-5xl">
                The Kitchen &amp; Coffee Bar
              </h2>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-1.5">
              <span className="tabular-nums text-sm font-semibold text-[#1C1612]">
                Pocket-Friendly ₹30 – ₹180
              </span>
              <p className="text-xs text-[#57493E]">
                Add dishes to your bag below to send a pre-filled WhatsApp order in one tap.
              </p>
            </div>
          </div>
        </AnimatedContent>

        {/* Sleek Pill Category Tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="mt-9 flex flex-wrap items-center gap-2 pb-2"
        >
          {MENU_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3B] ${
                  active
                    ? 'text-[#F7F2EA]'
                    : 'border border-[#1C1612]/12 bg-[#F8F3EB] text-[#4B3E34] hover:border-[#1C1612]/30 hover:text-[#1C1612]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={prefersReducedMotion ? undefined : 'activeMenuTab'}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-[#110E0C]"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => renderMenuCard(item))}
        </div>
      </div>
    </section>
  );
};
