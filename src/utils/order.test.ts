import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatRupiah, calculateTotal, calculateTotalCount, isActivePromo,
  calculateKnownPieces, calculatePiecesPerGuest, filterProducts,
  buildWhatsAppOrderMessage, buildWhatsAppInquiryUrl, buildDeliveryAddressLine,
  normalizeSingleLine, isValidCustomerName, isValidAddressDetail
} from './order';
import { Product, CartItem } from '../types';

test('formatRupiah formats values with Indonesian localized Rupiah', () => {
  assert.equal(formatRupiah(15000), 'Rp15.000');
  assert.equal(formatRupiah(0), 'Rp0');
  assert.equal(formatRupiah(125000), 'Rp125.000');
});

test('calculateTotal sums item price * qty accurately', () => {
  const cart: CartItem[] = [
    { id: '1', name: 'Item A', price: 15000, qty: 2 },
    { id: '2', name: 'Item B', price: 25000, qty: 1 }
  ];
  assert.equal(calculateTotal(cart), 55000);
});

test('calculateTotalCount sums the quantity of items', () => {
  const cart: CartItem[] = [
    { id: '1', name: 'Item A', price: 15000, qty: 2 },
    { id: '2', name: 'Item B', price: 25000, qty: 3 }
  ];
  assert.equal(calculateTotalCount(cart), 5);
});

test('filterProducts returns only matching category or all', () => {
  const sampleProducts: Product[] = [
    { id: 'p1', index: '01', name: 'Hangat 1', category: 'hangat', tag: '', bg: '', art: 'gyoza', price: 15000, info: '', desc: '', imageUrl: '' },
    { id: 'p2', index: '02', name: 'Frozen 1', category: 'frozen', tag: '', bg: '', art: 'frozen', price: 35000, info: '', desc: '', imageUrl: '' },
    { id: 'p3', index: '03', name: 'Pelengkap 1', category: 'pelengkap', tag: '', bg: '', art: 'chili', price: 28000, info: '', desc: '', imageUrl: '' }
  ];
  assert.equal(filterProducts(sampleProducts, 'all').length, 3);
  assert.equal(filterProducts(sampleProducts, 'hangat').length, 1);
  assert.equal(filterProducts(sampleProducts, 'frozen').length, 1);
  assert.equal(filterProducts(sampleProducts, 'pelengkap').length, 1);
  assert.equal(filterProducts(sampleProducts, 'pelengkap')[0].id, 'p3');
});

test('buildWhatsAppOrderMessage keeps the complete address on one line', () => {
  const cart: CartItem[] = [{ id: 'mentai', name: 'Dimsum Mentai Lumer', price: 25000, qty: 2 }];
  const address = buildDeliveryAddressLine({
    province: 'Jawa Timur', regency: 'Kabupaten Sidoarjo', district: 'Kecamatan Waru',
    village: 'Desa/Kelurahan Tambak Oso', postalCode: '61256', detail: 'Jl. Raya Tambak Oso No. 10, RT 02/RW 03'
  });
  const msg = buildWhatsAppOrderMessage({
    cart, customerName: 'Kak Rina', servingType: 'Siap Santap (Hangat)', deliveryAddress: address
  });
  assert.ok(msg.includes('*Nama:* Kak Rina'));
  assert.ok(msg.includes('*Sajian:* Siap Santap (Hangat)'));
  assert.ok(msg.includes('*Alamat:* Jawa Timur, Kabupaten Sidoarjo, Kecamatan Waru, Desa/Kelurahan Tambak Oso, 61256 — Jl. Raya Tambak Oso No. 10, RT 02/RW 03'));
  assert.ok(msg.includes('1. Dimsum Mentai Lumer (2x) = Rp50.000'));
  assert.ok(msg.includes('*Total Estimasi:* *Rp50.000*'));
});

test('address formatting allows unknown postcodes without inventing values', () => {
  assert.equal(
    buildDeliveryAddressLine({ province: 'Papua', regency: 'Kabupaten Contoh', district: 'Distrik Contoh', village: 'Kampung Contoh', detail: 'Jalan Contoh No. 1' }),
    'Papua, Kabupaten Contoh, Distrik Contoh, Kampung Contoh — Jalan Contoh No. 1'
  );
});

test('normalizes line breaks and control characters without destroying common address punctuation', () => {
  assert.equal(normalizeSingleLine('Jl. Raya\nTambak Oso, RT 02/RW 03'), 'Jl. Raya Tambak Oso, RT 02/RW 03');
});

test('customer name and address validation are length-aware and Unicode friendly', () => {
  assert.equal(isValidCustomerName('Siti Nur Aisyah'), true);
  assert.equal(isValidCustomerName('M. Fadli'), true);
  assert.equal(isValidCustomerName('A'), false);
  assert.equal(isValidCustomerName('Rina / Adi'), false);
  assert.equal(isValidAddressDetail('Jl. Raya Tambak Oso No. 10'), true);
  assert.equal(isValidAddressDetail('RT 02'), false);
  assert.equal(isValidAddressDetail('RT 02/RW 03'), true);
  assert.equal(isValidAddressDetail('x'.repeat(251)), false);
});

test('buildWhatsAppInquiryUrl encodes url parameters properly', () => {
  const url = buildWhatsAppInquiryUrl('628981230703', 'Gyoza Fresh & Juicy');
  assert.ok(url.startsWith('https://wa.me/628981230703?text='));
  assert.ok(url.includes('Gyoza%20Fresh%20%26%20Juicy') || url.includes('Gyoza'));
});

test('isActivePromo requires a future expiry date and a real higher old price', () => {
  const now = Date.parse('2026-10-30T00:00:00.000Z');
  const active: Product = {
    id: 'promo', index: '01', name: 'Promo', category: 'hangat', tag: '', bg: '', art: 'gyoza',
    price: 15000, oldPrice: 18000, promoUntil: '2026-11-01T00:00:00.000Z', info: '', desc: '', imageUrl: ''
  };
  assert.equal(isActivePromo(active, now), true);
  assert.equal(isActivePromo({ ...active, promoUntil: '2026-10-01T00:00:00.000Z' }, now), false);
  assert.equal(isActivePromo({ ...active, promoUntil: undefined }, now), false);
  assert.equal(isActivePromo({ ...active, oldPrice: 14000 }, now), false);
});

test('calculateKnownPieces excludes products without exact pcs data', () => {
  const products: Product[] = [
    { id: 'four', index: '01', name: 'Four', category: 'hangat', tag: '', bg: '', art: 'dimsum', price: 10000, info: '', desc: '', imageUrl: '', pcs: 4 },
    { id: 'range', index: '02', name: 'Range', category: 'hangat', tag: '', bg: '', art: 'platter', price: 40000, info: '', desc: '', imageUrl: '' }
  ];
  const cart: CartItem[] = [
    { id: 'four', name: 'Four', price: 10000, qty: 2 },
    { id: 'range', name: 'Range', price: 40000, qty: 1 }
  ];
  assert.equal(calculateKnownPieces(cart, products), 8);
  assert.equal(calculatePiecesPerGuest(8, 2), 4);
  assert.equal(calculatePiecesPerGuest(8, 0), null);
  assert.equal(calculatePiecesPerGuest(8, 1.5), null);
});
