import React from 'react';
import { Star, Heart, ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => (
  <section className="section testimonial-section" id="testimoni" aria-labelledby="testimoni-title">
    <div className="container-custom">
      <div className="section-heading">
        <div>
          <p className="section-kicker"><Heart size={14}/> LOVE IN EVERY BITE</p>
          <h2 id="testimoni-title">Cerita kecil,<br/><em>rasa yang diingat.</em></h2>
          <p className="section-intro">Kesan pelanggan tentang menu Gyozen. Pilih menu favoritmu dan ciptakan momen versimu sendiri.</p>
        </div>
        <a className="social-link" href="https://instagram.com/gyozen.sda" target="_blank" rel="noopener noreferrer">Lihat Instagram <ArrowUpRight size={15}/></a>
      </div>
      <div className="testimonial-grid">
        {TESTIMONIALS.map((item, index) => (
          <article className="testimonial-card" key={item.name + '-' + index}>
            <div className="testimonial-top"><span className="testimonial-number">0{index+1}</span><span className="testimonial-stars" aria-label={'Rating ' + item.rating + ' dari 5'}>{Array.from({length:Math.min(5,Math.max(0,item.rating))}).map((_,i)=><Star key={i} size={13} fill="currentColor"/>)}</span></div>
            <p className="testimonial-quote">“{item.text}”</p>
            <div className="testimonial-person"><div><strong>{item.name}</strong><span>{item.city}</span></div><span className="testimonial-tag">{item.tag}</span></div>
          </article>
        ))}
      </div>
      <p className="testimonial-note">Pastikan izin publikasi dan keaslian setiap ulasan telah dikonfirmasi sebelum website dipublikasikan.</p>
    </div>
  </section>
);
