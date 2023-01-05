import {NextApiResponse, NextApiRequest} from "next";

import api from "~/contact/api/server";
import {Contact} from "~/contact/types";
import {ClientTenant} from "~/tenant/types";
import sessionApi from "~/session/api/server";
import schemas from "~/contact/schemas";

interface PostRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    id: ClientTenant["id"];
  };
  body: {
    contact: Contact;
  };
}

interface PatchRequest extends NextApiRequest {
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

interface DeleteRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    contact: Contact["id"];
    id: ClientTenant["id"];
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
    const {
      query: {id},
      body: {contact},
      headers: {authorization: token},
    } = req as PostRequest;

    if (!id || !contact) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        const casted = schemas.client.create.cast(contact, {stripUnkown: true});

        return api
          .create(id, casted)
          .then(() => res.status(200).json(casted))
          .catch(() => res.status(400).end("Hubo un error creando el contacto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, vuelve a iniciar sesión para continuar"));
  }

  if (req.method === "PATCH") {
    const {
      query: {id},
      body: {contact},
      headers: {authorization: token},
    } = req as PatchRequest;

    if (!id || !contact) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        const casted = schemas.client.update.cast(contact, {stripUnkown: true});

        return api
          .update(id, casted)
          .then(() => res.status(200).json(casted))
          .catch((error) =>
            res.status(400).json({
              message: "Hubo un error actualizando el contacto",
              details: error,
            }),
          );
      })
      .catch(() => res.status(401).end("La sesión expiró, vuelve a iniciar sesión para continuar"));
  }

  if (req.method === "DELETE") {
    const {
      query: {id, contact},
      headers: {authorization: token},
    } = req as DeleteRequest;

    if (!id || !contact) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        return api
          .remove(id, contact)
          .then(() => res.status(200).json({success: true}))
          .catch(() => res.status(400).end("Hubo un error borrando el contacto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, vuelve a iniciar sesión para continuar"));
  }

  return res.status(304).end();
}







