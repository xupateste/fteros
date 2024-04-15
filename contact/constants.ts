import {Contact} from "./types";

export const DEFAULT_CONTACT: Omit<Contact, "id"> = {
  phone: "",
  name: "",
  pastInfo: "",
  sales: "",
  location: "",
  description: "",
  visits: 0,
  deleted: false,
  visitsPast: 0,
  createdAt: 1594090800000,
  createdAtPast: 1594090800000,
  updatedAt: 1594090800000,
};
