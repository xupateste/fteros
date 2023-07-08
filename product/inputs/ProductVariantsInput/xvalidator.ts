import {xOption} from "../../types";

export default function xvalidator(xoptions: xOption[] = []) {

  for (let index = 0; index < xoptions?.length; index++) {
    if (
      xoptions[index]?.price === ("" as any) ||
      isNaN(Number(xoptions[index]?.price))
    ) {
      return `${index}|optionsPrice|Requerido`;
    }

    if (
      xoptions[index]?.quantity === ("" as any) ||
      isNaN(Number(xoptions[index]?.quantity))
    ) {
      return `${index}|optionsQuantity|Requerido`;
    }

    if (
      Number(xoptions[index-1]?.quantity) >= Number(xoptions[index]?.quantity)
    ) {
      return `${index}|optionsQuantity|La cantidad debe ser mayor a la fila anterior`;
    }

    if (
      Number(xoptions[index]?.price) <= 0
    ) {
      return `${index}|optionsPrice|El precio debe ser mayor a 0`;
    }

    if (
      Number(xoptions[index]?.quantity) <= 0
    ) {
      return `${index}|optionsQuantity|La cantidad debe ser mayor a 0`;
    }
  }
}
