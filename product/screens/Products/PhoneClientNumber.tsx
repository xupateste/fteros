import React from "react";
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
import PhoneNumberInput from "~/landing/components/PhoneNumberInput";
import {useForm} from "react-hook-form";
import FormControl from "~/ui/form/FormControl";
import { COUNTRIES } from "~/landing/components/countries";

interface Props {
  isShown: boolean;
  onClose: () => void;
  onSubmit: () => void;
}


const PhoneClientNumber:React.FC<Props> = ({isShown, onClose, onSubmit}) => {
  // const [isShown, setShown] = React.useState(
  //   process.browser ? (!Boolean(window.localStorage?.getItem("phoneclient:Products"))) : false,
  // );

  function handleClose() {
    // window.localStorage.setItem("phoneclient:Products", "completed");

    // setShown(false);
  }

  const onPhoneclientSubmit = data => {
    window.localStorage.setItem("phoneclient:Products", `+${storeCode}${data.phoneclient}`);
    onSubmit();
  }


  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso
  }));

  const { register, handleSubmit, errors } = useForm();
  const [storeCode, setstoreCode] = React.useState("51");

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
          <Text mb={3}>Ingrese su numero telefónico para agregarlo a nuestra lista</Text>
          <form onSubmit={handleSubmit(onPhoneclientSubmit)}>
            <Stack spacing={4}>
              <FormControl
                isRequired
                error={errors.phoneclient && "Este campo es requerido"}
                name="phoneclient"
              >
                <Text textDecoration="underline" color="primary.700" fontSize={17}>Número de WhatsApp</Text>
                <PhoneNumberInput
                  ref={register({required: true, minLength: 9, maxLength: 9, pattern: /^[0-9]+$/})}
                  country={'PER'}
                  options={countryOptions}
                  size="lg"
                  onChange={value => setstoreCode(value)}
                  name="phoneclient"
                  placeholder="111344400"
                />
              </FormControl>
            </Stack>
          </form>
          <Stack pt={3}>
            <Button
              w="full"
              bg="cyan.500"
              size="lg"
              color="white"
              mr={3}
              onClick={handleSubmit(onPhoneclientSubmit)}
              _hover={{
                bg: "cyan.600",
                color: 'white'
              }}>
              <Text mr={5}>Agregar al pedido</Text>
              <RightIcon />
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PhoneClientNumber;
