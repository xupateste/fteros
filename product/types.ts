export interface Product {
  id: string;
  code: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  description?: string;
  keywords?: string;
  badgeText?: string;
  badgeColor?: string;
  category?: string;
  brand?: string;
  image?: string | undefined;
  price: number;
  originalPrice?: number;
  numPiezas?: number;
  priceOff?: number;
  lastStock?: number;
  mqo?: number;
  type: "available" | "unavailable" | "hidden" | "promotional" | "ask";
  options?: Variant[];
  featured?: boolean;
  isnew?: boolean;
  isPreOrder?: boolean;
  slug?: string;
}

export interface Variant {
  id: string;
  title: string;
  count: number;
  required: boolean;
  options: Option[];
  value?: Option[];
}

export interface Option {
  id: string;
  title: string;
  price: number;
}
