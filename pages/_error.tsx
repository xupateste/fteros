import React from "react";
import {Flex, Text, Heading, Stack} from "@chakra-ui/core";

import ErrorLayout from "~/app/layouts/ErrorLayout";
import ShoppingIcon from "~/ui/icons/Shopping";

interface Props {
  statusCode: number;
}

export const ERRORS = {
  304: "Este link no parece valido",
  404: "Esta tienda no existe",
  500: "Lo estamos solucionando, vuelve mas tarde",
};

const Error: React.FC<Props> = ({statusCode}) => {
  return (
    <ErrorLayout>
      <Flex
        alignItems="center"
        backgroundColor="cyan.100"
        color="white"
        height="100vh"
        justifyContent="center"
        overflow="hidden"
        padding={4}
        textAlign="center"
        width="100vw"
      >
        <Stack alignItems="center">
          <ShoppingIcon color="cyan.900" fontSize="xl" marginBottom={2} size={36} />
          <Heading as="h4" color="black" fontWeight="bold" size="lg">
            Algo no salió bien
          </Heading>
          <Text color="gray.600" fontSize="lg">
            {ERRORS[Number(statusCode)] || "Intenta de nuevo mas tarde"}
          </Text>
        </Stack>
      </Flex>
    </ErrorLayout>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}

export default Error;
