import React from 'react';

interface ClosingCTAProps {
  onOpenCart: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({ onOpenCart }) => {
  return (
    <section className="section closing-cta" aria-labelledby="closing-title">
      <div className="container-custom closing-inner">
        <div className="section-kicker">Praktis, enak, & selalu jadi favorit</div>
        <h2 id="closing-title">
          Yuk, bikin harimu lebih <span style={{ color: 'var(--yellow)' }}>Gyozen!</span>
        </h2>
        <p>
          Porsi hemat mulai <strong>15 RB-an</strong>. Pilih menu hangat atau stok Ready Frozen sekarang dan rasakan
          kelezatan dimsum yang gurih, lumer, dan bikin nagih.
        </p>

        <button className="btn" type="button" onClick={onOpenCart}>
          <span>Buka keranjang & pesan sekarang</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-[18px] h-[18px]">
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="contact-badges-row">
          <a
            className="contact-pill"
            href="https://wa.me/628981230703"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi WhatsApp Dimsum Gyozen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 11.5a8.5 8.5 0 0 1-12.2 7.6L3 20.5l1.6-4.6A8.5 8.5 0 1 1 20 11.5Z" stroke="#8e171c" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span>WA: 0898-1230-703</span>
          </a>
          <a
            className="contact-pill"
            href="https://instagram.com/gyozen.sda"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka Instagram @gyozen.sda"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="#8e171c" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" stroke="#8e171c" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1" fill="#8e171c" />
            </svg>
            <span>IG: @gyozen.sda</span>
          </a>
          <a
            className="contact-pill"
            href="/assets/aistudio/landing_page_umkm_dimsum_gyozen__1__307720ac.html"
            target="_blank"
            rel="noopener noreferrer"
            title="Lihat file HTML landing page asli"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#8e171c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14 2 14 8 20 8" stroke="#8e171c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>File Asli (.html)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
