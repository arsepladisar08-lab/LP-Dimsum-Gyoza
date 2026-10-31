import React from 'react';
import { Clock3, CreditCard, MapPin, Star, Truck, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import {
  DEMO_OPERATIONAL_CLAIMS,
  DEMO_RATING,
  DEMO_TESTIMONIALS
} from '../data/demoContent';
import { WHATSAPP_NUMBER } from '../data/products';

interface DemoTrustPreviewProps {
  enabled: boolean;
}

/**
 * Informasi Layanan, Ulasan Kepuasan, dan Komitmen Kualitas Dimsum Gyozen Sidoarjo.
 */
export const DemoTrustPreview: React.FC<DemoTrustPreviewProps> = ({ enabled }) => {
  if (!enabled) return null;

  const operationalIcons = [Clock3, MapPin, Truck, ShieldCheck, CreditCard, Sparkles];

  return (
    <section className="demo-trust-section" id="layanan-gyozen" aria-labelledby="demo-trust-title">
      <div className="container-custom">
        <div className="demo-trust-heading">
          <div>
            <p className="section-kicker">INFORMASI & LAYANAN GYOZEN</p>
            <h2 id="demo-trust-title" className="stagger-heading stagger-h2">
              <span className="stagger-item" style={{ animationDelay: '140ms' }}>Kualitas terjamin,</span>
              <span className="stagger-item stagger-item-em" style={{ animationDelay: '280ms' }}>
                <em>layanan terpercaya.</em>
              </span>
            </h2>
            <p>Pilihan dimsum & gyoza favorit di Sidoarjo. Dibuat fresh setiap hari dengan bahan berkualitas tinggi dan siap dikirim hangat maupun stok frozen.</p>
          </div>
          <a
            className="btn btn-primary active:scale-95 transition-transform"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Admin%20Gyozen%2C%20saya%20ingin%20tanya%20seputar%20layanan%20dan%20menu`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={15} /> Tanya Admin
          </a>
        </div>

        <div className="demo-rating-panel">
          <div className="demo-rating-score">
            <span className="demo-rating-number">{DEMO_RATING.average.toFixed(1)}</span>
            <div>
              <span className="demo-stars" aria-label={`Rating ${DEMO_RATING.average} dari ${DEMO_RATING.outOf}`}>
                {Array.from({ length: DEMO_RATING.outOf }, (_, index) => <Star key={index} size={15} fill="currentColor" />)}
              </span>
              <strong>{DEMO_RATING.label}</strong>
              <small>{DEMO_RATING.reviewCount} ulasan pelanggan · Sidoarjo & Surabaya</small>
            </div>
          </div>
          <p>Kepuasan rasa dan kemudahan pemesanan adalah komitmen utama kami dalam setiap porsi yang disajikan.</p>
        </div>

        <div className="demo-testimonial-grid">
          {DEMO_TESTIMONIALS.map((item) => (
            <article className="demo-testimonial-card" key={item.name}>
              <div className="demo-stars" aria-label={`Rating ${item.rating} dari 5`}>
                {Array.from({ length: item.rating }, (_, index) => <Star key={index} size={13} fill="currentColor" />)}
              </div>
              <blockquote>“{item.quote}”</blockquote>
              <div className="demo-review-author">
                <strong>{item.name}</strong>
                <span>{item.location} · {item.menu}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="demo-operational-heading">
          <h3>Informasi Operasional & Pemesanan</h3>
          <p>Detail seputar jam layanan, area jangkauan kurir, kemasan higienis, dan kemudahan pembayaran resmi Dimsum Gyozen.</p>
        </div>
        <div className="demo-operational-grid">
          {DEMO_OPERATIONAL_CLAIMS.map((item, index) => {
            const Icon = operationalIcons[index % operationalIcons.length] || MapPin;
            return (
              <article className="demo-operational-card" key={item.title}>
                <span className="demo-operational-icon"><Icon size={18} /></span>
                <h4>{item.title}</h4>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
