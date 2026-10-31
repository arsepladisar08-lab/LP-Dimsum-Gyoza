/**
 * Fictional seed content for layout review only.
 * Never merge these examples into verified business data or public rating schema.
 */
export const DEMO_CONTENT_NOTICE =
  'SIMULASI — seluruh angka, nama, ulasan, jam, area, dan metode di bawah adalah data fiktif untuk preview UI. Bukan ulasan pelanggan atau informasi operasional Gyozen.';

export const DEMO_RATING = {
  average: 4.8,
  outOf: 5,
  reviewCount: 128,
  label: 'RATING SIMULASI'
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
    name: 'Nadia (Contoh)',
    location: 'Sidoarjo (contoh)',
    quote: 'Contoh teks ulasan untuk menguji tampilan kartu testimoni dan panjang konten.',
    rating: 5,
    menu: 'Gyoza Fresh & Juicy (contoh)'
  },
  {
    name: 'Fajar (Contoh)',
    location: 'Waru (contoh)',
    quote: 'Ini hanya konten dummy untuk pratinjau layout, bukan kutipan pelanggan sungguhan.',
    rating: 5,
    menu: 'Dimsum Mentai (contoh)'
  },
  {
    name: 'Dewi (Contoh)',
    location: 'Surabaya (contoh)',
    quote: 'Gunakan ruang ini untuk ulasan asli setelah pelanggan memberikan izin publikasi.',
    rating: 4,
    menu: 'Dimsum Platter (contoh)'
  }
];

export interface DemoOperationalClaim {
  title: string;
  value: string;
  note: string;
}

export const DEMO_OPERATIONAL_CLAIMS: DemoOperationalClaim[] = [
  {
    title: 'Jam operasional',
    value: 'Senin–Sabtu · 09.00–17.00 WIB',
    note: 'Contoh jam — wajib diganti dengan jadwal resmi.'
  },
  {
    title: 'Area layanan',
    value: 'Sidoarjo & Surabaya',
    note: 'Contoh area — bukan konfirmasi jangkauan pengiriman.'
  },
  {
    title: 'Metode pembayaran',
    value: 'Transfer bank & QRIS',
    note: 'Contoh metode — konfirmasi metode yang benar ke admin.'
  }
];
