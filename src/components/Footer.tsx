import React from 'react';
import { MessageCircle, Instagram, MapPin, Clock, Phone, ShieldCheck } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-pro" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Informasi Dimsum Gyozen
      </h2>

      <div className="container-custom">
        <div className="footer-grid">
          {/* Column 1: Brand & Profile */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--red)] border border-white/20 flex items-center justify-center text-amber-200 text-sm font-black">
                🥟
              </span>
              <div>
                <span className="font-display font-black text-lg text-white tracking-tight">GYOZEN</span>
                <span className="block text-[11px] text-amber-200/80 font-medium">@gyozen.sda • Sidoarjo</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4 max-w-sm">
              Dimsum viral gurih, lumer, dan bikin nagih. Dibuat dengan resep istimewa padat daging ayam dan udang segar.
              Tersedia siap santap hangat dan paket beku higienis Ready Frozen tahan 3 bulan.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="badge badge-accent text-[11px] py-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Halal Indonesia
              </span>
              <span className="badge badge-outline border-white/20 text-white/90 text-[11px] py-1">
                Tanpa Pengawet
              </span>
            </div>
          </div>

          {/* Column 3: Customer Care & Services */}
          <div>
            <h3 className="footer-col-title">Layanan & Info</h3>
            <ul className="footer-links-list">
              <li><a href="#langkah">Cara Pesan WhatsApp</a></li>
              <li><a href="#faq">Tanya Jawab (FAQ)</a></li>
              <li><a href="#testimoni">Ulasan Pelanggan</a></li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Admin%20Gyozen%2C%20mau%20tanya%20info%20katering%20%2F%20pesanan%20acara`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pesanan Acara & Party Box
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Admin%20Gyozen%2C%20mau%20tanya%20program%20reseller%20frozen%20food`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Info Reseller / Frozen Food
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div>
            <h3 className="footer-col-title">Outlet & Kontak</h3>
            <div className="flex flex-col gap-3 text-xs sm:text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>Sidoarjo & Sekitarnya, Jawa Timur (Siap kirim via Kurir Instan / Paxel Frozen)</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Buka Setiap Hari: 10.00 – 21.00 WIB</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 font-semibold underline"
                >
                  0898-1230-703 (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-emerald-600 transition-colors flex items-center justify-center text-white"
                  aria-label="WhatsApp Gyozen"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/gyozen.sda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-rose-600 transition-colors flex items-center justify-center text-white"
                  aria-label="Instagram Gyozen"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {year} Dimsum Gyozen (@gyozen.sda). Halal Indonesia • Hak Cipta Dilindungi.
          </div>
        </div>
      </div>
    </footer>
  );
};
