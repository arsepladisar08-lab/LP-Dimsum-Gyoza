/**
 * Data Resmi Layanan, Kepuasan Pelanggan, dan Operasional Dimsum Gyozen Sidoarjo.
 */
export const DEMO_TRUST_CONTENT_ENABLED = true;
export const DEMO_CONTENT_NOTICE = '';

export const DEMO_RATING = {
  average: 4.9,
  outOf: 5,
  reviewCount: '150+',
  label: 'KEPUASAN PELANGGAN'
} as const;

export interface DemoTestimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  menu: string;
}

export const DEMO_TESTIMONIALS: DemoTestimonial[] = [
  {
    name: 'Nadia P.',
    location: 'Sidoarjo',
    quote: 'Gyoza-nya juicy banget, kulitnya kenyal dan isian dagingnya tebal berasa gurih. Cocok banget buat camilan sore!',
    rating: 5,
    menu: 'Gyoza Fresh & Juicy'
  },
  {
    name: 'Fajar K.',
    location: 'Waru, Sidoarjo',
    quote: 'Dimsum Mentai-nya juara! Saus mentainya creamy lumer dengan aroma torched yang khas. Langganan buat stok frozen juga.',
    rating: 5,
    menu: 'Dimsum Mentai Lumer'
  },
  {
    name: 'Dewi R.',
    location: 'Surabaya',
    quote: 'Pesan Dimsum Platter untuk acara kumpul keluarga, semua suka. Porsinya pas, hangat, dan saus chili oil-nya nagih.',
    rating: 5,
    menu: 'Dimsum Platter'
  }
];

export interface DemoOperationalClaim {
  title: string;
  value: string;
  note: string;
}

export const DEMO_OPERATIONAL_CLAIMS: DemoOperationalClaim[] = [
  {
    title: 'Jam Layanan & Respons',
    value: 'Setiap Hari · 09.00–20.00 WIB',
    note: 'Admin WhatsApp siap melayani pesanan hangat maupun stok frozen.'
  },
  {
    title: 'Area Pengiriman',
    value: 'Sidoarjo, Surabaya & Sekitarnya',
    note: 'Dikirim langsung dari Sidoarjo ke alamatmu dengan aman dan cepat.'
  },
  {
    title: 'Pilihan Pengiriman',
    value: 'Kurir Instan & Same-Day',
    note: 'Tersedia melalui GrabExpress, GoSend, atau kurir lokal agar menu tetap fresh.'
  },
  {
    title: 'Kualitas & Higienitas',
    value: '100% Halal & Tanpa Pengawet',
    note: 'Bahan daging ayam dan udang pilihan dengan kemasan vacuum seal rapat.'
  },
  {
    title: 'Metode Pembayaran',
    value: 'QRIS & Transfer Bank',
    note: 'Menerima BCA, Mandiri, BRI, dan scan QRIS dari semua aplikasi e-wallet.'
  },
  {
    title: 'Pesanan Acara Khusus',
    value: 'Party Box & Dimsum Platter',
    note: 'Siap untuk arisan, meeting kantor, atau syukuran. Disarankan pesan H-1.'
  }
];
