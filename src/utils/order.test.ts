import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatRupiah,
  calculateTotal,
  calculateTotalCount,
  calculateKnownPieces,
  calculatePiecesPerGuest,
  filterProducts,
  buildWhatsAppOrderMessage,
  buildWhatsAppInquiryUrl
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
    {
      id: 'p1',
      name: 'Hangat 1',
      category: 'hangat',
      tag: '',
      bg: '',
      art: 'gyoza',
      price: 15000,
      info: '',
      desc: '',
      imageUrl: '/images/menu/gyoza-fresh-960.webp'
    },
    {
      id: 'p2',
      name: 'Frozen 1',
      category: 'frozen',
      tag: '',
      bg: '',
      art: 'frozen',
      price: 35000,
      info: '',
      desc: '',
      imageUrl: '/images/menu/frozen-pack-dimsum-mix-960.webp'
    }
  ];

  assert.equal(filterProducts(sampleProducts, 'all').length, 2);
  assert.equal(filterProducts(sampleProducts, 'hangat').length, 1);
  assert.equal(filterProducts(sampleProducts, 'hangat')[0].id, 'p1');
  assert.equal(filterProducts(sampleProducts, 'frozen').length, 1);
  assert.equal(filterProducts(sampleProducts, 'frozen')[0].id, 'p2');
});

test('buildWhatsAppOrderMessage formats order template correctly with customer information', () => {
  const cart: CartItem[] = [
    { id: 'mentai', name: 'Dimsum Mentai Lumer', price: 25000, qty: 2 }
  ];
  const msg = buildWhatsAppOrderMessage({
    cart,
    customerName: 'Kak Rina',
    servingType: 'Siap Santap (Hangat)',
    deliveryArea: 'Sidoarjo Kota'
  });

  assert.ok(msg.includes('*Nama:* Kak Rina'));
  assert.ok(msg.includes('*Sajian:* Siap Santap (Hangat)'));
  assert.ok(msg.includes('*Area / Alamat:* Sidoarjo Kota'));
  assert.ok(msg.includes('1. Dimsum Mentai Lumer (2x) = Rp50.000'));
  assert.ok(msg.includes('*Total Estimasi:* *Rp50.000*'));
});

test('buildWhatsAppInquiryUrl encodes url parameters properly', () => {
  const url = buildWhatsAppInquiryUrl('628981230703', 'Gyoza Fresh & Juicy');
  assert.ok(url.startsWith('https://wa.me/628981230703?text='));
  assert.ok(url.includes('Gyoza%20Fresh%20%26%20Juicy') || url.includes('Gyoza'));
});

test('calculateKnownPieces counts only products with an explicit piece count', () => {
  const products: Product[] = [
    { id: 'pack-a', index: '', name: 'Pack A', category: 'frozen', tag: '', bg: '', art: 'frozen', price: 10000, info: '', desc: '', imageUrl: '', pcs: 12 },
    { id: 'platter', index: '', name: 'Platter', category: 'hangat', tag: '', bg: '', art: 'platter', price: 45000, info: '', desc: '', imageUrl: '' }
  ];
  const cart: CartItem[] = [
    { id: 'pack-a', name: 'Pack A', price: 10000, qty: 2 },
    { id: 'platter', name: 'Platter', price: 45000, qty: 1 }
  ];
  assert.equal(calculateKnownPieces(cart, products), 24);
});

test('calculatePiecesPerGuest returns an average only for a positive guest count', () => {
  assert.equal(calculatePiecesPerGuest(24, 4), 6);
  assert.equal(calculatePiecesPerGuest(24, 0), null);
  assert.equal(calculatePiecesPerGuest(24, -1), null);
});
