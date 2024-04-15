import React from "react";
import {Stack, Flex, Text, Box, Link} from "@chakra-ui/core";

import {CartItem} from "../../types";
import PhoneClientNumber from "~/product/screens/Products/PhoneClientNumber";

//import CheckoutButton from "./CheckoutButton";

import {DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import Button from "~/ui/controls/Button";
import {useTranslation, usePrice} from "~/i18n/hooks";
import {getCount, getTotal, getFormattedPrice} from "~/cart/selectors";

//import {formatPrice} from "~/i18n/selectors";
import StepperPacked from "~/ui/inputs/StepperPacked";
//import {getVariantsString} from "~/product/selectors";
import CrossIcon from "~/ui/icons/Cross";
//import TrashIcon from "~/ui/icons/Trash";
import {Field} from "~/tenant/types";

//added
import {Product} from "~/product/types";
import Image from "~/ui/feedback/Image";
import WhatsAppIcon from "~/ui/icons/WhatsApp";
import FieldsForm from "../../forms/FieldsForm";
import {useTenant} from "~/tenant/hooks";
import {useContactActions} from "~/contact/hooks";
import {getProductSaving, getTotalSaving} from "../../selectors"

import Content from "~/ui/structure/Content";


interface Props {
  fields?: Field[];
  products: Product[];  //added
  items: CartItem[];
  onDecrease: (id: CartItem["id"]) => void;
  onIncrease: (id: CartItem["id"]) => void;
  onSubmit: (fields: Field[]) => void;
  onClose: VoidFunction;
  //hasNextStep: boolean;
  //onRemoveAll: () => Promise<void>;
}

const Overview: React.FC<Props> = ({
  fields, //added
  items,
  onIncrease,
  onDecrease,
  onSubmit,
  onClose,
  //hasNextStep,
  products, //added
  //onRemoveAll, //added
}) => {
  const t = useTranslation();
  const p = usePrice();
  const count = getCount(items);
  const total = getTotal(items);
  const totalSaving = getTotalSaving(items);
  const {hookcontact} = useContactActions();
  //const {image, title, price, originalPrice, description, type} = product; //added

  //const cancelRef = React.useRef();
  const tenant = useTenant();


  function formattedImg(image) {
    const position = image.indexOf('/upload/') + 8;
    const format = "w_360,f_auto,q_auto/";
    return [image.slice(0,position),format,image.slice(position)].join('');
  }
  
  function handleSubmit(event: React.MouseEvent, submit: () => Promise<void>) {
    event.stopPropagation();

    if(!Boolean(window.localStorage?.getItem("phoneclient:Products"))) {
      setShown(true);
      // window.localStorage.setItem("addedtocart:Cart", "completed");
      // console.log('set to storage')
    } else {
    submit().finally();

    }
  }

  // function handleNext() {
  //   onSubmit();
  // }

  function handleDecrease(id: CartItem["id"]) {
    onDecrease(id);
  }

  function handleIncrease(id: CartItem["id"]) {
    onIncrease(id);
  }
  // const handleOnOpenDialog = () => {
  //   onOpen()
  // }

  // function handleOnRemoveAll() {
  //   onRemoveAll();
  //   onCloseDialog();
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }

  // const handleNextDialog = () => {
  //   handleNext()
  // }

  const handleOpenPhoneclientModal = () => {
    setShown(true);
  }

  const RightIcon = () => {
    return (
      <svg  xmlns="http://www.w3.org/2000/svg" x="0px" stroke="white" fill="white" width={40} y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
      <g><path d="M983.3,484.4L760.6,261.7c-4.5-4.5-8.9-6.7-15.6-6.7c-13.4,0-22.3,8.9-22.3,22.3c0,6.7,2.2,11.1,6.7,15.6l184.9,184.9h-882c-13.4,0-22.3,8.9-22.3,22.3c0,13.4,8.9,22.3,22.3,22.3h882L729.4,707.1c-4.5,4.5-6.7,8.9-6.7,15.6c0,13.4,8.9,22.3,22.3,22.3c6.7,0,11.1-2.2,15.6-6.7l222.7-222.7c4.5-4.5,6.7-8.9,6.7-15.6S987.8,488.9,983.3,484.4z"/></g>
      </svg>
    );
  };

  const onChatLink = () => {
    const salesContact = window.localStorage.getItem(tenant.slug);

    window.open(
      `https://wa.me/${(salesContact && tenant[salesContact]) ? tenant[salesContact] : tenant.phone}?text=${encodeURIComponent('Hola - acabo de ver su catálogo y tengo una pregunta')}`,
      '_blank' // <- This is what makes it open in a new window.
    );
  };

  const [phoneclient, setPhoneclient] = React.useState(
    process.browser ? window.localStorage?.getItem("phoneclient:Products") : '',
  );

  const [isShown, setShown] = React.useState(false);

  const handleClosePhoneclientModal = () => {
    setShown(false)
  }

  const handleSubmitFromPhoneclientModal = () => {
    setPhoneclient(window.localStorage?.getItem("phoneclient:Products"))
    setShown(false)
  }

  return (
    <FieldsForm defaultValues={fields} onSubmit={onSubmit}>
      {({form, submit}) => (
        <>
          <DrawerBody>
            <CrossIcon
              background="white"
              boxShadow="md"
              cursor="pointer"
              paddingX={4}
              marginTop={4}
              borderWidth="1px"
              paddingY={3}
              pos="fixed"
              right={0}
              roundedLeft="lg"
              top={0}
              zIndex={1}
              onClick={onClose}
            />
            <Stack spacing={6}>
              <Stack alignItems="flex-start" justifyContent="space-between" d='inline-block'>
                <Flex
                  boxShadow="md"
                  d='inline-flex'
                  flexDirection="column"
                  borderWidth="1px"
                  borderColor="gray.100"
                  px={4}
                  py={2}
                  mt={10}
                  rounded="md">
                  <Text as="b" fontSize="2xl">{p(total)}</Text>
                  <Text as="span" fontSize="xl">{count > 1 ? `${count} Items` : `${count} Item`}</Text>
                </Flex>
              </Stack>
              <Box>
                <Stack
                  boxShadow="md" 
                  px={4}
                  py={2}
                  flexDirection="row"
                  borderWidth="1px"
                  borderColor="gray.100"
                  rounded="md"
                  alignItems="flex-start"
                  justifyContent="space-between">
                  <Box  
                    flexDirection="column"
                    d="flex">
                    <Text as="b" fontSize="lg">Tienes una pregunta?</Text>
                    <Text as="span" fontSize="md">Chatea con nosotros</Text>
                  </Box>
                  <Button onClick={onChatLink} alignSelf="center" bg="whatsapp.500" variantColor="green">
                    <WhatsAppIcon height={5} width={5} />
                    <Text ml={2} fontWeight={900} fontSize="lg">Chat</Text>
                  </Button>
                </Stack>
              </Box>
              <Box>
                <Stack
                  boxShadow="md"
                  px={4}
                  py={2}
                  // pb={2}
                  flexDirection="column"
                  shouldWrapChildren
                  borderWidth="1px"
                  borderColor="gray.100"
                  justifyContent="space-between"
                  spacing={3}
                  pb={4}
                  rounded="md">          
                  <Text as="b" fontSize="lg">Mi pedido</Text>
                  {items.map((item) => {
                    const productSaving = getProductSaving(item.product.wholesale, item.product.xoptions, item.product.price, item.count)
                    return (
                        <Flex key={item.id} alignItems="flex-start" justifyContent="space-between">
                          <Flex alignItems="center" borderColor="gray.100" borderWidth={1} rounded={5}>
                            <Image
                              fadeIn
                              height={{base: 20, sm: 20}}
                              rounded="md"
                              src={item.product.image ? formattedImg(products.find((_product) => _product.id === item.product.id).image) : "/assets/fallback.jpg"}
                              width={{base: 20, sm: 20}}
                            />
                          </Flex>
                          <Flex alignItems="center" mr={2} ml={2}  width={"100%"}>
                            <Stack spacing={0} flexDirection='column' display='flex'>
                              <Text fontWeight={500} fontSize="sm" isTruncated maxWidth={{base: 140, sm:200}}>
                                {(item.product.title).toUpperCase()}
                              </Text>
                              {item.note && <Text color="gray.600">({item.note})</Text>}
                              <StepperPacked
                                marginTop={2}
                                isMqo={((item.count > 1) && (item.count === item.product.mqo))}
                                value={item.count}
                                mqo={item.product.mqo ? item.product.mqo : 1}
                                packed={item.product.numPiezas ? item.product.numPiezas : 1}
                                onDecrease={() => handleDecrease(item.id)}
                                onIncrease={() => handleIncrease(item.id)}
                              />
                              {productSaving && item.product.wholesale && (<Text color="primary.600" fontSize="xs" mt={1} textAlign="left">{productSaving}</Text>)}
                            </Stack>
                          </Flex>
                          <Flex alignItems="end" flexDirection="column">
                            <Text fontWeight={500}>{getFormattedPrice(item)}</Text>
                            {productSaving && item.product.wholesale && (<Text fontWeight={500} color="gray.500" textDecoration="line-through" fontSize="sm">{p(Number(item.product.price)*Number(item.count))}</Text>)}
                          </Flex>
                        </Flex>
                    )})}
                </Stack>
              </Box>
              <Flex
                // as="nav"
                bottom={0}
                // justifyContent="flex-end"
                // pb={4}
                direction="column"
                position="sticky"
                // display="flex"
                pointerEvents="none"
                textAlign='right'
                width="100%"
                zIndex={4}
              >
                  <Stack
                    boxShadow="md"
                    backgroundColor="white"
                    px={4}
                    py={2}
                    borderWidth="1px"
                    borderColor="gray.100"
                    rounded="md">
                    <Flex justifyContent="space-between" color="gray.700" lineHeight={1}>
                      <Text fontSize="md" alignSelf="center">Subtotal</Text>
                      <Text fontSize="lg" alignSelf="center">{p(Number(total)+Number(totalSaving))}</Text>
                    </Flex>
                    <Flex justifyContent="space-between" color="gray.700" lineHeight={1}>
                      <Text fontSize="md" alignSelf="center">Descuentos</Text>
                      <Text fontSize="lg" alignSelf="center">{totalSaving ? "-"+p(totalSaving) : '—'}</Text>
                    </Flex>
                    <Flex justifyContent="space-between" lineHeight={1}>
                      <Text as="b" fontSize="lg" alignSelf="center">{t("cart.estimatedTotal")}</Text>
                      <Text as="b" fontSize="xl" alignSelf="center">{p(total)}</Text>
                    </Flex>
                  </Stack>
              </Flex>
              <Content>
                <Stack
                  boxShadow="md"
                  px={4}
                  py={2}
                  mb={5}
                  flexDirection="column"
                  borderWidth="1px"
                  borderColor="gray.100"
                  spacing={3}
                  rounded="md">          
                  <Text as="b" fontSize="lg">Información de contacto</Text>
                  <Flex fontWeight={500} fontSize="md" lineHeight={1}>Número de celular
                    <Text
                      alignSelf="flex-start"
                      backgroundColor="primary.50"
                      color="primary.500"
                      height={3}
                      lineHeight="0.5rem"
                      marginLeft={1}
                      marginTop={0}
                      padding={1}
                      rounded="sm"
                    >
                      *
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between" lineHeight={1} pb={3}>
                    <Text color={phoneclient ? "black" : "gray.300"}>{phoneclient ? phoneclient : "[Número de contacto]"}</Text>
                    <Link onClick={handleOpenPhoneclientModal} textDecoration="underline">{phoneclient ? "Cambiar" : "Ingresar número"}</Link>
                  </Flex>
                  {form}
                </Stack>
              </Content>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopColor="gray.100" borderTopWidth={1} marginTop={2}>
            <Stack spacing={4} width="100%">
              <Button boxShadow="lg" size="lg" variantColor="primary" color="white" onClick={(event) => handleSubmit(event, submit)}>
                <Text mx={5} fontWeight={500} fontSize="xl">Confirmar pedido</Text>
                <RightIcon />
              </Button>
            </Stack>
          </DrawerFooter>
          <PhoneClientNumber
            isShown={isShown}
            onHookcontact={hookcontact}
            onClose={handleClosePhoneclientModal}
            onSubmit={handleSubmitFromPhoneclientModal}
            fromParent="overview"
          />
        </>
      )}
    </FieldsForm>
  );
};

export default Overview;
