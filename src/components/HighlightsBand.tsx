import React from 'react';

export const HighlightsBand: React.FC = () => {
  return (
    <div className="highlights-band" aria-label="Keunggulan Utama Dimsum Gyozen">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 pr-2 sm:pr-4 border-r border-dashed border-[#fff7e9]/30">
            <div className="font-[var(--font-display)] text-xl sm:text-2xl font-black text-[var(--yellow)] tabular-nums leading-none">
              Rp15.000
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-[var(--cream)] leading-snug">
              Harga mulai ramah kantong & porsi mengenyangkan
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 pr-2 sm:pr-4 lg:border-r border-dashed border-[#fff7e9]/30">
            <div className="font-[var(--font-display)] text-xl sm:text-2xl font-black text-[var(--yellow)] tabular-nums leading-none">
              10 Varian
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-[var(--cream)] leading-snug">
              Gyoza, Dimsum, Keju, Mentai, Platter & Frozen
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 pr-2 sm:pr-4 border-r border-dashed border-[#fff7e9]/30">
            <div className="font-[var(--font-display)] text-xl sm:text-2xl font-black text-[var(--yellow)] tabular-nums leading-none">
              3 Bulan
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-[var(--cream)] leading-snug">
              Daya tahan kemasan Ready Frozen tanpa pengawet
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <div className="font-[var(--font-display)] text-xl sm:text-2xl font-black text-[var(--yellow)] tabular-nums leading-none">
              150 ml
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-[var(--cream)] leading-snug">
              Jar Gyozen Ebi Chili Oil asli gurih & pedas nagih
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
