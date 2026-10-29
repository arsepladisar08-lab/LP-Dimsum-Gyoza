import React, { useState } from 'react';
import { CartItem, OrderFormState } from '../types';
import { formatRupiah, calculateTotal, buildWhatsAppOrderMessage } from '../utils/order';
import { WHATSAPP_NUMBER } from '../data/products';

interface CartModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (index: number, delta: number) => void;
  onShowToast: (msg: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQty,
  onShowToast
}) => {
  const [form, setForm] = useState<OrderFormState>({
    name: '',
    type: 'Siap Santap (Hangat)',
    area: ''
  });

  if (!isOpen) return null;

  const total = calculateTotal(cart);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      onShowToast('<strong>Keranjang kosong!</strong> Tambahkan minimal 1 menu Gyozen terlebih dahulu.');
      return;
    }
    const message = buildWhatsAppOrderMessage({
      cart,
      customerName: form.name,
      servingType: form.type,
      deliveryArea: form.area
    });

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
    onShowToast('Membuka WhatsApp resmi <strong>Dimsum Gyozen (0898-1230-703)</strong>...');
  };

  const handleCopy = () => {
    if (cart.length === 0) {
      onShowToast('Keranjang pesanan masih kosong.');
      return;
    }
    const text = buildWhatsAppOrderMessage({
      cart,
      customerName: form.name,
      servingType: form.type,
      deliveryArea: form.area
    });

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          onShowToast('<strong>Berhasil!</strong> Rincian pesanan disalin ke clipboard.');
        })
        .catch(() => {
          fallbackCopy(text);
        });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
      onShowToast('<strong>Berhasil!</strong> Rincian pesanan disalin ke clipboard.');
    } catch {
      onShowToast('Gagal menyalin teks pesanan.');
    }
    document.body.removeChild(area);
  };

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span className="card-index">ORDER LANGSUNG KE WA 0898-1230-703</span>
            <h3 id="modalTitle">Keranjang Pesanan Gyozen</h3>
          </div>
          <button
            className="close-btn"
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela pesanan"
          >
            &times;
          </button>
        </div>

        {/* Cart items list */}
        <div className="cart-items-wrap">
          {cart.length === 0 ? (
            <div className="cart-row justify-center text-center py-6">
              <span className="text-[var(--muted)] font-bold text-sm">
                Keranjang masih kosong. Yuk, pilih menu Gyozen terlebih dahulu!
              </span>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="cart-row">
                <div>
                  <p className="cart-row-title">{item.name}</p>
                  <p className="cart-row-sub">
                    {formatRupiah(item.price)} &times; {item.qty} = {formatRupiah(item.price * item.qty)}
                  </p>
                </div>
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    type="button"
                    onClick={() => onUpdateQty(idx, -1)}
                    aria-label={`Kurangi jumlah ${item.name}`}
                  >
                    -
                  </button>
                  <span className="tabular-nums min-w-[20px] text-center font-extrabold text-sm">
                    {item.qty}
                  </span>
                  <button
                    className="qty-btn"
                    type="button"
                    onClick={() => onUpdateQty(idx, 1)}
                    aria-label={`Tambah jumlah ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary-box">
          <span>Total estimasi pesanan</span>
          <span className="price-current tabular-nums">{formatRupiah(total)}</span>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <div>
            <label className="field-label" htmlFor="custName">
              Nama pemesan *
            </label>
            <input
              className="field-input"
              id="custName"
              type="text"
              required
              placeholder="Contoh: Kak Rina / Mas Adi"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-grid-2">
            <div>
              <label className="field-label" htmlFor="custType">
                Pilihan sajian
              </label>
              <select
                className="field-input"
                id="custType"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="Siap Santap (Hangat)">Siap santap (Hangat)</option>
                <option value="Ready Frozen (Beku)">Ready Frozen (Tahan 3 bulan)</option>
                <option value="Campur (Hangat & Frozen)">Campur (Hangat & Frozen)</option>
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="custArea">
                Alamat / Kecamatan *
              </label>
              <input
                className="field-input"
                id="custArea"
                type="text"
                required
                placeholder="Contoh: Sidoarjo Kota / Waru"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
              />
            </div>
          </div>

          <button className="btn btn-red w-full mt-1" type="submit">
            <span>Kirim pesanan ke WhatsApp Gyozen</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-[18px] h-[18px]">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex justify-between items-center text-xs text-[var(--muted)] pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="bg-transparent border-none p-0 text-[var(--red)] font-extrabold underline cursor-pointer"
            >
              Salin teks pesanan
            </button>
            <span>Terhubung ke WA resmi 0898-1230-703</span>
          </div>
        </form>
      </div>
    </div>
  );
};
