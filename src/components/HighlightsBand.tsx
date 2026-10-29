import React from 'react';

export const HighlightsBand: React.FC = () => {
  return (
    <div className="highlights-band" aria-label="Keunggulan Utama Dimsum Gyozen">
      <div className="container-custom highlights-grid">
        <div className="highlight-cell">
          <div className="highlight-num">Rp15.000</div>
          <div className="highlight-desc">Harga mulai ramah kantong untuk porsi segar & mengenyangkan</div>
        </div>
        <div className="highlight-cell">
          <div className="highlight-num">10 Varian</div>
          <div className="highlight-desc">Gyoza, Dimsum, Goreng Keju, Mentai Lumer, Platter, Party Box & Frozen</div>
        </div>
        <div className="highlight-cell">
          <div className="highlight-num">3 Bulan</div>
          <div className="highlight-desc">Daya tahan kemasan Ready Frozen di freezer tanpa bahan pengawet</div>
        </div>
        <div className="highlight-cell">
          <div className="highlight-num">150 ml</div>
          <div className="highlight-desc">Kemasan jar Gyozen Ebi Chili Oil asli yang gurih & pedas nagih</div>
        </div>
      </div>
    </div>
  );
};
