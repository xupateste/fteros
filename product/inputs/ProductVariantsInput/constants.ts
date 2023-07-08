import shortid from "shortid";

import {Option, xOption, Variant} from "../../types";

export const getVariant = (): Variant => {
  return {
    id: shortid.generate(),
    title: "",
    required: false,
    count: 1,
    options: [getOption(), getOption()],
  };
};

export const getOption = (): Option => {
  return {
    id: shortid.generate(),
    title: "",
    price: 0,
  };
};

export const getxOption = (): xOption => {
  return {
    id: shortid.generate(),
    quantity: 0,
    price: 0,
  };
};
