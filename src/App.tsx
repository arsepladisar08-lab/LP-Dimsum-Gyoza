import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HighlightsBand } from './components/HighlightsBand';
import { MenuCatalog } from './components/MenuCatalog';
import { WhyGyozen } from './components/WhyGyozen';
import { Testimonials } from './components/Testimonials';
import { DemoTrustPreview } from './components/DemoTrustPreview';
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
import { GYOZEN_BUNDLES } from './data/bundles';
import { DEMO_TRUST_CONTENT_ENABLED } from './data/demoContent';
import { CartItem, Product, MenuCategory } from './types';
import { calculateTotalCount, calculateTotal, reconcileCartItems, CartCatalogEntry } from './utils/order';

const CART_STORAGE_KEY = 'gyozen_cart_v1';

const createBundleCartId = (name: string) => 'bundle-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-');

const BUNDLE_CART_CATALOG: CartCatalogEntry[] = Object.values(GYOZEN_BUNDLES).map((bundle) => ({
  id: createBundleCartId(bundle.name),
  name: bundle.name,
  price: bundle.price,
  imageUrl: bundle.imageUrl
}));

const CART_CATALOG: CartCatalogEntry[] = [...GYOZEN_PRODUCTS, ...BUNDLE_CART_CATALOG];

export default function App() {
  // Keranjang awal kosong secara default, dimuat dari localStorage bila ada data valid
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return reconcileCartItems(parsed, CART_CATALOG);
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
    const canonical = CART_CATALOG.find((item) => item.id === product.id);
    if (!canonical) return;
    const safeQuantity = Number.isFinite(quantity) ? Math.min(99, Math.max(1, Math.floor(quantity))) : 1;
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + safeQuantity) };
        return next;
      }
      return [
        ...prev,
        {
          id: canonical.id,
          name: canonical.name,
          price: canonical.price,
          qty: safeQuantity,
          imageUrl: canonical.imageUrl
        }
      ];
    });
    showToast(`<strong>${canonical.name}</strong> (${safeQuantity}x) ditambahkan ke keranjang.`);
  };

  const handleAddBundle = (bundleName: string, _bundlePrice: number, _imageUrl?: string) => {
    const canonical = BUNDLE_CART_CATALOG.find((bundle) => bundle.name === bundleName);
    if (!canonical) return;
    const bundleId = canonical.id;
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === bundleId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + 1) };
        return next;
      }
      return [
        ...prev,
        {
          id: bundleId,
          name: canonical.name,
          price: canonical.price,
          qty: 1,
          imageUrl: canonical.imageUrl
        }
      ];
    });
    setIsCartOpen(true);
    showToast(`Paket <strong>${canonical.name}</strong> siap dipesan!`);
  };

  // Mengubah kuantitas item berdasarkan ID produk (bukan index array)
  const handleUpdateQty = (productId: string, delta: number) => {
    if (!Number.isInteger(delta) || Math.abs(delta) > 99) return;
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === productId);
      if (idx === -1) return prev;
      const next = [...prev];
      const newQty = next[idx].qty + delta;
      if (newQty <= 0) {
        next.splice(idx, 1);
        return next;
      }
      next[idx] = { ...next[idx], qty: Math.min(99, newQty) };
      return next;
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderAction = () => {
    if (cart.length > 0) {
      setIsCartOpen(true);
      return;
    }
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('Pilih menu favoritmu terlebih dahulu. Keranjang akan siap setelah ada produk ditambahkan.');
  };

  const totalCartCount = calculateTotalCount(cart);
  const totalAmount = calculateTotal(cart);

  return (
    <div className="min-h-[100svh] flex flex-col bg-[var(--background)] text-[var(--ink)] antialiased">
      <ScrollEffects />
      <Header cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className={cart.length > 0 ? 'pb-20 md:pb-0' : ''}>
        <Hero onPrimaryOrder={handleOrderAction} cartCount={totalCartCount} onPreviewProduct={setSelectedProduct} />
        <HighlightsBand />
        <MenuCatalog
          products={GYOZEN_PRODUCTS}
          currentCategory={category}
          onSelectCategory={setCategory}
          onAddToCart={handleAddToCart}
          onPreviewProduct={setSelectedProduct}
        />
        <WhyGyozen onAddBundle={handleAddBundle} />
        <DemoTrustPreview enabled={DEMO_TRUST_CONTENT_ENABLED} />
        <Testimonials />
        <Steps />
        <FAQ />
        <ClosingCTA onPrimaryOrder={handleOrderAction} cartCount={totalCartCount} />
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
