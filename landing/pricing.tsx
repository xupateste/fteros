import React from "react";

import { 
  Box,
  Stack,
  Heading,
  Text,
  List,
  Flex,
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
        <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }}
          textAlign="center"
          spacing={{ base: 4, lg: 4 }}
          py={4}>
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="700" fontSize="2xl">
                GRATUITO
              </Text>
              <Stack justifyContent="center">
                <Box fontSize="md" fontWeight="600">
                  DESDE
                </Box>
                <Box>
                  <Flex justifyContent="center">
                    <Text fontSize={{ base: "2xl", md: "3xl"}} pt={2} fontWeight="900">
                      $
                    </Text>
                    <Text fontSize={{ base: "4xl", md: "5xl"}} mt={0} fontWeight="900">
                      0*
                    </Text>
                  </Flex>
                  <Text fontSize={{ base: "xl", md: "lg"}} mt={0} fontWeight="900" lineHeight={1}>
                    Si, Gratis*
                  </Text>
                </Box>
              </Stack>
            </Box>
            <Stack
              bg='cyan.100'
              py={4}
              borderColor={'cyan.400'}>
              <List spacing={3} textAlign="start" px={6}>
                <ListItem>
                  Catálogo con su Marca
                </ListItem>
                <ListItem>
                  Hasta 10 productos
                </ListItem>
                <ListItem>
                  Visitas y pedidos ilimitados
                </ListItem>
                <ListItem>
                  Identificación de Visitas
                </ListItem>
                <ListItem>
                  Soporte whatsapp
                </ListItem>
                <ListItem color="green.500">
                  *Gratis para siempre ;).
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
                  POPULAR
                </Text>
              </Box>
              <Box py={4} px={12}>
                <Text fontWeight="700" fontSize="2xl">
                  COMERCIAL
                </Text>
                <Stack justifyContent="center">
                  <Text fontSize="md" fontWeight="600" m={0}>
                    DESDE
                  </Text>
                  <Box>
                    <Flex justifyContent="center">
                      <Text fontSize={{ base: "3xl", md: "4xl"}} pt={2} fontWeight="900">
                        $
                      </Text>
                      <Text fontSize={{ base: "5xl", md: "6xl"}} mt={0} fontWeight="900">
                        9*
                      </Text>
                    </Flex>
                    <Text fontSize={{ base: "2xl", md: "xl"}} mt={0} fontWeight="900" lineHeight={1}>
                      ó S/29*
                    </Text>
                  </Box>
                </Stack>
              </Box>
              <Stack
                bg='cyan.100'
                py={4}
                borderColor={'cyan.400'}>
                <List spacing={3} textAlign="start" px={6}>
                  <ListItem>
                    Catálogo con su Marca
                  </ListItem>
                  <ListItem>
                    Hasta 500 productos
                  </ListItem>
                  <ListItem>
                    Visitas y pedidos ilimitados
                  </ListItem>
                  <ListItem>
                    Descargable en PDF
                  </ListItem>
                  <ListItem>
                    Etiquetas en productos
                  </ListItem>
                  <ListItem>
                    Verificación OTP
                  </ListItem>
                  <ListItem>
                    Soporte preferencial  
                  </ListItem>
                  <ListItem color="green.500">
                    *Precio promocional por mes realizando un pago anual. Tarifa mensual sin descuento $13 ó S/40.
                  </ListItem>
                </List>
              </Stack>
            </Box>
          </PriceWrapper>

          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="700" fontSize="2xl">
                PREMIUM
              </Text>
              <Stack justifyContent="left">
                <Box fontSize="md" fontWeight="600">
                  DESDE
                </Box>
                <Box>
                    <Flex justifyContent="center">
                      <Text fontSize={{ base: "2xl", md: "3xl"}} pt={2} fontWeight="900">
                        $
                      </Text>
                      <Text fontSize={{ base: "4xl", md: "5xl"}} mt={0} fontWeight="900">
                        29*
                      </Text>
                    </Flex>
                    <Text fontSize={{ base: "xl", md: "lg"}} mt={0} fontWeight="900" lineHeight={1}>
                      ó S/99*
                    </Text>
                  </Box>
              </Stack>
            </Box>
            <Stack
              bg='cyan.100'
              py={4}
              borderColor={'cyan.400'}>
              <List spacing={3} textAlign="start" px={6}>
                <ListItem fontWeight={700}>
                  PLAN COMERCIAL (incluido)
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
                  *Precio promocional por mes realizando un pago anual. Tarifa mensual sin descuento $38 ó S/130.
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
