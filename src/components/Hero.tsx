import React, { useEffect, useRef } from 'react';
import { GyozenShieldLogo } from './GyozenShieldLogo';

interface HeroProps {
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCart }) => {
  const heroRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Subtle parallax effect on desktop fine pointers
    const handleMouseMove = (event: MouseEvent) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${x * 12}px, ${y * 8}px) rotate(4deg)`;
      }
      if (logoRef.current) {
        logoRef.current.style.transform = `translate(${x * 6}px, ${y * 4}px) rotate(-2deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (blobRef.current) blobRef.current.style.transform = 'translate(0px, 0px) rotate(4deg)';
      if (logoRef.current) logoRef.current.style.transform = 'translate(0px, 0px) rotate(-2deg)';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef} aria-labelledby="hero-title">
      <div className="container-custom hero-grid">
        <div className="hero-copy">
          <div className="section-kicker">Dimsum viral • Gurih • Lumer • Bikin nagih</div>
          <h1 id="hero-title">
            Satu gigitan, bikin hari makin <span className="highlight">zen.</span>
          </h1>
          <p className="hero-subtitle">
            <span className="serif-accent">Praktis, enak, dan selalu jadi favorit!</span> Nikmati hangatnya{' '}
            <strong>Gyoza, Dimsum Original, Dimsum Goreng Keju, Mentai Lumer, Platter, hingga Party Box</strong>{' '}
            lengkap dengan cocolan <strong>Ebi Chili Oil 150ml</strong>. Tersedia juga kemasan{' '}
            <strong>Ready Frozen</strong> untuk stok di rumah.
          </p>

          <div className="hero-actions">
            <button className="btn btn-red" type="button" onClick={onOpenCart}>
              <span>Pesan via WhatsApp</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-[18px] h-[18px]">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a className="text-link" href="#menu">
              <span>Lihat 10 menu Gyozen</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-[18px] h-[18px]">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Banner Trust Claims */}
          <div className="trust-strip">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 21s8-4.2 8-10.5V5l-8-3-8 3v5.5C4 16.8 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="m8.5 11.5 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>100% Halal Indonesia</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Frozen tahan hingga 3 bulan</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Tanpa pengawet & pewarna buatan</span>
            </div>
          </div>
        </div>

        {/* Right Visual: Organic Red Blob + High-Precision Gyozen Shield Crest + Floating Tags */}
        <div className="hero-art" aria-label="Lambang Resmi Dimsum Gyozen">
          <div className="hero-blob" ref={blobRef} aria-hidden="true" />

          <div className="logo-plate" ref={logoRef}>
            <GyozenShieldLogo className="w-full max-w-[340px] drop-shadow-xl" />
          </div>

          <div className="floating-tag tag-top">
            <span className="floating-tag-badge" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17l-5.9 3 1.2-6.5L2.5 8.9 9.1 8 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Best Seller: Mentai Lumer!</span>
          </div>

          <div className="floating-tag tag-bottom">
            <span className="floating-tag-badge" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3c2.5 3.5 5 6.5 5 10.5A5 5 0 0 1 7 13.5C7 9.5 9.5 6.5 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Ebi Chili Oil 150ml</span>
          </div>

          <div className="price-stamp">
            <span className="price-stamp-label">Harga hemat mulai</span>
            <span className="price-stamp-value">15 RB-an!</span>
          </div>
        </div>
      </div>
    </section>
  );
};
