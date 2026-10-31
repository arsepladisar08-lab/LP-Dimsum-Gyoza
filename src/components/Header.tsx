import React, { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X, MessageCircle, ChevronRight } from 'lucide-react';
import { WHATSAPP_NUMBER, VERIFIED_TESTIMONIALS } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const links = [
  ['Menu', '#menu'],
  ['Paket', '#paket'],
  ['Cara Pesan', '#langkah'],
  ['FAQ', '#faq'],
  ['Testimoni', '#testimoni']
];

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 28);

    updateScrolledState();
    window.addEventListener('scroll', updateScrolledState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolledState);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);
  const visibleLinks = links.filter(
    ([, href]) => href !== '#testimoni' || VERIFIED_TESTIMONIALS.length >= 2
  );

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container-custom header-inner">
        <a className="brand" href="#top" aria-label="Gyozen, kembali ke atas" onClick={closeMenu}>
          <img
            className="brand-logo-image"
            src="/images/brand/gyozen-logo.webp"
            alt="Gyozen"
            width="192"
            height="199"
          />
        </a>

        <nav className="header-nav" aria-label="Navigasi utama">
          {visibleLinks.map(([label, href]) => (
            <a key={href} className="nav-link" href={href}>{label}</a>
          ))}
        </nav>

        <div className="header-actions">
          {cartCount > 0 && (
            <button
              className="btn btn-primary header-cart header-cart-enter"
              type="button"
              onClick={onOpenCart}
              aria-label={`Buka keranjang, ${cartCount} item`}
            >
              <ShoppingBag size={17}/>
              <span className="header-cart-label">Keranjang</span>
              <span className="cart-pill-count">{cartCount}</span>
            </button>
          )}
          <button
            className="btn btn-secondary mobile-menu-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobileDrawer"
            aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          >
            {mobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} id="mobileDrawer">
        <div className="container-custom mobile-drawer-content">
          {visibleLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}<ChevronRight size={16}/>
            </a>
          ))}
          {cartCount > 0 && (
            <button
              className="btn btn-primary w-full"
              type="button"
              onClick={() => { closeMenu(); onOpenCart(); }}
            >
              <ShoppingBag size={17}/> Lihat keranjang ({cartCount})
            </button>
          )}
          <a
            className="btn btn-secondary w-full"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={17}/> Chat WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
};
