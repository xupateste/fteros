import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../mock";

import ProductDrawer from "./ProductDrawer";

const CATEGORIES = ["some", "categories"];
const BRANDS = ["some", "brands"];

export const edit = () => (
  <ProductDrawer
    categories={CATEGORIES}
    brands={BRANDS}
    defaultValues={mock.full}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const create = () => (
  <ProductDrawer
    categories={CATEGORIES}
    brands={BRANDS}
    defaultValues={undefined}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export default {title: "Product/Components/ProductDrawer"};
