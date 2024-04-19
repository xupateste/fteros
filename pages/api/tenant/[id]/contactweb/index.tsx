import {NextApiResponse, NextApiRequest} from "next";

import api from "~/contact/api/server";
import {Contact} from "~/contact/types";
import {ClientTenant} from "~/tenant/types";
// import sessionApi from "~/session/api/server";
import schemas from "~/contact/schemas";

interface PostRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    id: ClientTenant["id"];
  };
  body: {
    contact: Partial<Contact>;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
    const {
      query: {id},
      body: {contact},
      headers: {},
    } = req as PostRequest;

    //console.log('post order called')
    //if (!id || !order) return res.status(304).end('noid noorder');

    //if (uid !== id) return res.status(403).end();
    //console.log('inside sessionApi')
    const casted = schemas.client.create.cast(contact, {stripUnkown: true});

    return await api
      .hookcontact(id, casted)
      .then(() => res.status(200).json(casted))
      .catch(() => res.status(400).end("Hubo un error creando el contacto"));
  }
  
  return res.status(304).end('return end');


}