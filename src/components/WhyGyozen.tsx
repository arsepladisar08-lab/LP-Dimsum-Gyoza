import React from 'react';
import { Sparkles, Flame, Snowflake, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';

interface WhyGyozenProps {
  onAddBundle: (name: string, price: number) => void;
}

export const WhyGyozen: React.FC<WhyGyozenProps> = ({ onAddBundle }) => {
  return (
    <section className="section bg-[var(--cream)] border-y border-[var(--line)]" id="paket" aria-labelledby="why-title">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--red)] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Paket Favorit & Kualitas Bahan</span>
          </div>
          <h2 id="why-title" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)]">
            Bikin momen kumpul jadi lebih <span className="text-[var(--red)]">seru & kenyang.</span>
          </h2>
          <p className="mt-3 text-[var(--muted)] text-sm sm:text-base leading-relaxed">
            Ngemil sore sendiri, butuh teman lembur, atau mau traktir keluarga di rumah? Gyozen diracik dari daging ayam
            dan udang pilihan yang <em>fresh & juicy</em> dengan kulit lembut yang tidak keras meski sudah dingin.
          </p>
        </div>

        {/* Layout Grid: Featured Bundles & Why Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Highlighted Bundles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Bundle 1 */}
            <div className="p-6 rounded-2xl bg-white border border-[var(--line)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[var(--red)] text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Paling Laris
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">Combo 3-in-1</span>
              <h3 className="text-xl font-black text-[var(--ink)] mt-1 mb-2">Dimsum Platter Komplit</h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] mb-4">
                Kombinasi Dimsum Mentai Lumer + Gyoza Juicy + Dimsum Goreng Keju lengkap dengan 2 cup saus cocolan.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]">
                <div>
                  <span className="text-xs text-[var(--muted)] line-through block">Rp55.000</span>
                  <span className="text-2xl font-black text-[var(--red)]">Rp45.000</span>
                </div>
                <button
                  type="button"
                  onClick={() => onAddBundle('Dimsum Platter Komplit (3-in-1)', 45000)}
                  className="btn btn-primary btn-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ambil Platter</span>
                </button>
              </div>
            </div>

            {/* Bundle 2 */}
            <div className="p-6 rounded-2xl bg-white border border-[var(--line)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <span className="text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">Stok Freezer 3 Bulan</span>
              <h3 className="text-xl font-black text-[var(--ink)] mt-1 mb-2">Paket Stok Kulkas Komplit</h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] mb-4">
                3 Pack Ready Frozen (Dimsum Mix, Goreng Keju, Gyoza) + 1 Jar Segel Ebi Chili Oil 150ml untuk persediaan keluarga.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]">
                <div>
                  <span className="text-xs text-[var(--muted)] line-through block">Rp145.000</span>
                  <span className="text-2xl font-black text-[var(--red)]">Rp125.000</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onAddBundle(
                      'Paket Stok Kulkas (3 Pack Frozen + Ebi Chili Oil 150ml)',
                      125000
                    )
                  }
                  className="btn btn-accent btn-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ambil Paket Stok</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Key Quality Points (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[var(--line)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-900/10 flex items-center justify-center text-[var(--red)] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[var(--ink)] mb-1">
                Isian Padat Daging Fresh
              </h4>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Bukan dimsum yang dominan tepung. Setiap gigitan Gyoza dan Dimsum Gyozen terasa padat ayam dan udang, gurih, dan lembut.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[var(--line)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-900/10 flex items-center justify-center text-[var(--red)] mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[var(--ink)] mb-1">
                Mentai Lumer & Keju Meleleh
              </h4>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Saus mentai khas yang di-torch wangi di atas dimsum, serta varian Goreng Keju dengan keju meleleh di dalam.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[var(--line)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-900/10 flex items-center justify-center text-amber-700 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[var(--ink)] mb-1">
                Ebi Chili Oil Asli 150ml
              </h4>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Diracik dari udang ebi gurih dan rempah pilihan. Tersedia kemasan jar kaca 150ml untuk cocolan apa pun di rumah.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[var(--line)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-900/10 flex items-center justify-center text-sky-700 mb-4">
                <Snowflake className="w-5 h-5" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[var(--ink)] mb-1">
                Halal & Tahan 3 Bulan
              </h4>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Tanpa pengawet dan tanpa pewarna buatan. Kemasan beku kedap udara (vacuum pack) higienis tinggal kukus atau goreng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
