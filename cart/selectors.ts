import shortId from "shortid";

import {CartItem} from "./types";

import {xOption} from "~/product/types";


import {Field} from "~/tenant/types";

// import {getVariantsPrice} from "~/product/selectors";
import {formatPrice} from "~/i18n/selectors";

export function getTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + getPrice(item), 0);
}

export function getTotalSaving(items: CartItem[]): number {
 return items.reduce((total, item) => total + getSaving(item.product.wholesale, item.product.xoptions, item.product.price, item.count), 0);
}

export function getSaving(wholesale:boolean, xoptions: xOption[], price:number, count:number): number {
  let saving = 0;
  if (xoptions && wholesale) {
    let last = xoptions.length;
    for (var i = 0; i < xoptions.length; i++) {
      if(count<xoptions[i].quantity) {
        saving = 0
        break;
      }
      if(xoptions[i].quantity <= count && count < xoptions[i+1]?.quantity) {
        saving = Number(price) - Number(xoptions[i].price);
        break;
      } else if(count >= xoptions[last-1].quantity) {
        saving = Number(price) - Number(xoptions[last-1].price);
        break;
      }
    }
  }

  return Number(saving)*Number(count);
}

export function getProductSaving(wholesale:boolean, xoptions: xOption[], price:number, count:number): string {
  let saving = 0;
  let last = xoptions.length;
  if(wholesale) {
    for (var i = 0; i < xoptions.length; i++) {
      if(count<xoptions[i].quantity) {
        saving = 0
        break;
      }
      if(xoptions[i].quantity <= count && count < xoptions[i+1]?.quantity) {
        saving = Number(price) - Number(xoptions[i].price);
        break;
      } else if(count >= xoptions[last-1].quantity) {
        saving = Number(price) - Number(xoptions[last-1].price);
        break;
      }
    }
  }

  return saving ? `¡Ahorras ${formatPrice(Number(count)*Number(saving))}!` : ''
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
      // return (item.product.price + getVariantsPrice(item.variants));
      let unitPrice = item.product.price
      let last = (item.product.xoptions).length;
      if(item.product.wholesale) {
        for (var i = 0; i < (item.product.xoptions).length; i++) {
          if(item.count<item.product.xoptions[i].quantity) {
            // unitPrice = item.product.xoptions[i].price
            break;
          }
          if(item.product.xoptions[i].quantity <= item.count && item.count < item.product.xoptions[i+1]?.quantity) {
            unitPrice = item.product.xoptions[i].price
            break;
          } else if(item.count >= item.product.xoptions[last-1].quantity) {
            unitPrice = item.product.xoptions[last-1].price
            break;
          }
        }
      }
      return unitPrice
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
      // return (item.product.price + getVariantsPrice(item.variants)) * item.count; //cmntd because xoptions
      return getRealPrice(item.product.wholesale, item.product.price, item.product.xoptions, item.count) * item.count;
    }
  }
}

export function getRealPrice(isWholesale:boolean, price:number, xoptions: xOption[], count: number): number {
  let realPrice = 0;
  let last = xoptions.length;
  if(!isWholesale) {
    realPrice = price //+ getVariantsPrice(item.variants)
  } else {
    for (var i = 0; i < xoptions.length; i++) {
      if(count<xoptions[i].quantity) {
        realPrice = Number(price);
        break;
      }
      if(xoptions[i].quantity <= count && count < xoptions[i+1]?.quantity) {
        realPrice = Number(xoptions[i].price);
        break;
      } else if(count >= xoptions[last-1].quantity) {
        realPrice = Number(xoptions[last-1].price);
        break;
      }
    }
  }
  // console.log(realPrice)
  return realPrice
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
    .map(({title, value}) => (`${title}: ${value}`).length > 25 ? `${title}: ${value}`.substring(0, 25).concat('…') : `${title}: ${value}`)
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
          `[x${item.count}] ~Cod-${item.product.code}`,
          ` ${(item.product.title).length > 25 ? (item.product.title).toUpperCase().substring(0, 23).concat('…') : (item.product.title).toUpperCase()}`,
          item.product.type === 'ask' ? ` *Precio a consultar` : ` ${getFormattedPrice(item)} (PU ${getFormattedUnitPrice(item)})`.substring(0, 26),
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
    `${(tenantSlug).length > 25 ? tenantSlug.toUpperCase().substring(0, 25).concat('…') : tenantSlug.toUpperCase()}` +
    "\n" +
    `Tienda#: +${tenantPhone}`+
    "\n\n" +
    `Pedido#: ${orderId}` +
    "\n" +
    `Cliente#: ${process.browser ? window.localStorage?.getItem("phoneclient:Products") : ''}` +
    "\n" +
    ((_getFields(fields)).length > 0 ? _getFields(fields) + "\n" : "") +
    (preference ? `b\n\n${_getPreferenceFooter(preference)}` : "") +
    "---------------------------" +
    "\n" +
    ((_getItems(items)).length > 0 ? _getItems(items) + "\n" : "") +
    "---------------------------" +
    "\n" +
    ` Subtotal` +
    "\n" +
    ` ${getCount(items)} Item(s) a ${formatPrice(getTotal(items))}`.substring(0, 25).concat('…') +
    "\n" +
    "---------------------------" +
    "\`\`\`" +
    "\n\n" +
    "*Monto Total a Pagar*" + 
    "\n" +
    "*= "+ formatPrice(getTotal(items)) + "*" +
    "\n" +
    "\`\`\`\n" +
    "* Productos están sujetos a\n" +
    "  disponibilidad de stock\n" +
    "\`\`\`"
  );
}

export const getOrderId = () => {
  // Set characters
  shortId.characters("0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÑ");

  // Generate order id
  return `${shortId.generate().slice(0, 4).toUpperCase()}`;
};
