import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { GYOZEN_PRODUCTS } from '../data/products';
import { Product } from '../types';

interface HeroProps {
  onOpenCart: () => void;
  onPreviewProduct: (product: Product) => void;
}

const featuredProducts = [
  { id: 'gyoza-fresh', className: 'hero-product-card--gyoza' },
  { id: 'mentai-lumer', className: 'hero-product-card--mentai' },
  { id: 'dimsum-goreng-keju', className: 'hero-product-card--keju' }
] as const;

export const Hero: React.FC<HeroProps> = ({ onOpenCart, onPreviewProduct }) => {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container-custom hero-grid">
        <div className="hero-copy">
          <p className="hero-location">Dimsum &amp; Gyoza · Sidoarjo</p>
          <p className="hero-kicker">GOOD FOOD. GOOD MOOD.</p>
          <h1 id="hero-title">
            Satu gigitan, bikin hari makin <em>zen.</em>
          </h1>
          <p className="hero-subtitle">
            Camilan hangat, gurih, dan penuh rasa untuk nemenin setiap momen.
            Temukan dimsum favorit, gyoza juicy, mentai lumer, hingga pilihan frozen untuk stok di rumah.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-large" type="button" onClick={onOpenCart}>
              Pesan sekarang <ArrowUpRight size={18}/>
            </button>
            <a className="hero-menu-link" href="#menu">
              Jelajahi menu <ArrowDown size={17}/>
            </a>
          </div>
          <p className="hero-footnote">Dibuat untuk momen kecil yang terasa spesial.</p>
        </div>

        <figure className="hero-visual">
          <div className="hero-gallery" aria-label="Menu favorit Gyozen">
            {featuredProducts.map(({ id, className }) => {
              const product = GYOZEN_PRODUCTS.find((item) => item.id === id);
              if (!product) return null;

              const image480 = product.imageUrl.replace('-960.webp', '-480.webp');
              return (
                <button
                  key={id}
                  className={`hero-product-card ${className}`}
                  type="button"
                  onClick={() => onPreviewProduct(product)}
                  aria-label={`Lihat detail ${product.name}`}
                  title={`Lihat detail ${product.name}`}
                >
                  <img
                    src={product.imageUrl}
                    srcSet={`${image480} 480w, ${product.imageUrl} 960w`}
                    sizes="(max-width: 767px) 44vw, 320px"
                    alt=""
                    width="960"
                    height="960"
                    loading={id === 'mentai-lumer' ? 'eager' : 'lazy'}
                    fetchPriority={id === 'mentai-lumer' ? 'high' : 'auto'}
                    decoding="async"
                  />
                  <span className="hero-product-label">{product.name}</span>
                </button>
              );
            })}
          </div>
        </figure>
      </div>
    </section>
  );
};
