import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VibeSection } from './components/VibeSection';
import { MenuSection } from './components/MenuSection';
import { WhatsAppOrderDrawer } from './components/WhatsAppOrderDrawer';
import { BookingSection } from './components/BookingSection';
import { ReviewQrSection } from './components/ReviewQrSection';
import { GalleryInstagramSection } from './components/GalleryInstagramSection';
import { LocationFooterSection } from './components/LocationFooterSection';

export function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAdd = useCallback((id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setCart((prev) => {
      const current = prev[id] ?? 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  }, []);

  const handleClear = useCallback(() => {
    setCart({});
    setIsCartOpen(false);
  }, []);

  const totalCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full overflow-x-hidden bg-[#110E0C] text-[#F7F2EA]">
        <Navbar cartCount={totalCount} onOpenCart={() => setIsCartOpen(true)} />

        <main>
          <HeroSection />
          <VibeSection />
          <MenuSection cart={cart} onAdd={handleAdd} onRemove={handleRemove} />
          <BookingSection />
          <ReviewQrSection />
          <GalleryInstagramSection />
          <LocationFooterSection />
        </main>

        <WhatsAppOrderDrawer
          cart={cart}
          isOpen={isCartOpen}
          onOpen={() => setIsCartOpen(true)}
          onClose={() => setIsCartOpen(false)}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      </div>
      <Analytics />
    </MotionConfig>
  );
}

export default App;
