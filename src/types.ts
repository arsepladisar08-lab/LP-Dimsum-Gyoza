export type MenuCategory = 'all' | 'hangat' | 'frozen' | 'pelengkap';

export interface Product {
  id: string;
  index: string;
  name: string;
  category: 'hangat' | 'frozen' | 'pelengkap';
  tag?: string;
  tagStyle?: 'spicy' | 'frozen' | 'best' | '';
  bg?: string;
  art: 'gyoza' | 'dimsum' | 'keju' | 'mentai' | 'platter' | 'frozen' | 'chili';
  price: number;
  oldPrice?: number;
  promoUntil?: string;
  info: string;
  desc: string;
  imageUrl: string;
  portion?: string;
  rating?: number;
  ratingSource?: string;
  soldCount?: string;
  pcs?: number;
  servingTip?: string;
  storageTip?: string;
  composition?: string;
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
  provinceId: string;
  regencyId: string;
  districtId: string;
  villageId: string;
  postalCode: string;
  addressDetail: string;
  manualRegion: string;
  legacyArea: string;
  notes: string;
}
