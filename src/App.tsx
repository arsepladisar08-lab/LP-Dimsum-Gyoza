import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HighlightsBand } from './components/HighlightsBand';
import { MenuCatalog } from './components/MenuCatalog';
import { WhyGyozen } from './components/WhyGyozen';
import { Testimonials } from './components/Testimonials';
import { Steps } from './components/Steps';
import { FAQ } from './components/FAQ';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { Toast } from './components/Toast';
import { GYOZEN_PRODUCTS, INITIAL_CART } from './data/products';
import { CartItem, Product, MenuCategory } from './types';
import { calculateTotalCount, calculateTotal, formatRupiah } from './utils/order';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [category, setCategory] = useState<MenuCategory>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    setToastMessage(message);
    const timeout = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    setToastTimeout(timeout);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          imageUrl: product.imageUrl
        }
      ];
    });
    showToast(`<strong>${product.name}</strong> ditambahkan ke keranjang.`);
  };

  const handleAddBundle = (bundleName: string, bundlePrice: number) => {
    const bundleId = 'bundle-' + bundleName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === bundleId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [
        ...prev,
        {
          id: bundleId,
          name: bundleName,
          price: bundlePrice,
          qty: 1,
          imageUrl: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=800&q=80'
        }
      ];
    });
    setIsCartOpen(true);
    showToast(`Paket <strong>${bundleName}</strong> siap dipesan!`);
  };

  const handleUpdateQty = (index: number, delta: number) => {
    setCart((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      const newQty = next[index].qty + delta;
      if (newQty <= 0) {
        next.splice(index, 1);
        return next;
      }
      next[index] = { ...next[index], qty: newQty };
      return next;
    });
  };

  const totalCartCount = calculateTotalCount(cart);
  const totalAmount = calculateTotal(cart);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--ink)] antialiased">
      <Header cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <Hero onOpenCart={() => setIsCartOpen(true)} />
        <HighlightsBand />
        <MenuCatalog
          products={GYOZEN_PRODUCTS}
          currentCategory={category}
          onSelectCategory={setCategory}
          onAddToCart={handleAddToCart}
        />
        <WhyGyozen onAddBundle={handleAddBundle} />
        <Testimonials />
        <Steps />
        <FAQ />
        <ClosingCTA onOpenCart={() => setIsCartOpen(true)} />
      </main>

      <Footer />

      {/* Sticky Mobile Floating Order Bar (Shown only on small screens when cart has items) */}
      {cart.length > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-[var(--line)] shadow-lg flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-[var(--muted)] block">
              {totalCartCount} Menu Dipilih
            </span>
            <span className="text-base font-black text-[var(--red)] tabular-nums">
              {formatRupiah(totalAmount)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary btn-sm px-4 h-10 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Lihat Keranjang</span>
          </button>
        </div>
      )}

      <CartModal
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onShowToast={showToast}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
