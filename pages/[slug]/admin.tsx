import {ParsedUrlQuery} from "querystring";

import React from "react";
import {GetServerSideProps} from "next";

import {Provider as SessionProvider} from "~/session/context";
import {ClientTenant} from "~/tenant/types";
import {Product} from "~/product/types";
import {Contact} from "~/contact/types";
import AdminScreen from "~/app/screens/Admin";
import AdminLayout from "~/app/layouts/AdminLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {Provider as ProductProvider} from "~/product/context";
import {Provider as ContactProvider} from "~/contact/context";
import {Provider as TenantProvider} from "~/tenant/context";
import tenantApi from "~/tenant/api/server";
import productApi from "~/product/api/server";
import contactApi from "~/contact/api/server";
import tenantSchemas from "~/tenant/schemas";
import productSchemas from "~/product/schemas";
import contactSchemas from "~/contact/schemas";

interface Props {
  tenant: ClientTenant;
  products: Product[];
  contacts: Contact[];
  orders: any[];
  timestamp: number;
}

interface Params extends ParsedUrlQuery {
  slug: ClientTenant["slug"];
}

const AdminRoute: React.FC<Props> = ({tenant, products, orders, contacts, timestamp}) => {
  return (
    <TenantProvider initialValue={tenant}>
      {(tenant) => (
        <ProductProvider initialValues={products} initialOrders={orders}>
          <ContactProvider initialContacts={contacts}>
            <AdminLayout>
              <I18nProvider country={tenant.country}>
                <SessionProvider>
                  <AdminScreen timestamp={timestamp}/>
                </SessionProvider>
              </I18nProvider>
            </AdminLayout>
          </ContactProvider>
        </ProductProvider>
      )}
    </TenantProvider>
  );
};

export const getServerSideProps: GetServerSideProps<any, Params> = async function (context) {
  try {
    // Get the tenant for this page slug
    const tenant: ClientTenant = await tenantApi
      .fetch(String(context.params.slug).toLowerCase())
      // Cast it as a client tenant
      .then((tenant) => tenantSchemas.client.fetch.cast(tenant, {stripUnknown: true}));

    // Get its products
    const products: Product[] = await productApi
      .list(tenant.id)
      // Cast all products for client
      .then((products) => 
        products.map((product) => productSchemas.client.fetch.cast(product, {stripUnknown: true})),
      );

    // Get its orders //ADDED
    const orders = await productApi
      .orders(tenant.id)
      .then((orders) => orders.map((order) => order));
    //console.log(orders)

    // Get its contacts //ADDED
    const contacts: Contact[] = await contactApi
      .list(tenant.id)
      .then((contacts) => 
        contacts.map((contact) => contactSchemas.client.fetch.cast(contact, {stripUnknown: true})),
      );

    // Get server timestamp
    const timestamp = Number(tenantApi.timestamp);

    // Return props
    return {props: {tenant, products, orders, contacts, timestamp}};
  } catch (err) {
    // If something failed report it to _app.tsx
    return {props: {statusCode: err?.status || context.res?.statusCode || 404}};
  }
};

export default AdminRoute;
