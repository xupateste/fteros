import React from "react";

import {GetServerSideProps} from "next";
import {Flex, Stack, Text, Button, Textarea, Select} from '@chakra-ui/core';
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
  const salesPerson = {phone:"cliente", sales1:"ventas1", sales2:"ventas2", sales3:"ventas3", sales4:"ventas4", sales5:"ventas5",
                       sales6:"ventas6", sales7:"ventas7", sales8:"ventas8", sales9:"ventas9", sales10:"ventas10",};
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
  const [messageLocal, setMessage] = React.useState("");
  const [salesLocal, setSales] = React.useState("");

  React.useEffect(() => {
    const data = window.localStorage.getItem('messageLocal');
    const sales = window.localStorage.getItem(tenant.slug);
    if ( data !== null ) { setMessage(data) }
      else {
        setMessage("Hola! te envío nuestro *catálogo actualizado*, cualquier consulta no dude en escribirnos")
      };
    if ( sales !== null ) { setSales(sales); }
      else {
        setSales("phone")
      };
  }, []);


  React.useEffect(() => {
    window.localStorage.setItem('messageLocal', messageLocal);
    window.localStorage.setItem(tenant.slug, salesLocal);
  }, [messageLocal, salesLocal]);


  const onPhoneclientSubmit = data => {
    if(data.phoneclient) {
      window.localStorage.setItem(tenant.slug, salesLocal);
      window.localStorage.setItem("messageLocal", `${data.message}`);    
      window.open(
        `https://wa.me/${storeCode}${data.phoneclient}?text=${encodeURIComponent(`${data.message}\n*https://ferreteros.app/${tenant.slug}/${salesPerson[salesLocal]}/${data.phoneclient}*`)}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
  }

	return (
    <ClientLayout tenant={tenant}>
    <Stack>
    <Flex
      p={4}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg="gray.100"
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        background={"white"}
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
          Asignar Vendedor/Cliente
        </Text>
        <form onSubmit={handleSubmit(onPhoneclientSubmit)}>
          <FormControl
            id="sales"
            label="Agente de Ventas"
            mb={4}
          >
            <Select
              data-test-id="brand-select"
              // defaultValue={salesLocal}
              value={salesLocal}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSales(e.target.value)
              }
            >
              <option value="phone">Tienda</option>
              {tenant.sales1 && (<option value="sales1">Ventas 1 ({tenant.sales1})</option>)}
              {tenant.sales2 && (<option value="sales2">Ventas 2 ({tenant.sales2})</option>)}
              {tenant.sales3 && (<option value="sales3">Ventas 3 ({tenant.sales3})</option>)}
              {tenant.sales4 && (<option value="sales4">Ventas 4 ({tenant.sales4})</option>)}
              {tenant.sales5 && (<option value="sales5">Ventas 5 ({tenant.sales5})</option>)}
              {tenant.sales6 && (<option value="sales6">Ventas 6 ({tenant.sales6})</option>)}
              {tenant.sales7 && (<option value="sales7">Ventas 7 ({tenant.sales7})</option>)}
              {tenant.sales8 && (<option value="sales8">Ventas 8 ({tenant.sales8})</option>)}
              {tenant.sales9 && (<option value="sales9">Ventas 9 ({tenant.sales9})</option>)}
              {tenant.sales10 && (<option value="sales10">Ventas 10 ({tenant.sales10})</option>)}
            </Select>
          </FormControl>
          <FormControl
            id="name"
            label="Mensaje"
            mb={4}
          >
            <Textarea
              ref={register({maxLength: 140})}
              defaultValue={messageLocal}
              maxLength={140}
              name="message"
              color="gray.500"
              placeholder="Hola, revisa nuestro catalogo:"
            />
          </FormControl>
          <FormControl
            isRequired
            error={errors.phoneclient && "Ingrese un número válido"}
            name="phoneclient"
          >
            <Text textDecoration="underline" color="primary.700" fontSize={17} mb={2}>Número de WhatsApp</Text>
            <PhoneNumberInput
              ref={register({pattern: /^[0-9]+$/})}
              country={tenant.country}
              onChange={value => setstoreCode(value)}
              options={countryOptions}
              color="gray.500"
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
    </Stack>
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