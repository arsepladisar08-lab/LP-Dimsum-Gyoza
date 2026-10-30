import React from 'react';
import { MessageCircle, Instagram, MapPin, ArrowUpRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-pro" aria-labelledby="footer-heading">
      <div className="container-custom">
        <div className="footer-grid">
          <div className="footer-brand-column">
            <a className="footer-brand" href="#top" aria-label="Gyozen, kembali ke atas"><span className="footer-brand-mark">G.</span><span>GYOZEN<small>DIMSUM • GYOZA • FROZEN</small></span></a>
            <p>Teman ngemil untuk momen santai, kumpul bersama, dan stok praktis di rumah.</p>
            <span className="footer-location"><MapPin size={15}/> Sidoarjo, Jawa Timur</span>
          </div>
          <div><h3 className="footer-col-title">Jelajahi</h3><ul className="footer-links-list"><li><a href="#menu">Menu Gyozen</a></li><li><a href="#paket">Pilihan Gyozen</a></li><li><a href="#nota">Nota pesanan</a></li><li><a href="#faq">FAQ</a></li></ul></div>
          <div><h3 className="footer-col-title">Hubungi kami</h3><ul className="footer-links-list"><li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={14}/> WhatsApp 0898-1230-703</a></li><li><a href="https://instagram.com/gyozen.sda" target="_blank" rel="noopener noreferrer"><Instagram size={14}/> @gyozen.sda</a></li></ul><a className="footer-contact-link" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">Tanyakan ketersediaan menu <ArrowUpRight size={14}/></a></div>
        </div>
        <div className="footer-bottom"><span id="footer-heading">© {year} Dimsum Gyozen.</span><a href="#top">Kembali ke atas ↑</a></div>
      </div>
    </footer>
  );
};
