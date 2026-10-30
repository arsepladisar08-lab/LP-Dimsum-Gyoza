import React from 'react';
import { Sparkles, Flame, Snowflake, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface WhyGyozenProps {
  onAddBundle: (name: string, price: number, imageUrl?: string) => void;
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
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[var(--line)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-[var(--red)] text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Paling Laris
              </div>
              <div className="flex gap-4 items-start">
                <ProductImage
                  src="/images/menu/dimsum-platter-960.webp"
                  alt="Dimsum Platter Komplit"
                  bgColor="#f6e7ad"
                  width={80}
                  height={80}
                  sizes="80px"
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-amber-900/10"
                />
                <div className="min-w-0 pr-12">
                  <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider block">
                    Combo 3-in-1
                  </span>
                  <h3 className="text-lg font-black text-[var(--ink)] mt-0.5 mb-1 truncate">
                    Dimsum Platter Komplit
                  </h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-2">
                    Mentai Lumer + Gyoza Juicy + Dimsum Goreng Keju + 2 saus.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--line)]">
                <div>
                  <span className="text-[11px] text-[var(--muted)] line-through block leading-none">Rp55.000</span>
                  <span className="text-xl font-black text-[var(--red)]">Rp45.000</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onAddBundle(
                      'Dimsum Platter Komplit (3-in-1)',
                      45000,
                      '/images/menu/dimsum-platter-960.webp'
                    )
                  }
                  className="btn btn-primary btn-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ambil Platter</span>
                </button>
              </div>
            </div>

            {/* Bundle 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[var(--line)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="flex gap-4 items-start">
                <ProductImage
                  src="/images/menu/frozen-pack-dimsum-mix-960.webp"
                  alt="Paket Stok Kulkas Komplit"
                  bgColor="#e2ecf5"
                  width={80}
                  height={80}
                  sizes="80px"
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-amber-900/10"
                />
                <div className="min-w-0">
                  <span className="text-[11px] font-mono font-bold text-sky-800 uppercase tracking-wider block">
                    Stok Freezer 3 Bulan
                  </span>
                  <h3 className="text-lg font-black text-[var(--ink)] mt-0.5 mb-1 truncate">
                    Paket Stok Kulkas Komplit
                  </h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-2">
                    3 Pack Frozen (Mix, Goreng Keju, Gyoza) + 1 Jar Segel Chili Oil 150ml.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--line)]">
                <div>
                  <span className="text-[11px] text-[var(--muted)] line-through block leading-none">Rp145.000</span>
                  <span className="text-xl font-black text-[var(--red)]">Rp125.000</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onAddBundle(
                      'Paket Stok Kulkas (3 Pack Frozen + Ebi Chili Oil 150ml)',
                      125000,
                      '/images/menu/frozen-pack-dimsum-mix-960.webp'
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
