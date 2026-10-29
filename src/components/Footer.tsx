import React from 'react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container-custom footer-inner">
        <div>
          <div className="footer-brand">GYOZEN (@gyozen.sda)</div>
          <div>Dimsum viral • Gurih • Lumer • Bikin nagih • WA: 0898-1230-703</div>
        </div>
        <div>
          © {year} UMKM Dimsum Gyozen. Halal Indonesia • Tanpa Pengawet & Pewarna Buatan.
        </div>
      </div>
    </footer>
  );
};
