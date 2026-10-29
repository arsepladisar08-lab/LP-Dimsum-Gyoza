import React from 'react';
import { Star, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => {
  return (
    <section className="section bg-white" id="testimoni" aria-labelledby="testimoni-title">
      <div className="container-custom">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-900/15 text-amber-950 text-xs font-bold mb-3">
            <Heart className="w-3.5 h-3.5 text-[var(--red)] fill-[var(--red)]" />
            <span>Kata Mereka yang Sudah Coba</span>
          </div>
          <h2 id="testimoni-title" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)]">
            Disukai ratusan pecinta dimsum di <span className="text-[var(--red)]">Sidoarjo & Surabaya.</span>
          </h2>
          <p className="mt-3 text-[var(--muted)] text-sm sm:text-base leading-relaxed">
            Dari camilan santai keluarga hingga stok makanan darurat lezat di freezer, ini cerita pelanggan setia Dimsum Gyozen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--cream)] border border-[var(--line)] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-[var(--ink)] italic leading-relaxed mb-4">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)] flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <span className="text-xs text-[var(--muted)]">{t.city}</span>
                </div>
                <span className="badge badge-accent text-[10px]">{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
