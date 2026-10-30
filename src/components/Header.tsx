import React, { useState } from 'react';
import { ShoppingBag, Menu, X, MessageCircle, ChevronRight, Instagram } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const links = [
  ['Menu', '#menu'],
  ['Cerita Gyozen', '#paket'],
  ['Testimoni', '#testimoni'],
  ['Cara Pesan', '#langkah'],
  ['FAQ', '#faq']
];

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <aside className="announcement-bar" aria-label="Informasi brand">
        <div className="container-custom announcement-inner">
          <span><i className="announcement-dot" /> Satu gigitan, bikin hari makin zen.</span>
          <a href="https://instagram.com/gyozen.sda" target="_blank" rel="noopener noreferrer">
            <Instagram size={14} /> @gyozen.sda
          </a>
        </div>
      </aside>

      <header className="site-header">
        <div className="container-custom header-inner">
          <a className="brand" href="#top" aria-label="Gyozen, kembali ke atas">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M7 29c0-11 7-19 17-19s17 8 17 19" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M7 30h34M12 36h24" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="m19 12-2-5m14 5 2-5" stroke="#FFC055" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="brand-wordmark">GYOZEN<small>DIMSUM • GYOZA • FROZEN</small></span>
          </a>

          <nav className="header-nav" aria-label="Navigasi utama">
            {links.map(([label, href]) => <a key={href} className="nav-link" href={href}>{label}</a>)}
          </nav>

          <div className="header-actions">
            <button className="btn btn-primary header-cart" type="button" onClick={onOpenCart} aria-label={`Buka keranjang, ${cartCount} item`}>
              <ShoppingBag size={17}/><span>Keranjang</span><span className="cart-pill-count">{cartCount}</span>
            </button>
            <button className="btn btn-secondary mobile-menu-btn" type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-controls="mobileDrawer" aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}>
              {mobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>

        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} id="mobileDrawer">
          <div className="container-custom mobile-drawer-content">
            {links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}<ChevronRight size={16}/></a>)}
            <button className="btn btn-primary w-full" type="button" onClick={() => { closeMenu(); onOpenCart(); }}>
              <ShoppingBag size={17}/> Lihat keranjang ({cartCount})
            </button>
            <a className="btn btn-secondary w-full" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17}/> Chat WhatsApp
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
