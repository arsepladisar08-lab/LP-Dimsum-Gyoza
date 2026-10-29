import React from 'react';
import { Product, MenuCategory } from '../types';
import { FoodIllustration } from './FoodIllustration';
import { formatRupiah, buildWhatsAppInquiryUrl } from '../utils/order';
import { WHATSAPP_NUMBER } from '../data/products';

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
  const filtered =
    currentCategory === 'all'
      ? products
      : products.filter((p) => p.category === currentCategory);

  return (
    <section className="section features" id="menu" aria-labelledby="menu-title">
      <div className="container-custom">
        <div className="section-header-split">
          <div className="section-header-copy">
            <div className="section-kicker">Katalog menu resmi Gyozen</div>
            <h2 id="menu-title">
              Mood kamu hari ini, <span style={{ color: 'var(--red)' }}>dimsum-nya Gyozen.</span>
            </h2>
            <p>
              Pilih menu siap santap hangat atau stok <strong>Ready Frozen</strong> favoritmu. Klik{' '}
              <strong>+ Keranjang</strong> untuk menggabungkan pesanan atau <strong>Tanya</strong> untuk chat langsung.
            </p>
          </div>

          <div className="filter-tabs" role="tablist" aria-label="Filter Kategori Menu">
            <button
              className={`filter-tab ${currentCategory === 'all' ? 'active' : ''}`}
              type="button"
              onClick={() => onSelectCategory('all')}
              role="tab"
              aria-selected={currentCategory === 'all'}
            >
              Semua menu (10)
            </button>
            <button
              className={`filter-tab ${currentCategory === 'hangat' ? 'active' : ''}`}
              type="button"
              onClick={() => onSelectCategory('hangat')}
              role="tab"
              aria-selected={currentCategory === 'hangat'}
            >
              Siap santap & Platter (6)
            </button>
            <button
              className={`filter-tab ${currentCategory === 'frozen' ? 'active' : ''}`}
              type="button"
              onClick={() => onSelectCategory('frozen')}
              role="tab"
              aria-selected={currentCategory === 'frozen'}
            >
              Ready Frozen & Chili Oil (4)
            </button>
          </div>
        </div>

        {/* Menu Cards Container */}
        <div className="menu-grid">
          {filtered.map((item) => (
            <article key={item.id} className="feature-card">
              <div>
                <div className="food-art" style={{ backgroundColor: item.bg }}>
                  <span className={`food-tag-pill ${item.tagStyle || ''}`}>{item.tag}</span>
                  <div className="food-svg-wrap">
                    <FoodIllustration art={item.art} />
                  </div>
                </div>
                <div className="card-meta-row">
                  <span className="card-index">{item.index}</span>
                  <span className="card-Caption">{item.info}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>

              <div className="card-footer-row">
                <div className="price-group">
                  <span className="price-strike">{formatRupiah(item.oldPrice)}</span>
                  <span className="price-current">{formatRupiah(item.price)}</span>
                </div>
                <div className="card-actions">
                  <a
                    className="btn btn-paper btn-sm"
                    href={buildWhatsAppInquiryUrl(
                      WHATSAPP_NUMBER,
                      `${item.name} (${formatRupiah(item.price)})`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Tanya langsung ${item.name} via WhatsApp`}
                  >
                    Tanya
                  </a>
                  <button
                    className="btn btn-sm"
                    type="button"
                    onClick={() => onAddToCart(item)}
                    aria-label={`Tambah ${item.name} ke keranjang`}
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
