import * as yup from "yup";

import {Product, Variant, Option, xOption} from "./types";
import {DEFAULT_PRODUCT, DEFAULT_PRODUCT_OPTION, DEFAULT_PRODUCT_XOPTION, DEFAULT_PRODUCT_VARIANT} from "./constants";

export default {
  server: {
    create: yup.object<Product>({
      id: yup.string().strip(true),
      code: yup.string().default(DEFAULT_PRODUCT.code),
      createdAt: yup.number().default(DEFAULT_PRODUCT.createdAt),
      updatedAt: yup.number().default(DEFAULT_PRODUCT.updatedAt),
      type: yup
        .string()
        .oneOf(["available", "unavailable", "ask", "promotional", "hidden"])
        .default(DEFAULT_PRODUCT.type),
      title: yup.string().default(DEFAULT_PRODUCT.title),
      price: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.price),
      originalPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.originalPrice),
      priceOff: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.priceOff),
      lastStock: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.lastStock),
      mqo: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.mqo),
      numPiezas: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.numPiezas),
      options: yup
        .array(
          yup.object<Variant>({
            id: yup.string().required(),
            title: yup.string().default(DEFAULT_PRODUCT_VARIANT.title),
            value: yup.array<Option>().strip(true),
            required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
            count: yup.number().default(DEFAULT_PRODUCT_VARIANT.count),
            options: yup
              .array(
                yup.object<Option>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .default([]),
      xoptions: yup
              .array(
                yup.object<xOption>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_XOPTION.price),
                  id: yup.string().required(),
                  quantity: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_XOPTION.quantity),
                }),
              )
              .default([]),
      category: yup.string().default(DEFAULT_PRODUCT.category).trim(),
      brand: yup.string().default(DEFAULT_PRODUCT.brand).trim(),
      description: yup.string().default(DEFAULT_PRODUCT.description),
      keywords: yup.string().default(DEFAULT_PRODUCT.keywords),
      badgeText: yup.string().default(DEFAULT_PRODUCT.badgeText),
      badgeColor: yup.string().default(DEFAULT_PRODUCT.badgeColor),
      featured: yup.boolean().default(DEFAULT_PRODUCT.featured),
      wholesale: yup.boolean().default(DEFAULT_PRODUCT.wholesale),
      isnew: yup.boolean().default(DEFAULT_PRODUCT.isnew),
      isPreOrder: yup.boolean().default(DEFAULT_PRODUCT.isPreOrder),
      image: yup.string().default(DEFAULT_PRODUCT.image),
      slug: yup.string().default(DEFAULT_PRODUCT.slug),
      promotionText: yup.string().default(DEFAULT_PRODUCT.promotionText),
      promotionDays: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.promotionDays),
      promotionExpireDate: yup.number().default(DEFAULT_PRODUCT.promotionExpireDate),
      promotionUnits: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.promotionUnits),
      promotionPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.promotionPrice),
      promotionExpireText: yup.string().default(DEFAULT_PRODUCT.promotionExpireText),
    }),
    update: yup.object<Partial<Product>>({
      id: yup.string().required(),
      code: yup.string().nullable(),
      title: yup.string().nullable(),
      category: yup.string().trim().nullable(),
      brand: yup.string().trim().nullable(),
      description: yup.string().nullable(),
      keywords: yup.string().nullable(),
      badgeText: yup.string().nullable(),
      badgeColor: yup.string().nullable(),
      createdAt: yup.number().nullable().strip(true),
      updatedAt: yup.number().nullable().strip(true),
      price: yup.number().nullable(),
      originalPrice: yup.number().nullable(),
      priceOff: yup.number().nullable(),
      lastStock: yup.number().nullable(),
      mqo: yup.number().nullable(),
      numPiezas: yup.number().nullable(),
      type: yup
        .string()
        .oneOf(["available", "unavailable", "ask", "promotional", "hidden"])
        .nullable(),
      featured: yup.boolean().nullable(),
      wholesale: yup.boolean().nullable(),
      isnew: yup.boolean().nullable(),
      isPreOrder: yup.boolean().nullable(),
      options: yup
        .array(
          yup.object<Variant>({
            id: yup.string().required(),
            title: yup.string().required().default(DEFAULT_PRODUCT_VARIANT.title),
            value: yup.array<Option>().strip(true),
            required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
            count: yup.number().default(1),
            options: yup
              .array(
                yup.object<Option>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .nullable(),
      xoptions: yup
              .array(
                yup.object<xOption>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_XOPTION.price),
                  id: yup.string().required(),
                  quantity: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_XOPTION.quantity),
                }),
              )
              .default([])
              .nullable(), //.nullable() ?
      image: yup.string().nullable(),
      slug: yup.string().nullable(),
      promotionText: yup.string().nullable(),
      promotionDays: yup.number().nullable(),
      promotionExpireDate: yup.number().nullable().strip(true),
      promotionUnits: yup.number().nullable(),
      promotionPrice: yup.number().nullable(),
      promotionExpireText: yup.string().nullable(),
    }),
  },
  client: {
    fetch: yup.object<Product>({
      id: yup.string().required(),
      code: yup.string().required().default(DEFAULT_PRODUCT.code),
      createdAt: yup.number().default(DEFAULT_PRODUCT.createdAt),
      updatedAt: yup.number().default(DEFAULT_PRODUCT.updatedAt),
      type: yup
        .string()
        .oneOf(["available", "unavailable", "ask", "promotional", "hidden"])
        .default(DEFAULT_PRODUCT.type),
      title: yup.string().required().default(DEFAULT_PRODUCT.title),
      price: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.price),
      originalPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.originalPrice),
      priceOff: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.priceOff),
      lastStock: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.lastStock),
      mqo: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.mqo),
      numPiezas: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.numPiezas),
      options: yup
        .array(
          yup.object<Variant>({
            id: yup.string().required(),
            title: yup.string().default(DEFAULT_PRODUCT_VARIANT.title),
            value: yup.array<Option>().default(DEFAULT_PRODUCT_VARIANT.value),
            required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
            count: yup.number().default(DEFAULT_PRODUCT_VARIANT.count),
            options: yup
              .array(
                yup.object<Option>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .default([]),
      xoptions: yup
              .array(
                yup.object<xOption>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_XOPTION.price),
                  id: yup.string().required(),
                  quantity: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_XOPTION.quantity),
                }),
              )
              .default([]),
      category: yup.string().default(DEFAULT_PRODUCT.category).trim(),
      brand: yup.string().default(DEFAULT_PRODUCT.brand).trim(),
      description: yup.string().default(DEFAULT_PRODUCT.description),
      keywords: yup.string().default(DEFAULT_PRODUCT.keywords),
      badgeText: yup.string().default(DEFAULT_PRODUCT.badgeText),
      badgeColor: yup.string().default(DEFAULT_PRODUCT.badgeColor),
      featured: yup.boolean().default(DEFAULT_PRODUCT.featured),
      wholesale: yup.boolean().default(DEFAULT_PRODUCT.wholesale),
      isnew: yup.boolean().default(DEFAULT_PRODUCT.isnew),
      isPreOrder: yup.boolean().default(DEFAULT_PRODUCT.isPreOrder),
      image: yup.string().default(DEFAULT_PRODUCT.image),
      slug: yup.string().default(DEFAULT_PRODUCT.slug),
      promotionText: yup.string().default(DEFAULT_PRODUCT.promotionText),
      promotionDays: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.promotionDays),
      promotionExpireDate: yup.number().default(DEFAULT_PRODUCT.promotionExpireDate),
      promotionUnits: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.promotionUnits),
      promotionPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.promotionPrice),
      promotionExpireText: yup.string().default(DEFAULT_PRODUCT.promotionExpireText),
    }),
    update: yup.object<Product>({
      type: yup
        .string()
        .oneOf(["available", "unavailable", "ask", "promotional", "hidden"])
        .nullable(),
      createdAt: yup.number().nullable().strip(true),
      updatedAt: yup.number().nullable().strip(true),
      category: yup.string().trim().nullable(),
      brand: yup.string().trim().nullable(),
      description: yup.string().nullable(),
      keywords: yup.string().nullable(),
      badgeText: yup.string().nullable(),
      badgeColor: yup.string().nullable(),
      featured: yup.boolean().nullable(),
      wholesale: yup.boolean().nullable(),
      isnew: yup.boolean().nullable(),
      isPreOrder: yup.boolean().nullable(),
      id: yup.string().required(),
      code: yup.string().nullable(),
      image: yup.string().nullable(),
      options: yup
        .array(
          yup.object<Variant>({
            id: yup.string().required(),
            title: yup.string().required().default(DEFAULT_PRODUCT_VARIANT.title),
            value: yup.array<Option>().strip(true),
            required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
            count: yup.number().default(DEFAULT_PRODUCT_VARIANT.count),
            options: yup
              .array(
                yup.object<Option>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .nullable(),
      xoptions: yup
              .array(
                yup.object<xOption>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_XOPTION.price),
                  id: yup.string().required(),
                  quantity: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_XOPTION.quantity),
                }),
              )
              .default([])
              .nullable(),
      price: yup.number().nullable(),
      originalPrice: yup.number().nullable(),
      priceOff: yup.number().nullable(),
      lastStock: yup.number().nullable(),
      mqo: yup.number().nullable(),
      numPiezas: yup.number().nullable(),
      title: yup.string().nullable(),
      slug: yup.string().nullable(),
      promotionText: yup.string().nullable(),
      promotionDays: yup.number().nullable(),
      promotionExpireDate: yup.number().nullable().strip(true),
      promotionUnits: yup.number().nullable(),
      promotionPrice: yup.number().nullable(),
      promotionExpireText: yup.string().nullable(),
    }),
    create: yup.object<Product>({
      id: yup.string().strip(true),
      code: yup.string().default(DEFAULT_PRODUCT.code),
      createdAt: yup.number().default(DEFAULT_PRODUCT.createdAt),
      updatedAt: yup.number().default(DEFAULT_PRODUCT.updatedAt),
      type: yup
        .string()
        .oneOf(["available", "unavailable", "ask", "promotional", "hidden"])
        .default(DEFAULT_PRODUCT.type),
      title: yup.string().default(DEFAULT_PRODUCT.title),
      price: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.price),
      originalPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.originalPrice),
      priceOff: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.priceOff),
      lastStock: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.lastStock),
      mqo: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.mqo),
      numPiezas: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.numPiezas),
      options: yup
        .array(
          yup
            .object<Variant>({
              id: yup.string().required(),
              title: yup.string().default(DEFAULT_PRODUCT_VARIANT.title),
              value: yup.array<Option>().strip(true),
              required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
              count: yup.number().default(DEFAULT_PRODUCT_VARIANT.count),
              options: yup
                .array(
                  yup.object<Option>({
                    price: yup
                      .number()
                      .transform((value) => (isNaN(value) ? undefined : value))
                      .default(DEFAULT_PRODUCT_OPTION.price),
                    id: yup.string().required(),
                    title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                  }),
                )
                .default([]),
            })
            .nullable(),
        )
        .default([]),
      xoptions: yup
                .array(
                  yup.object<xOption>({
                    price: yup
                      .number()
                      .transform((value) => (isNaN(value) ? undefined : value))
                      .default(DEFAULT_PRODUCT_XOPTION.price),
                    id: yup.string().required(),
                    quantity: yup
                      .number()
                      .transform((value) => (isNaN(value) ? undefined : value))
                      .default(DEFAULT_PRODUCT_XOPTION.quantity),
                  }),
                )
                .default([])
                .nullable(),
      category: yup.string().default(DEFAULT_PRODUCT.category).trim(),
      brand: yup.string().default(DEFAULT_PRODUCT.brand).trim(),
      description: yup.string().default(DEFAULT_PRODUCT.description),
      keywords: yup.string().default(DEFAULT_PRODUCT.keywords),
      badgeText: yup.string().default(DEFAULT_PRODUCT.badgeText),
      badgeColor: yup.string().default(DEFAULT_PRODUCT.badgeColor),
      featured: yup.boolean().default(DEFAULT_PRODUCT.featured),
      wholesale: yup.boolean().default(DEFAULT_PRODUCT.wholesale),
      isnew: yup.boolean().default(DEFAULT_PRODUCT.isnew),
      isPreOrder: yup.boolean().default(DEFAULT_PRODUCT.isPreOrder),
      image: yup.string().default(DEFAULT_PRODUCT.image),
      slug: yup.string().default(DEFAULT_PRODUCT.slug),
      promotionText: yup.string().default(DEFAULT_PRODUCT.promotionText),
      promotionDays: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.promotionDays),
      promotionExpireDate: yup.number().default(DEFAULT_PRODUCT.createdAt),
      promotionUnits: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.promotionUnits),
      promotionPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.promotionPrice),
      promotionExpireText: yup.string().default(DEFAULT_PRODUCT.promotionExpireText),
    }),
  },
};
