import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCart }) => {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container-custom hero-grid">
        <div className="hero-copy">
          <p className="hero-location">Dimsum & Gyoza · Sidoarjo</p>
          <h1 id="hero-title">
            Dimsum &amp; Gyoza
            <br />
            Gyozen Sidoarjo
          </h1>
          <p className="hero-subtitle">
            Gyoza juicy, mentai lumer, dan pilihan frozen untuk stok di rumah.
            Mulai Rp15.000. Pilih menu favoritmu, lalu lanjutkan pesanan lewat WhatsApp.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-large" type="button" onClick={onOpenCart}>
              Pesan sekarang <ArrowUpRight size={18}/>
            </button>
            <a className="hero-menu-link" href="#menu">
              Lihat menu <ArrowDown size={17}/>
            </a>
          </div>
        </div>

        <figure className="hero-visual">
          <picture className="hero-food-picture">
            <source
              media="(max-width: 640px)"
              srcSet="/images/menu/dimsum-platter-480.webp"
            />
            <img
              src="/images/menu/dimsum-platter-960.webp"
              alt="Dimsum Platter Komplit Gyozen dengan pilihan dimsum dan gyoza"
              width="960"
              height="960"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <figcaption className="hero-image-caption">
            <span>Dimsum Platter Komplit</span>
            <strong>Rp45.000</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
