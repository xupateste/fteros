import {VariantColor} from "@chakra-ui/core";

import {Place} from "~/places/types";

export interface ServerTenant {
  id: string;
  slug: string;
  category?: string;
  color: Extract<
    VariantColor,
    "yellow" | "blue" | "cyan" | "gray" | "orange" | "purple" | "red" | "pink" | "teal" | "green"
  >;
  phone: string;
  phonePersonal: string;
  logo?: string;
  title: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  keywords?: string;
  banner?: string;
  description?: string;
  country?: string;
  location?: Place;
  place?: string;
  placeUrl?: string;
  highlight?: string;
  fields?: Field[];
  flags?: string[];
  hook?: string;
  pixel?: string;
  ga?: string;
  createdAt: number;
  updatedAt: number; 
  layout?: "landscape" | "portrait";
  typeTenant?: "free" | "test" | "p050" | "p250" | "p450" | "p650" | "p850" | "p1k0" | "p1k2" | "p1k4" | "p1k6" | "p2k8" | "p3k0" | "p3k2" | "p3k4" | "p3k6" | "p3k8" | "p4k0" | "p4k2" | "p4k4" | "p4k6" | "p4k8" | "p5k0" | "pall";
  mercadopago?: {
    token: string;
    refresh: string;
    expiration: number;
  };
}

export interface ClientTenant extends Omit<ServerTenant, "mercadopago"> {
  mercadopago: boolean;
}

export type Field = TextField | RadioField;

export interface TextField {
  id: string;
  title: string;
  type: "text";
  note: string;
  required: boolean;
  value?: string;
}

export interface RadioField {
  id: string;
  title: string;
  type: "radio";
  options: RadioFieldOption[];
  required: boolean;
  value?: string;
}

export interface RadioFieldOption {
  id: string;
  title: string;
  note: string;
}

export interface State {
  tenant: ClientTenant;
}

export interface Actions {
  update: (tenant: ClientTenant) => void;
}

export interface Context {
  state: State;
  actions: Actions;
}
