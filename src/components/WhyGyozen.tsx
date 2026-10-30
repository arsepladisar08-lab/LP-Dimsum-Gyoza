import React from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { GYOZEN_PRODUCTS } from '../data/products';
import { formatRupiah } from '../utils/order';
import { Reveal } from './Reveal';

interface WhyGyozenProps {
  onAddBundle: (name: string, price: number, imageUrl?: string) => void;
}

export const WhyGyozen: React.FC<WhyGyozenProps> = ({ onAddBundle }) => {
  const platter = GYOZEN_PRODUCTS.find((product) => product.id === 'dimsum-platter');

  return (
    <section className="section story-section" id="paket" aria-labelledby="why-title">
      <div className="container-custom">
        <div className="section-heading">
          <div>
            <p className="section-kicker">PILIH SESUAI MOMEN</p>
            <h2 id="why-title">Untuk dinikmati sekarang<br/><em>atau disimpan nanti.</em></h2>
            <p className="section-intro">Pilih menu siap santap untuk momen hari ini, atau jelajahi pilihan frozen untuk stok di rumah.</p>
          </div>
        </div>

        <Reveal className="package-feature">
          <div className="package-feature-image">
            <ProductImage src="/images/menu/dimsum-platter-960.webp" alt="Dimsum Platter Komplit Gyozen" bgColor="#f6e7ad" width={960} height={760} sizes="(min-width: 900px) 56vw, 100vw" loading="lazy" className="w-full h-full object-cover"/>
          </div>
          <div className="package-feature-copy">
            <p className="menu-eyebrow">MENU KOMBINASI</p>
            <h3>Dimsum Platter Komplit</h3>
            <p>Perpaduan Dimsum Mentai Lumer, Gyoza Juicy, dan Dimsum Goreng Keju, lengkap dengan dua cup saus.</p>
            {platter && <p className="package-price">{formatRupiah(platter.price)}</p>}
            <ul className="package-details">
              <li>Mentai, gyoza, dan goreng keju dalam satu boks</li>
              <li>Dilengkapi dua cup saus</li>
              <li>Detail porsi dan ketersediaan dikonfirmasi sebelum pesanan diproses</li>
            </ul>
            {platter && (
              <button className="btn btn-primary" type="button" onClick={() => onAddBundle(platter.name, platter.price, platter.imageUrl)}>
                <Plus size={17}/> Tambah ke nota
              </button>
            )}
          </div>
        </Reveal>

        <div className="frozen-callout">
          <div>
            <p className="menu-eyebrow">READY FROZEN</p>
            <h3>Stok camilan di rumah.</h3>
            <p>Tersedia pilihan dimsum mix, goreng keju, dan gyoza frozen. Buka katalog untuk melihat isi kemasan, harga, dan petunjuk penyajian.</p>
          </div>
          <a className="text-link" href="#menu-frozen">Lihat varian frozen <ArrowUpRight size={15}/></a>
        </div>
      </div>
    </section>
  );
};
