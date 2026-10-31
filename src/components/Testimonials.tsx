import React from 'react';
import { Star, Heart, ArrowUpRight } from 'lucide-react';
import { VERIFIED_TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => {
  if (VERIFIED_TESTIMONIALS.length < 2) return null;

  return (
  <section className="section testimonial-section" id="testimoni" aria-labelledby="testimoni-title">
    <div className="container-custom">
      <div className="section-heading">
        <div>
          <p className="section-kicker"><Heart size={14}/> LOVE IN EVERY BITE</p>
          <h2 id="testimoni-title" className="stagger-heading stagger-h2">
            <span className="stagger-item" style={{ animationDelay: '140ms' }}>Cerita kecil,</span>
            <span className="stagger-item stagger-item-em" style={{ animationDelay: '280ms' }}>
              <em>rasa yang diingat.</em>
            </span>
          </h2>
          <p className="section-intro">Kesan pelanggan tentang menu Gyozen. Pilih menu favoritmu dan ciptakan momen versimu sendiri.</p>
        </div>
        <a className="social-link" href="https://instagram.com/gyozen.sda" target="_blank" rel="noopener noreferrer">Lihat Instagram <ArrowUpRight size={15}/></a>
      </div>
      <div className="testimonial-grid">
        {VERIFIED_TESTIMONIALS.map((item, index) => (
          <article className="testimonial-card" key={item.name + '-' + index}>
            <div className="testimonial-top"><span className="testimonial-number">0{index+1}</span><span className="testimonial-stars" aria-label={'Rating ' + item.rating + ' dari 5'}>{Array.from({length:Math.min(5,Math.max(0,item.rating))}).map((_,i)=><Star key={i} size={13} fill="currentColor"/>)}</span></div>
            <p className="testimonial-quote">“{item.text}”</p>
            <div className="testimonial-person"><div><strong>{item.name}</strong><span>{item.city}</span></div><span className="testimonial-tag">{item.tag}</span></div>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};
