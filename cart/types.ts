import {Product, Variant} from "~/product/types";
import {Field} from "~/tenant/types";

export interface CartItem {
  id: string | Product["id"];
  product: Product;
  variants: Variant[];
  // xoptions: xOption[];
  note: string;
  count: number;
  mqo: number;
}

export type Cart = Record<string, CartItem>;

export interface State {
  items: CartItem[];
  cart: Cart;
}

export interface Actions {
  add: (product: Product, variants: Variant[], count: number, note: string) => void;
  increase: (id: CartItem["id"]) => void;
  decrease: (id: CartItem["id"]) => void;
  remove: (id: CartItem["id"]) => void;
  checkout: (fields?: Field[]) => Promise<string>;
  removeAll: () => Promise<void>;
}

export interface Context {
  state: State;
  actions: Actions;
}

export type Status = "init" | "pending";
