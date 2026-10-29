import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HighlightsBand } from './components/HighlightsBand';
import { MenuCatalog } from './components/MenuCatalog';
import { WhyGyozen } from './components/WhyGyozen';
import { Steps } from './components/Steps';
import { FAQ } from './components/FAQ';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { Toast } from './components/Toast';
import { GYOZEN_PRODUCTS, INITIAL_CART } from './data/products';
import { CartItem, Product, MenuCategory } from './types';
import { calculateTotalCount } from './utils/order';

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
          qty: 1
        }
      ];
    });
    showToast(`<strong>${product.name}</strong> ditambahkan ke keranjang pesanan.`);
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
          qty: 1
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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)] text-[var(--ink)]">
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
        <Steps />
        <FAQ />
        <ClosingCTA onOpenCart={() => setIsCartOpen(true)} />
      </main>

      <Footer />

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
