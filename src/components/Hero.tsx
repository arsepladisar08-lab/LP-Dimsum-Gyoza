import React, { useEffect, useRef } from 'react';
import { GyozenShieldLogo } from './GyozenShieldLogo';
import { MessageCircle, ArrowDown, ShieldCheck, Snowflake, Heart, Sparkles, Star } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

interface HeroProps {
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCart }) => {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      if (logoRef.current) {
        logoRef.current.style.transform = `translate(${x * 6}px, ${y * 4}px)`;
      }
    };

    const handleMouseLeave = () => {
      if (logoRef.current) logoRef.current.style.transform = 'translate(0px, 0px)';
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
        {/* Left Column Copy */}
        <div className="hero-copy">
          {/* Shadcn Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-900/15 text-amber-950 text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-ping" />
            <span>Dimsum Viral Sidoarjo • Gurih, Lumer, Bikin Nagih</span>
          </div>

          <h1 id="hero-title">
            Satu gigitan, bikin hari makin <span className="highlight">zen.</span>
          </h1>

          <p className="hero-subtitle">
            <span className="serif-accent">Praktis, enak, dan selalu jadi favorit!</span> Nikmati hangatnya{' '}
            <strong className="text-[var(--ink)]">
              Gyoza, Dimsum Original, Dimsum Goreng Keju, Mentai Lumer, Platter, hingga Party Box
            </strong>{' '}
            lengkap dengan cocolan <strong className="text-[var(--red)]">Ebi Chili Oil 150ml</strong>. Tersedia juga
            kemasan <strong className="text-sky-800">Ready Frozen (tahan 3 bulan)</strong> untuk stok praktis di rumah.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary text-base px-6 h-12" type="button" onClick={onOpenCart}>
              <MessageCircle className="w-5 h-5 text-amber-200" />
              <span>Pesan via WhatsApp</span>
            </button>

            <a className="btn btn-secondary text-base px-5 h-12" href="#menu">
              <span>Lihat 10 Menu Gyozen</span>
              <ArrowDown className="w-4 h-4 text-[var(--red)]" />
            </a>
          </div>

          {/* Social Proof Pill */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-1.5">
              <span className="w-7 h-7 rounded-full bg-amber-300 border-2 border-white flex items-center justify-center text-xs font-bold">🥟</span>
              <span className="w-7 h-7 rounded-full bg-rose-300 border-2 border-white flex items-center justify-center text-xs font-bold">🥢</span>
              <span className="w-7 h-7 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-xs font-bold">🔥</span>
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1 font-bold text-[var(--ink)]">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.9 / 5.0 Rating Pelanggan</span>
              </div>
              <span className="text-[var(--muted)] text-[11px]">Lebih dari 500+ porsi dinikmati setiap minggu</span>
            </div>
          </div>

          {/* Banner Trust Claims */}
          <div className="trust-strip">
            <div className="trust-item">
              <ShieldCheck className="w-5 h-5 text-[var(--red)] flex-shrink-0" />
              <span>100% Halal Indonesia</span>
            </div>
            <div className="trust-item">
              <Snowflake className="w-5 h-5 text-sky-700 flex-shrink-0" />
              <span>Frozen Tahan 3 Bulan</span>
            </div>
            <div className="trust-item">
              <Heart className="w-5 h-5 text-[var(--red)] flex-shrink-0" />
              <span>Tanpa Pengawet & Pewarna</span>
            </div>
          </div>
        </div>

        {/* Right Column Visual Artwork */}
        <div className="hero-art-container" aria-label="Lambang Resmi Dimsum Gyozen">
          <div className="hero-art-card" ref={logoRef}>
            {/* Top tags on card */}
            <div className="w-full flex justify-between items-center mb-2 z-10">
              <span className="badge badge-accent text-xs font-extrabold shadow-sm">
                ⭐ Best Seller: Mentai Lumer
              </span>
              <span className="badge badge-primary text-xs font-bold">
                Mulai 15 RB-an
              </span>
            </div>

            {/* Shield Logo */}
            <div className="py-2 w-full flex justify-center">
              <GyozenShieldLogo className="w-full max-w-[280px] sm:max-w-[320px] drop-shadow-2xl" />
            </div>

            {/* Bottom Tag inside card */}
            <div className="w-full mt-2 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between text-white text-xs font-semibold z-10">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Kemasan Jar Ebi Chili Oil 150ml</span>
              </span>
              <span className="font-mono text-amber-300 font-bold">Rp28.000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
