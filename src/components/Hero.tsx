import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { GYOZEN_PRODUCTS, WHATSAPP_NUMBER } from '../data/products';
import { formatRupiah } from '../utils/order';

export const Hero: React.FC = () => {
  const startingPrice = Math.min(...GYOZEN_PRODUCTS.map((product) => product.price));
  const message = encodeURIComponent('Halo Gyozen, saya ingin bertanya tentang menu dan ketersediaan hari ini.');

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container-custom hero-grid">
        <div className="hero-copy">
          <p className="hero-location">DIMSUM & GYOZA · SIDOARJO</p>
          <h1 id="hero-title">Gyoza juicy.<br/>Dimsum <em>comfort food.</em></h1>
          <p className="hero-subtitle">
            Pilih menu siap santap atau stok frozen untuk dinikmati di rumah.
            Lihat pilihan, susun pesanan, lalu konfirmasi langsung lewat WhatsApp.
          </p>
          <p className="hero-price">Menu mulai <strong>{formatRupiah(startingPrice)}</strong></p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-large" href="#menu">Lihat menu <ArrowDown size={17}/></a>
            <a className="btn btn-secondary btn-large" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`} target="_blank" rel="noopener noreferrer">
              Tanya via WhatsApp <ArrowUpRight size={17}/>
            </a>
          </div>
        </div>

        <figure className="hero-visual">
          <ProductImage
            src="/images/menu/dimsum-platter-960.webp"
            alt="Dimsum Platter Komplit Gyozen dengan beberapa pilihan dimsum"
            width={960}
            height={960}
            sizes="(min-width: 900px) 48vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="hero-food-image"
          />
          <figcaption>DIMSUM PLATTER KOMPLIT · GYOZEN</figcaption>
        </figure>
      </div>
    </section>
  );
};
