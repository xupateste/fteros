import {
  Stack,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
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
  InputRightAddon,
  FormControl,
  FormLabel,
  FormHelperText,
  InputRightElement,
  Image,
  PseudoBox
} from '@chakra-ui/core';
import TypeWriter from './TypeWriter';

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
        rounded={'full'}
        size={'lg'}
        fontWeight={'bold'}
        onClick={onOpen}
        px={6}
        mr={3}
        mt={2}
        color="white"
        bg={'cyan.500'}
        _hover={{ bg: 'cyan.600' }}>
        Regístrate gratis
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


const Hero: React.FC = () => {

  return (
    <Stack maxW={'95%'} m="auto">
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={{ base: 4, md: 4 }}
        py={{ base: 0, md: 35 }}>
        <Stack flex={1} spacing={{ base: 5, md: 3 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            mt={10}
            fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}>
            <Text as={'span'} position={'relative'} fontSize={{base: 'md', sm: 'md', lg: 'lg'}} color={'cyan.500'}>
              CREA UN CATÁLOGO VIRTUAL
            </Text>
            <br />
            <Text
              as={'span'}
              position={'relative'} fontWeight={800}>
              Para tu 
              <PseudoBox
                ml={{ base: 2, sm: 2, lg: 3 }}
                display='inline-block'
                _after={{
                  content: `"|"`,
                  textDecoration: "blink",
                }}>
                <TypeWriter
                  typingDelay={100}
                  erasingDelay={30}
                  newTextDelay={1200}
                  textArray={["Ferretería", "Distribuidora", "Importadora", "Marca"]}
                  loop={true}
                />
              </PseudoBox>
            </Text>
            <br/>
            <Text as={'span'} color={'cyan.500'} fontWeight={500}>
              y recibe pedidos online
            </Text>
          </Heading>
          <Text color={'gray.500'} fontSize="xl">
            Potencie la eficiencia de su equipo de ventas y proteja sus diseños y precios de ser copiados por la competencia.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction='row'>
            <RegisterModal />
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
              px={6}
              mt={2}
              borderWidth={1}
              borderColor="cyan.600"
              color="cyan.600"
              bg={'white'}
              _hover={{ bg: 'cyan.100' }}>
              Ver demo
            </Button>
          </Stack>
        </Stack>
        <Stack
          flex={1}
          mt={4}
          justify={'center'}
          position={'relative'}
          w={'full'}>
          <Box
            position={'relative'}
            overflow={'hidden'}>
            <Image
              w={'100%'}
              h={'100%'}
              src={"/assets/hero.jpg"}
            />
          </Box>
        </Stack>
      </SimpleGrid>
    </Stack>
  );
}


export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}

export default Hero;

