import { CartItem, Product, MenuCategory } from '../types';

export function formatRupiah(value: number): string {
  return 'Rp' + Number(value || 0).toLocaleString('id-ID');
}

export function calculateTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + (item.price * Math.max(0, item.qty)), 0);
}

export function calculateTotalCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + Math.max(0, item.qty), 0);
}

export function isActivePromo(product: Product, now = Date.now()): boolean {
  if (typeof product.oldPrice !== 'number' || product.oldPrice <= product.price || !product.promoUntil) return false;
  const expiresAt = Date.parse(product.promoUntil);
  return Number.isFinite(expiresAt) && expiresAt >= now;
}

export function calculateKnownPieces(cart: CartItem[], products: Product[]): number {
  return cart.reduce((sum, item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return sum + (product?.pcs ? product.pcs * Math.max(0, item.qty) : 0);
  }, 0);
}

export function calculatePiecesPerGuest(totalPieces: number, guestCount: number): number | null {
  if (!Number.isFinite(totalPieces) || totalPieces < 0) return null;
  if (!Number.isInteger(guestCount) || guestCount <= 0) return null;
  return totalPieces / guestCount;
}

export function filterProducts(products: Product[], category: MenuCategory): Product[] {
  if (category === 'all') return products;
  return products.filter((product) => product.category === category);
}

/** Normalize user-entered values to one printable line without control characters. */
export function normalizeSingleLine(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.normalize('NFKC')
    .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200d\ufeff]/g, ' ')
    .replace(/[\*_~\`]/g, '')
    .replace(/\s+/gu, ' ')
    .trim();
}

export function isValidCustomerName(value: string): boolean {
  const name = normalizeSingleLine(value);
  return name.length >= 2 && name.length <= 80 && /^[\p{L}\p{M}][\p{L}\p{M} .’'-]*$/u.test(name);
}

export function isValidAddressDetail(value: string): boolean {
  const detail = normalizeSingleLine(value);
  return detail.length >= 6 && detail.length <= 250;
}

export interface DeliveryAddressParts {
  province?: string;
  regency?: string;
  district?: string;
  village?: string;
  administrativeArea?: string;
  postalCode?: string;
  detail?: string;
}

/** Joins administrative regions and street-level detail into one WhatsApp address line. */
export function buildDeliveryAddressLine(parts: DeliveryAddressParts): string {
  const administrativeParts = [
    parts.province, parts.regency, parts.district, parts.village, parts.administrativeArea
  ].map(normalizeSingleLine).filter(Boolean);
  const postalCode = normalizeSingleLine(parts.postalCode);
  const administrative = [...administrativeParts, ...(postalCode ? [postalCode] : [])].join(', ') || '-';
  const detail = normalizeSingleLine(parts.detail);
  return detail ? `${administrative} — ${detail}` : administrative;
}

export interface BuildMessageParams {
  cart: CartItem[];
  customerName?: string;
  servingType?: string;
  deliveryAddress?: string;
  /** Backward-compatible alias for older callers. */
  deliveryArea?: string;
}

export function buildWhatsAppOrderMessage({
  cart, customerName = '', servingType = 'Siap Santap (Hangat)', deliveryAddress = '', deliveryArea = ''
}: BuildMessageParams): string {
  const name = normalizeSingleLine(customerName) || 'Pelanggan Gyozen';
  const address = normalizeSingleLine(deliveryAddress || deliveryArea) || '-';
  const safeServingType = normalizeSingleLine(servingType) || 'Siap Santap (Hangat)';
  const total = calculateTotal(cart);
  const lines = cart.map((item, index) =>
    `${index + 1}. ${normalizeSingleLine(item.name)} (${item.qty}x) = ${formatRupiah(item.price * item.qty)}`
  ).join('\n');

  return `Halo Admin *Dimsum Gyozen (@gyozen.sda)*!\nSaya ingin memesan menu Gyozen:\n\n*Nama:* ${name}\n*Sajian:* ${safeServingType}\n*Alamat:* ${address}\n\n*Rincian Pesanan:*\n${lines}\n\n*Total Estimasi:* *${formatRupiah(total)}*\n\nMohon konfirmasi ketersediaan menu, total ongkir, dan metode pembayarannya sebelum pesanan dinyatakan terkonfirmasi. Terima kasih!`;
}

export function buildWhatsAppInquiryUrl(number: string, topic: string): string {
  const message = `Halo Admin Dimsum Gyozen (@gyozen.sda)! Aku mau tanya tentang *${normalizeSingleLine(topic)}*. Boleh info ketersediaan dan detail pemesanannya?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppOrderUrl(number: string, params: BuildMessageParams): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppOrderMessage(params))}`;
}
