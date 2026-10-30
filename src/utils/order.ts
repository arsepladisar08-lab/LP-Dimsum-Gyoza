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

export function calculateKnownPieces(cart: CartItem[], products: Product[]): number {
  return cart.reduce((sum, item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return sum + (product?.pcs ? product.pcs * Math.max(0, item.qty) : 0);
  }, 0);
}

export function calculatePiecesPerGuest(totalPieces: number, guestCount: number): number | null {
  if (!Number.isFinite(totalPieces) || totalPieces < 0) return null;
  if (!Number.isFinite(guestCount) || guestCount <= 0) return null;
  return totalPieces / guestCount;
}

export function filterProducts(products: Product[], category: MenuCategory): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}

export interface BuildMessageParams {
  cart: CartItem[];
  customerName?: string;
  servingType?: string;
  deliveryArea?: string;
}

export function buildWhatsAppOrderMessage({
  cart,
  customerName = '',
  servingType = 'Siap Santap (Hangat)',
  deliveryArea = ''
}: BuildMessageParams): string {
  const name = customerName.trim() || 'Pelanggan Gyozen';
  const area = deliveryArea.trim() || '-';
  const total = calculateTotal(cart);
  const lines = cart
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.qty}x) = ${formatRupiah(item.price * item.qty)}`
    )
    .join('\n');

  return `Halo Admin *Dimsum Gyozen (@gyozen.sda)*!\nSaya ingin memesan menu Gyozen:\n\n*Nama:* ${name}\n*Sajian:* ${servingType}\n*Area / Alamat:* ${area}\n\n*Rincian Pesanan:*\n${lines}\n\n*Total Estimasi:* *${formatRupiah(total)}*\n\nMohon info total ongkir dan pembayarannya ya. Terima kasih!`;
}

export function buildWhatsAppInquiryUrl(number: string, topic: string): string {
  const message = `Halo Admin Dimsum Gyozen (@gyozen.sda)! Aku mau tanya tentang *${topic}*. Boleh info ketersediaan dan detail pemesanannya?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppOrderUrl(number: string, params: BuildMessageParams): string {
  const message = buildWhatsAppOrderMessage(params);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
