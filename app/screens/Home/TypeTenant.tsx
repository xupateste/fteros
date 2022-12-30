import React from "react";
import {Stack, Text, Flex, Button} from "@chakra-ui/core";

// import QrCode from "~/ui/feedback/QrCode";
// import {useTranslation} from "~/i18n/hooks";
// import {ClientTenant} from "~/tenant/types";

// interface Props {
//   tenant: ClientTenant;
// }

// const TypeTenant: React.FC<Props> = ({tenant}) => {
const TypeTenant = () => {
  // const t = useTranslation();

  return (
    <Flex borderWidth={2} borderColor="gray.200" padding={4} rounded="md" justifyContent="space-between" >
      <Stack>
        <Flex fontSize="lg">
          Tu Plan:
          <Flex bg="green.100" px={2} py={0} ml={3} fontSize={16} alignItems="center" rounded="sm">
            EMPRENDEDOR
          </Flex>
        </Flex>
        <Text color="gray.600">Cantidad máxima de productos: 250</Text>
      </Stack>
      <Button variantColor="primary" color="white">Mejorar</Button>
    </Flex>
  );
};

export default TypeTenant;
