import { GYOZEN_PRODUCTS } from './products';

export interface GyozenBundle {
  id: 'platter' | 'frozen';
  name: string;
  price: number;
  productIds: readonly string[];
  imageUrl: string;
}

const platterProduct = GYOZEN_PRODUCTS.find((p) => p.id === 'dimsum-platter');
const frozenProductIds = ['frozen-dimsum-mix', 'frozen-goreng-keju', 'frozen-gyoza', 'ebi-chili-oil'] as const;
const frozenProductsSum = frozenProductIds.reduce((sum, id) => {
  const p = GYOZEN_PRODUCTS.find((item) => item.id === id);
  return sum + (p?.price || 0);
}, 0);

export const GYOZEN_BUNDLES: Record<'platter' | 'frozen', GyozenBundle> = {
  platter: {
    id: 'platter',
    name: 'Dimsum Platter Komplit (3-in-1)',
    price: platterProduct ? platterProduct.price : 70000,
    productIds: ['mentai-lumer', 'gyoza-fresh', 'dimsum-goreng-keju'],
    imageUrl: '/images/menu/dimsum-platter-960.webp'
  },
  frozen: {
    id: 'frozen',
    name: 'Paket Stok Kulkas (3 Pack Frozen + Ebi Chili Oil 150ml)',
    price: frozenProductsSum || 126000,
    productIds: frozenProductIds,
    imageUrl: '/images/menu/frozen-pack-dimsum-mix-960.webp'
  }
};

