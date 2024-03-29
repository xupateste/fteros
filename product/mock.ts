import faker from "faker";

import {Product, Variant, Option} from "./types";

export default {
  get withoutVariants(): Product {
    return {
      id: faker.random.uuid(),
      code: "10009",
      category: faker.commerce.department(),
      brand: faker.commerce.department(),
      image: `https://placehold.it/320x240`,
      description: faker.lorem.paragraph(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      originalPrice: Number(faker.commerce.price()),
      priceOff: Number(faker.commerce.price()),
      lastStock: faker.random.number(99),
      numPiezas: faker.random.number(999),
      createdAt: faker.random.number(999999999),
      updatedAt: faker.random.number(999999999),
      type: "available",
      mqo: faker.random.number(9),
      featured: true,
      isnew: true,
      wholesale: false,
      isPreOrder: true,
      options: [],
      xoptions: [],
      promotionText: "offer",
      promotionDays: 1,
      promotionExpireDate: faker.random.number(999999999),
      promotionUnits: 0,
      promotionPrice: 0,
      promotionExpireText: "",
    };
  },
  get withoutImage(): Product {
    return {
      ...this.withoutVariants,
      image: null,
    };
  },
  get variant(): Variant {
    const options = [this.option, this.option, this.option];
    const option = this.option;

    return {
      id: faker.random.uuid(),
      title: faker.commerce.productName(),
      count: faker.random.number(5),
      required: faker.random.boolean(),
      options,
      value: [this.option, option, option],
    };
  },
  get option(): Option {
    return {
      id: faker.random.uuid(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    };
  },
  get full(): Product {
    return {
      ...this.withoutVariants,
      options: [
        {...this.variant, count: 0},
        {...this.variant, count: 5},
        {...this.variant, count: 1},
      ],
    };
  },
  get withoutVariantsValue(): Product {
    const product = this.full;

    product.options.forEach((option) => {
      delete option.value;
    });

    return product;
  },
};
