import React from "react";
import {useForm} from "react-hook-form";
import FormControl from "~/ui/form/FormControl";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
  Stack,
} from "@chakra-ui/core";
import { COUNTRIES } from "~/landing/components/countries";
import PhoneNumberInput from "~/landing/components/PhoneNumberInput";
import {Contact} from "~/contact/types";
import {useTenant} from "~/tenant/hooks";
import { getCountryTelCode } from "~/landing/components/countries";

// import apiContact from "~/contact/api/client"; //added

interface Props {
  isShown: boolean;
  onClose: () => void;
  onSubmit: () => void;
  fromParent: string;
  onHookcontact: (contact: Contact) => void;

}

const PhoneClientNumber: React.FC<Props> = ({
  isShown, onHookcontact, onClose, onSubmit, fromParent
}) => {
  const {country} = useTenant();

  // const [isShown, setShown] = React.useState(
  //   process.browser ? (!Boolean(window.localStorage?.getItem("phoneclient:Products"))) : false,
  // );
  // let newContact = ({}) as Partial<Contact>;
  // const [newContact,] = React.useState<Contact | undefined >(undefined)
  // const {hookcontact} = useContactActions();

  function handleClose() {}

  const [defaultPhone, setPhone] = React.useState(window.localStorage.getItem("phoneclientnocode:Products"))

  // async function handleOnHookContact(){
  //   onHookcontact(newContact).then()
  // }

  const onPhoneclientSubmit = data => {
    window.localStorage.setItem("phoneclient:Products", `+${storeCode}${data.phoneclient}`);
    window.localStorage.setItem("phoneclientnocode:Products", `${data.phoneclient}`);
    setPhone(data.phoneclient);
    //set phoneclient to firebase
    let newContact = {} as Contact;
    newContact['phone'] = `+${storeCode}${data.phoneclient}`;
    // setNewContact({phone: `+${storeCode}${data.phoneclient}`});
    onHookcontact(newContact);
    // handleOnHookContact();
    onSubmit();
  }

  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso
  }));

  const { register, handleSubmit, errors } = useForm();
  const [storeCode, setstoreCode] = React.useState((getCountryTelCode(country)).replaceAll("+", "").replaceAll(" ", ""));

  const RightIcon = () => {
    return (
      <svg  xmlns="http://www.w3.org/2000/svg" x="0px" stroke="white" fill="white" width={40} y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
      <g><path d="M983.3,484.4L760.6,261.7c-4.5-4.5-8.9-6.7-15.6-6.7c-13.4,0-22.3,8.9-22.3,22.3c0,6.7,2.2,11.1,6.7,15.6l184.9,184.9h-882c-13.4,0-22.3,8.9-22.3,22.3c0,13.4,8.9,22.3,22.3,22.3h882L729.4,707.1c-4.5,4.5-6.7,8.9-6.7,15.6c0,13.4,8.9,22.3,22.3,22.3c6.7,0,11.1-2.2,15.6-6.7l222.7-222.7c4.5-4.5,6.7-8.9,6.7-15.6S987.8,488.9,983.3,484.4z"/></g>
      </svg>
    );
  };

  if (!isShown) return null;

  return (
    <Modal isCentered isOpen onClose={handleClose} closeOnOverlayClick={false} blockScrollOnMount={true}>
      <ModalOverlay backgroundColor="rgba(255,255,255,0.8)" zIndex={1400} />
      <ModalContent
        backgroundColor="transparent"
        bottom={{base: 0, sm: "auto"}}
        boxShadow="none"
        marginY={0}
        padding={4}
        position="absolute"
        top="auto"
      >
        <ModalCloseButton onClick={onClose} right={6} top={6} />
        <ModalBody
          backgroundColor="primary.50"
          borderColor="primary.500"
          borderWidth={2}
          boxShadow="lg"
          padding={4}
          rounded="lg"
        >
          {fromParent === 'products' && (<Text mb={3}>Ingrese su número telefónico para agregarlo a nuestra lista</Text>)}
          <form onSubmit={handleSubmit(onPhoneclientSubmit)}>
            <Stack spacing={4}>
              <FormControl
                isRequired
                error={errors.phoneclient && "Ingrese un número válido"}
                name="phoneclient"
              >
                <Text textDecoration="underline" color="primary.700" fontSize={17} mb={2}>Número de WhatsApp</Text>
                <PhoneNumberInput
                  ref={register({required: true, maxLength: 12, pattern: /^[0-9]+$/})}
                  country={country}
                  options={countryOptions}
                  size="lg"
                  onChange={value => setstoreCode(value)}
                  name="phoneclient"
                  value={defaultPhone}
                  placeholder="111344400"
                />
              </FormControl>
            </Stack>
          </form>
          <Stack pt={3}>
            <Button
              w="full"
              bg="primary.500"
              size="lg"
              color="white"
              mr={3}
              onClick={handleSubmit(onPhoneclientSubmit)}
              _hover={{
                bg: "primary.600",
                color: 'white'
              }}>
              <Text mr={5}>{fromParent === 'overview' ? 'Cambiar teléfono' : 'Agregar al pedido'}</Text>
              <RightIcon />
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PhoneClientNumber;