import React, { useState } from 'react';
import { Product, MenuCategory } from '../types';
import { formatRupiah, isActivePromo } from '../utils/order';
import { Star, Plus, Eye, ArrowUpRight, Check } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface MenuCatalogProps {
  products: Product[];
  currentCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
  onAddToCart: (product: Product) => void;
  onPreviewProduct: (product: Product) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({ products, currentCategory, onSelectCategory, onAddToCart, onPreviewProduct }) => {
  const [addedId, setAddedId] = useState<string | null>(null);
  const filtered = currentCategory === 'all' ? products : products.filter((product) => product.category === currentCategory);

  const handleAdd = (item: Product) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => {
      setAddedId((curr) => (curr === item.id ? null : curr));
    }, 700);
  };

  return (
    <section className="section menu-section" id="menu" aria-labelledby="menu-title">
      <div className="container-custom">
        <div className="section-heading menu-heading items-end">
          <div>
            <h2 id="menu-title" className="stagger-heading stagger-h2 mb-0">
              <span className="stagger-item" style={{ animationDelay: '140ms' }}>Temukan mood,</span>
              <span className="stagger-item stagger-item-em" style={{ animationDelay: '280ms' }}>
                <em>pilih dimsum-nya.</em>
              </span>
            </h2>
          </div>
          <div className="menu-filter-wrap" role="tablist" aria-label="Filter kategori menu">
            {([
              ['all', 'Semua'],
              ['hangat', 'Siap santap'],
              ['frozen', 'Ready frozen'],
              ['pelengkap', 'Pelengkap']
            ] as [MenuCategory, string][]).map(([value, label]) => (
              <button key={value} type="button" role="tab" aria-selected={currentCategory === value} className={`filter-pill ${currentCategory === value ? 'active' : ''}`} onClick={() => onSelectCategory(value)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {filtered.map((item, index) => {
            const isAdded = addedId === item.id;
            return (
              <article key={item.id} className={`product-card product-card-${index % 3}`}>
                <button type="button" className="product-image-button group" onClick={() => onPreviewProduct(item)} aria-label={`Lihat detail ${item.name}`}>
                  <div className="food-img-container" style={{ backgroundColor: item.bg || '#fffdf8' }}>
                    <ProductImage src={item.imageUrl} alt={item.name} bgColor={item.bg || '#fffdf8'} width={480} height={300}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    {item.tag ? (
                      <span className={`product-tag ${item.tagStyle === 'frozen' ? 'tag-frozen' : item.tagStyle === 'spicy' ? 'tag-spicy' : ''}`}>
                        {item.tag}
                      </span>
                    ) : null}
                    <span className="product-view"><Eye size={15}/> Detail produk</span>
                  </div>
                </button>
                <div className="product-card-body">
                  <div className="product-meta"><span>{item.index}</span>{item.rating && item.ratingSource ? <span className="product-rating"><Star size={13} fill="currentColor"/> {item.rating.toFixed(1)}</span> : null}</div>
                  <h3>{item.name}</h3>
                  {item.portion && <p className="product-portion">{item.portion}</p>}
                  <div className="product-card-footer">
                    <div className="product-price">
                      {isActivePromo(item) ? <del>{formatRupiah(item.oldPrice as number)}</del> : null}
                      <strong>{formatRupiah(item.price)}</strong>
                    </div>
                    <button
                      className={`btn btn-sm product-add transition-all duration-200 ${
                        isAdded
                          ? 'bg-emerald-700 text-white border-emerald-800 scale-105 shadow-md'
                          : 'btn-primary active:scale-95'
                      }`}
                      type="button"
                      onClick={() => handleAdd(item)}
                      aria-label={`Tambah ${item.name} ke keranjang`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={15} /> Masuk!
                        </>
                      ) : (
                        <>
                          <Plus size={15} /> Pesan
                        </>
                      )}
                    </button>
                  </div>
                  <button className="product-detail-link group" type="button" onClick={() => onPreviewProduct(item)}>
                    <span>Lihat informasi produk</span>
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="menu-note">Harga dan ketersediaan dapat dikonfirmasi kembali melalui WhatsApp sebelum pesanan diproses.</p>
      </div>
    </section>
  );
};
