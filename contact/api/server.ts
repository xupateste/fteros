import {Contact} from "../types";
import schemas from "../schemas";
import {database, firestore} from "~/firebase/admin";
import {ClientTenant} from "~/tenant/types";


export default {
	list: async (tenant: ClientTenant["id"]): Promise<Contact[]> => {
		return database
      .collection("tenants")
      .doc(tenant)
      .collection("contacts")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Contact), id: doc.id})))
      .then((contacts) => contacts.map((contact) => schemas.client.fetch.cast(contact)));
	  },	
  create: (tenant: ClientTenant["id"], contact: Contact) => {
    const newContact = database.collection("tenants").doc(tenant).collection("contacts").doc();
    contact['createdAt'] = firestore.Timestamp.now().seconds;
    contact["id"] = newContact.id;
    const casted = schemas.server.create.cast(contact);

    return newContact
      .set(casted)
      .then((snapshot) => {
        const contact: Contact = {...casted, id: snapshot['id']};

        return contact;
      });
  },
  update: (tenant: ClientTenant["id"], {id, ...contact}: Contact) => {
    const casted = schemas.server.update.cast(contact);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("contacts")
      .doc(id)
      .update(casted)
      .then(() => casted);
  },
  remove: (tenant: ClientTenant["id"], contact: Contact["id"]) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("contacts")
      .doc(contact)
      .delete()
      .then(() => contact),
}