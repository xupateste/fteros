import React from "react";

import {GetServerSideProps} from "next";
import {Flex, Stack, Text, Button} from '@chakra-ui/core';
import ClientLayout from "~/app/layouts/ClientLayout";
import PhoneNumberInput from "~/landing/components/PhoneNumberInput";

import {ClientTenant} from "~/tenant/types";
import tenantApi from "~/tenant/api/server";
import tenantSchemas from "~/tenant/schemas";
import { getCountryTelCode } from "~/landing/components/countries";
import TenantAvatar from "~/tenant/components/TenantAvatar";
import WhatsAppIcon from "~/ui/icons/WhatsApp";

import { COUNTRIES } from "~/landing/components/countries";
import {useForm} from "react-hook-form";
import FormControl from "~/ui/form/FormControl";

interface Props {
  tenant: ClientTenant;
}

const Index: React.FC<Props> = ({tenant}) => {
	// const storeCode = getCountryTelCode(tenant.country).replaceAll("+", "").replaceAll(" ", "");
  if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
  }
  const [storeCode, setstoreCode] = React.useState((getCountryTelCode(tenant.country)).replaceAll("+", "").replaceAll(" ", ""));
	
  const { register, handleSubmit, errors } = useForm();

  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso
  }));

  const onPhoneclientSubmit = data => {
    window.open(
      `https://wa.me/${storeCode}${data.phoneclient}?text=${encodeURIComponent(`Hola! le envío nuestro *catálogo actualizado*, cualquier consulta no dude en escribirnos\nhttps://ferreteros.app/${tenant.slug}/cliente/${data.phoneclient}`)}`,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

	return (
    <ClientLayout tenant={tenant}>
    <Flex
      p={4}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg="gray">
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg="blue"
        alignItems="center"
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <TenantAvatar
          gridArea="avatar"
          logo={tenant.logo}
          marginRight={{base: 0, sm: 4}}
          marginTop={{base: -10, sm: -10}}
          title={tenant.title}
        />
        <Text lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Invitación para clientes
        </Text>
        <form onSubmit={handleSubmit(onPhoneclientSubmit)}>
          <FormControl
            isRequired
            error={errors.phoneclient && "Ingrese un número válido"}
            name="phoneclient"
          >
            <Text textDecoration="underline" color="primary.700" fontSize={17} mb={2}>Número de WhatsApp</Text>
            <PhoneNumberInput
              ref={register({required: true, maxLength: 12, pattern: /^[0-9]+$/})}
              country={tenant.country}
              onChange={value => setstoreCode(value)}
              options={countryOptions}
              size="lg"
              name="phoneclient"
              placeholder="111344400"
            />
          </FormControl>
        </form>
        <Stack mt={4}>
          <Button pointerEvents="auto" onClick={handleSubmit(onPhoneclientSubmit)} alignItems="center" bg="whatsapp.500" variantColor="whatsapp" rounded={24} boxShadow='md' borderWidth={1}>
            <WhatsAppIcon height={6} color="white" width={6} />
            <Text ml={2} fontWeight={700} fontSize="xl" color="white">Enviar link por WhatsApp</Text>
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </ClientLayout>
  );
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