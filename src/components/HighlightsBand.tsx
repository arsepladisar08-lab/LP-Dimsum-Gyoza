import React from 'react';

export const HighlightsBand: React.FC = () => {
  const message = 'Pesan mudah lewat WhatsApp · Stok dikonfirmasi admin · Ongkir mengikuti area · Pilihan hangat & ready frozen · ';
  return (
    <div className="ticker" aria-label="Informasi pemesanan Gyozen">
      <div className="ticker-track" aria-hidden="true">
        <span>{message}<b>✳</b> {message}<b>✳</b></span>
        <span>{message}<b>✳</b> {message}<b>✳</b></span>
      </div>
    </div>
  );
};
