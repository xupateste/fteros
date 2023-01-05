import {Contact} from "../types";

import {ClientTenant} from "~/tenant/types";
import fetch from "~/utils/fetch";

export default {
	create: (tenant: ClientTenant["slug"], contact: Contact) =>
    fetch(
      "POST",
      `/api/tenant/${tenant}/contact`,
      {contact},
      {
        Authorization: window.localStorage.getItem("token"),
      },
    ),
  update: (tenant: ClientTenant["slug"], contact: Partial<Contact>) =>
    fetch(
      "PATCH",
      `/api/tenant/${tenant}/contact`,
      {contact},
      {
        Authorization: window.localStorage.getItem("token"),
      },
    ),
  remove: (tenant: ClientTenant["slug"], contact: Contact["id"]) =>
    fetch("DELETE", `/api/tenant/${tenant}/contact?contact=${contact}`, null, {
      Authorization: window.localStorage.getItem("token"),
    }),

}