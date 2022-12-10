import React from "react";

import { 
  Box,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Button,
  Image,  
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormControl,
  FormLabel,
  FormHelperText,
 } from '@chakra-ui/core';

 const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState('')
  const handleChange = (event) => setValue(event.target.value)
  const handleLogin = () => {
    if (value) {
     window.location.href = 'https://ferreteros.app/'+value+'/admin';  
    }
  }

  return (
    <>
      <Button
        as={'a'}
        fontSize={'lg'}
        color='white'
        variant={'link'}
        onClick={onOpen}
        pt={1}
        _hover={{
          textDecoration: 'none',
          color: 'white'
        }}>
        Iniciar sesión
      </Button>
      <Modal blockScrollOnMount={true} closeOnOverlayClick={false}  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='cyan.500'/>
        <ModalContent>
          <ModalHeader>Ingresa a tu cuenta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <InputGroup size="lg">
                <InputLeftAddon children='ferreteros.app/' />
                <Input isInvalid={!value} value={value} placeholder='miNegocio' onChange={handleChange} />
              </InputGroup>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack w="full">
              <Button
                w="full"
                bg="cyan.500"
                size="lg"
                color="white"
                mr={3}
                onClick={handleLogin}
                _hover={{
                  bg: "cyan.600",
                  color: 'white'
                }}>
                Iniciar sesión
              </Button>
              <Text textAlign="center" onClick={onClose}>¿No tienes cuenta? ¡Creala gratis!</Text>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const Footer: React.FC = () => {
  return (
    <Box
      bg='cyan.600'
      color='white'>
      <Flex as={Stack} w="100%" p={10} fontSize={19}>
        <SimpleGrid m="auto" columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack textAlign='center'>
            <Link href="/">Inicio</Link>
          </Stack>
          <Stack textAlign='center'>
            <Link href="#Planes">Planes</Link>
          </Stack>
          <Stack textAlign='center'>
            <Link href="#Preguntas">Preguntas frecuentes</Link>
          </Stack>
          <Stack textAlign='center'>
            <LoginModal />
          </Stack>
        </SimpleGrid>
      </Flex>
      <Box pb={5} textAlign="center">
        <Flex
          borderBottom = '1px solid'
          borderColor = 'cyan.700'
          flexGrow={1}/>
        <Flex w="100%" mt={5}>
          <Flex m="auto">
            <Image src={'/assets/ferreteros-app.png'} />         
          </Flex>
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2022 Ferreteros.app Todos los derechos reservados
        </Text>
      </Box>
    </Box>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default Footer;
