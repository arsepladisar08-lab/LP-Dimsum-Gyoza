import React from 'react';
import { Product, MenuCategory } from '../types';
import { formatRupiah } from '../utils/order';
import { Star, Plus, Eye, Sparkles, ArrowUpRight } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface MenuCatalogProps {
  products: Product[];
  currentCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
  onAddToCart: (product: Product) => void;
  onPreviewProduct: (product: Product) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({ products, currentCategory, onSelectCategory, onAddToCart, onPreviewProduct }) => {
  const filtered = currentCategory === 'all' ? products : products.filter((product) => product.category === currentCategory);

  return (
    <section className="section menu-section" id="menu" aria-labelledby="menu-title">
      <div className="container-custom">
        <div className="section-heading menu-heading">
          <div>
            <p className="section-kicker"><Sparkles size={14}/> THE MENU</p>
            <h2 id="menu-title">Temukan mood,<br/><em>pilih dimsum-nya.</em></h2>
            <p className="section-intro">Dari satu porsi untuk diri sendiri sampai paket berbagi. Pilih menu favoritmu dan lihat detailnya.</p>
          </div>
          <div className="menu-filter-wrap" role="tablist" aria-label="Filter kategori menu">
            {([
              ['all', 'Semua'],
              ['hangat', 'Siap santap'],
              ['frozen', 'Ready frozen']
            ] as [MenuCategory, string][]).map(([value, label]) => (
              <button key={value} type="button" role="tab" aria-selected={currentCategory === value} className={`filter-pill ${currentCategory === value ? 'active' : ''}`} onClick={() => onSelectCategory(value)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {filtered.map((item, index) => (
            <article key={item.id} className={`product-card product-card-${index % 3}`}>
              <button type="button" className="product-image-button" onClick={() => onPreviewProduct(item)} aria-label={`Lihat detail ${item.name}`}>
                <div className="food-img-container" style={{ backgroundColor: item.bg }}>
                  <ProductImage src={item.imageUrl} alt={item.name} bgColor={item.bg} width={480} height={300}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy"
                    className="w-full h-full object-cover"/>
                  <span className={`product-tag ${item.tagStyle === 'frozen' ? 'tag-frozen' : item.tagStyle === 'spicy' ? 'tag-spicy' : ''}`}>{item.tag}</span>
                  <span className="product-view"><Eye size={15}/> Detail produk</span>
                </div>
              </button>
              <div className="product-card-body">
                <div className="product-meta"><span>{item.index}</span>{item.rating ? <span className="product-rating"><Star size={13} fill="currentColor"/> {item.rating.toFixed(1)}</span> : null}</div>
                <h3>{item.name}</h3>
                {item.portion && <p className="product-portion">{item.portion}</p>}
                <div className="product-card-footer">
                  <div className="product-price">
                    {item.oldPrice ? <del>{formatRupiah(item.oldPrice)}</del> : null}
                    <strong>{formatRupiah(item.price)}</strong>
                  </div>
                  <button className="btn btn-primary btn-sm product-add" type="button" onClick={() => onAddToCart(item)} aria-label={`Tambah ${item.name} ke keranjang`}>
                    <Plus size={15}/> Pesan
                  </button>
                </div>
                <button className="product-detail-link" type="button" onClick={() => onPreviewProduct(item)}>Lihat informasi produk <ArrowUpRight size={13}/></button>
              </div>
            </article>
          ))}
        </div>
        <p className="menu-note">Harga dan ketersediaan dapat dikonfirmasi kembali melalui WhatsApp sebelum pesanan diproses.</p>
      </div>
    </section>
  );
};
