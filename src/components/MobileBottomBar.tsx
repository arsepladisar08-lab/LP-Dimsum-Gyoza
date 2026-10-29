import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatRupiah } from '../utils/order';

interface MobileBottomBarProps {
  cartCount: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  cartCount,
  totalPrice,
  onOpenCart
}) => {
  if (cartCount === 0) return null;

  return (
    <aside
      aria-label="Keranjang belanja melayang"
      className="mobile-bottom-bar animate-in slide-in-from-bottom duration-200"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative grid place-items-center w-10 h-10 rounded-xl border-2 border-[var(--brown)] bg-[var(--yellow)] shadow-[2px_2px_0_var(--brown)] shrink-0">
          <ShoppingBag className="w-5 h-5 text-[var(--ink)]" />
          <span className="absolute -top-1.5 -right-1.5 grid place-items-center min-w-5 h-5 px-1 rounded-full bg-[var(--red)] text-[var(--paper)] text-[10px] font-black border border-[var(--brown)]">
            {cartCount}
          </span>
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-bold text-[var(--muted)] leading-none">
            {cartCount} menu di keranjang
          </div>
          <div className="font-[var(--font-display)] text-base font-black text-[var(--red)] tabular-nums leading-tight truncate">
            {formatRupiah(totalPrice)}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenCart}
        className="btn btn-red h-10 px-4 text-xs font-black shrink-0"
        aria-label="Lanjut pesan ke WhatsApp"
      >
        <span>Lanjut Pesan</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
