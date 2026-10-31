import React, { useState, useEffect } from 'react';
import { CartItem, OrderFormState } from '../types';
import { formatRupiah, calculateTotal, buildWhatsAppOrderMessage, calculateKnownPieces, calculatePiecesPerGuest, buildDeliveryAddressLine, normalizeSingleLine, isValidCustomerName, isValidAddressDetail } from '../utils/order';
import { useIndonesiaRegionOptions } from '../hooks/useIndonesiaAddress';
import { WHATSAPP_NUMBER, GYOZEN_PRODUCTS } from '../data/products';
import { X, Plus, Minus, MessageCircle, Copy, Check, ShoppingBag, MapPin, User, Utensils, Trash2, ShieldCheck, RefreshCw } from 'lucide-react';
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
    const emptyForm: OrderFormState = {
      name: '', type: 'Siap Santap (Hangat)', provinceId: '', regencyId: '',
      districtId: '', villageId: '', postalCode: '', addressDetail: '',
      manualRegion: '', legacyArea: '', notes: ''
    };
    try {
      if (typeof window !== 'undefined') {
        const saved = window.localStorage.getItem(FORM_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Record<string, unknown>;
          return {
            name: typeof parsed.name === 'string' ? parsed.name : '',
            type: typeof parsed.type === 'string' ? parsed.type : emptyForm.type,
            provinceId: typeof parsed.provinceId === 'string' ? parsed.provinceId : '',
            regencyId: typeof parsed.regencyId === 'string' ? parsed.regencyId : '',
            districtId: typeof parsed.districtId === 'string' ? parsed.districtId : '',
            villageId: typeof parsed.villageId === 'string' ? parsed.villageId : '',
            postalCode: typeof parsed.postalCode === 'string' ? parsed.postalCode : '',
            addressDetail: typeof parsed.addressDetail === 'string' ? parsed.addressDetail : '',
            manualRegion: typeof parsed.manualRegion === 'string' ? parsed.manualRegion : '',
            legacyArea: typeof parsed.legacyArea === 'string' ? parsed.legacyArea : typeof parsed.area === 'string' ? parsed.area : '',
            notes: typeof parsed.notes === 'string' ? parsed.notes : ''
          };
        }
      }
    } catch {
      // Corrupt or inaccessible saved data is ignored safely.
    }
    return emptyForm;
  });

  const [copied, setCopied] = useState(false);
  const [guestCount, setGuestCount] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const provinces = useIndonesiaRegionOptions('/provinces.json', isOpen);
  const regencies = useIndonesiaRegionOptions(form.provinceId ? `/regencies/${form.provinceId}.json` : null, isOpen);
  const districts = useIndonesiaRegionOptions(form.regencyId ? `/districts/${form.regencyId}.json` : null, isOpen);
  const villages = useIndonesiaRegionOptions(form.districtId ? `/villages/${form.districtId}.json` : null, isOpen);
  const regionLookupUnavailable = Boolean(provinces.error || regencies.error || districts.error || villages.error);
  const selectedProvince = provinces.data.find((item) => item.id === form.provinceId);
  const selectedRegency = regencies.data.find((item) => item.id === form.regencyId);
  const selectedDistrict = districts.data.find((item) => item.id === form.districtId);
  const selectedVillage = villages.data.find((item) => item.id === form.villageId);

  // Simpan data form ke localStorage setiap kali diubah agar repeat order tidak perlu ketik ulang
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const hasPrivateDetails = [
          form.name, form.provinceId, form.regencyId, form.districtId, form.villageId,
          form.postalCode, form.addressDetail, form.manualRegion, form.legacyArea, form.notes
        ].some((value) => value.trim().length > 0);
        if (hasPrivateDetails) {
          localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
        } else {
          localStorage.removeItem(FORM_STORAGE_KEY);
        }
      }
    } catch {
      // ignore
    }
  }, [form]);

  if (!isOpen) return null;

  const total = calculateTotal(cart);
  const knownPieces = calculateKnownPieces(cart, GYOZEN_PRODUCTS);
  const piecesPerGuest = calculatePiecesPerGuest(knownPieces, Number(guestCount));

  const buildCurrentOrderMessage = () => {
    const deliveryAddress = buildDeliveryAddressLine({
      province: regionLookupUnavailable ? '' : selectedProvince?.name,
      regency: regionLookupUnavailable ? '' : selectedRegency?.name,
      district: regionLookupUnavailable ? '' : selectedDistrict ? `Kecamatan ${selectedDistrict.name}` : '',
      village: regionLookupUnavailable ? '' : selectedVillage ? `Desa/Kelurahan ${selectedVillage.name}` : '',
      administrativeArea: regionLookupUnavailable ? form.manualRegion : '',
      postalCode: form.postalCode,
      detail: form.addressDetail
    });
    const extraNote = normalizeSingleLine(form.notes);
    return buildWhatsAppOrderMessage({
      cart, customerName: form.name, servingType: form.type, deliveryAddress
    }) + (extraNote ? `\n*Catatan Khusus:* ${extraNote}` : '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      onShowToast('<strong>Keranjang kosong!</strong> Tambahkan minimal 1 menu Gyozen terlebih dahulu.');
      return;
    }
    const name = normalizeSingleLine(form.name);
    const detail = normalizeSingleLine(form.addressDetail);
    const manualRegion = normalizeSingleLine(form.manualRegion);
    const postalCode = normalizeSingleLine(form.postalCode);

    if (!isValidCustomerName(name)) {
      onShowToast('Nama harus 2–80 karakter dan hanya berisi huruf, spasi, titik, apostrof, atau tanda hubung.');
      return;
    }
    if (regionLookupUnavailable) {
      if (manualRegion.length < 5 || manualRegion.length > 250) {
        onShowToast('Isi wilayah administratif secara lengkap: provinsi, kabupaten/kota, kecamatan, dan desa/kelurahan.');
        return;
      }
    } else if (!selectedProvince || !selectedRegency || !selectedDistrict || !selectedVillage) {
      onShowToast('Pilih provinsi, kabupaten/kota, kecamatan, dan desa/kelurahan terlebih dahulu.');
      return;
    }
    if (postalCode && !/^\d{5}$/.test(postalCode)) {
      onShowToast('Kode pos harus terdiri dari 5 angka. Kode pos boleh dikosongkan bila belum tersedia.');
      return;
    }
    if (!isValidAddressDetail(detail)) {
      onShowToast('Detail alamat harus 6–250 karakter. Tambahkan nama jalan, nomor rumah, RT/RW, atau patokan.');
      return;
    }

    const message = buildCurrentOrderMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    onShowToast('Membuka WhatsApp resmi <strong>Dimsum Gyozen (0898-1230-703)</strong>...');
  };

  const handleCopy = () => {
    if (cart.length === 0) {
      onShowToast('Keranjang pesanan masih kosong.');
      return;
    }
    const text = buildCurrentOrderMessage();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        onShowToast('<strong>Berhasil!</strong> Rincian pesanan disalin ke clipboard.');
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  };

  const handleClearSavedDetails = () => {
    const emptyForm: OrderFormState = {
      name: '', type: 'Siap Santap (Hangat)', provinceId: '', regencyId: '',
      districtId: '', villageId: '', postalCode: '', addressDetail: '',
      manualRegion: '', legacyArea: '', notes: ''
    };
    setForm(emptyForm);
    try { window.localStorage.removeItem(FORM_STORAGE_KEY); } catch { /* storage unavailable */ }
    onShowToast('Data nama dan alamat lama telah dikosongkan dari formulir.');
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

        {/* Secure customer and delivery form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-bold text-[var(--ink)] mb-1 flex items-center gap-1" htmlFor="custName">
              <User className="w-4 h-4 text-[var(--red)]" /> <span>Nama Pemesan *</span>
            </label>
            <input className="input-shadcn" id="custName" name="customerName" type="text" autoComplete="name"
              required minLength={2} maxLength={80} placeholder="Contoh: Rina Putri" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} aria-describedby="customer-name-help" />
            <p className="field-help" id="customer-name-help">2–80 karakter; tanda baca nama yang umum tetap diperbolehkan.</p>
          </div>

          <div>
            <label className="text-sm font-bold text-[var(--ink)] mb-1 flex items-center gap-1" htmlFor="custType">
              <Utensils className="w-4 h-4 text-amber-700" /> <span>Pilihan Sajian</span>
            </label>
            <select className="input-shadcn cursor-pointer" id="custType" value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="Siap Santap (Hangat)">Siap Santap (Hangat)</option>
              <option value="Ready Frozen (Beku)">Ready Frozen (Beku)</option>
              <option value="Campur (Hangat & Frozen)">Campur (Hangat & Frozen)</option>
            </select>
          </div>

          <section className="address-section" aria-labelledby="delivery-address-title">
            <div>
              <h4 className="address-section-title" id="delivery-address-title"><MapPin className="w-4 h-4 text-rose-600" /> Alamat Pengiriman</h4>
              <p className="field-help">Pilih wilayah berurutan. Kode pos terisi otomatis dari desa/kelurahan dan masih bisa kamu koreksi.</p>
            </div>

            {form.legacyArea && (
              <div className="legacy-address-note">
                <span>Alamat lama yang tersimpan: <strong>{form.legacyArea}</strong>. Pilih wilayah resmi di bawah dan lengkapi alamat detail agar pesanan lebih akurat.</span>
                <button type="button" onClick={() => setForm({ ...form, legacyArea: '' })} aria-label="Tutup catatan alamat lama">×</button>
              </div>
            )}

            {!regionLookupUnavailable ? (
              <div className="address-select-grid">
                <div className="address-field">
                  <label htmlFor="custProvince">Provinsi *</label>
                  <select className="input-shadcn" id="custProvince" required value={form.provinceId}
                    disabled={provinces.isLoading || provinces.data.length === 0}
                    onChange={(e) => setForm({ ...form, provinceId: e.target.value, regencyId: '', districtId: '', villageId: '', postalCode: '', legacyArea: '' })}>
                    <option value="">{provinces.isLoading ? 'Memuat provinsi…' : 'Pilih provinsi'}</option>
                    {provinces.data.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </div>
                <div className="address-field">
                  <label htmlFor="custRegency">Kabupaten / Kota *</label>
                  <select className="input-shadcn" id="custRegency" required value={form.regencyId}
                    disabled={!form.provinceId || regencies.isLoading || regencies.data.length === 0}
                    onChange={(e) => setForm({ ...form, regencyId: e.target.value, districtId: '', villageId: '', postalCode: '', legacyArea: '' })}>
                    <option value="">{regencies.isLoading ? 'Memuat kabupaten/kota…' : 'Pilih kabupaten/kota'}</option>
                    {regencies.data.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </div>
                <div className="address-field">
                  <label htmlFor="custDistrict">Kecamatan / Distrik *</label>
                  <select className="input-shadcn" id="custDistrict" required value={form.districtId}
                    disabled={!form.regencyId || districts.isLoading || districts.data.length === 0}
                    onChange={(e) => setForm({ ...form, districtId: e.target.value, villageId: '', postalCode: '', legacyArea: '' })}>
                    <option value="">{districts.isLoading ? 'Memuat kecamatan…' : 'Pilih kecamatan'}</option>
                    {districts.data.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </div>
                <div className="address-field">
                  <label htmlFor="custVillage">Desa / Kelurahan *</label>
                  <select className="input-shadcn" id="custVillage" required value={form.villageId}
                    disabled={!form.districtId || villages.isLoading || villages.data.length === 0}
                    onChange={(e) => {
                      const village = villages.data.find((item) => item.id === e.target.value);
                      setForm({ ...form, villageId: e.target.value, postalCode: village?.postal_code || '', legacyArea: '' });
                    }}>
                    <option value="">{villages.isLoading ? 'Memuat desa/kelurahan…' : 'Pilih desa/kelurahan'}</option>
                    {villages.data.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </div>
              </div>
            ) : (
              <div className="address-fallback">
                <p role="alert">{provinces.error || regencies.error || districts.error || villages.error} Kamu tetap bisa mengirim pesanan dengan mengisi wilayah berikut secara manual.</p>
                <label className="address-field" htmlFor="custManualRegion">
                  Provinsi, kabupaten/kota, kecamatan, desa/kelurahan *
                  <textarea className="input-shadcn address-fallback-input" id="custManualRegion" required
                    minLength={6} maxLength={250} rows={2}
                    placeholder="Contoh: Jawa Timur, Kabupaten Sidoarjo, Kecamatan Waru, Desa Tambak Oso"
                    value={form.manualRegion} onChange={(e) => setForm({ ...form, manualRegion: e.target.value })} />
                </label>
                <button className="address-retry" type="button" onClick={() => {
                  provinces.retry(); regencies.retry(); districts.retry(); villages.retry();
                }}><RefreshCw className="w-3.5 h-3.5" /> Coba muat ulang data wilayah</button>
              </div>
            )}

            <div className="address-detail-grid">
              <div className="address-field">
                <label htmlFor="custPostalCode">Kode Pos <span>(otomatis, bisa diedit)</span></label>
                <input className="input-shadcn" id="custPostalCode" type="text" inputMode="numeric" autoComplete="postal-code"
                  maxLength={5} pattern="[0-9]{5}" placeholder="5 digit" value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value.replace(/\D/g, '').slice(0, 5) })} />
              </div>
              <div className="address-field address-detail-field">
                <label htmlFor="custAddressDetail">Alamat Detail *</label>
                <textarea className="input-shadcn address-detail-input" id="custAddressDetail" name="street-address"
                  autoComplete="street-address" required minLength={6} maxLength={250} rows={2}
                  placeholder="Nama jalan, nomor rumah, RT/RW, blok, atau patokan" value={form.addressDetail}
                  onChange={(e) => setForm({ ...form, addressDetail: e.target.value })} aria-describedby="address-detail-help" />
                <p className="field-help" id="address-detail-help">6–250 karakter. Contoh: Jl. Raya Tambak Oso No. 10, RT 02/RW 03.</p>
              </div>
            </div>
            <p className="address-source-note">Referensi wilayah dan kode pos EMSIFA (pembaruan data 3 September 2026). Jangkauan pengantaran tetap dikonfirmasi admin.</p>
          </section>

          <div>
            <label className="text-sm font-bold text-[var(--ink)] mb-1 block" htmlFor="custNotes">Catatan Tambahan (Opsional)</label>
            <input className="input-shadcn" id="custNotes" type="text" maxLength={250}
              placeholder="Contoh: Sambal dipisah / kirim jam 12 siang" value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <p className="field-help">Maksimal 250 karakter.</p>
          </div>

          <div className="order-confirmation-note">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <p>Pesanan belum otomatis terkonfirmasi saat WhatsApp terbuka. Admin akan mengecek stok, ongkir, dan detail pembayaran terlebih dahulu.</p>
          </div>
          <button className="btn btn-primary btn-shimmer w-full h-12 text-base mt-1 shadow-md active:scale-[0.98] transition-transform"
            type="submit" disabled={cart.length === 0}>
            <MessageCircle className="w-5 h-5 text-amber-200" /> <span>Kirim Rincian Pesanan ke WhatsApp</span>
          </button>
          <div className="flex flex-wrap justify-between items-center gap-3 text-xs text-[var(--muted)] pt-1">
            <button type="button" onClick={handleCopy} className="inline-flex items-center gap-1 text-[var(--red)] font-bold hover:underline cursor-pointer bg-transparent border-none p-0" disabled={cart.length === 0}>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Teks Pesanan'}</span>
            </button>
            <span className="text-[11px]">WhatsApp resmi Gyozen</span>
          </div>
          <div className="saved-data-row">
            <span>Data nama dan alamat tersimpan lokal di browser ini. Hindari menyimpannya pada perangkat umum.</span>
            <button type="button" onClick={handleClearSavedDetails}>Hapus data tersimpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};
