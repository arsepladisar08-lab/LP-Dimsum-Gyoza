export type MenuCategory = 'all' | 'hangat' | 'frozen';

export interface Product {
  id: string;
  index: string;
  name: string;
  category: 'hangat' | 'frozen';
  tag: string;
  tagStyle?: 'spicy' | 'frozen' | 'best' | '';
  bg: string;
  art: 'gyoza' | 'dimsum' | 'keju' | 'mentai' | 'platter' | 'frozen' | 'chili';
  price: number;
  oldPrice: number;
  info: string;
  desc: string;
  imageUrl: string; // URL dummy foto menu siap diganti dengan foto asli
  portion?: string;
  rating?: number;
  soldCount?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
}

export interface OrderFormState {
  name: string;
  type: string;
  area: string;
  notes?: string;
}
