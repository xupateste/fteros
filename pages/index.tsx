import React from "react";

import {
  Box,
  Text,
  Heading,
  Button,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputLeftAddon,
  //InputRightAddon,
  FormControl,
  FormLabel,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/core';

import LandingNavBar from "~/landing/landingnavbar"
import Hero from "~/landing/hero"
import Features from "~/landing/features"
import Brands from "~/landing/brands"
import Pricing from "~/landing/pricing"
import Footer from "~/landing/footer"
import Moreabout from "~/landing/moreabout"
import Content from "~/ui/structure/Content"
import LandingLayout from "~/app/layouts/LandingLayout"
import FetchTenantCreation from '~/tenant/components/FetchTenantCreation'
import api from "~/session/api/client"

import {useToast} from "~/hooks/toast";
import {useTranslation} from "~/i18n/hooks";

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
        m="auto"
        rounded={'full'}
        size={'lg'}
        onClick={onOpen}
        mt={6}
        fontWeight={'900'}
        color={'white'}
        bg={'cyan.500'}
        _hover={{ bg: 'cyan.600' }}>
        Crear cuenta
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

const Initio: React.FC = () => {
  
  return (
    <>
      <LandingLayout>
        <LandingNavBar/>
        <Content>
          <Hero/>
          <Features/>
          <Brands/>
          <Box textAlign="center" maxWidth="6xl" m="auto" mt={8} mb={8} py={16} px={6} bg={'cyan.100'} >
            <Heading as="h1" size="2xl" mb={2} fontWeight={900} color="black">
              Crea tu cuenta hoy mismo y digitaliza los pedidos de tu negocio
            </Heading>
            <Text color={'cyan.600'} fontSize="xl" fontWeight={900}>
              ¡Es GRATIS! Y no requiere tarjetas de crédito.
            </Text>
            <Stack direction='row'>
              <RegisterModal />
            </Stack>
          </Box>
          <Pricing/>
          <Moreabout/>
        </Content>
        <Footer/>
      </LandingLayout>
    </>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default Initio;
