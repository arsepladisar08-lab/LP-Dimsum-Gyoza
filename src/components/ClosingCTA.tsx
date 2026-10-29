import React from 'react';
import { MessageCircle, ShoppingBag, FileCode, Instagram, ShieldCheck, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

interface ClosingCTAProps {
  onOpenCart: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({ onOpenCart }) => {
  return (
    <section className="section bg-gradient-to-br from-[#7c1315] via-[#610d10] to-[#45080b] text-white py-16 sm:py-24 relative overflow-hidden" aria-labelledby="closing-title">
      {/* Decorative ambient backdrop */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-red-400/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Praktis, Enak, & Selalu Jadi Favorit</span>
        </div>

        <h2 id="closing-title" className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Yuk, bikin harimu lebih <span className="text-[var(--yellow)]">Gyozen!</span>
        </h2>

        <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-xl mx-auto mb-8">
          Porsi hemat mulai <strong>15 RB-an</strong>. Pilih menu hangat siap santap atau stok Ready Frozen sekarang dan
          rasakan kelezatan dimsum yang gurih, lumer, dan bikin nagih.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <button className="btn btn-accent text-base px-6 h-12 shadow-lg" type="button" onClick={onOpenCart}>
            <ShoppingBag className="w-4 h-4" />
            <span>Buka Keranjang & Pesan Sekarang</span>
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-base px-5 h-12 bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Chat Admin WhatsApp</span>
          </a>
        </div>

        {/* Contact Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <a
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/25 backdrop-blur-md border border-white/15 text-white/90 hover:text-white hover:bg-black/40 transition-colors"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WA: 0898-1230-703</span>
          </a>

          <a
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/25 backdrop-blur-md border border-white/15 text-white/90 hover:text-white hover:bg-black/40 transition-colors"
            href="https://instagram.com/gyozen.sda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-3.5 h-3.5 text-rose-400" />
            <span>IG: @gyozen.sda</span>
          </a>

          <a
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/25 backdrop-blur-md border border-white/15 text-white/90 hover:text-white hover:bg-black/40 transition-colors"
            href="/assets/aistudio/landing_page_umkm_dimsum_gyozen__1__307720ac.html"
            target="_blank"
            rel="noopener noreferrer"
            title="Lihat file HTML landing page asli yang diimport"
          >
            <FileCode className="w-3.5 h-3.5 text-amber-300" />
            <span>File Asli (.html)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
