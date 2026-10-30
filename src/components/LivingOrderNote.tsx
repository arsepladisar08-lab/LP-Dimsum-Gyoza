import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { calculateKnownPieces, calculatePiecesPerGuest, calculateTotal, formatRupiah } from '../utils/order';
import { GYOZEN_PRODUCTS } from '../data/products';

interface LivingOrderNoteProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const LivingOrderNote: React.FC<LivingOrderNoteProps> = ({ cart, onOpenCart }) => {
  const total = calculateTotal(cart);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const [guestInput, setGuestInput] = useState('');
  const knownPieces = calculateKnownPieces(cart, GYOZEN_PRODUCTS);
  const guestCount = Number(guestInput);
  const averagePieces = calculatePiecesPerGuest(knownPieces, guestCount);

  return (
    <section className="section living-note-section" id="nota" aria-labelledby="note-title">
      <div className="container-custom living-note-layout">
        <div className="living-note-copy">
          <p className="section-kicker">PESANANMU, TERSUSUN RAPI</p>
          <h2 id="note-title">Nota kecil yang<br/><em>ikut bertumbuh.</em></h2>
          <p className="section-intro">Setiap menu yang kamu tambahkan akan muncul di sini. Periksa pilihanmu, lalu buka nota lengkap untuk mengisi detail pemesanan dan mengirimkannya ke WhatsApp.</p>
          <button className="btn btn-primary btn-large" type="button" onClick={onOpenCart}>
            <MessageCircle size={17}/> {cart.length ? 'Lanjutkan pesanan' : 'Buka nota pesanan'} <ArrowUpRight size={16}/>
          </button>
        </div>
        <div className="receipt-paper" aria-live="polite" aria-label="Pratinjau nota pesanan saat ini">
          <div className="receipt-head">
            <div><span className="receipt-brand">GYOZEN</span><span className="receipt-subtitle">ORDER NOTE</span></div>
            <span className="receipt-status">{cart.length ? 'DRAFT' : 'READY'}</span>
          </div>
          <div className="receipt-rule"/>
          <div className="receipt-meta"><span>ITEM PILIHAN</span><strong>{itemCount} item</strong></div>
          {cart.length === 0 ? (
            <p className="receipt-empty">Nota masih kosong. Tambahkan menu dari katalog untuk melihat pesananmu di sini.</p>
          ) : (
            <ul className="receipt-items">
              {cart.map((item) => (
                <li key={item.id}>
                  <span>{item.name}<small>{item.qty} × {formatRupiah(item.price)}</small></span>
                  <strong>{formatRupiah(item.price * item.qty)}</strong>
                </li>
              ))}
            </ul>
          )}
          <div className="receipt-rule"/>
          <div className="receipt-total"><span>SUBTOTAL MENU</span><strong>{formatRupiah(total)}</strong></div>
          <p className="receipt-footnote">Ongkir dan ketersediaan akan dikonfirmasi admin melalui WhatsApp.</p>
          <div className="portion-planner">
            <div>
              <strong>Hitung jumlah untuk acara</strong>
              <p>Jumlah pcs dihitung hanya dari produk yang mencantumkan isi kemasan atau porsi secara eksplisit.</p>
            </div>
            <label htmlFor="guest-count">Jumlah orang
              <input id="guest-count" type="number" min="1" step="1" inputMode="numeric" placeholder="Contoh: 5" value={guestInput} onChange={(event) => setGuestInput(event.target.value)}/>
            </label>
            <div className="portion-result">
              <strong>{knownPieces} pcs tercatat</strong>
              {averagePieces !== null && <span>Rata-rata {averagePieces.toFixed(1)} pcs per orang</span>}
            </div>
          </div>
          <button className="receipt-action" type="button" onClick={onOpenCart}>
            <ShoppingBag size={16}/> Buka nota lengkap
          </button>
        </div>
      </div>
    </section>
  );
};
