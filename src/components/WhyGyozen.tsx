import React from 'react';

interface WhyGyozenProps {
  onAddBundle: (name: string, price: number) => void;
}

export const WhyGyozen: React.FC<WhyGyozenProps> = ({ onAddBundle }) => {
  return (
    <section className="section why" id="paket" aria-labelledby="why-title">
      <div className="container-custom why-layout">
        <div className="why-copy">
          <div className="section-kicker">Praktis, enak, & selalu jadi favorit</div>
          <h2 id="why-title">
            Bikin momen kumpul jadi lebih <span style={{ color: 'var(--red)' }}>seru.</span>
          </h2>
          <p>
            Ngemil sore sendiri, butuh teman lembur, atau mau traktir keluarga di rumah? Gyozen diracik dari daging ayam
            dan udang pilihan yang <em>fresh & juicy</em> dengan kulit lembut yang tidak keras meski sudah dingin.
          </p>

          {/* Highlighted Bundle Box */}
          <div className="bundle-highlight-box">
            <span className="card-index">REKOMENDASI PAKET KOMPLIT</span>
            <h3>Dimsum Platter (3-in-1) & Stok Kulkas</h3>
            <ul className="bundle-list">
              <li>
                <strong>Dimsum Platter (Rp45.000):</strong> Kombinasi Mentai Lumer + Gyoza + Dimsum Goreng Keju + 2 cup
                saus.
              </li>
              <li>
                <strong>Party Box Rame-Rame (Rp65.000):</strong> Tray besar Mentai Lumer & Dimsum Original kukus untuk
                kumpul keluarga.
              </li>
              <li>
                <strong>Paket Stok Kulkas 3 Bulan (Rp125.000):</strong> 3 Pack Ready Frozen (Dimsum Mix, Goreng Keju,
                Gyoza) + 1 Jar Ebi Chili Oil 150ml.
              </li>
            </ul>
            <div className="flex flex-wrap gap-2.5">
              <button
                className="btn btn-red btn-sm"
                type="button"
                onClick={() => onAddBundle('Dimsum Platter Komplit (3-in-1)', 45000)}
              >
                + Ambil Dimsum Platter (Rp45.000)
              </button>
              <button
                className="btn btn-paper btn-sm"
                type="button"
                onClick={() =>
                  onAddBundle(
                    'Paket Stok Kulkas (3 Pack Frozen + Ebi Chili Oil 150ml)',
                    125000
                  )
                }
              >
                + Paket Stok Frozen (Rp125.000)
              </button>
            </div>
          </div>
        </div>

        <div className="benefit-list">
          <div className="benefit">
            <span className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15 8l6.5 1-4.7 4.5 1.1 6.5L12 17l-5.9 3 1.1-6.5L2.5 9 9 8l3-6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <h3>Isian padat daging yang fresh & juicy</h3>
              <p>
                Bukan dimsum yang dominan tepung. Setiap gigitan Gyoza dan Dimsum Gyozen terasa padat daging, gurih, dan
                lembut.
              </p>
            </div>
          </div>

          <div className="benefit">
            <span className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3c2.5 3.5 5 6.5 5 10.5A5 5 0 0 1 7 13.5C7 9.5 9.5 6.5 12 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <h3>Sensasi Mentai Lumer & Goreng Keju</h3>
              <p>
                Saus mentai spesial yang di-torch harum di atas dimsum hangat, serta Dimsum Goreng Keju renyah dengan
                keju meleleh di dalam.
              </p>
            </div>
          </div>

          <div className="benefit">
            <span className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 3h8v4H8V3ZM6 7h12v14H6V7Zm3 5h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <h3>Cocolan ikonik Gyozen Ebi Chili Oil 150ml</h3>
              <p>
                Diracik dari udang ebi pilihan dan rempah asli. Tersedia juga dalam kemasan jar segel 150ml untuk stok
                pendamping makan di rumah.
              </p>
            </div>
          </div>

          <div className="benefit">
            <span className="benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s8-4.2 8-10.5V5l-8-3-8 3v5.5C4 16.8 12 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="m8.5 11.5 2.2 2.2 4.8-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <h3>Halal Indonesia & tahan 3 bulan di freezer</h3>
              <p>
                Aman untuk seluruh keluarga karena dibuat tanpa bahan pengawet dan pewarna buatan. Kemasan Ready Frozen
                praktis tinggal kukus atau goreng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
