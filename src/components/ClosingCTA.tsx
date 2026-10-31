import React from 'react';
import { MessageCircle, ShoppingBag, Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

interface ClosingCTAProps { onOpenCart: () => void; }

export const ClosingCTA: React.FC<ClosingCTAProps> = ({ onOpenCart }) => (
  <section className="closing-section" aria-labelledby="closing-title">
    <div className="closing-deco closing-deco-one" aria-hidden="true"/><div className="closing-deco closing-deco-two" aria-hidden="true"/>
    <div className="container-custom closing-content">
      <h2 id="closing-title">Hari ini waktunya<br/><em>Gyozen.</em></h2>
      <p>Pilih menu yang kamu suka. Biar satu gigitan kecil bikin harimu terasa lebih menyenangkan.</p>
      <div className="closing-actions">
        <button className="btn btn-accent btn-large" type="button" onClick={onOpenCart}><ShoppingBag size={17}/> Pesan sekarang</button>
        <a className="btn closing-wa-btn btn-large" href={'https://wa.me/' + WHATSAPP_NUMBER} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/> Chat WhatsApp</a>
      </div>
      <a className="closing-instagram" href="https://instagram.com/gyozen.sda" target="_blank" rel="noopener noreferrer"><Instagram size={15}/> Ikuti @gyozen.sda <ArrowUpRight size={14}/></a>
    </div>
  </section>
);
