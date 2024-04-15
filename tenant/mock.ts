import faker from "faker";

import {ClientTenant, ServerTenant} from "./types";

import {CATEGORIES} from "~/app/constants/catalogs";

const mock = {
  client: {
    get full(): ClientTenant {
      return {
        id: faker.random.uuid(),
        color: "cyan",
        slug: faker.internet.userName(),
        twitter: faker.internet.userName(),
        instagram: faker.internet.userName(),
        facebook: faker.internet.userName(),
        createdAt: faker.random.number(999999999),
        updatedAt: faker.random.number(999999999),
        logo: "//placehold.it/128x128",
        banner: "//placehold.it/256x128",
        title: faker.company.companyName(),
        description: faker.lorem.lines(2),
        phone: faker.phone.phoneNumber("##########"),
        phonePersonal: faker.phone.phoneNumber("##########"),
        sales1: faker.phone.phoneNumber("##########"),
        sales2: faker.phone.phoneNumber("##########"),
        sales3: faker.phone.phoneNumber("##########"),
        sales4: faker.phone.phoneNumber("##########"),
        sales5: faker.phone.phoneNumber("##########"),
        sales6: faker.phone.phoneNumber("##########"),
        sales7: faker.phone.phoneNumber("##########"),
        sales8: faker.phone.phoneNumber("##########"),
        sales9: faker.phone.phoneNumber("##########"),
        sales10: faker.phone.phoneNumber("##########"),
        category: CATEGORIES[faker.random.number(CATEGORIES.length - 1)],
        highlight: faker.lorem.words(10),
        promoText: "PROMOCIÓN",
        hook: "http://some.url",
        pixel: "1000",
        ga: "ASD123",
        showMqo: false,
        fakeVisitors: false,
        country: "AR",
        flags: ["mercadopago", "bulk", "advanced", "note"],
        location: {
          address: `${faker.address.streetAddress()}, ${faker.address.city()}`,
          coordinates: {
            lat: 0,
            lng: 0,
          },
        },
        place: "",
        placeUrl: "",
        keywords: `${faker.commerce.department()}, ${faker.commerce.department()}`,
        fields: [
          {
            id: faker.random.uuid(),
            title: "Métodos de pago",
            type: "radio",
            required: false,
            options: [
              {id: faker.random.uuid(), title: "Efectivo", note: "20% Off"},
              {id: faker.random.uuid(), title: "Tarjeta de débito", note: "10% Off"},
              {id: faker.random.uuid(), title: "Tarjeta de crédito", note: ""},
            ],
          },
          {
            id: faker.random.uuid(),
            title: "Dirección de entrega",
            required: true,
            type: "text",
            note: "Solo se entrega en zona sur",
          },
        ],
        mercadopago: true,
      };
    },
  },
  server: {
    get full(): ServerTenant {
      return {
        ...mock.client.full,
        mercadopago: {
          token: faker.random.uuid(),
          refresh: faker.random.uuid(),
          expiration: +faker.date.future(),
        },
      };
    },
  },
};

export default mock;
