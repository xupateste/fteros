import React from "react";

import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {Text} from '@chakra-ui/core';

import {ClientTenant} from "~/tenant/types";
import tenantApi from "~/tenant/api/server";
import tenantSchemas from "~/tenant/schemas";
import { getCountryTelCode } from "~/landing/components/countries";
import ClientLayout from "~/app/layouts/ClientLayout";


interface Props {
  tenant: ClientTenant;
}

const Index: React.FC<Props> = ({tenant}) => {
  const salesPerson = {ventas1: "sales1", ventas2:"sales2", ventas3:"sales3", ventas4:"sales4", ventas5:"sales5",
                       ventas6:"sales6", ventas7:"sales7", ventas8:"sales8", ventas9:"sales9", ventas10:"sales10"};

	const router = useRouter();
  const phone = router.query.client;
	const sales = router.query.sales;
	const storeCode = getCountryTelCode(tenant.country).replaceAll("+", "").replaceAll(" ", "");
	
	if (typeof window !== "undefined") {
		window.localStorage.setItem("phoneclient:Products", `+${storeCode}${phone}`);
    window.localStorage.setItem("phoneclientnocode:Products", `${phone}`);
  	window.localStorage.setItem(tenant.slug, `${salesPerson[(sales).toString()] || "phone"}`);
    window.location.replace(`/${tenant.slug}`);
	}

  return <ClientLayout tenant={tenant}><Text></Text></ClientLayout>;
	return <Text>{sales} - {phone}</Text>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Get the tenant for this page slug
    const tenant: ClientTenant = await tenantApi
      .fetch(String(context.params.slug).toLowerCase())
      // Cast it as a client tenant
      .then((tenant) => tenantSchemas.client.fetch.cast(tenant, {stripUnknown: true}));

    // Return props
    return {
      props: {tenant},
    };
  } catch (err) {
    // console.log(err)
    return {
      // If something failed return a status code that will be intercepted by _app
      props: {
        statusCode: err?.status || err?.statusCode || 404,
      },
    };
  }
};

export default Index;