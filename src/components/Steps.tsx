import React from 'react';
import { ShoppingCart, MessageCircle, Truck } from 'lucide-react';

export const Steps: React.FC = () => {
  return (
    <section className="section bg-[var(--background)]" id="langkah" aria-labelledby="steps-title">
      <div className="container-custom">
        <div className="max-w-xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--red)] mb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
            <span>Cara Pesan Tanpa Ribet</span>
          </div>
          <h2 id="steps-title" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)]">
            Dari kepingin sampai siap menikmati.
          </h2>
          <p className="mt-2 text-[var(--muted)] text-sm sm:text-base leading-relaxed">
            Tidak perlu registrasi akun berbelit-belit. Pilih menu favoritmu dan kirim format pesanan instan langsung ke
            WhatsApp admin Gyozen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="p-6 sm:p-7 rounded-2xl bg-white border border-[var(--line)] shadow-sm relative">
            <div className="w-12 h-12 rounded-xl bg-[var(--red)] text-white font-mono font-black text-lg flex items-center justify-center mb-5 shadow-sm">
              01
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-2 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[var(--red)]" />
              <span>Pilih Menu Favoritmu</span>
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              Masukkan varian Gyoza, Dimsum Goreng Keju, Mentai Lumer, Platter, atau paket Ready Frozen ke keranjang pesanan.
            </p>
          </article>

          <article className="p-6 sm:p-7 rounded-2xl bg-white border border-[var(--line)] shadow-sm relative">
            <div className="w-12 h-12 rounded-xl bg-[var(--yellow)] text-[var(--ink)] font-mono font-black text-lg flex items-center justify-center mb-5 shadow-sm">
              02
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>Kirim Chat WhatsApp</span>
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              Isi nama pemesan dan kecamatan pengiriman. Sistem otomatis menyusun rincian pesanan ke nomor resmi{' '}
              <strong className="text-[var(--red)]">0898-1230-703</strong>.
            </p>
          </article>

          <article className="p-6 sm:p-7 rounded-2xl bg-white border border-[var(--line)] shadow-sm relative">
            <div className="w-12 h-12 rounded-xl bg-[var(--cream-warm)] text-[var(--brown)] font-mono font-black text-lg flex items-center justify-center mb-5 shadow-sm border border-[var(--line)]">
              03
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-2 flex items-center gap-2">
              <Truck className="w-5 h-5 text-sky-700" />
              <span>Pesanan Siap Diantar</span>
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              Tim dapur Gyozen menyiapkan pesananmu dalam kondisi hangat siap santap maupun beku kedap udara sesuai permintaanmu.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
