import React from 'react';
import { Product } from '../types';
import { formatRupiah } from '../utils/order';
import { Plus, ArrowUpRight } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface MenuCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onPreviewProduct: (product: Product) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({ products, onAddToCart, onPreviewProduct }) => {
  const warmProducts = products.filter((product) => product.category === 'hangat');
  const frozenProducts = products.filter((product) => product.category === 'frozen' && product.id !== 'ebi-chili-oil');
  const condiments = products.filter((product) => product.id === 'ebi-chili-oil');
  const featured = warmProducts[0];
  const otherWarm = warmProducts.slice(1);

  const ProductRow = ({ product }: { product: Product }) => (
    <article className="menu-row">
      <button className="menu-row-info" type="button" onClick={() => onPreviewProduct(product)}>
        <span className="menu-row-name">{product.name}</span>
        {product.portion && <span className="menu-row-portion">{product.portion}</span>}
      </button>
      <strong className="menu-row-price">{formatRupiah(product.price)}</strong>
      <button className="menu-add-button" type="button" onClick={() => onAddToCart(product)} aria-label={`Tambah ${product.name} ke nota pesanan`}>
        <Plus size={18}/>
      </button>
    </article>
  );

  return (
    <section className="section menu-section" id="menu" aria-labelledby="menu-title">
      <div className="container-custom">
        <div className="section-heading menu-heading">
          <div>
            <p className="section-kicker">PILIHAN MENU</p>
            <h2 id="menu-title">Mulai dari yang<br/><em>paling kamu suka.</em></h2>
            <p className="section-intro">Jelajahi menu hangat dan pilihan frozen. Tekan tombol tambah untuk memasukkan pilihanmu ke nota pesanan.</p>
          </div>
          <nav className="menu-anchor-nav" aria-label="Kategori menu">
            <a href="#menu-hangat">Siap santap</a>
            <a href="#menu-frozen">Ready frozen</a>
          </nav>
        </div>

        {featured && (
          <div className="menu-warm-layout" id="menu-hangat">
            <article className="menu-featured">
              <button className="menu-featured-image" type="button" onClick={() => onPreviewProduct(featured)} aria-label={`Lihat detail ${featured.name}`}>
                <ProductImage src={featured.imageUrl} alt={featured.name} bgColor={featured.bg} width={960} height={720}
                  sizes="(min-width: 900px) 54vw, 100vw" loading="lazy" className="w-full h-full object-cover"/>
              </button>
              <div className="menu-featured-copy">
                <p className="menu-eyebrow">SIAP SANTAP</p>
                <h3>{featured.name}</h3>
                <p>{featured.desc}</p>
                {featured.portion && <span className="featured-portion">{featured.portion}</span>}
                <div className="featured-price-row">
                  <strong>{formatRupiah(featured.price)}</strong>
                  <button className="btn btn-primary" type="button" onClick={() => onAddToCart(featured)}>
                    <Plus size={17}/> Tambah ke nota
                  </button>
                </div>
                <button className="text-link" type="button" onClick={() => onPreviewProduct(featured)}>Lihat detail produk <ArrowUpRight size={14}/></button>
              </div>
            </article>

            <div className="menu-print-list" aria-label="Menu siap santap lainnya">
              <div className="menu-list-heading">
                <h3>Menu siap santap lainnya</h3>
                <span>{otherWarm.length} pilihan</span>
              </div>
              {otherWarm.map((product) => <ProductRow key={product.id} product={product}/>)}
            </div>
          </div>
        )}

        <div className="frozen-menu-section" id="menu-frozen">
          <div className="frozen-menu-heading">
            <div>
              <p className="menu-eyebrow">UNTUK STOK DI RUMAH</p>
              <h3>Ready frozen</h3>
            </div>
            <p>Simpan pilihan favoritmu dan konfirmasi petunjuk penyimpanan melalui detail produk.</p>
          </div>
          <div className="frozen-menu-track">
            {frozenProducts.map((product) => (
              <article className="frozen-menu-item" key={product.id}>
                <button className="frozen-menu-image" type="button" onClick={() => onPreviewProduct(product)} aria-label={`Lihat detail ${product.name}`}>
                  <ProductImage src={product.imageUrl} alt={product.name} bgColor={product.bg} width={480} height={360} sizes="(min-width: 900px) 25vw, 75vw" loading="lazy" className="w-full h-full object-cover"/>
                </button>
                <div className="frozen-menu-copy">
                  <h4>{product.name}</h4>
                  {product.portion && <p>{product.portion}</p>}
                  <div><strong>{formatRupiah(product.price)}</strong><button type="button" onClick={() => onAddToCart(product)} aria-label={`Tambah ${product.name} ke nota`}><Plus size={18}/></button></div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {condiments.map((product) => (
          <div className="condiment-row" key={product.id}>
            <div><p className="menu-eyebrow">PELENGKAP</p><h3>{product.name}</h3><p>{product.desc}</p></div>
            <strong>{formatRupiah(product.price)}</strong>
            <button className="menu-add-button" type="button" onClick={() => onAddToCart(product)} aria-label={`Tambah ${product.name} ke nota`}><Plus size={18}/></button>
          </div>
        ))}
        <p className="menu-note">Harga yang tercantum adalah harga menu pada katalog. Stok, ongkir, dan jadwal pengiriman dikonfirmasi admin sebelum pesanan diproses.</p>
      </div>
    </section>
  );
};
