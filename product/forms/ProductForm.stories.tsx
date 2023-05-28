import React from "react";
import {action} from "@storybook/addon-actions";

import productMock from "../mock";

import ProductForm from "./ProductForm";

const CATEGORIES = ["some", "categories"];
const BRANDS = ["some", "brands"];

export const create = () => (
  <ProductForm categories={CATEGORIES} brands={BRANDS} defaultValues={{}} onSubmit={action("submit")}>
    {({form}) => form}
  </ProductForm>
);

export const edit = () => (
  <ProductForm
    categories={CATEGORIES}
    brands={BRANDS}
    defaultValues={productMock.withoutVariants}
    onSubmit={action("submit")}
  >
    {({form}) => form}
  </ProductForm>
);

export const noCategories = () => (
  <ProductForm
    categories={[]}
    brands={[]}
    defaultValues={productMock.withoutVariants}
    onSubmit={action("submit")}
  >
    {({form}) => form}
  </ProductForm>
);
export const noBrands = () => (
  <ProductForm
    categories={[]}
    brands={[]}
    defaultValues={productMock.withoutVariants}
    onSubmit={action("submit")}
  >
    {({form}) => form}
  </ProductForm>
);

export default {title: "Product/Forms/ProductForm"};
