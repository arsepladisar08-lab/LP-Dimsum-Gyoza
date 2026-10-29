import React, { useState } from 'react';
import { Product, MenuCategory } from '../types';
import { FoodIllustration } from './FoodIllustration';
import { formatRupiah, buildWhatsAppInquiryUrl } from '../utils/order';
import { WHATSAPP_NUMBER } from '../data/products';
import { Star, MessageCircle, Plus, Sparkles, Image as ImageIcon } from 'lucide-react';

interface MenuCatalogProps {
  products: Product[];
  currentCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
  onAddToCart: (product: Product) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  products,
  currentCategory,
  onSelectCategory,
  onAddToCart
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filtered =
    currentCategory === 'all'
      ? products
      : products.filter((p) => p.category === currentCategory);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="section" id="menu" aria-labelledby="menu-title">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--red)] mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
              Katalog Menu Resmi Dimsum Gyozen
            </div>
            <h2 id="menu-title" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)]">
              Mood kamu hari ini, <span className="text-[var(--red)]">dimsum-nya Gyozen.</span>
            </h2>
            <p className="mt-2 text-[var(--muted)] text-sm sm:text-base leading-relaxed">
              Pilihan menu siap santap hangat kukus, mentai torch, renyah goreng keju, dan kemasan beku{' '}
              <strong>Ready Frozen (tahan 3 bulan)</strong>. Semua foto menu siap diganti dengan foto asli Anda.
            </p>
          </div>

          {/* Shadcn pill segmented tabs */}
          <div className="shadcn-tabs self-start md:self-auto" role="tablist" aria-label="Filter Kategori Menu">
            <button
              className={`shadcn-tab-btn ${currentCategory === 'all' ? 'active' : ''}`}
              type="button"
              onClick={() => onSelectCategory('all')}
              role="tab"
              aria-selected={currentCategory === 'all'}
            >
              <span>Semua</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-black/5 font-extrabold">10</span>
            </button>
            <button
              className={`shadcn-tab-btn ${currentCategory === 'hangat' ? 'active' : ''}`}
              type="button"
              onClick={() => onSelectCategory('hangat')}
              role="tab"
              aria-selected={currentCategory === 'hangat'}
            >
              <span>Siap Santap & Platter</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-black/5 font-extrabold">6</span>
            </button>
            <button
              className={`shadcn-tab-btn ${currentCategory === 'frozen' ? 'active' : ''}`}
              type="button"
              onClick={() => onSelectCategory('frozen')}
              role="tab"
              aria-selected={currentCategory === 'frozen'}
            >
              <span>Ready Frozen & Chili Oil</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-black/5 font-extrabold">4</span>
            </button>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="menu-grid">
          {filtered.map((item) => {
            const hasError = imageErrors[item.id];

            return (
              <article key={item.id} className="product-card group">
                <div>
                  {/* Food Image Container with Dummy Photography & Fallback */}
                  <div className="food-img-container">
                    {!hasError && item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={`Foto menu ${item.name}`}
                        loading="lazy"
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 bg-amber-50">
                        <div className="w-24 h-20 opacity-90 drop-shadow-sm">
                          <FoodIllustration art={item.art} />
                        </div>
                      </div>
                    )}

                    {/* Badge Tag */}
                    <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                      <span
                        className={`badge ${
                          item.tagStyle === 'spicy'
                            ? 'badge-primary'
                            : item.tagStyle === 'frozen'
                            ? 'badge-frozen'
                            : 'badge-accent'
                        } shadow-sm`}
                      >
                        {item.tag}
                      </span>
                    </div>

                    {/* Dummy image replace indicator for developers/owners */}
                    <span
                      className="replace-pill-badge flex items-center gap-1"
                      title="Slot foto dummy siap direplace di data/products.ts"
                    >
                      <ImageIcon className="w-3 h-3 text-amber-300" />
                      <span>Dummy Photo</span>
                    </span>
                  </div>

                  {/* Card Content (shadcn Card style) */}
                  <div className="p-4 sm:p-5">
                    {/* Meta info & Rating */}
                    <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-1.5 font-medium">
                      <span className="font-mono text-amber-800 font-bold uppercase tracking-wider text-[11px]">
                        {item.index}
                      </span>
                      {item.rating && (
                        <div className="inline-flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{item.rating.toFixed(1)}</span>
                          <span className="text-[var(--muted)] text-[11px] font-normal">({item.soldCount})</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[var(--ink)] tracking-tight group-hover:text-[var(--red)] transition-colors">
                      {item.name}
                    </h3>

                    {item.portion && (
                      <p className="text-xs font-semibold text-amber-900/80 mt-0.5">
                        📦 {item.portion}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-[var(--muted)] mt-2 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer with Price and Actions */}
                <div className="p-4 sm:p-5 pt-0 mt-auto">
                  <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-[var(--muted)] line-through block leading-none">
                        {formatRupiah(item.oldPrice)}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[var(--red)] tracking-tight tabular-nums">
                        {formatRupiah(item.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        className="btn btn-secondary btn-sm p-2 w-9 h-9"
                        href={buildWhatsAppInquiryUrl(
                          WHATSAPP_NUMBER,
                          `${item.name} (${formatRupiah(item.price)})`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Tanya ${item.name} via WhatsApp`}
                        aria-label={`Tanya ${item.name} via WhatsApp`}
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                      </a>

                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => onAddToCart(item)}
                        aria-label={`Tambah ${item.name} ke keranjang`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Pesan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
