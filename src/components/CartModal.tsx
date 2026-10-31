import React, { useState, useEffect } from 'react';
import { CartItem, OrderFormState } from '../types';
import { formatRupiah, calculateTotal, buildWhatsAppOrderMessage, calculateKnownPieces, calculatePiecesPerGuest } from '../utils/order';
import { WHATSAPP_NUMBER, GYOZEN_PRODUCTS } from '../data/products';
import { X, Plus, Minus, MessageCircle, Copy, Check, ShoppingBag, MapPin, User, Utensils, Trash2 } from 'lucide-react';
import { ProductImage } from './ProductImage';

const FORM_STORAGE_KEY = 'gyozen_customer_form_v1';

interface CartModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onClearCart: () => void;
  onShowToast: (msg: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQty,
  onClearCart,
  onShowToast
}) => {
  const [form, setForm] = useState<OrderFormState>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(FORM_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            name: typeof parsed.name === 'string' ? parsed.name : '',
            type: typeof parsed.type === 'string' ? parsed.type : 'Siap Santap (Hangat)',
            area: typeof parsed.area === 'string' ? parsed.area : '',
            notes: typeof parsed.notes === 'string' ? parsed.notes : ''
          };
        }
      }
    } catch {
      // ignore
    }
    return {
      name: '',
      type: 'Siap Santap (Hangat)',
      area: '',
      notes: ''
    };
  });

  const [copied, setCopied] = useState(false);
  const [guestCount, setGuestCount] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Simpan data form ke localStorage setiap kali diubah agar repeat order tidak perlu ketik ulang
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
      }
    } catch {
      // ignore
    }
  }, [form]);

  if (!isOpen) return null;

  const total = calculateTotal(cart);
  const knownPieces = calculateKnownPieces(cart, GYOZEN_PRODUCTS);
  const piecesPerGuest = calculatePiecesPerGuest(knownPieces, Number(guestCount));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      onShowToast('<strong>Keranjang kosong!</strong> Tambahkan minimal 1 menu Gyozen terlebih dahulu.');
      return;
    }

    let extraNote = '';
    if (form.notes && form.notes.trim()) {
      extraNote = `\n*Catatan Khusus:* ${form.notes.trim()}`;
    }

    const message =
      buildWhatsAppOrderMessage({
        cart,
        customerName: form.name,
        servingType: form.type,
        deliveryArea: form.area
      }) + extraNote;

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

    let extraNote = '';
    if (form.notes && form.notes.trim()) {
      extraNote = `\n*Catatan Khusus:* ${form.notes.trim()}`;
    }

    const text =
      buildWhatsAppOrderMessage({
        cart,
        customerName: form.name,
        servingType: form.type,
        deliveryArea: form.area
      }) + extraNote;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onShowToast('<strong>Berhasil!</strong> Rincian pesanan disalin ke clipboard.');
    } catch {
      onShowToast('Gagal menyalin teks pesanan.');
    }
    document.body.removeChild(area);
  };

  const handleConfirmClear = () => {
    onClearCart();
    setShowClearConfirm(false);
    onShowToast('Keranjang pesanan telah dikosongkan.');
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
      <div className="modal-dialog">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-3 mt-0.5">
              <h3 id="modalTitle" className="text-xl sm:text-2xl font-black text-[var(--ink)] tracking-tight">
                Keranjang Pesanan Gyozen
              </h3>
            </div>
          </div>
          <button
            className="w-9 h-9 rounded-xl border border-[var(--line)] hover:bg-neutral-100 flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela pesanan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action strip: Cart count & Kosongkan Keranjang */}
        {cart.length > 0 && (
          <div className="flex items-center justify-between pt-2 pb-1 text-xs">
            <span className="text-[var(--muted)] font-medium">
              {cart.reduce((sum, item) => sum + item.qty, 0)} item dalam keranjang
            </span>

            {/* Inline Confirmation for Clear Cart */}
            {!showClearConfirm ? (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center gap-1 text-[var(--muted)] hover:text-[var(--red)] transition-colors font-semibold"
                aria-label="Kosongkan seluruh keranjang"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Kosongkan keranjang</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                <span className="text-rose-900 font-bold text-[11px]">Yakin kosongkan?</span>
                <button
                  type="button"
                  onClick={handleConfirmClear}
                  className="px-2 py-0.5 rounded bg-[var(--red)] text-white text-[11px] font-bold hover:bg-rose-800 transition-colors"
                >
                  Ya
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2 py-0.5 rounded bg-neutral-200 text-neutral-800 text-[11px] font-semibold hover:bg-neutral-300 transition-colors"
                >
                  Batal
                </button>
              </div>
            )}
          </div>
        )}

        {/* Cart items list */}
        <div className="my-3 max-h-[220px] overflow-y-auto pr-1 flex flex-col gap-2.5">
          {cart.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-xl bg-amber-50/60 border border-dashed border-amber-900/20">
              <ShoppingBag className="w-8 h-8 text-amber-800/40 mx-auto mb-2" />
              <p className="text-sm font-bold text-[var(--ink)]">Keranjang masih kosong</p>
              <p className="text-xs text-[var(--muted)] mt-1">
                Silakan pilih menu dimsum hangat atau stok Ready Frozen favoritmu.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[var(--line)] shadow-xs gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.imageUrl && (
                    <ProductImage
                      src={item.imageUrl}
                      alt={item.name}
                      thumbnailOnly={true}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-amber-900/10"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-[var(--ink)] truncate">{item.name}</p>
                    <p className="text-xs font-semibold text-[var(--red)] tabular-nums">
                      {formatRupiah(item.price)} × {item.qty} ={' '}
                      <span className="font-bold">{formatRupiah(item.price * item.qty)}</span>
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 flex-shrink-0 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
                  <button
                    className="w-7 h-7 rounded-md bg-white hover:bg-amber-100 active:scale-90 flex items-center justify-center text-xs font-bold transition-all duration-150"
                    type="button"
                    onClick={() => onUpdateQty(item.id, -1)}
                    aria-label={`Kurangi jumlah ${item.name}`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="tabular-nums min-w-[20px] text-center font-black text-xs">
                    {item.qty}
                  </span>
                  <button
                    className="w-7 h-7 rounded-md bg-white hover:bg-amber-100 active:scale-90 flex items-center justify-center text-xs font-bold transition-all duration-150"
                    type="button"
                    onClick={() => onUpdateQty(item.id, 1)}
                    aria-label={`Tambah jumlah ${item.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Box */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-900/15 mb-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-amber-950">Total Estimasi Pesanan</span>
          <span className="text-xl sm:text-2xl font-black text-[var(--red)] tabular-nums tracking-tight">
            {formatRupiah(total)}
          </span>
        </div>

        {/* Customer Details Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-[var(--ink)] mb-1 flex items-center gap-1" htmlFor="custName">
              <User className="w-3.5 h-3.5 text-[var(--red)]" />
              <span>Nama Pemesan *</span>
            </label>
            <input
              className="input-shadcn"
              id="custName"
              type="text"
              required
              placeholder="Contoh: Kak Rina / Mas Adi"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[var(--ink)] mb-1 flex items-center gap-1" htmlFor="custType">
                <Utensils className="w-3.5 h-3.5 text-amber-700" />
                <span>Pilihan Sajian</span>
              </label>
              <select
                className="input-shadcn cursor-pointer"
                id="custType"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="Siap Santap (Hangat)">Siap Santap (Hangat)</option>
                <option value="Ready Frozen (Beku)">Ready Frozen (Beku)</option>
                <option value="Campur (Hangat & Frozen)">Campur (Hangat & Frozen)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--ink)] mb-1 flex items-center gap-1" htmlFor="custArea">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Alamat / Kecamatan *</span>
              </label>
              <input
                className="input-shadcn"
                id="custArea"
                type="text"
                required
                placeholder="Contoh: Sidoarjo Kota / Waru"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--ink)] mb-1 block" htmlFor="custNotes">
              Catatan Tambahan (Opsional)
            </label>
            <input
              className="input-shadcn"
              id="custNotes"
              type="text"
              placeholder="Contoh: Sambal dipisah / kirim jam 12 siang"
              value={form.notes || ''}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <button className="btn btn-primary btn-shimmer w-full h-12 text-base mt-2 shadow-md active:scale-[0.98] transition-transform" type="submit">
            <MessageCircle className="w-5 h-5 text-amber-200" />
            <span>Kirim Pesanan ke WhatsApp Gyozen</span>
          </button>

          <div className="flex justify-between items-center text-xs text-[var(--muted)] pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[var(--red)] font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Teks Pesanan'}</span>
            </button>
            <span className="text-[11px]">Terhubung ke WA resmi GYOZEN</span>
          </div>
        </form>
      </div>
    </div>
  );
};
