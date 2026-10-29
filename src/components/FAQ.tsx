import React from 'react';
import { buildWhatsAppInquiryUrl } from '../utils/order';
import { WHATSAPP_NUMBER } from '../data/products';

export const FAQ: React.FC = () => {
  const askWhatsApp = () => {
    window.open(
      buildWhatsAppInquiryUrl(WHATSAPP_NUMBER, 'Pertanyaan seputar menu & ketersediaan stok Gyozen'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container-custom faq-wrap">
        <div className="faq-intro">
          <div className="section-kicker">Punya pertanyaan?</div>
          <h2 id="faq-title">Biar makin yakin sebelum pesan.</h2>
          <p>
            Mau tanya stok hari ini, ongkir ke lokasimu, atau pesanan jumlah banyak untuk acara? Langsung sapa tim kami.
          </p>
          <button className="btn" type="button" onClick={askWhatsApp}>
            <span>Tanya admin Gyozen</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-[18px] h-[18px]">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="faq-list">
          <details open>
            <summary>Apakah semua produk Dimsum Gyozen sudah Halal dan tanpa pengawet?</summary>
            <p>
              Ya! Seluruh varian menu Gyozen (termasuk Gyoza, Dimsum Mix, Dimsum Goreng Keju, Mentai Lumer, dan Ebi
              Chili Oil 150ml) telah bersertifikat <strong>Halal Indonesia</strong> serta diproduksi{' '}
              <strong>tanpa pengawet dan pewarna buatan</strong>.
            </p>
          </details>
          <details>
            <summary>Berapa lama daya tahan kemasan Ready Frozen di dalam freezer?</summary>
            <p>
              Kemasan <strong>Ready Frozen Gyozen</strong> (tersedia varian <em>Dimsum Mix, Dimsum Goreng Keju, dan Gyoza</em>)
              dikemas secara higienis dan kedap udara sehingga tahan disimpan hingga <strong>3 bulan di dalam freezer</strong>.
            </p>
          </details>
          <details>
            <summary>Apa perbedaan Dimsum Platter dan Party Box Gyozen?</summary>
            <p>
              <strong>Dimsum Platter (Rp45.000)</strong> berisi kombinasi 3 menu populer sekaligus dalam satu boks:{' '}
              <em>Dimsum Mentai Lumer + Gyoza + Dimsum Goreng Keju</em> lengkap dengan saus cocolan. Sedangkan{' '}
              <strong>Party Box (Rp65.000)</strong> hadir dalam tray besar berisi porsi ramai-ramai{' '}
              <em>Dimsum Mentai Lumer & Dimsum Original kukus</em> untuk acara keluarga atau kantor.
            </p>
          </details>
          <details>
            <summary>Apakah Gyozen Ebi Chili Oil bisa dibeli terpisah dalam kemasan botol?</summary>
            <p>
              Bisa! Selain mendapat saus cocolan di setiap pembelian porsi dimsum/gyoza, kamu juga bisa membeli{' '}
              <strong>Gyozen Ebi Chili Oil kemasan jar 150ml (Rp28.000)</strong> untuk stok cocolan di rumah.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};
