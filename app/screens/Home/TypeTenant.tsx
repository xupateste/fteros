import React from "react";
import {Stack, Text, Flex, Button} from "@chakra-ui/core";
import {getNameTypeOf, getQtyProdsTypeOf} from "./SelectorsTypeTenant"
import {useTenant} from "~/tenant/hooks";

// import QrCode from "~/ui/feedback/QrCode";
// import {useTranslation} from "~/i18n/hooks";
// import {ClientTenant} from "~/tenant/types";

// interface Props {
//   tenant: ClientTenant;
// }

// const TypeTenant: React.FC<Props> = ({tenant}) => {
const TypeTenant = () => {
  // const t = useTranslation();
  const {typeTenant, slug} = useTenant();

  const onUpgradePlan = () => {
    window.open(
      `https://wa.me/${process.env.MANTAINER_PHONE}?text=${encodeURIComponent('Hola quisiera saber que opciones tengo para mejorar mi plan: '+slug.toUpperCase())}`,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  return (
    <Flex borderWidth={2} borderColor="gray.200" padding={4} rounded="md" justifyContent="space-between" >
      <Stack>
        <Flex fontSize="lg">
          Tu Plan:
          <Flex bg="green.100" px={2} py={0} ml={3} fontSize={16} alignItems="center" rounded="sm">
            {getNameTypeOf(typeTenant)}
          </Flex>
        </Flex>
        <Text color="gray.600">Cantidad máxima de productos: {getQtyProdsTypeOf(typeTenant)}</Text>
      </Stack>
      <Button onClick={onUpgradePlan} variantColor="primary" color="white">Mejorar</Button>
    </Flex>
  );
};

export default TypeTenant;
