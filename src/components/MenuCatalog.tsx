import React from 'react';
import { Product, MenuCategory } from '../types';
import { formatRupiah } from '../utils/order';
import { Star, Plus, Eye, Sparkles } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface MenuCatalogProps {
  products: Product[];
  currentCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
  onAddToCart: (product: Product) => void;
  onPreviewProduct: (product: Product) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  products,
  currentCategory,
  onSelectCategory,
  onAddToCart,
  onPreviewProduct
}) => {
  const filtered =
    currentCategory === 'all'
      ? products
      : products.filter((p) => p.category === currentCategory);

  return (
    <section className="section" id="menu" aria-labelledby="menu-title">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--red)] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Katalog Menu Dimsum Gyozen</span>
            </div>
            <h2 id="menu-title" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)]">
              Mood kamu hari ini, <span className="text-[var(--red)]">dimsum-nya Gyozen.</span>
            </h2>
            <p className="mt-2 text-[var(--muted)] text-sm sm:text-base leading-relaxed">
              Klik pada kartu menu untuk melihat foto resolusi penuh, rincian bahan, serta saran penyajian.
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

        {/* Minimalist Menu Cards Grid */}
        <div className="menu-grid">
          {filtered.map((item) => {
            return (
              <article
                key={item.id}
                className="product-card group cursor-pointer hover:border-amber-900/30 transition-all"
                onClick={() => onPreviewProduct(item)}
              >
                <div>
                  {/* Clean Food Image Container */}
                  <div className="food-img-container relative" style={{ backgroundColor: item.bg }}>
                    <ProductImage
                      src={item.imageUrl}
                      alt={item.name}
                      bgColor={item.bg}
                      width={480}
                      height={300}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                      <span
                        className={`badge ${
                          item.tagStyle === 'spicy'
                            ? 'badge-primary'
                            : item.tagStyle === 'frozen'
                            ? 'badge-frozen'
                            : 'badge-accent'
                        } shadow-xs text-[11px]`}
                      >
                        {item.tag}
                      </span>
                    </div>

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[var(--ink)] text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-[var(--red)]" />
                        <span>Lihat Detail</span>
                      </span>
                    </div>
                  </div>

                  {/* Minimalist Card Body */}
                  <div className="p-4 sm:p-5 pb-2">
                    <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-1">
                      <span className="font-mono text-amber-800/90 font-bold uppercase tracking-wider text-[10.5px]">
                        {item.index}
                      </span>
                      {item.rating && (
                        <div className="inline-flex items-center gap-1 text-amber-600 font-bold text-xs">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{item.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] tracking-tight group-hover:text-[var(--red)] transition-colors line-clamp-1">
                      {item.name}
                    </h3>

                    {item.portion && (
                      <p className="text-xs text-[var(--muted)] mt-1 font-medium truncate">
                        {item.portion}
                      </p>
                    )}
                  </div>
                </div>

                {/* Minimalist Card Footer */}
                <div className="p-4 sm:p-5 pt-2 mt-auto">
                  <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-[var(--muted)] line-through block leading-none">
                        {formatRupiah(item.oldPrice)}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-[var(--red)] tracking-tight tabular-nums">
                        {formatRupiah(item.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPreviewProduct(item);
                        }}
                        className="btn btn-secondary btn-sm p-2 w-9 h-9"
                        title="Lihat detail menu"
                        aria-label={`Lihat detail ${item.name}`}
                      >
                        <Eye className="w-4 h-4 text-[var(--muted)]" />
                      </button>

                      <button
                        className="btn btn-primary btn-sm px-3.5"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(item);
                        }}
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
