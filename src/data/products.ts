import { Product } from '../types';

export const WHATSAPP_NUMBER = '628981230703';

/**
 * Data 10 Menu Resmi Dimsum Gyozen
 * CATATAN UNTUK PENGEMBANG / OWNER:
 * Kolom `imageUrl` di bawah ini telah diisi dengan dummy photo berkualitas tinggi
 * dan SIAP DIREPLACE dengan foto asli produk Gyozen (format .jpg / .png / .webp).
 */
export const GYOZEN_PRODUCTS: Product[] = [
  {
    id: 'gyoza-fresh',
    index: '01 / fresh & juicy',
    name: 'Gyoza Fresh & Juicy',
    category: 'hangat',
    tag: 'Mulai 15 RB-an',
    tagStyle: 'best',
    bg: '#f8e6c9',
    art: 'gyoza',
    price: 15000,
    oldPrice: 19000,
    info: 'Siap santap hangat',
    desc: 'Gyoza lembut dengan lipatan khas Jepang dan isian daging ayam serta udang segar lengkap dengan saus cocolan.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    portion: 'Porsi 4 pcs + Saus',
    rating: 4.9,
    soldCount: '850+ terjual'
  },
  {
    id: 'dimsum-ori',
    index: '02 / classic steam',
    name: 'Dimsum Original Mix',
    category: 'hangat',
    tag: 'Mulai 15 RB-an',
    tagStyle: '',
    bg: '#f6e2c3',
    art: 'dimsum',
    price: 15000,
    oldPrice: 19000,
    info: 'Tanpa pengawet',
    desc: 'Dimsum kukus hangat yang gurih dan padat daging dengan aneka topping wortel, jamur, nori, dan tobiko.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
    portion: 'Porsi 4 pcs Mix Topping',
    rating: 4.9,
    soldCount: '1.2k+ terjual'
  },
  {
    id: 'dimsum-goreng-keju',
    index: '03 / crispy melted',
    name: 'Dimsum Goreng Keju',
    category: 'hangat',
    tag: 'Keju Lumer!',
    tagStyle: '',
    bg: '#f7ddb8',
    art: 'keju',
    price: 18000,
    oldPrice: 23000,
    info: 'Renyah di luar, lumer di dalam',
    desc: 'Dimsum kulit renyah keemasan dengan isian daging gurih dan keju melimpah yang langsung meleleh saat digigit hangat.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    portion: 'Porsi 4 pcs + Cocolan',
    rating: 4.8,
    soldCount: '720+ terjual'
  },
  {
    id: 'mentai-lumer',
    index: '04 / signature torch',
    name: 'Dimsum Mentai Lumer',
    category: 'hangat',
    tag: 'Best Seller #1',
    tagStyle: 'spicy',
    bg: '#f5d4b9',
    art: 'mentai',
    price: 25000,
    oldPrice: 32000,
    info: 'Kemasan aluminium tray',
    desc: 'Dimsum padat daging berbalut saus mentai spesial yang creamy dan lumer, di-torch harum dengan taburan rumput laut.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80',
    portion: 'Tray 4 pcs Saus Melimpah',
    rating: 5.0,
    soldCount: '2.4k+ terjual'
  },
  {
    id: 'dimsum-platter',
    index: '05 / 3-in-1 combo',
    name: 'Dimsum Platter Komplit',
    category: 'hangat',
    tag: 'Favorit Sharing',
    tagStyle: 'best',
    bg: '#f6e7ad',
    art: 'platter',
    price: 45000,
    oldPrice: 55000,
    info: 'Mentai + Gyoza + Goreng Keju',
    desc: 'Satu boks komplit berisi perpaduan Dimsum Mentai Lumer, Gyoza Juicy, dan Dimsum Goreng Keju lengkap dengan 2 cup saus.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=800&q=80',
    portion: 'Box Komplit 8 pcs + 2 Saus',
    rating: 4.9,
    soldCount: '950+ terjual'
  },
  {
    id: 'party-box',
    index: '06 / family tray',
    name: 'Party Box Gyozen',
    category: 'hangat',
    tag: 'Porsi Rame-Rame',
    tagStyle: 'best',
    bg: '#f5d9c5',
    art: 'platter',
    price: 65000,
    oldPrice: 78000,
    info: 'Cocok untuk acara & kumpul',
    desc: 'Tray besar berisi kombinasi Dimsum Mentai Lumer dan Dimsum Original kukus untuk dinikmati bersama keluarga atau teman kantor.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    portion: 'Tray Jumbo 12-14 pcs',
    rating: 4.9,
    soldCount: '480+ terjual'
  },
  {
    id: 'frozen-dimsum-mix',
    index: '07 / ready frozen',
    name: 'Frozen Pack: Dimsum Mix',
    category: 'frozen',
    tag: 'Ready Frozen',
    tagStyle: 'frozen',
    bg: '#e2ecf5',
    art: 'frozen',
    price: 35000,
    oldPrice: 42000,
    info: 'Tahan 3 bulan di freezer',
    desc: 'Kemasan beku kedap udara Dimsum Mix siap kukus kapan saja di rumah. Praktis, higienis, tanpa pengawet buatan.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    portion: 'Vacuum Pack 10 pcs',
    rating: 4.8,
    soldCount: '620+ terjual'
  },
  {
    id: 'frozen-goreng-keju',
    index: '08 / ready frozen',
    name: 'Frozen Pack: Goreng Keju',
    category: 'frozen',
    tag: 'Ready Frozen',
    tagStyle: 'frozen',
    bg: '#e2ecf5',
    art: 'frozen',
    price: 38000,
    oldPrice: 45000,
    info: 'Tahan 3 bulan di freezer',
    desc: 'Kemasan beku Dimsum Goreng Keju. Tinggal goreng sebentar hingga keemasan untuk camilan keju lumer hangat di rumah.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    portion: 'Vacuum Pack 10 pcs',
    rating: 4.8,
    soldCount: '510+ terjual'
  },
  {
    id: 'frozen-gyoza',
    index: '09 / ready frozen',
    name: 'Frozen Pack: Gyoza Juicy',
    category: 'frozen',
    tag: 'Ready Frozen',
    tagStyle: 'frozen',
    bg: '#e2ecf5',
    art: 'frozen',
    price: 35000,
    oldPrice: 42000,
    info: 'Tahan 3 bulan di freezer',
    desc: 'Kemasan beku Gyoza Fresh & Juicy. Mudah dikukus maupun dipanggang teflon (pan-fried) dalam 5 menit.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    portion: 'Vacuum Pack 10 pcs',
    rating: 4.9,
    soldCount: '580+ terjual'
  },
  {
    id: 'ebi-chili-oil',
    index: '10 / condiment jar',
    name: 'Gyozen Ebi Chili Oil 150ml',
    category: 'frozen',
    tag: 'Kemasan Jar 150ml',
    tagStyle: 'spicy',
    bg: '#f5d4b9',
    art: 'chili',
    price: 28000,
    oldPrice: 35000,
    info: 'Isi bersih 150ml • Halal',
    desc: 'Chili oil khas Gyozen dengan udang ebi gurih dan rempah pilihan dalam kemasan jar segel 150ml untuk stok di rumah.',
    // Dummy Image ready to replace:
    imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80',
    portion: 'Jar Kaca Segel 150 ml',
    rating: 5.0,
    soldCount: '1.5k+ terjual'
  }
];

export const INITIAL_CART = [
  {
    id: 'mentai-lumer',
    name: 'Dimsum Mentai Lumer',
    price: 25000,
    qty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dimsum-goreng-keju',
    name: 'Dimsum Goreng Keju',
    price: 18000,
    qty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ebi-chili-oil',
    name: 'Gyozen Ebi Chili Oil 150ml',
    price: 28000,
    qty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Rina Kusuma',
    city: 'Sidoarjo Kota',
    text: 'Sumpah dimsum mentainya lumer banget! Sausnya tebal dan di-torch wangi. Anak-anak di rumah langsung rebutan.',
    rating: 5,
    tag: 'Langganan Mentai Lumer'
  },
  {
    name: 'Dimas Wicaksono',
    city: 'Waru, Sidoarjo',
    text: 'Isian dagingnya padat, bukan yang cuma tepung doang. Ebi chili oil-nya juga nagih gurih pedas pas.',
    rating: 5,
    tag: 'Order Party Box'
  },
  {
    name: 'Amanda Putri',
    city: 'Buduran',
    text: 'Stok frozen gyoza dan goreng keju selalu ada di kulkas. Praktis banget buat sarapan atau camilan malam.',
    rating: 5,
    tag: 'Paket Stok Frozen'
  }
];
