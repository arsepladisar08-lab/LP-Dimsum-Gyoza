import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { GyozenShieldLogo } from './GyozenShieldLogo';

interface HeroProps {
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCart }) => {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true"/>
      <div className="container-custom hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-mark"><Sparkles size={13}/></span> Dimsum & Gyoza • Sidoarjo</div>
          <p className="hero-kicker">GOOD FOOD. GOOD MOOD.</p>
          <h1 id="hero-title">Satu gigitan,<br/>bikin hari makin <em>zen.</em></h1>
          <p className="hero-subtitle">
            Camilan hangat, gurih, dan penuh rasa untuk nemenin setiap momen. Temukan
            dimsum favorit, gyoza juicy, mentai lumer, hingga pilihan frozen untuk stok di rumah.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-large" type="button" onClick={onOpenCart}>
              Pesan sekarang <ArrowUpRight size={18}/>
            </button>
            <a className="btn btn-secondary btn-large" href="#menu">Jelajahi menu <ArrowDown size={17}/></a>
          </div>
          <div className="hero-footnote"><span className="hero-footnote-line"/> Dibuat untuk momen kecil yang terasa spesial.</div>
        </div>

        <div className="hero-visual" aria-label="Identitas visual Dimsum Gyozen">
          <div className="hero-orbit orbit-one" aria-hidden="true"/>
          <div className="hero-orbit orbit-two" aria-hidden="true"/>
          <div className="hero-poster">
            <div className="poster-top"><span>THE GYOZEN MOOD</span><span>01 — 2026</span></div>
            <div className="poster-logo"><GyozenShieldLogo className="w-full max-w-[330px] drop-shadow-xl"/></div>
            <div className="poster-caption"><span>GYOZA · DIMSUM · GOOD MOOD</span><b>MADE TO SHARE</b></div>
          </div>
          <span className="hero-sticker sticker-top">Gurih<br/>& juicy</span>
          <span className="hero-sticker sticker-bottom">A little<br/>treat ✳</span>
        </div>
      </div>
      <a className="scroll-down" href="#menu"><span>Kenali menu kami</span><ArrowDown size={15}/></a>
    </section>
  );
};
