import React from "react";
import {Stack, Text, Flex, Image} from "@chakra-ui/core";

// import FieldsForm from "../../forms/FieldsForm";

import CheckoutButton from "./CheckoutButton";

import {DrawerTitle, DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Field} from "~/tenant/types";
//import {useTranslation} from "~/i18n/hooks";
//import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import CrossIcon from "~/ui/icons/Cross";

interface Props {
  fields: Field[];
  onSubmit: (fields: Field[]) => void;
  onClose: VoidFunction;
  waLink: string;
  onPrevious: VoidFunction;
}

const Fields: React.FC<Props> = ({waLink, onClose}) => {
  //const [isLoading, toggleLoading] = React.useState(false);
  //const t = useTranslation();

  // function handleSubmit(event: React.MouseEvent, submit: () => Promise<void>) {
  //   event.stopPropagation();

  //   toggleLoading(true);

  //   submit().finally(() => toggleLoading(false));
  // }

  return (
    <>
      <DrawerBody overflowY="auto">
        <CrossIcon
          background="white"
          boxShadow="md"
          cursor="pointer"
          marginTop={4}
          paddingX={4}
          paddingY={3}
          position="absolute"
          right={0}
          roundedLeft="lg"
          top={0}
          onClick={onClose}
        />
        <Stack marginTop={20} spacing={10}>
          <DrawerTitle>Listo!<br/>Completaste tu Pedido 🚀</DrawerTitle>
          <Text>Gracias por realizar tu pedido desde nuestro catálogo. Pronto nos pondremos en contacto contigo por Whatsapp para finalizar tu pedido.</Text>
          <Text>También puedes enviarnos directamente tu pedido a nuestro Whatsapp 👇👇👇</Text>
          <CheckoutButton
            // isLoading={isLoading}
            onClick={() => window.open(waLink)}
          />
        </Stack>
        <Flex
          direction="column"
          mx='auto'
          justifyContent="center"
          align="center"
          pt={8}
        >  
          <Text fontSize="xs" mt={2}>
            Sitio creado con
          </Text>
          <Flex>
            <Image src={"/assets/ferreteros-app-black.png"} h="18px"/>
          </Flex>
        </Flex>
      </DrawerBody>
      <DrawerFooter>
      </DrawerFooter>
    </>
  );
};

export default Fields;