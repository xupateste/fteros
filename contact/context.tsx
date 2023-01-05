import React from "react";

import {Contact} from "./types";
import api from "./api/client";
import schemas from "./schemas";

import {useToast} from "~/hooks/toast";
import {useTenant} from "~/tenant/hooks";
import {sortBy} from "~/selectors/sort";


export interface Context {
  state: {
    contacts: Contact[];
  };
  actions: {
    create: (contact: Contact) => Promise<void>;
    update: (contact: Contact) => Promise<void>;
    remove: (id: Contact["id"]) => Promise<void>;
  };
}

interface Props {
  initialContacts: Contact[];
}

const ContactContext = React.createContext({} as Context);

const ContactProvider: React.FC<Props> = ({initialContacts, children}) => {
  const tenant = useTenant();
  const toast = useToast();

  const [contacts, setContacts] = React.useState<Contact[]>(
    sortBy(initialContacts, (item) => item?.name),
  );

  async function create(contact: Contact) {
    const casted = schemas.client.create.cast(contact);

    return api
      .create(tenant.id, casted)
      .then((contact) => {
        setContacts(contacts.concat(contact));

        toast({
          title: "Contacto creado",
          description: "Tu contacto fue creado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Hubo un error creando el contacto, refresca la página e intenta nuevamente",
          status: "error",
        });
      });
  }

  function update(contact: Contact) {
    const casted = schemas.client.update.cast(contact);

    return api
      .update(tenant.id, casted)
      .then(() => {
        setContacts((contacts) =>
          contacts.map((_contact) =>
            _contact.id === casted.id ? {..._contact, ...casted} : _contact,
          ),
        );

        toast({
          title: "Contacto actualizado",
          description: "Tu contacto fue actualizado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description:
            "Hubo un error actualizando el contacto, refresca la página e intenta nuevamente",
          status: "error",
        });
      });
  }

  function remove(id: Contact["id"]) {
    return api
      .remove(tenant.id, id)
      .then(() => {
        setContacts((contacts) => contacts.filter((contact) => contact.id !== id));

        toast({
          title: "Contacto eliminado",
          description: "Tu contacto fue eliminado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description:
            "Hubo un error borrando el contacto, refresca la página e intenta nuevamente",
          status: "error",
        });
      });
  };

  const state: Context["state"] = {contacts};
  const actions: Context["actions"] = {
    create,
    update,
    remove,
  };

  return <ContactContext.Provider value={{state, actions}}>{children}</ContactContext.Provider>;

};

export {ContactProvider as Provider, ContactContext as default};

