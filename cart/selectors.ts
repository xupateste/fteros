import shortId from "shortid";

import {CartItem} from "./types";

import {Field} from "~/tenant/types";

import {getVariantsPrice} from "~/product/selectors";
import {formatPrice} from "~/i18n/selectors";

export function getTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + getPrice(item), 0);
}

export function getUnitPrice(item: CartItem): number {
  switch (item.product.type) {
    // Price should not be modified
    case "hidden":
    case "unavailable":
    case "ask": {
      return 0;
    }

    // Price depends only on the variants
    // case "variant": {
    //   return getVariantsPrice(item.variants) * item.count;
    // }

    // Sum total and variants
    default: {
      return (item.product.price + getVariantsPrice(item.variants));
    }
  }
}
export function getFormattedUnitPrice(item: CartItem): string {
  switch (item.product.type) {
    // This should never be shown
    case "hidden": {
      return "No disponible";
    }

    // No stock
    case "unavailable": {
      return "Sin stock";
    }

    // Ask price
    case "ask": {
      return "A consultar";
    }

    // Get price
    default: {
      return formatPrice(getUnitPrice(item));
    }
  }
}

export function getPrice(item: CartItem): number {
  switch (item.product.type) {
    // Price should not be modified
    case "hidden":
    case "unavailable":
    case "ask": {
      return 0;
    }

    // Price depends only on the variants
    // case "variant": {
    //   return getVariantsPrice(item.variants) * item.count;
    // }

    // Sum total and variants
    default: {
      return (item.product.price + getVariantsPrice(item.variants)) * item.count;
    }
  }
}

export function getFormattedPrice(item: CartItem): string {
  switch (item.product.type) {
    // This should never be shown
    case "hidden": {
      return "No disponible";
    }

    // No stock
    case "unavailable": {
      return "Sin stock";
    }

    // Ask price
    case "ask": {
      return "Precio a consultar";
    }

    // Get price
    default: {
      return formatPrice(getPrice(item));
    }
  }
}

export function getCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.count, 0);
}

// function _getFields(fields: Field[]) {
//   if (!fields) return "";

//   return fields
//     .filter(({value}) => value)
//     .map(({value}) => `${value.length > 4 ? value.toUpperCase().substring(0, 4).concat('…') : value.toUpperCase() }`);
// }

// function _getFields(fields: Field[]) {
//   if (!fields) return "";

//   return fields
//     .filter(({title, value}) => title && value)
//     .map(({title, value}) => `${title}: *${value}*`)
//     .join("\n");
// }

function _getFields(fields: Field[]) {
  if (!fields) return "";

  return fields
    .filter(({title, value}) => title && value)
    .map(({title, value}) => `${title}: ${value}`.substring(0, 27).concat('…'))
    .join("\n");
}

function _getPreferenceFooter(preference?: string) {
  if (!preference) return "";

  return `----------

Este es tu link de pago. _Una vez realizado envianos el número de operación_.
${preference}`;
}

function _getItems(items: CartItem[]): string {
  return items
    .map(
      (item) =>
        `·${[
          `[x${item.count}] ~Cod.${item.product.code}`,
          ` ${(item.product.title).length > 27 ? (item.product.title).toUpperCase().substring(0, 27).concat('…') : (item.product.title).toUpperCase()}`,
          item.product.type === 'ask' ? ` S/ *Precio a consultar` : ` ${getFormattedPrice(item)} (P.U. ${getFormattedUnitPrice(item)})`.substring(0, 28),
          // ` ${getFormattedPrice(item)} (P.U. ${getFormattedUnitPrice(item)})`.substring(0, 28),
        ]
          .filter(Boolean)
          .join("\n")}`,
    )
    .join("\n\n");
}

export function getMessage(
  items: CartItem[],
  orderId: string,
  fields?: Field[],
  preference?: string,
  tenantSlug?: string,
  tenantPhone?: string,
): string {
 // console.log(fields);
  // console.log(preference);
  return (
    "\`\`\`\n" +
    `${tenantSlug.toUpperCase()}`.substring(0, 27).concat('…') +
    "\n" +
    `Tienda#: +${tenantPhone}`+
    "\n\n" +
    `Pedido#: ${orderId}` +
    "\n" +
    `Cliente#: ${process.browser ? window.localStorage?.getItem("phoneclient:Products") : ''}` +
    "\n" +
    ((_getFields(fields)).length > 0 ? _getFields(fields) + "\n" : "") +
    (preference ? `b\n\n${_getPreferenceFooter(preference)}` : "") +
    "-----------------------------" +
    "\n" +
    ((_getItems(items)).length > 0 ? _getItems(items) + "\n" : "") +
    "-----------------------------" +
    "\n" +
    ` Subtotal` +
    "\n" +
    ` ${getCount(items)} Item(s) a ${formatPrice(getTotal(items))}`.substring(0, 28) +
    "\n" +
    "-----------------------------" +
    "\`\`\`" +
    "\n\n" +
    "*Monto Total a Pagar*" + 
    "\n" +
    "*= "+ formatPrice(getTotal(items)) + "*" +
    "\n" +
    "\`\`\`\n" +
    "* Los productos están sujetos\n" +
    "  a disponibilidad de stock\n" +
    "\`\`\`"
  );
}

export const getOrderId = () => {
  // Set characters
  shortId.characters("0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÑ");

  // Generate order id
  return `${shortId.generate().slice(0, 4).toUpperCase()}`;
};
