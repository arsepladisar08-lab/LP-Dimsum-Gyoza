/**
 * TEMPAT EDIT DATA CONTOH TRUST GYOZEN
 * Ganti nilai di file ini secara manual setelah data asli terkumpul dan divalidasi.
 * Semua nilai saat ini fiktif; jangan dianggap sebagai rating, testimoni, atau kebijakan resmi.
 * Ubah DEMO_TRUST_CONTENT_ENABLED menjadi false setelah konten asli siap ditampilkan.
 */
export const DEMO_TRUST_CONTENT_ENABLED = true;
export const DEMO_CONTENT_NOTICE =
  'DATA CONTOH — rating, jumlah ulasan, nama, kutipan, jam, area layanan, metode pengiriman, ongkir, dan pembayaran di bawah adalah placeholder fiktif. Belum diverifikasi dan bukan klaim resmi Gyozen.';

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
    note: 'Contoh jadwal saja. Ganti dengan hari dan jam operasional resmi.'
  },
  {
    title: 'Area pengiriman',
    value: 'Sidoarjo & Surabaya',
    note: 'Area contoh, bukan konfirmasi jangkauan pengiriman Gyozen.'
  },
  {
    title: 'Metode pengiriman',
    value: 'Kurir instan / same-day',
    note: 'Contoh layanan. Sesuaikan dengan kurir dan ketersediaan sebenarnya.'
  },
  {
    title: 'Biaya pengiriman',
    value: 'Menyesuaikan jarak dan layanan',
    note: 'Placeholder aturan ongkir. Ganti dengan skema dan batas biaya yang berlaku.'
  },
  {
    title: 'Metode pembayaran',
    value: 'Transfer bank, QRIS, atau tunai',
    note: 'Contoh metode. Hapus opsi yang tidak diterima oleh admin.'
  },
  {
    title: 'Pesanan jumlah besar',
    value: 'Contoh: konfirmasi minimal H-1',
    note: 'Placeholder kebijakan pre-order. Ganti dengan batas jumlah dan waktu pemesanan resmi.'
  }
];
