import React from "react";

import { 
  Box,
  Stack,
  Heading,
  Text,
  List,
  ListItem,
  SimpleGrid
 } from '@chakra-ui/core';

function PriceWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf='flex-start'
      borderColor='cyan.500'
      borderRadius={'2xl'}>
      {children}
    </Box>
  );
}


const Pricing: React.FC = () => {

  return (
    <Box pt={4} pb={0} id="Planes">
    	<Box textAlign="center" py={0} px={2}>
	      <Text color={'cyan.500'} fontWeight={700}>
	        DESCUBRE EL MEJOR PLAN, AL MEJOR PRECIO
	      </Text>
	      <Heading as="h1" size="xl" mb={2} color="black">
	       ¡Paga sólo por lo que necesites!
	      </Heading>
	    </Box>

      <Box pt={2} px={4}>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }}
          textAlign="center"
          spacing={{ base: 4, lg: 4 }}
          py={4}>
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="700" fontSize="2xl">
                PLAN GRATUITO
              </Text>
              <Stack justifyContent="center">
                <Box fontSize="md" fontWeight="600">
                  DESDE
                </Box>
                <Text fontSize="5xl" mt={0} fontWeight="900">
                  S/ 0*
                </Text>
              </Stack>
            </Box>
            <Stack
              bg='cyan.100'
              py={4}
              borderColor={'cyan.400'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  Catálogo con su Marca
                </ListItem>
                <ListItem>
                  Hasta 50 productos
                </ListItem>
                <ListItem>
                  Visitas y pedidos ilimitados
                </ListItem>
                <ListItem>
                  Soporte whatsapp
                </ListItem>
                <ListItem color="green.500">
                  *Gratis para siempre.
                </ListItem>
              </List>
            </Stack>
          </PriceWrapper>

          <PriceWrapper>
            <Box position="relative">
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: 'translate(-50%)' }}>
                <Text
                  textTransform="uppercase"
                  bg='red.500'
                  px={3}
                  py={1}
                  color='white'
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl">
                  MÁS POPULAR
                </Text>
              </Box>
              <Box py={4} px={12}>
                <Text fontWeight="700" fontSize="2xl">
                  PLAN COMERCIAL
                </Text>
                <Stack justifyContent="center">
                  <Box fontSize="md" fontWeight="600">
                    DESDE
                  </Box>
                  <Text fontSize="5xl" mt={0} fontWeight="900">
                    S/ 29*
                  </Text>
                </Stack>
              </Box>
              <Stack
                bg='cyan.100'
                py={4}
                borderColor={'cyan.400'}>
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    Catálogo con su Marca
                  </ListItem>
                  <ListItem>
                    Hasta 400 productos
                  </ListItem>
                  <ListItem>
                    Visitas y pedidos ilimitados
                  </ListItem>
                  <ListItem>
                    Catálogo descargable en PDF
                  </ListItem>
                  <ListItem>
                    Etiquetas en productos
                  </ListItem>
                  <ListItem>
                    Soporte preferencial  
                  </ListItem>
                  <ListItem color="green.500">
                    *Precio promocional por mes realizando un pago anual. Tarifa mensual sin descuento S/ 40.
                  </ListItem>
                </List>
              </Stack>
            </Box>
          </PriceWrapper>
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="700" fontSize="2xl">
                PLAN PREMIUM
              </Text>
              <Stack justifyContent="left">
                <Box fontSize="md" fontWeight="600">
                  DESDE
                </Box>
                <Text fontSize="5xl" mt={0} fontWeight="900">
                  S/ 99*
                </Text>
              </Stack>
            </Box>
            <Stack
              bg='cyan.100'
              py={4}
              borderColor={'cyan.400'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem fontWeight={700}>
                  PLAN PREMIUM
                </ListItem>
                <ListItem>
                  Productos ilimitados
                </ListItem>
                <ListItem>
                  Control de stock
                </ListItem>
                <ListItem>
                  Gestión de pedidos
                </ListItem>
                <ListItem>
                  Listas de precios
                </ListItem>
                <ListItem>
                  Soporte prioritario
                </ListItem>
                <ListItem color="green.500">
                  *Precio promocional por mes realizando un pago anual. Tarifa mensual sin descuento S/ 130.
                </ListItem>
              </List>
            </Stack>
          </PriceWrapper>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default Pricing;
