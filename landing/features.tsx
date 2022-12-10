import React from "react";

import {
  Box,
  SimpleGrid,
  Text,
  Stack,
  Flex,
  Heading,
  Image
  } from '@chakra-ui/core';

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={48}
        h={48}
        m="auto">
        {icon}
      </Flex>
      <Text fontSize="2xl" fontWeight={600} textAlign="center" color="black">{title}</Text>
      <Text fontSize="lg" color={'gray.600'} textAlign="center">{text}</Text>
    </Stack>
  );
};

const Features: React.FC = () => {

  return (
    <Box p={6}>
    	<Box textAlign="center" py={5} px={6}>
	      <Text color={'cyan.500'} fontWeight={700}>
	        NUESTROS BENEFICIOS
	      </Text>
	      <Heading as="h1" size="xl" mb={2} color="black">
	        ¡La herramienta que hace crecer tu negocio!
	      </Heading>
	    </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Image src={"/assets/fastordering.jpg"}/>}
          title={'Toma rápida de pedidos'}
          text={
            'Los catálogos están diseñados para una carga superrapida para que sus clientes no pierdan tiempo haciendo pedidos grandes.'
          }
        />
        <Feature
          icon={<Image src={"/assets/ahorratiempo.jpg"}/>}
          title={'Ahorra tiempo'}
          text={
            'Reduzca las horas dedicadas a encontrar los productos que sus clientes consultan. Tiempos y costos al mínimo y vende 24/7.'
          }
        />
        <Feature
          icon={<Image src={"/assets/aumentaalcance.jpg"}/>}
          title={'Aumenta tu alcance'}
          text={
            'Llega a más clientes con un canal de venta online. Sube tus productos a tu vitrina digital y recibe a tus clientes donde estés.'
          }
        />
      </SimpleGrid>
    </Box>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default Features;
