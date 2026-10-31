import React, { useState, useEffect } from 'react';
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
import { ProductDetailModal } from './components/ProductDetailModal';
import { Toast } from './components/Toast';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ScrollEffects } from './components/ScrollEffects';
import { GYOZEN_PRODUCTS } from './data/products';
import { CartItem, Product, MenuCategory } from './types';
import { calculateTotalCount, calculateTotal } from './utils/order';

const CART_STORAGE_KEY = 'gyozen_cart_v1';

/**
 * Validasi runtime agar data keranjang dari localStorage aman dan tidak menyebabkan crash
 */
function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Partial<CartItem>;
  return (
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    typeof candidate.name === 'string' &&
    typeof candidate.price === 'number' &&
    !isNaN(candidate.price) &&
    typeof candidate.qty === 'number' &&
    !isNaN(candidate.qty) &&
    candidate.qty > 0
  );
}

export default function App() {
  // Keranjang awal kosong secara default, dimuat dari localStorage bila ada data valid
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const validated = parsed.filter(isValidCartItem);
            return validated;
          }
        }
      }
    } catch {
      // jika data rusak, abaikan dan mulai dengan array kosong
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<MenuCategory>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);

  // Simpan keranjang ke localStorage setiap ada perubahan
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      }
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (message: string) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    setToastMessage(message);
    const timeout = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    setToastTimeout(timeout);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + quantity };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: quantity,
          imageUrl: product.imageUrl
        }
      ];
    });
    showToast(`<strong>${product.name}</strong> (${quantity}x) ditambahkan ke keranjang.`);
  };

  const handleAddBundle = (bundleName: string, bundlePrice: number, imageUrl?: string) => {
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
          imageUrl: imageUrl || '/images/menu/dimsum-platter-960.webp'
        }
      ];
    });
    setIsCartOpen(true);
    showToast(`Paket <strong>${bundleName}</strong> siap dipesan!`);
  };

  // Mengubah kuantitas item berdasarkan ID produk (bukan index array)
  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === productId);
      if (idx === -1) return prev;
      const next = [...prev];
      const newQty = next[idx].qty + delta;
      if (newQty <= 0) {
        next.splice(idx, 1);
        return next;
      }
      next[idx] = { ...next[idx], qty: newQty };
      return next;
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = calculateTotalCount(cart);
  const totalAmount = calculateTotal(cart);

  return (
    <div className="min-h-[100svh] flex flex-col bg-[var(--background)] text-[var(--ink)] antialiased">
      <ScrollEffects />
      <Header cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className={cart.length > 0 ? 'pb-20 md:pb-0' : ''}>
        <Hero onOpenCart={() => setIsCartOpen(true)} onPreviewProduct={setSelectedProduct} />
        <HighlightsBand />
        <MenuCatalog
          products={GYOZEN_PRODUCTS}
          currentCategory={category}
          onSelectCategory={setCategory}
          onAddToCart={handleAddToCart}
          onPreviewProduct={setSelectedProduct}
        />
        <WhyGyozen onAddBundle={handleAddBundle} />
        <Testimonials />
        <Steps />
        <FAQ />
        <ClosingCTA onOpenCart={() => setIsCartOpen(true)} />
      </main>

      <Footer />

      <MobileBottomBar
        cartCount={totalCartCount}
        totalPrice={totalAmount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Menu Detail Preview Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order & Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
