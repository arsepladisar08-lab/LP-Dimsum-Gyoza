export interface GyozenBundle {
  id: 'platter' | 'frozen';
  name: string;
  price: number;
  productIds: readonly string[];
  imageUrl: string;
}

export const GYOZEN_BUNDLES: Record<'platter' | 'frozen', GyozenBundle> = {
  platter: {
    id: 'platter',
    name: 'Dimsum Platter Komplit (3-in-1)',
    price: 45000,
    productIds: ['mentai-lumer', 'gyoza-fresh', 'dimsum-goreng-keju'],
    imageUrl: '/images/menu/dimsum-platter-960.webp'
  },
  frozen: {
    id: 'frozen',
    name: 'Paket Stok Kulkas (3 Pack Frozen + Ebi Chili Oil 150ml)',
    price: 125000,
    productIds: ['frozen-dimsum-mix', 'frozen-goreng-keju', 'frozen-gyoza', 'ebi-chili-oil'],
    imageUrl: '/images/menu/frozen-pack-dimsum-mix-960.webp'
  }
};
