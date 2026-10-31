import React from 'react';
import { Sparkles, Flame, Snowflake, Plus, CheckCircle2 } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface WhyGyozenProps {
  onAddBundle: (name: string, price: number, imageUrl?: string) => void;
}

const benefits = [
  { icon: Sparkles, title: 'Isian ayam & udang', copy: 'Tekstur juicy dan rasa gurih yang jadi karakter menu Gyozen.', tone: 'benefit-gold' },
  { icon: Flame, title: 'Mentai & keju', copy: 'Pilihan rasa creamy, gurih, dan renyah untuk suasana ngemil yang berbeda.', tone: 'benefit-red' },
  { icon: CheckCircle2, title: 'Ebi Chili Oil', copy: 'Pelengkap bercita rasa ebi yang dapat dinikmati bersama menu favorit.', tone: 'benefit-gold' },
  { icon: Snowflake, title: 'Pilihan ready frozen', copy: 'Simpan stok favorit di freezer dan siapkan saat ingin menikmati.', tone: 'benefit-blue' }
];

export const WhyGyozen: React.FC<WhyGyozenProps> = ({ onAddBundle }) => (
  <section className="section story-section" id="paket" aria-labelledby="why-title">
    <div className="container-custom">
      <div className="section-heading story-heading">
        <div>
          <h2 id="why-title">Dari ngemil sendiri<br/><em>sampai berbagi ramai-ramai.</em></h2>
          <p className="section-intro">Ada pilihan untuk setiap suasana: menu hangat, paket sharing, sampai stok frozen yang praktis disiapkan di rumah.</p>
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
              <div className="bundle-bottom"><div><strong>Rp45.000</strong></div>
                <button className="btn btn-primary btn-sm" type="button" onClick={() => onAddBundle('Dimsum Platter Komplit (3-in-1)',45000,'/images/menu/dimsum-platter-960.webp')}><Plus size={15}/> Tambah paket</button>
              </div>
            </div>
          </article>

          <article className="bundle-card bundle-horizontal">
            <ProductImage src="/images/menu/frozen-pack-dimsum-mix-960.webp" alt="Paket stok frozen Gyozen" bgColor="#e2ecf5" width={240} height={240} sizes="120px" loading="lazy" className="bundle-thumb"/>
            <div className="bundle-content">
              <p className="bundle-overline">FREEZER STOCK</p>
              <h3>Paket Stok Kulkas Komplit</h3>
              <p>3 pack frozen + Ebi Chili Oil 150ml.</p>
              <div className="bundle-bottom"><div><strong>Rp125.000</strong></div>
                <button className="btn btn-accent btn-sm" type="button" onClick={() => onAddBundle('Paket Stok Kulkas (3 Pack Frozen + Ebi Chili Oil 150ml)',125000,'/images/menu/frozen-pack-dimsum-mix-960.webp')}><Plus size={15}/> Ambil paket</button>
              </div>
            </div>
          </article>
        </div>

        <div className="benefit-grid">
          {benefits.map(({icon: Icon,title,copy,tone}, index) => (
            <article className={'benefit-card ' + tone} key={title}>
              <span className="benefit-icon"><Icon size={21}/></span>
              <span className="benefit-index">0{index+1} / GYOZEN</span>
              <h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
