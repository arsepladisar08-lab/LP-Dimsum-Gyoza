import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatRupiah } from '../utils/order';

interface MobileBottomBarProps {
  cartCount: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ cartCount, totalPrice, onOpenCart }) => {
  if (cartCount === 0) return null;

  return (
    <aside className="mobile-bottom-bar" aria-label="Ringkasan keranjang">
      <div className="mobile-cart-summary">
        <span>{cartCount} menu dipilih</span>
        <strong>{formatRupiah(totalPrice)}</strong>
      </div>
      <button type="button" onClick={onOpenCart} aria-label="Lihat keranjang dan lanjut pesan">
        <ShoppingBag size={16}/> Lihat nota <ArrowRight size={16}/>
      </button>
    </aside>
  );
};
