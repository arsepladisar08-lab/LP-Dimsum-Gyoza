import React from 'react';
import { MessageCircle } from 'lucide-react';

const steps = [
  'Pilih menu siap santap atau ready frozen dari katalog.',
  'Tambahkan menu ke nota, lalu periksa jumlah dan subtotalnya.',
  'Isi nama serta area pengiriman, kemudian kirim pesanan melalui WhatsApp.',
  'Admin membantu mengonfirmasi stok, ongkir, pembayaran, dan jadwal.'
];

export const Steps: React.FC = () => (
  <section className="section steps-section" id="langkah" aria-labelledby="steps-title">
    <div className="container-custom order-steps-layout">
      <div>
        <p className="section-kicker">CARA PESAN</p>
        <h2 id="steps-title">Pilih, susun,<br/><em>kirim ke Gyozen.</em></h2>
        <p className="section-intro">Tidak perlu membuat akun. Rincian pilihanmu akan disusun sebelum dikirim ke WhatsApp.</p>
      </div>
      <div className="order-steps-content">
        <ol className="order-steps-list">
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <a className="btn btn-primary" href="#nota"><MessageCircle size={16}/> Lihat nota pesanan</a>
      </div>
    </div>
  </section>
);
