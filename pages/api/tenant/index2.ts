import {NextApiResponse, NextApiRequest} from "next";
import {GetServerSideProps} from "next";

import api from "~/tenant/api/server";
import {ClientTenant, ServerTenant} from "~/tenant/types";
import schemas from "~/tenant/schemas";

interface PostRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    secret: string;
    slug: ClientTenant["slug"];
  };
}

export default const getServerSideProps: GetServerSideProps (req: NextApiRequest, res: NextApiResponse) => {
  // When a POST request is made
  if (req.method === "POST") {
    const {
      // We extract what we need from the body
      //body: {email, password, secret, slug},
      body: {res.body.email, res.body.password, res.body.slug, process.env.SECRET},
    } = req as PostRequest;

    // If we don't have everything we need
    if (!email || !password || !slug || !secret) {
    //if (!email || !password || !slug) {
      // Return a 304
      return res.status(304).end("if nor");
    }

    // Store a temp tenant
    const tenant: Partial<ServerTenant> = schemas.server.create.cast(
      {
        // Tenant slug
        slug,
      },
      {
        stripUnknown: true,
      },
    );

    return (
      api
        // Create the tenant
        .create(email, password, tenant)
        // If everything went fine, return a 200
        .then(() => res.status(200).json({success: true}))
        // Otherwise return an error
        .catch(() => res.status(400).end("Fallo la creación de la tienda"))
    );
  }

  // If nothing matched return a 304
  return res.status(304).end("nelnel");
};
