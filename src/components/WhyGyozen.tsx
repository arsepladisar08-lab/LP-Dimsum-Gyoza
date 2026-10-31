import React, { useState } from 'react';
import { Plus, Check, MessageCircle, PartyPopper, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { GYOZEN_PRODUCTS, WHATSAPP_NUMBER } from '../data/products';
import { GYOZEN_BUNDLES } from '../data/bundles';
import { formatRupiah } from '../utils/order';

interface WhyGyozenProps {
  onAddBundle: (name: string, price: number, imageUrl?: string) => void;
}

export const WhyGyozen: React.FC<WhyGyozenProps> = ({ onAddBundle }) => {
  const [addedBundle, setAddedBundle] = useState<string | null>(null);

  const getRegularPrice = (productIds: readonly string[]) => {
    const includedProducts = productIds.map((id) => GYOZEN_PRODUCTS.find((product) => product.id === id));
    if (includedProducts.some((product) => !product)) return null;
    return includedProducts.reduce((sum, product) => sum + (product?.price || 0), 0);
  };
  const platter = GYOZEN_BUNDLES.platter;
  const frozen = GYOZEN_BUNDLES.frozen;
  const platterRegularPrice = getRegularPrice(platter.productIds);
  const frozenRegularPrice = getRegularPrice(frozen.productIds);

  const handleBundle = (name: string, price: number, img?: string) => {
    onAddBundle(name, price, img);
    setAddedBundle(name);
    setTimeout(() => {
      setAddedBundle((curr) => (curr === name ? null : curr));
    }, 700);
  };

  return (
    <section className="section story-section" id="paket" aria-labelledby="why-title">
      <div className="container-custom">
        <div className="section-heading story-heading">
          <div>
            <h2 id="why-title" className="stagger-heading stagger-h2">
              <span className="stagger-item" style={{ animationDelay: '140ms' }}>Dari ngemil sendiri</span>
              <span className="stagger-item stagger-item-em" style={{ animationDelay: '280ms' }}>
                <em>sampai berbagi ramai-ramai.</em>
              </span>
            </h2>
            <p className="section-intro">Ada pilihan untuk setiap suasana: menu hangat, paket sharing hemat, hingga pesanan jumlah banyak untuk acaramu.</p>
          </div>
        </div>

        <div className="story-layout">
          <div className="bundle-stack">
            <article className="bundle-card bundle-featured">
              <div className="bundle-image">
                <ProductImage src="/images/menu/dimsum-platter-960.webp" alt="Dimsum Platter Komplit" bgColor="#f6e7ad" width={720} height={480} sizes="(min-width: 900px) 42vw, 100vw" loading="lazy" className="w-full h-full object-cover"/>
                <span className="bundle-ribbon">COMBO FAVORIT</span>
              </div>
              <div className="bundle-content">
                <p className="bundle-overline">COMBO 3-IN-1</p>
                <h3>Dimsum Platter Komplit</h3>
                <p>Mentai Lumer + Gyoza Juicy + Dimsum Goreng Keju, lengkap dengan 2 saus.</p>
                <div className="bundle-bottom"><div className="bundle-price-group">
                  {platterRegularPrice !== null && platterRegularPrice > platter.price && <>
                    <del>{formatRupiah(platterRegularPrice)}</del>
                    <span className="bundle-saving">Hemat {formatRupiah(platterRegularPrice - platter.price)}</span>
                  </>}
                  <strong>{formatRupiah(platter.price)}</strong>
                </div>
                  <button
                    className={`btn btn-sm transition-all duration-200 ${
                      addedBundle === 'platter'
                        ? 'bg-emerald-700 text-white border-emerald-800 scale-105 shadow-md'
                        : 'btn-primary active:scale-95'
                    }`}
                    type="button"
                    onClick={() => handleBundle(platter.name, platter.price, platter.imageUrl)}
                  >
                    {addedBundle === 'platter' ? <><Check size={15}/> Masuk!</> : <><Plus size={15}/> Tambah paket</>}
                  </button>
                </div>
              </div>
            </article>

            <article className="bundle-card bundle-horizontal">
              <ProductImage src="/images/menu/frozen-pack-dimsum-mix-960.webp" alt="Paket stok frozen Gyozen" bgColor="#e2ecf5" width={240} height={240} sizes="120px" loading="lazy" className="bundle-thumb"/>
              <div className="bundle-content">
                <p className="bundle-overline">FREEZER STOCK</p>
                <h3>Paket Stok Kulkas Komplit</h3>
                <p>3 pack frozen + Ebi Chili Oil 150ml.</p>
                <div className="bundle-bottom"><div className="bundle-price-group">
                  {frozenRegularPrice !== null && frozenRegularPrice > frozen.price && <>
                    <del>{formatRupiah(frozenRegularPrice)}</del>
                    <span className="bundle-saving">Hemat {formatRupiah(frozenRegularPrice - frozen.price)}</span>
                  </>}
                  <strong>{formatRupiah(frozen.price)}</strong>
                </div>
                  <button
                    className={`btn btn-sm transition-all duration-200 ${
                      addedBundle === 'frozen'
                        ? 'bg-emerald-700 text-white border-emerald-800 scale-105 shadow-md'
                        : 'btn-accent active:scale-95'
                    }`}
                    type="button"
                    onClick={() => handleBundle(frozen.name, frozen.price, frozen.imageUrl)}
                  >
                    {addedBundle === 'frozen' ? <><Check size={15}/> Masuk!</> : <><Plus size={15}/> Ambil paket</>}
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Space Pemesanan Jumlah Banyak / Bulk Order */}
          <article className="bulk-order-card" aria-labelledby="bulk-order-title">
            <div className="bulk-order-header">
              <div className="bulk-order-badge">
                <PartyPopper size={14} />
                <span>BULK ORDER &amp; EVENT CATERING</span>
              </div>
              <h3 id="bulk-order-title">
                Pemesanan Jumlah Banyak untuk Acara Spesial
              </h3>
              <p className="bulk-order-intro">
                Rayakan momen pernikahan, ulang tahun, gathering kantor, atau arisan keluarga dengan sajian dimsum &amp; gyoza premium yang disukai semua tamu.
              </p>
            </div>

            <div className="bulk-event-tags" aria-label="Kategori Acara">
              <span className="bulk-event-tag">💍 Wedding &amp; Sangjit</span>
              <span className="bulk-event-tag">🎂 Birthday Party</span>
              <span className="bulk-event-tag">🏢 Office Gathering</span>
              <span className="bulk-event-tag">👨‍👩‍👧‍👦 Arisan &amp; Syukuran</span>
            </div>

            <div className="bulk-features-list">
              <div className="bulk-feature-item">
                <span className="bulk-feature-icon"><CheckCircle2 size={16} /></span>
                <div>
                  <strong>Menu Fleksibel &amp; Variatif</strong>
                  <p>Bebas mix Dimsum Kukus, Mentai Lumer, Goreng Keju, hingga Party Box siap saji.</p>
                </div>
              </div>
              <div className="bulk-feature-item">
                <span className="bulk-feature-icon"><CheckCircle2 size={16} /></span>
                <div>
                  <strong>Pilihan Hangat atau Frozen Pack</strong>
                  <p>Disajikan hangat siap santap lengkap dengan saus, atau kemasan beku untuk hampers/souvenir.</p>
                </div>
              </div>
              <div className="bulk-feature-item">
                <span className="bulk-feature-icon"><CheckCircle2 size={16} /></span>
                <div>
                  <strong>Harga Spesial &amp; Pengiriman Terjadwal</strong>
                  <p>Penawaran khusus untuk pemesanan volume besar dengan pengiriman tepat waktu ke lokasi acaramu.</p>
                </div>
              </div>
            </div>

            <div className="bulk-order-footer">
              <a
                className="btn btn-primary btn-large w-full justify-center shadow-md active:scale-95 transition-all"
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Admin Gyozen, saya ingin konsultasi pemesanan jumlah banyak / bulk order untuk acara (Wedding/Birthday/Gathering/Event).')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Konsultasi Pesanan Acara via WhatsApp
                <ArrowUpRight size={16} />
              </a>
              <p className="bulk-order-hint">
                💡 Disarankan reservasi pesanan minimal H-3 atau H-1 sebelum acara agar persiapan lebih maksimal.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
