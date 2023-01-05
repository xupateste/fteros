import {Contact} from "./types";

export const DEFAULT_CONTACT: Omit<Contact, "id"> = {
  phone: "",
  name: "",
  location: "",
  description: "",
  visits: 0,
  createdAt: 1594090800000,
  updatedAt: 1594090800000,
};
