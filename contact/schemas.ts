import * as yup from "yup";

import {Contact} from "./types";
import {DEFAULT_CONTACT} from "./constants";

export default {
  server: {
    create: yup.object<Contact>({
      id: yup.string().strip(true),
      phone: yup.string().default(DEFAULT_CONTACT.phone),
      name: yup.string().default(DEFAULT_CONTACT.name),
      pastInfo: yup.string().default(DEFAULT_CONTACT.pastInfo),
      sales: yup.string().default(DEFAULT_CONTACT.sales),
      location: yup.string().default(DEFAULT_CONTACT.location),
      description: yup.string().default(DEFAULT_CONTACT.description),
      visits: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_CONTACT.visits),
      visitsPast: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_CONTACT.visits),
      deleted: yup.boolean().default(DEFAULT_CONTACT.deleted),
      createdAt: yup.number().default(DEFAULT_CONTACT.createdAt),
      createdAtPast: yup.number().default(DEFAULT_CONTACT.createdAtPast),
      updatedAt: yup.number().default(DEFAULT_CONTACT.updatedAt),
    }),
    update: yup.object<Partial<Contact>>({
      id: yup.string().required(),
      phone: yup.string().nullable(),
      name: yup.string().nullable(),
      pastInfo: yup.string().nullable(),
      sales: yup.string().nullable(),
      location: yup.string().nullable(),
      description: yup.string().nullable(),
      visits: yup.number().nullable(),
      visitsPast: yup.number().nullable(),
      deleted: yup.boolean().nullable(),
      createdAt: yup.number().nullable(),
      createdAtPast: yup.number().nullable(),
      updatedAt: yup.number().nullable().strip(true),
    }),
  },
  client: {
    fetch: yup.object<Contact>({
      id: yup.string().required(),
      phone: yup.string().required().default(DEFAULT_CONTACT.phone),
      name: yup.string().default(DEFAULT_CONTACT.name),
      pastInfo: yup.string().default(DEFAULT_CONTACT.pastInfo),
      sales: yup.string().default(DEFAULT_CONTACT.sales),
      location: yup.string().default(DEFAULT_CONTACT.location),
      description: yup.string().default(DEFAULT_CONTACT.description),
      visits: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_CONTACT.visits),
      visitsPast: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_CONTACT.visits),
      deleted: yup.boolean().default(DEFAULT_CONTACT.deleted),
      createdAt: yup.number().default(DEFAULT_CONTACT.createdAt),
      createdAtPast: yup.number().default(DEFAULT_CONTACT.createdAtPast),
      updatedAt: yup.number().default(DEFAULT_CONTACT.updatedAt),
    }),
    update: yup.object<Contact>({
      id: yup.string().required(),
      phone: yup.string().nullable(),
      name: yup.string().nullable(),
      pastInfo: yup.string().nullable(),
      sales: yup.string().nullable(),
      location: yup.string().nullable(),
      description: yup.string().nullable(),
      visits: yup.number().nullable(),
      visitsPast: yup.number().nullable(),
      deleted: yup.boolean().nullable(),
      createdAt: yup.number().nullable(),
      createdAtPast: yup.number().nullable(),
      updatedAt: yup.number().nullable().strip(true),
    }),
    create: yup.object<Contact>({
      id: yup.string().strip(true),
      phone: yup.string().default(DEFAULT_CONTACT.phone),
      name: yup.string().default(DEFAULT_CONTACT.name),
      pastInfo: yup.string().default(DEFAULT_CONTACT.pastInfo),
      sales: yup.string().default(DEFAULT_CONTACT.sales),
      location: yup.string().default(DEFAULT_CONTACT.location),
      description: yup.string().default(DEFAULT_CONTACT.description),
      visits: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_CONTACT.visits),
      visitsPast: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_CONTACT.visits),
      deleted: yup.boolean().default(DEFAULT_CONTACT.deleted),
      createdAtPast: yup.number().default(DEFAULT_CONTACT.createdAtPast),
      createdAt: yup.number().default(DEFAULT_CONTACT.createdAt),
      updatedAt: yup.number().default(DEFAULT_CONTACT.updatedAt),
    }),
  },
};
