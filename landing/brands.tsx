import React from "react";

import { Box, SimpleGrid, Text, Flex, Heading, Image } from '@chakra-ui/core';


const Brandx = ({icon }) => {
  return (
      <Flex
        h={{ base: 8, md: 9, lg: 10}}
        m="auto">
        {icon}
      </Flex>
  );
};


const Brands: React.FC = () => {

  return (
    <Box p={6} >
    	<Box textAlign="center" py={5} px={6}>
	      <Text color={'cyan.500'} fontWeight={700}>
	        LOS MÁS COMERCIALIZADOS
	      </Text>
	      <Heading as="h1" size="xl" mb={2} color="black">
	       Las marcas ferreteras más populares
	      </Heading>
	    </Box>

      <SimpleGrid columns={{ base: 4, md: 6, lg:8 }} spacing={8}>
        <Brandx icon={<Image src={"/assets/stanlyy.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/truppr.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/anypps.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/soldimxx.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/pavvc.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/oatty.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/bticinn.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/proddc.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/italgrff.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/mmm.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/vainss.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/canttl.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/trebbl.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/celimm.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/chemm.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/fibrafortt.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/teknn.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/tumm.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/eternn.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/sapp.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/cpx.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/irwwn.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/tramntt.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/ipps.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/bacco.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/norttn.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/boch.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/yala.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/forto.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/loronzo.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/xtrong.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/kamss.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/soll.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/viruxx.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/felix.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/indexx.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/epm.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/duracc.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/filix.jpg"}/>}/>
        <Brandx icon={<Image src={"/assets/eulux.jpg"}/>}/>
      </SimpleGrid>
    </Box>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default Brands;
