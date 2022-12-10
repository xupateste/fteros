import React from "react";

import { 
	Box,
	SimpleGrid,
	Text,
	Stack,
 } from '@chakra-ui/core';


const Moreabout: React.FC = () => {

  return (
    <Box pb={10} pt={4} id="Preguntas">
     	<Box textAlign="center">
	      <Text color={'cyan.500'} fontWeight={700} pb={4} fontSize={"xl"}>
	        SABER MAS ACERCA DE FERRETEROS.APP
	      </Text>
	    </Box>
		<Stack w="100%">
			<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={2}>
			    <Stack align={'top'}>
			      <Stack align={'start'} px={4} py={3}>
			        <Text fontWeight={800}>¿Qué es Ferreteros.app?</Text>
			        <Text color={'gray.600'}>
			        	Ferreteros.app es una plataforma que te permite crear y gestionar tu propio catálogo para vender online en pocos minutos. Cuando un cliente completa su pedido, serás inmediatamente notificado, manteniendo el contacto directo y sin intermediarios.
			        </Text>
			      </Stack>
			    </Stack>
			    <Stack align={'top'}>
			      <Stack align={'start'} px={4} py={3}>
			        <Text fontWeight={800}>¿Necesito descargar alguna App?</Text>
			        <Text color={'gray.600'}>
			        	¡Vender con Ferreteros.app no requiere descargas! Funciona directamente en tu navegador web.
			        </Text>
			      </Stack>
			    </Stack>
			    <Stack align={'top'}>
			      <Stack align={'start'} px={4} py={3}>
			        <Text fontWeight={800}>¿Ferreteros.app es realmente gratis?</Text>
			        <Text color={'gray.600'}>
			        	Sí. Contamos con un Plan Gratuito para que puedas abrir tu propio catalogo virtual sin costo.
			        </Text>
			      </Stack>
			    </Stack>
			    <Stack align={'top'}>
			      <Stack align={'start'} px={4} py={3}>
			        <Text fontWeight={800}>¿Cómo coordino los pagos y la entrega de mis pedidos?</Text>
			        <Text color={'gray.600'}>
			        	Una vez recibido el pedido, coordina con tus clientes la forma de pago y envío más conveniente.
			        </Text>
			      </Stack>
			    </Stack>
			    <Stack align={'top'}>
			      <Stack align={'start'} px={4} py={3}>
			        <Text fontWeight={800}>¿Está disponible en mi país?</Text>
			        <Text color={'gray.600'}>
			        	Ferreteros.app está disponible en español, portugués o inglés. Al indicar tu país, la moneda se adecúa automáticamente a la de curso local.
			        </Text>
			      </Stack>
			    </Stack>
			    <Stack align={'top'}>
			      <Stack align={'start'} px={4} py={3}>
			        <Text fontWeight={800}>¿Puedo cancelar mi cuenta cuando quiera?</Text>
			        <Text color={'gray.600'}>
			        	Trabajamos para ser un gran aliado de tus ventas. Pero puedes cancelar tu cuenta en cualquier momento.
			        </Text>
			      </Stack>
			    </Stack>
			</SimpleGrid>
		</Stack>
    </Box>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default Moreabout;
