import React from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';
import { ProductImage } from './ProductImage';
import { Reveal } from './Reveal';

export const ClosingCTA: React.FC = () => (
  <section className="closing-section" aria-labelledby="closing-title">
    <div className="container-custom closing-layout">
      <Reveal className="closing-image">
        <ProductImage src="/images/menu/dimsum-mentai-960.webp" alt="Dimsum Mentai Lumer Gyozen" width={800} height={720} sizes="(min-width: 900px) 48vw, 100vw" loading="lazy" className="w-full h-full object-cover"/>
      </div>
      <div className="closing-content">
        <p className="section-kicker">ADA YANG BIKIN NGILER?</p>
        <h2 id="closing-title">Menu pilihanmu<br/><em>menunggu di nota.</em></h2>
        <p>Lihat pilihan menu, susun pesanan, lalu konfirmasi detailnya bersama admin Gyozen.</p>
        <div className="closing-actions">
          <a className="btn btn-accent btn-large" href="#menu">Pilih menu <ArrowUpRight size={17}/></a>
          <a className="btn closing-wa-btn btn-large" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/> Chat WhatsApp</a>
        </div>
      </Reveal>
    </div>
  </section>
);
