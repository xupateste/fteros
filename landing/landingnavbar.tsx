import React from "react";
//import {NextApiResponse, NextApiRequest} from "next";

import {
  Box,
  Flex,
  Button,
  Stack,
  Text,
  Link,
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
  //InputRightAddon,
  FormControl,
  FormLabel,
  FormHelperText,
  InputRightElement
} from '@chakra-ui/core';

import FetchTenantCreation from '~/tenant/components/FetchTenantCreation';

//import {GetServerSideProps} from "next";

import api from "~/session/api/client";
import {useToast} from "~/hooks/toast";
import {useTranslation} from "~/i18n/hooks";


const Hamburger = () => {
  return (
    <svg viewBox="0 0 100 80" width="40" height="40" fill="currentColor">
      <rect width="100" height="20"></rect>
      <rect y="30" width="100" height="20"></rect>
      <rect y="60" width="100" height="20"></rect>
    </svg>
  );
};



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
        fontWeight={600}
        color='white'
        variant={'link'}
        onClick={onOpen}
        mx={3}
        py={3}
        _hover={{
          textDecoration: 'none',
          color: 'white'
        }}>
        Inicia sesión
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

const RegisterModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = React.useState('')
  const handleChange = (event) => setValue(event.target.value)
  const [femail, setFemail] = React.useState('')
  const handleChangeEmail = (event) => setFemail(event.target.value)
  const [fpassw, setFpassw] = React.useState('')
  const handleChangePass = (event) => setFpassw(event.target.value)
  const [wsp, setWsp] = React.useState('')
  const handleChangeWsp = (event) => setWsp(event.target.value)
  const [showPassword, setShowPassword] = React.useState(false)

  const isLoading=false;
  const toast = useToast();
  const t = useTranslation();
  
  const handleCreation = (e) => {
    e.preventDefault();
    if(value && femail && fpassw) {
      FetchTenantCreation.getTenant(value, femail, fpassw).then(response => {
        if(response.ok) {
          api
            .signIn(femail, fpassw)
            .catch(() =>
              toast({
                title: t("common.error"),
                description: t("auth.login.signInError"),
                status: "error",
              }),
            ).then(() => {window.location.replace(`http://localhost:3000/${value}/admin`)});
        }
      });
    }
  }

  return (
    <>
      <Button
        as={'a'}
        fontSize={'lg'}
        fontWeight={600}
        color='white'
        variant={'link'}
        onClick={onOpen}
        bg="cyan.700"
        mx={3}
        p={3}
        _hover={{
          textDecoration: 'none',
          color: 'white'
        }}>
        Regístrate
      </Button>
      <Modal blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='cyan.500'/>
        <ModalContent>
          <ModalHeader>Crea tu cuenta gratis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="nombre" isRequired>
                <FormLabel>Nombre del negocio</FormLabel>
                <Input type="text" placeholder='Nombre de mi negocio'/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nombre de usuario</FormLabel>
                <InputGroup size='lg'>
                  <InputLeftAddon children='ferreteros.app/' />
                  <Input isInvalid={!value} value={value} placeholder='miNegocio' onChange={handleChange} />
                </InputGroup>
                <FormHelperText>
                  Solo puede contener letras minúsculas, números. No se aceptan tildes ni espacios.
                </FormHelperText>
              </FormControl>
              <FormControl id="whatsapp" isRequired>
                <FormLabel>Número de whatsapp</FormLabel>
                <InputGroup size='lg'>
                  <InputLeftAddon children='🇵🇪 +51' />
                  <Input isInvalid={!wsp} value={wsp} type="numeric" placeholder='11144000' onChange={handleChangeWsp} />
                </InputGroup>
                <FormHelperText>
                  WhatsApp donde recibirás los pedidos.
                </FormHelperText>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Correo electrónico</FormLabel>
                <Input type="email" isInvalid={!femail} value={femail} onChange={handleChangeEmail}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} isInvalid={!fpassw} value={fpassw} onChange={handleChangePass}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? "X" : "O"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack w="full">
              <Button
                w="full"
                bg="cyan.500"
                size="lg"
                color="white"
                onClick={handleCreation}
                isDisabled={isLoading}
                mr={3}
                _hover={{
                  bg: "cyan.600",
                  color: 'white'
                }}>
                {!isLoading ? 'Crear cuenta' : 'Creando...'}
              </Button>
              <Text textAlign="center" onClick={onClose}>¿Ya tienes cuenta? Inicia sesión</Text>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


const LandingNavbar: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  

  return (
    <Box>
      <Flex
        bg='cyan.500'
        color='white'
        minH={'85px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'left', md: 'start' }}>
          <Link href="/">
            <Image h={10} mt="-8px" ml={2} src={'/assets/ferreteros-app.png'}></Image>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction={'row'} spacing={4}>
              <Box>
                <Link
                  p={2}
                  fontSize={'lg'}
                  fontWeight={500}
                  color='white'
                  href="/"
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                  }}>
                  Inicio
                </Link>
              </Box>
              <Box>
                <Link
                  p={2}
                  fontSize={'lg'}
                  fontWeight={500}
                  color='white'
                  href="#Planes"
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                  }}>
                  Planes
                </Link>
              </Box>
              <Box>
                <Link
                  p={2}
                  fontSize={'lg'}
                  fontWeight={500}
                  color='white'
                  href="#Preguntas"
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                  }}>
                  Preguntas frecuentes
                </Link>
              </Box>
            </Stack>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          display={{ base: 'none', md: 'inline-flex' }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <LoginModal />
          <RegisterModal />
        </Stack>

        <Flex
          flex={{ base: 0, md: 'auto' }}
          display={{ base: 'block', md: 'none' }}>
          <Box onClick={onToggle}>
          {isOpen ? "CERRAR": <Hamburger />}
          </Box>
        </Flex>
      </Flex>

      <Box display={!isOpen ? 'none' : 'block'} textAlign={'center'} width="100%" position="absolute" bg="cyan.500" zIndex={150} pb={4}>
        <Link
          href="#Planes"
          onClick={onToggle}
          display="block"
          py={3}
          fontSize={'2xl'}
          fontWeight={700}
          w="100%"
          bg="none"
          color='white'
          _hover={{
            bg: 'none',
            color: 'white',
          }}>
          Planes
        </Link>
        <Link
          href="#Preguntas"
          onClick={onToggle}
          display="block"
          py={3}
          fontSize={'2xl'}
          fontWeight={700}
          w="100%"
          bg="none"
          color='white'
          _hover={{
            bg: 'none',
            color: 'white',
          }}>
          Preguntas frecuentes
        </Link>
        <Box w="100%" mt={3} mb={2}>
          <LoginModal />
          <RegisterModal />
        </Box>
      </Box>
    </Box>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default LandingNavbar;
