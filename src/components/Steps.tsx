import React from 'react';

export const Steps: React.FC = () => {
  return (
    <section className="section" id="langkah" aria-labelledby="steps-title">
      <div className="container-custom">
        <div className="section-header-split">
          <div className="section-header-copy">
            <div className="section-kicker">Cara pesan tanpa ribet</div>
            <h2 id="steps-title">Dari kepingin sampai siap menikmati.</h2>
            <p>
              Tidak perlu daftar akun. Pilih menu favoritmu dan kirim rincian pesanan langsung ke WhatsApp admin Gyozen.
            </p>
          </div>
        </div>

        <div className="steps">
          <article className="step">
            <span className="step-number">01</span>
            <h3>Pilih menu favoritmu</h3>
            <p>
              Masukkan varian Gyoza, Dimsum Goreng Keju, Mentai Lumer, Platter, atau paket Ready Frozen ke dalam keranjang
              pesanan.
            </p>
          </article>
          <article className="step">
            <span className="step-number">02</span>
            <h3>Kirim chat ke WhatsApp Gyozen</h3>
            <p>
              Isi nama dan area pengiriman. Sistem otomatis menyusun daftar menu beserta total estimasi harga ke nomor{' '}
              <strong>0898-1230-703</strong>.
            </p>
          </article>
          <article className="step">
            <span className="step-number">03</span>
            <h3>Pesanan siap diantar</h3>
            <p>
              Tim dapur Gyozen menyiapkan pesananmu dalam kondisi hangat siap santap maupun beku kedap udara sesuai
              permintaanmu.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
