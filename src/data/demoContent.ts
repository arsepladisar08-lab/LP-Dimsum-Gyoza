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
  note?: string;
}

export const DEMO_OPERATIONAL_CLAIMS: DemoOperationalClaim[] = [
  {
    title: 'Jam Layanan & Respons',
    value: 'Setiap Hari · 09.00–20.00 WIB'
  },
  {
    title: 'Pilihan Pengiriman',
    value: 'Kurir Instan & Same-Day'
  },
  {
    title: 'Kualitas & Higienitas',
    value: '100% Halal & Tanpa Pengawet'
  }
];
