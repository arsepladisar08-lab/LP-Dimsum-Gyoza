import React from 'react';
import { ShoppingCart, MessageCircle, Truck, ArrowUpRight } from 'lucide-react';

const steps = [
  { number:'01', icon:ShoppingCart, title:'Pilih menu', copy:'Jelajahi katalog, buka detail produk, lalu tambahkan pilihanmu ke keranjang.' },
  { number:'02', icon:MessageCircle, title:'Kirim pesanan', copy:'Isi nama, pilih wilayah berjenjang, lengkapi alamat detail, lalu kirim rangkuman pesanan melalui WhatsApp.' },
  { number:'03', icon:Truck, title:'Konfirmasi & nikmati', copy:'Admin membantu konfirmasi ketersediaan, ongkir, pembayaran, dan jadwal pengiriman.' }
];

export const Steps: React.FC = () => (
  <section className="section steps-section" id="langkah" aria-labelledby="steps-title">
    <div className="container-custom">
      <div className="section-heading">
        <div>
          <p className="section-kicker"><ArrowUpRight size={14}/> EASY ORDER</p>
          <h2 id="steps-title" className="stagger-heading stagger-h2 mb-0">
            <span className="stagger-item" style={{ animationDelay: '140ms' }}>Dari pilih menu</span>
            <span className="stagger-item stagger-item-em" style={{ animationDelay: '280ms' }}>
              <em>sampai siap dinikmati.</em>
            </span>
          </h2>
        </div>
      </div>
      <div className="steps-grid">
        {steps.map(({number,icon:Icon,title,copy},index)=>(
          <article className="step-card" key={number}>
            <div className="step-card-top"><span>{number}</span><Icon size={21}/></div>
            <div className="step-line" aria-hidden="true"><i style={{width:((index+1)*33.333)+'%'}}/></div>
            <h3>{title}</h3><p>{copy}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
