import React from 'react';
import { buildWhatsAppInquiryUrl } from '../utils/order';
import { WHATSAPP_NUMBER } from '../data/products';
import { MessageCircle, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const askWhatsApp = () => {
    window.open(
      buildWhatsAppInquiryUrl(WHATSAPP_NUMBER, 'Pertanyaan seputar menu & ketersediaan stok Gyozen'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="section bg-[var(--cream)] border-t border-[var(--line)]" id="faq" aria-labelledby="faq-title">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--red)] mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Punya Pertanyaan?</span>
            </div>
            <h2 id="faq-title" className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)]">
              Biar makin yakin sebelum pesan.
            </h2>
            <p className="mt-3 text-[var(--muted)] text-sm sm:text-base leading-relaxed mb-6">
              Mau tanya ketersediaan stok hari ini, estimasi ongkir ke lokasimu, atau pemesanan jumlah banyak untuk pesta
              dan rapat kantor? Tim kami siap merespons cepat.
            </p>
            <button className="btn btn-primary" type="button" onClick={askWhatsApp}>
              <MessageCircle className="w-4 h-4 text-amber-200" />
              <span>Tanya Admin Gyozen</span>
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3">
            <details className="p-5 rounded-2xl bg-white border border-[var(--line)] shadow-sm group" open>
              <summary className="font-bold text-base text-[var(--ink)] cursor-pointer list-none flex items-center justify-between select-none">
                <span>Apakah semua produk Dimsum Gyozen Halal dan tanpa pengawet?</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--muted)] leading-relaxed pt-2 border-t border-amber-900/10">
                Ya! Seluruh varian menu Gyozen (termasuk Gyoza, Dimsum Mix, Dimsum Goreng Keju, Mentai Lumer, dan Ebi
                Chili Oil 150ml) telah bersertifikat <strong className="text-[var(--red)]">Halal Indonesia</strong> serta
                diproduksi <strong>tanpa pengawet dan pewarna buatan</strong> sehingga higienis dan aman untuk keluarga.
              </p>
            </details>

            <details className="p-5 rounded-2xl bg-white border border-[var(--line)] shadow-sm group">
              <summary className="font-bold text-base text-[var(--ink)] cursor-pointer list-none flex items-center justify-between select-none">
                <span>Berapa lama daya tahan kemasan Ready Frozen di freezer?</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--muted)] leading-relaxed pt-2 border-t border-amber-900/10">
                Kemasan <strong>Ready Frozen Gyozen</strong> (tersedia varian <em>Dimsum Mix, Dimsum Goreng Keju, dan Gyoza</em>)
                dikemas secara higienis menggunakan kemasan kedap udara (vacuum pack) sehingga tahan disimpan hingga{' '}
                <strong className="text-[var(--red)]">3 bulan di dalam freezer</strong>.
              </p>
            </details>

            <details className="p-5 rounded-2xl bg-white border border-[var(--line)] shadow-sm group">
              <summary className="font-bold text-base text-[var(--ink)] cursor-pointer list-none flex items-center justify-between select-none">
                <span>Apa perbedaan Dimsum Platter dan Party Box Gyozen?</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--muted)] leading-relaxed pt-2 border-t border-amber-900/10">
                <strong>Dimsum Platter (Rp45.000)</strong> berisi kombinasi 3 menu populer sekaligus dalam satu boks:{' '}
                <em>Dimsum Mentai Lumer + Gyoza + Dimsum Goreng Keju</em> lengkap dengan 2 saus cocolan. Sedangkan{' '}
                <strong>Party Box (Rp65.000)</strong> hadir dalam tray besar berisi porsi ramai-ramai{' '}
                <em>Dimsum Mentai Lumer & Dimsum Original kukus</em> untuk acara kumpul 3-5 orang.
              </p>
            </details>

            <details className="p-5 rounded-2xl bg-white border border-[var(--line)] shadow-sm group">
              <summary className="font-bold text-base text-[var(--ink)] cursor-pointer list-none flex items-center justify-between select-none">
                <span>Apakah Gyozen Ebi Chili Oil bisa dibeli terpisah dalam kemasan jar?</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--muted)] leading-relaxed pt-2 border-t border-amber-900/10">
                Bisa! Selain mendapat cocolan di setiap porsi dimsum/gyoza, Anda juga bisa memesan{' '}
                <strong>Gyozen Ebi Chili Oil kemasan jar 150ml (Rp28.000)</strong> untuk stok cocolan makan mie, nasi
                goreng, atau camilan di rumah.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};
