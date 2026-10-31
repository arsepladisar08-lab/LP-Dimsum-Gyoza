import React from 'react';
import { Clock3, CreditCard, MapPin, Star } from 'lucide-react';
import {
  DEMO_CONTENT_NOTICE,
  DEMO_OPERATIONAL_CLAIMS,
  DEMO_RATING,
  DEMO_TESTIMONIALS
} from '../data/demoContent';

interface DemoTrustPreviewProps {
  enabled: boolean;
}

/**
 * Trust layout shown while sample content is enabled.
 * All displayed examples are fictional and must be replaced with validated business data.
 * Toggle DEMO_TRUST_CONTENT_ENABLED in src/data/demoContent.ts to hide this section.
 */
export const DemoTrustPreview: React.FC<DemoTrustPreviewProps> = ({ enabled }) => {
  if (!enabled) return null;

  const operationalIcons = [Clock3, MapPin, CreditCard];

  return (
    <section className="demo-trust-section" aria-labelledby="demo-trust-title">
      <div className="container-custom">
        <div className="demo-trust-warning" role="note">
          <strong>DATA CONTOH — BELUM TERVERIFIKASI</strong>
          <p>{DEMO_CONTENT_NOTICE}</p>
        </div>

        <div className="demo-trust-heading">
          <div>
            <p className="section-kicker">TRUST & INFO GYOZEN · DATA SEMENTARA</p>
            <h2 id="demo-trust-title">Cerita rasa & info Gyozen</h2>
            <p>Bagian ini sedang disiapkan. Rating, testimoni, dan detail operasional yang tampil masih berupa data contoh untuk kamu validasi dan edit manual.</p>
          </div>
          <span className="demo-only-chip">DATA DUMMY AKTIF</span>
        </div>

        <div className="demo-rating-panel">
          <div className="demo-rating-score">
            <span className="demo-rating-number">{DEMO_RATING.average.toFixed(1)}</span>
            <div>
              <span className="demo-stars" aria-label={`Contoh rating ${DEMO_RATING.average} dari ${DEMO_RATING.outOf}`}>
                {Array.from({ length: DEMO_RATING.outOf }, (_, index) => <Star key={index} size={15} fill="currentColor" />)}
              </span>
              <strong>{DEMO_RATING.label}</strong>
              <small>{DEMO_RATING.reviewCount} ulasan contoh · bukan data pelanggan</small>
            </div>
          </div>
          <p>Nilai rating dan jumlah ulasan ini hanya placeholder. Ganti dengan angka dan tautan sumber yang benar setelah diverifikasi.</p>
        </div>

        <div className="demo-testimonial-grid">
          {DEMO_TESTIMONIALS.map((item) => (
            <article className="demo-testimonial-card" key={item.name}>
              <span className="demo-sample-label">CONTOH ULASAN</span>
              <div className="demo-stars" aria-label={`Contoh rating ${item.rating} dari 5`}>
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
          <h3>Contoh informasi operasional</h3>
          <p>Semua nilai berikut sengaja fiktif dan tidak boleh dianggap sebagai kebijakan Gyozen.</p>
        </div>
        <div className="demo-operational-grid">
          {DEMO_OPERATIONAL_CLAIMS.map((item, index) => {
            const Icon = operationalIcons[index] || MapPin;
            return (
              <article className="demo-operational-card" key={item.title}>
                <span className="demo-sample-label">CONTOH · PERLU VERIFIKASI</span>
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
