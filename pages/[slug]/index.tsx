import React from "react";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";

import ProductsScreen from "~/product/screens/Products";
import {ClientTenant} from "~/tenant/types";
import {Product} from "~/product/types";
import {Contact} from "~/contact/types";
import StoreLayout from "~/app/layouts/StoreLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {Provider as CartProvider} from "~/cart/context";
import {Provider as AnalyticsProvider} from "~/analytics/context";
import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";
import {Provider as ContactProvider} from "~/contact/context";
import tenantApi from "~/tenant/api/server";
import productApi from "~/product/api/server";
import tenantSchemas from "~/tenant/schemas";
import productSchemas from "~/product/schemas";

interface Props {
  tenant: ClientTenant;
  products: Product[];
  orders: any[];
  category: string | string[];
  contacts: Contact[];
}

const SlugRoute: React.FC<Props> = ({tenant, products, orders, contacts}) => {
  // Get router instance
  const router = useRouter();

  // Get the real product from the product id url
  const product = router.query.product
    ? products.find((product) => product.slug === router.query.product) || null
    : null;

  // added get category
  const category = router.query.category || null;
  // end added

  // added get tenant
    // console.log(router.query.slug);
  // end added

  return (
    <TenantProvider initialValue={tenant}>
      {(tenant) => (
        <ProductProvider initialValues={products} initialOrders={orders}>
          <AnalyticsProvider>
            <CartProvider>
              <ContactProvider initialContacts={contacts}>
                <StoreLayout product={product} category={category} tenant={tenant}>
                  <I18nProvider country={tenant.country}>
                    <ProductsScreen />
                  </I18nProvider>
                </StoreLayout>
              </ContactProvider>
            </CartProvider>
          </AnalyticsProvider>
        </ProductProvider>
      )}
    </TenantProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
    const orders = [{}]
    //console.log(orders)
    // Get its contacts //ADDED
    
    const contacts = [{}]
    //console.log(contacts)

    // Return props
    return {
      props: {tenant, products, orders, contacts},
    };
  } catch (err) {
    console.log(err)
    return {
      // If something failed return a status code that will be intercepted by _app
      props: {
        statusCode: err?.status || err?.statusCode || 404,
      },
    };
  }
};

export default SlugRoute;
