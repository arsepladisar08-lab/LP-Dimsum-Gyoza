import React from 'react';
import { Product } from '../types';

export const WHATSAPP_NUMBER = '628981230703';

export const GYOZEN_PRODUCTS: Product[] = [
  {
    id: 'gyoza-fresh',
    index: '01 / fresh & juicy',
    name: 'Gyoza Fresh & Juicy',
    category: 'hangat',
    tag: 'Mulai 15 RB-an',
    tagStyle: '',
    bg: '#f8e6c9',
    art: 'gyoza',
    price: 15000,
    oldPrice: 19000,
    info: 'Siap santap hangat',
    desc: 'Gyoza lembut dengan lipatan khas Jepang dan isian daging ayam serta udang segar lengkap dengan saus cocolan.'
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
    desc: 'Dimsum kukus hangat yang gurih dan padat daging dengan topping wortel, jamur, nori, dan tobiko.'
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
    desc: 'Dimsum kulit renyah keemasan dengan isian daging gurih dan keju melimpah yang langsung meleleh saat digigit.'
  },
  {
    id: 'mentai-lumer',
    index: '04 / signature torch',
    name: 'Dimsum Mentai Lumer',
    category: 'hangat',
    tag: 'Best Seller!',
    tagStyle: 'spicy',
    bg: '#f5d4b9',
    art: 'mentai',
    price: 25000,
    oldPrice: 32000,
    info: 'Kemasan aluminium tray',
    desc: 'Dimsum padat daging berbalut saus mentai spesial yang creamy dan lumer, di-torch harum dengan taburan rumput laut.'
  },
  {
    id: 'dimsum-platter',
    index: '05 / 3-in-1 combo',
    name: 'Dimsum Platter Komplit',
    category: 'hangat',
    tag: 'Favorit Sharing',
    tagStyle: '',
    bg: '#f6e7ad',
    art: 'platter',
    price: 45000,
    oldPrice: 55000,
    info: 'Mentai + Gyoza + Goreng Keju',
    desc: 'Satu boks komplit berisi perpaduan Dimsum Mentai Lumer, Gyoza Juicy, dan Dimsum Goreng Keju lengkap dengan 2 cup saus.'
  },
  {
    id: 'party-box',
    index: '06 / family tray',
    name: 'Party Box Gyozen',
    category: 'hangat',
    tag: 'Porsi Rame-Rame',
    tagStyle: '',
    bg: '#f5d9c5',
    art: 'platter',
    price: 65000,
    oldPrice: 78000,
    info: 'Cocok untuk acara & kumpul',
    desc: 'Tray besar berisi kombinasi Dimsum Mentai Lumer dan Dimsum Original kukus untuk dinikmati bersama keluarga atau teman.'
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
    desc: 'Kemasan beku kedap udara Dimsum Mix siap kukus kapan saja di rumah. Praktis, higienis, tanpa pengawet buatan.'
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
    desc: 'Kemasan beku Dimsum Goreng Keju. Tinggal goreng sebentar hingga keemasan untuk camilan keju lumer hangat di rumah.'
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
    desc: 'Kemasan beku Gyoza Fresh & Juicy. Mudah dikukus maupun dipanggang teflon dalam 5 menit.'
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
    desc: 'Chili oil khas Gyozen dengan udang ebi gurih dan rempah pilihan dalam kemasan jar segel 150ml untuk stok di rumah.'
  }
];

export const INITIAL_CART = [
  { id: 'mentai-lumer', name: 'Dimsum Mentai Lumer', price: 25000, qty: 1 },
  { id: 'dimsum-goreng-keju', name: 'Dimsum Goreng Keju', price: 18000, qty: 1 },
  { id: 'ebi-chili-oil', name: 'Gyozen Ebi Chili Oil 150ml', price: 28000, qty: 1 }
];
