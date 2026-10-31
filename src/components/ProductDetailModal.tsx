import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatRupiah, buildWhatsAppInquiryUrl, isActivePromo } from '../utils/order';
import { WHATSAPP_NUMBER } from '../data/products';
import { X, Star, Plus, Minus, ShoppingBag, MessageCircle, Flame, Utensils, Clock, Check } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setIsAdded(false);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    setIsAdded(true);
    setTimeout(() => {
      onAddToCart(product, qty);
      setIsAdded(false);
      onClose();
    }, 450);
  };

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="productDetailTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-lg overflow-hidden relative">
        {/* Floating Close Button */}
        <button
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          type="button"
          onClick={onClose}
          aria-label="Tutup pratinjau menu"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Product Photo */}
          <div className="relative bg-[#1f140e] flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-[440px]">
            <ProductImage
              src={product.imageUrl}
              alt={product.name}
              bgColor={product.bg}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              width={480}
              height={440}
              sizes="(min-width: 768px) 400px, 100vw"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              <span
                className={`badge ${
                  product.tagStyle === 'spicy'
                    ? 'badge-primary'
                    : product.tagStyle === 'frozen'
                    ? 'badge-frozen'
                    : 'badge-accent'
                } shadow-md text-xs`}
              >
                {product.tag}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/60 border border-white/10 text-white flex items-center justify-between text-xs">
              <span className="font-bold">Dimsum & Gyoza · Gyozen</span>
              <span className="text-amber-300 font-mono text-[11px] font-bold">{product.index}</span>
            </div>
          </div>

          {/* Right Column: Information & Order Action */}
          <div className="p-5 sm:p-7 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-1.5">
                <span className="font-mono text-amber-800 font-bold uppercase tracking-wider text-[11px]">
                  {product.category === 'hangat' ? 'Siap Santap Hangat' : product.category === 'frozen' ? 'Ready Frozen' : 'Pelengkap'}
                </span>
                {product.rating && product.ratingSource && (
                  <div className="inline-flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-900/10">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating.toFixed(1)}</span>
                    <span className="text-[var(--muted)] text-[11px] font-normal">({product.soldCount})</span>
                  </div>
                )}
              </div>

              <h3 id="productDetailTitle" className="text-xl sm:text-2xl font-black text-[var(--ink)] tracking-tight">
                {product.name}
              </h3>

              {product.portion && (
                <p className="text-xs font-semibold text-amber-900/90 mt-1 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[var(--red)]" />
                  <span>{product.portion}</span>
                </p>
              )}

              {/* Price Row */}
              <div className="mt-3 py-2 px-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 flex items-baseline gap-2.5 flex-wrap">
                <span className="text-2xl font-black text-[var(--red)] tabular-nums tracking-tight">
                  {formatRupiah(product.price)}
                </span>
                {isActivePromo(product) && (
                  <>
                    <span className="text-xs text-[var(--muted)] line-through font-bold">
                      {formatRupiah(product.oldPrice as number)}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold ml-auto bg-emerald-100 px-2 py-0.5 rounded-full">
                      Hemat {formatRupiah((product.oldPrice as number) - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-3 leading-relaxed">
                {product.desc}
              </p>

              {/* Composition & Serving Tip */}
              <div className="mt-4 pt-3 border-t border-[var(--line)] flex flex-col gap-2.5 text-xs">
                {product.composition && (
                  <div>
                    <span className="font-bold text-[var(--ink)] block mb-0.5">Bahan & Isian:</span>
                    <span className="text-[var(--muted)] leading-relaxed">{product.composition}</span>
                  </div>
                )}

                {product.servingTip && (
                  <div className="p-2.5 rounded-lg bg-orange-50/80 border border-orange-900/10">
                    <span className="font-bold text-orange-950 flex items-center gap-1 mb-0.5">
                      <Flame className="w-3.5 h-3.5 text-orange-600" />
                      Saran Penyajian:
                    </span>
                    <span className="text-orange-900/90">{product.servingTip}</span>
                  </div>
                )}

                {product.storageTip && (
                  <div className="text-[11px] text-[var(--muted)] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-700 flex-shrink-0" />
                    <span>{product.storageTip}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls: Qty + Add to Cart */}
            <div className="mt-5 pt-3 border-t border-[var(--line)]">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--ink)]">Jumlah:</span>
                  <div className="inline-flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
                    <button
                      type="button"
                      className="w-7 h-7 rounded-lg bg-white hover:bg-amber-100 active:scale-90 flex items-center justify-center text-sm font-bold transition-all duration-150"
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      aria-label="Kurangi jumlah"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="tabular-nums min-w-[24px] text-center font-black text-sm">
                      {qty}
                    </span>
                    <button
                      type="button"
                      className="w-7 h-7 rounded-lg bg-white hover:bg-amber-100 active:scale-90 flex items-center justify-center text-sm font-bold transition-all duration-150"
                      onClick={() => setQty((prev) => prev + 1)}
                      aria-label="Tambah jumlah"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[var(--muted)] block leading-none mb-0.5">Subtotal</span>
                  <span className="text-lg font-black text-[var(--red)] tabular-nums">
                    {formatRupiah(product.price * qty)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`btn flex-1 h-11 text-sm shadow-md transition-all duration-200 ${
                    isAdded
                      ? 'bg-emerald-700 text-white border-emerald-800 scale-[1.02]'
                      : 'btn-primary active:scale-95'
                  }`}
                  onClick={handleAdd}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 animate-in zoom-in-50 duration-200" />
                      <span>Ditambahkan!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Tambah ke Keranjang</span>
                    </>
                  )}
                </button>

                <a
                  href={buildWhatsAppInquiryUrl(
                    WHATSAPP_NUMBER,
                    `${product.name} (${formatRupiah(product.price)})`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary h-11 px-3 active:scale-95 transition-transform"
                  title="Tanya ketersediaan via WA"
                  aria-label="Tanya ketersediaan via WA"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
