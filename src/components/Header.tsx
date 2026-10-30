import React, { useState } from 'react';
import { ShoppingBag, Menu, X, MessageCircle, ChevronRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <aside className="announcement-bar" aria-label="Informasi Operasional">
        <div className="container-custom flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Buka Setiap Hari
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="hidden md:inline text-amber-200/90 font-medium">
              ✨ Free Ongkir Area Sidoarjo Min. 50k
            </span>
          </div>
        </div>
      </aside>

      {/* Main Glass Header */}
      <header className="site-header">
        <div className="container-custom">
          <div className="header-inner">
            {/* Brand Logo */}
            <a className="brand group" href="#top" aria-label="Dimsum Gyozen, kembali ke atas">
              <span className="brand-mark transition-transform group-hover:scale-105" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 text-amber-100">
                  <path d="M5 19c0-6 5-10 11-10s11 4 11 10" stroke="#fff7e9" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M6 20h20M10 23h12" stroke="#fff7e9" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M12 10l-1-3m9 3 1-3" stroke="#ffc34b" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <span className="tracking-tight text-[18px] sm:text-[20px] font-black text-[var(--ink)]">
                  GYOZEN
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="header-nav hidden md:flex" aria-label="Navigasi Utama">
              <a className="nav-link hover:text-[var(--red)]" href="#menu">
                Menu & Foto
              </a>
              <a className="nav-link hover:text-[var(--red)]" href="#paket">
                Platter & Frozen
              </a>
              <a className="nav-link hover:text-[var(--red)]" href="#langkah">
                Cara Pesan
              </a>
              <a className="nav-link hover:text-[var(--red)]" href="#testimoni">
                Testimoni
              </a>
              <a className="nav-link hover:text-[var(--red)]" href="#faq">
                FAQ
              </a>
            </nav>

            {/* Header Right Actions */}
            <div className="header-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={onOpenCart}
                aria-label={`Buka keranjang pesanan, ${cartCount} menu`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Keranjang</span>
                <span className="cart-pill-count">{cartCount}</span>
              </button>

              <button
                className="btn btn-secondary mobile-menu-btn p-2 min-h-[40px] w-[40px] flex items-center justify-center text-[var(--ink)]"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobileDrawer"
                aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 stroke-[2.5] text-[var(--ink)]" />
                ) : (
                  <Menu className="w-5 h-5 stroke-[2.5] text-[var(--ink)]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Sheet Drawer */}
          <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} id="mobileDrawer">
            <div className="mobile-drawer-links">
              <a href="#menu" onClick={() => setMobileMenuOpen(false)}>
                <span>Katalog 10 Menu Gyozen</span>
                <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
              </a>
              <a href="#paket" onClick={() => setMobileMenuOpen(false)}>
                <span>Paket Platter & Stok Frozen</span>
                <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
              </a>
              <a href="#langkah" onClick={() => setMobileMenuOpen(false)}>
                <span>Cara Pesan WhatsApp</span>
                <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
              </a>
              <a href="#testimoni" onClick={() => setMobileMenuOpen(false)}>
                <span>Ulasan Pelanggan (Testimoni)</span>
                <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                <span>Pertanyaan Umum (FAQ)</span>
                <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--line)] flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="btn btn-accent w-full"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Lihat Keranjang Pesanan ({cartCount} Menu)</span>
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full text-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat Langsung Admin WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
