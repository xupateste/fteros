import {NextApiResponse, NextApiRequest} from "next";

import api from "~/tenant/api/server";
import {ClientTenant, ServerTenant} from "~/tenant/types";
import schemas from "~/tenant/schemas";

interface PostRequest extends NextApiRequest {
  body: {
    businessName: string;
    storeName: ClientTenant["slug"];
    storePhone: number;
    personalPhone: number;
    country: string;
    email: string;
    password: string;
    acceptCheck: boolean;
    createdAt: number;
    updatedAt: number;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Validators
  const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
  const validateStoreName = (storeName) => {
      return storeName.match(
          /^[a-z0-9]*$/
      );
  };
  // When a POST request is made
  if (req.method === "POST") {
    const {
      // We extract what we need from the body
      //body: {email, password, secret, slug},
      body: {businessName, storeName, storePhone, personalPhone, country, email, password, acceptCheck},
    } = req as PostRequest;

    // If we don't have everything we need
    //if (!email || !password || !slug || !secret || secret !== process.env.SECRET) {
    if (!email || !password || !storeName) {
      // Return a 304
      return res.status(304).end("if nor"+acceptCheck);
    }

    // Store a temp tenant
    if (validateStoreName(storeName) && validateEmail(email)) {
      const tenant: Partial<ServerTenant> = schemas.server.create.cast(
        {
          // Tenant slug
          slug: storeName,
          title: businessName,
          phone: storePhone,
          phonePersonal: personalPhone,
          country: country
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
          .catch(() => res.status(400).end("Fallo la creación"))
      ); 
    }
  }

  // If nothing matched return a 304
  return res.status(304).end("nelnel");
};
