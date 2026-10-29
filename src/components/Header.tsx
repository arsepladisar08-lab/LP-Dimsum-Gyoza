import React, { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeDrawer = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container-custom">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Dimsum Gyozen, kembali ke atas">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                <path d="M5 19c0-6 5-10 11-10s11 4 11 10" stroke="#fff7e9" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M6 20h20M10 23h12" stroke="#fff7e9" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M12 10l-1-3m9 3 1-3" stroke="#ffc34b" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              GYOZEN
              <span className="brand-caption">@gyozen.sda • Mulai 15 RB-an</span>
            </span>
          </a>

          <nav className="header-nav" aria-label="Navigasi Utama">
            <a className="nav-link" href="#menu">Menu Gyozen</a>
            <a className="nav-link" href="#paket">Platter & Frozen</a>
            <a className="nav-link" href="#langkah">Cara Pesan</a>
            <a className="nav-link" href="#faq">Tanya Jawab</a>
          </nav>

          <div className="header-actions">
            <button
              className="btn btn-red"
              type="button"
              onClick={onOpenCart}
              aria-label={`Buka keranjang pesanan, ${cartCount} menu`}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-[18px] h-[18px]">
                <path
                  d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9.5" cy="19.5" r="1.5" fill="currentColor" />
                <circle cx="16.5" cy="19.5" r="1.5" fill="currentColor" />
              </svg>
              <span>Pesan sekarang</span>
              <span className="cart-pill-count">{cartCount}</span>
            </button>

            <button
              className="btn btn-paper mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobileDrawer"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-[20px] h-[20px]">
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} id="mobileDrawer">
          <div className="mobile-drawer-links">
            <a href="#menu" onClick={closeDrawer}>Lihat 10 Menu Resmi Gyozen</a>
            <a href="#paket" onClick={closeDrawer}>Paket Platter & Stok Frozen</a>
            <a href="#langkah" onClick={closeDrawer}>3 Langkah Cara Pesan</a>
            <a href="#faq" onClick={closeDrawer}>Pertanyaan Umum (FAQ)</a>
          </div>
        </div>
      </div>
    </header>
  );
};
