import {Variant, Product, Option, xOption} from "./types";

export const CSV_TEMPLATE = "code;title;description;brand;category;originalPrice;price;keywords\n10001;titulo producto;descripcion producto;marca producto;categoria producto;15.00;13.00;palabra1, palabra2, palabra3";

export const DEFAULT_PRODUCT: Omit<Product, "id"> = {
  title: "",
  code: "",
  description: "",
  keywords: "",
  badgeText: "",
  badgeColor: "",
  category: null,
  brand: null || "",
  image: "",
  originalPrice: 0,
  price: 0,
  priceOff: 0,
  lastStock: 0,
  numPiezas: 1,
  type: "available",
  mqo: 1,
  featured: false,
  isnew: false,
  isPreOrder: false,
  wholesale: false,
  options: [],
  xoptions: [],
  createdAt: 1594090800000,
  updatedAt: 1594090800000,
  promotionText: "",
  promotionDays: 0,
  promotionExpireDate: 1594090800000,
  promotionUnits: 0,
  promotionPrice: 0,
  promotionExpireText: "",
  slug: "",
};

export const DEFAULT_PRODUCT_VARIANT: Omit<Variant, "id"> = {
  title: "",
  count: 1,
  options: [],
  value: [],
  required: false,
};

export const DEFAULT_PRODUCT_OPTION: Omit<Option, "id"> = {
  title: "",
  price: 0,
};

export const DEFAULT_PRODUCT_XOPTION: Omit<xOption, "id"> = {
  quantity: 0,
  price: 0,
};
