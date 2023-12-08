import React from "react";
import {IDrawer, Text, Stack, Flex, Box, SimpleGrid, Divider} from "@chakra-ui/core";

import SummaryButton from "../SummaryButton";

import Drawer, {DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Product, Variant} from "~/product/types";
import ProductVariantForm from "~/product/forms/ProductVariantForm";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import StepperPacked from "~/ui/inputs/StepperPacked";
import FormLabel from "~/ui/form/FormLabel";
import TruncatedText from "~/ui/feedback/ToggleableText";
import ToggleableImage from "~/ui/feedback/ToggleableImage";
import {useTranslation} from "~/i18n/hooks";
// import {useToast} from "~/hooks/toast";
// import ShareIcon from "~/ui/icons/Share";
// import MoneyShield from "~/ui/icons/MoneyShield";
import {useAnalytics} from "~/analytics/hooks";
import Textarea from "~/ui/inputs/Textarea";
import FormControl from "~/ui/form/FormControl";
import {useTenant} from "~/tenant/hooks";
//import Button from "~/ui/controls/Button";
import {usePrice} from "~/i18n/hooks";
import {getProductSaving} from "../../selectors"

import EyeIcon from "~/ui/icons/Eye";

import {getxOptionsPriceRange} from "~/product/selectors";

interface Props extends Omit<IDrawer, "children"> {
  onSubmit: (product: Product, options: Variant[], count: number, note: string) => void;
  product: Product;
}

const CartItemDrawer: React.FC<Props> = ({onClose, product, onSubmit, ...props}) => {
  const [count, setCount] = React.useState(product.mqo ? product.mqo : 1);
  const [number, setNumber] = React.useState(Math.floor(Math.random() * 5));
  const [note, setNote] = React.useState("");
  let mqo = (product.mqo ? product.mqo : 1)
  const p = usePrice();
  const t = useTranslation();
  const log = useAnalytics();
  // const toast = useToast();
  const {flags, promoText, showMqo, fakeVisitors} = useTenant();
  // {{ base: product.xoptions.length+1 === 1 ? 1 : product.xoptions.length+1 === 2 ? 2 : product.xoptions.length+1 === 3 ? 3 : 2}}
  const [min, ] = getxOptionsPriceRange(product.price, product.xoptions, product.mqo);
  const numPriceColums = () => {
    // let columns = 0
    if (product.mqo !== product.xoptions[0].quantity) {
      return product.xoptions.length + 1
    } else {
      return product.xoptions.length
    }
    console.log('oh my')
    return 0
  }
  // const canShare = {
  //   prompt: Boolean(navigator?.share),
  //   clipboard: Boolean(navigator?.clipboard),
  // };
  function formattedImg(image) {
    const position = image.indexOf('/upload/') + 8;
    const format = "w_360,f_auto,q_auto/";
    return [image.slice(0,position),format,image.slice(position)].join('');
  }

  function handleSubmit(options: Variant[]) {
    onSubmit(product, options, count, note);
  }

  // function handleShare() {
  //   if (canShare.prompt) {
  //     navigator
  //       .share({
  //         title: product.title,
  //         text: "",//product.description,
  //         url: window.location.href,
  //       })
  //       .then(() => {
  //         toast({
  //           status: t("cartItemDrawer.share.prompt.status"),
  //           title: t("cartItemDrawer.share.prompt.title"),
  //           description: t("cartItemDrawer.share.prompt.description"),
  //         });

  //         log.share(product, "mobile");
  //       })
  //       .catch(() => {
  //         console.info("El dialogo de share fue cerrado");
  //       });
  //   } else if (canShare.clipboard) {
  //     navigator.clipboard
  //       .writeText(window.location.href)
  //       .then(() => {
  //         toast({
  //           status: t("cartItemDrawer.share.clipboard.status"),
  //           title: t("cartItemDrawer.share.clipboard.title"),
  //           description: t("cartItemDrawer.share.clipboard.description"),
  //         });

  //         log.share(product, "desktop");
  //       })
  //       .catch(() => {
  //         toast({
  //           status: t("cartItemDrawer.share.clipboard.error.status"),
  //           title: t("cartItemDrawer.share.clipboard.error.title"),
  //           description: t("cartItemDrawer.share.clipboard.error.description"),
  //         });
  //       });
  //   }
  // }

  function handleNoteChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNote(event.target.value);
  }

  React.useLayoutEffect(() => {
    if (product) {
      log.viewProduct(product);
    }
  }, [product, log]);

  React.useEffect(() => {
    // create interval
    const interval = setInterval(
      // set number every 5s
      () => setNumber(Math.floor(Math.random() * 17)),
      5500
    );
    // clean up interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);



  // If we get here by any point, return null
  if (product.type === "hidden") return null;

  return (
    <Drawer id="cart-item" blockScrollOnMount={true} placement="right" size="md" onClose={onClose} {...props}>
      <ProductVariantForm
        defaultValues={product.options}
        type={product.type}
        onSubmit={handleSubmit}
      >
        {({form, submit, isLoading, watch}) => {
          const variants = Object.values(watch());
          const items = [
            {
              id: "temp",
              note: "",
              product,
              variants,
              count,
              mqo,
            },
          ];

          return (
            <>
              <DrawerBody paddingX={0}>
                <ArrowLeftIcon
                  background="white"
                  boxShadow="md"
                  cursor="pointer"
                  left={0}
                  marginTop={4}
                  borderWidth="1px"
                  paddingX={4}
                  paddingY={3}
                  position="fixed"
                  roundedRight="lg"
                  top={0}
                  onClick={onClose}
                />
                {product.badgeText && (
                  <Flex
                    right={0}
                    top={0}
                    marginTop={4}
                    position="absolute"
                  >
                    <Box fontWeight="bold" fontSize={{base:"md", md:"xl"}} backgroundColor={`${product.badgeColor}.500`}>
                      <Text fontStyle="italic" px={3} color="white">{product.badgeText}</Text>
                    </Box>
                  </Flex>
                )}
                {/*(canShare.clipboard || canShare.prompt) && (
                  <ShareIcon
                    background="white"
                    boxShadow="md"
                    cursor="pointer"
                    marginTop={4}
                    paddingX={4}
                    borderWidth="1px"
                    paddingY={3}
                    position="fixed"
                    right={0}
                    roundedLeft="lg"
                    top={0}
                    onClick={handleShare}
                  />
                )*/}
                {product.image ? <ToggleableImage maxHeight={{base:"35vh", md:"45vh"}} src={formattedImg(product.image)} /> : <ToggleableImage maxHeight={{base:"35vh", md:"45vh"}} src="/assets/fallback.jpg" />}

                <Stack
                  shouldWrapChildren
                  direction="column"
                  flex={1}
                  marginTop={product.image ? 0 : 0}
                  paddingTop={4}
                  paddingX={{base: 4, sm: 12}}
                  spacing={6}
                >
                  <Stack spacing={2}>
                    <Text
                      fontSize={{base:"xl", md:"2xl"}}
                      fontWeight="bold"
                      lineHeight="normal"
                      overflowWrap="break-word"
                    >
                      {(product.title).toUpperCase()}
                    </Text>
                    
                    {(["promotional", "available"].includes(product.type) && (!product.wholesale)) && (
                      <Stack>
                        <Box
                          color="green.500"
                          fontWeight={700}
                          fontSize="2xl"
                        >
                          {`${p(product.price)}`}
                          {product.type === "promotional" && (<Text
                              display="inline"
                              color="gray.500"
                              fontSize="xl"
                              fontWeight={500}
                              ml={2}
                              textDecoration="line-through"
                            >
                              {product.originalPrice ? `${p(product.originalPrice)}` : ''}
                            </Text>
                          )}
                        </Box>
                        {(product.type === "promotional" && promoText) && (
                          <Flex>
                            <Box borderWidth={2} borderRadius='lg' borderColor='black' px={3} py={1} fontWeight={600}>
                              {`${promoText} ${p(product.originalPrice - product.price)}`}
                            </Box>
                          </Flex>
                        )}
                        {showMqo && (
                          <Text fontSize="sm" textAlign="left">
                            Pedido mín.: {product.mqo} {product.mqo > 1 ? 'Piezas' : 'Pieza'}
                          </Text>
                        )}
                      </Stack>
                    )}
                    {(["promotional", "available"].includes(product.type) && product.wholesale) && (
                      <>
                        <SimpleGrid columns={{ base: numPriceColums() === 1 ? 1 : numPriceColums() === 2 ? 2 : numPriceColums() === 3 ? 3 : 2}}>
                          {product.mqo !== product.xoptions[0].quantity && (
                            <Box
                              color="green.500"
                              fontWeight={700}
                              fontSize={{base: "xl", md:"2xl"}}
                              textAlign="center"
                              mb={2}
                            >
                              {`${p(product.price)}`}
                              <Box fontWeight={500} color="gray.700" fontSize="xs" mt="-6px">
                                {`${product.mqo} - ${product.xoptions[0].quantity - 1} piezas`}
                              </Box>
                            </Box>
                          )}
                          {(product.xoptions).map((xoption, index, elements) => {
                            let next = elements[index+1]
                            return (
                              <Box
                                color="green.500"
                                fontWeight={700}
                                fontSize={{base: "xl", md:"2xl"}}
                                textAlign="center"
                                mb={2}
                                key={xoption.id}
                              >
                                {`${p(xoption.price)}`}
                                {next && (
                                  <Box fontWeight={500} color="gray.700" fontSize="xs" mt="-6px">
                                    {`${xoption.quantity} - ${next.quantity - 1} piezas`}
                                  </Box>
                                )}
                                {!next && (
                                  <Box fontWeight={500} color="gray.700" fontSize="xs" mt="-6px">
                                    {`≥ ${xoption.quantity} piezas`}
                                  </Box>
                                )}
                              </Box>
                          )})}
                        </SimpleGrid>
                        <Text fontSize="sm" textAlign="center">
                          Pedido mín.: {product.mqo} {product.mqo > 1 ? 'Piezas' : 'Pieza'}
                        </Text>
                        {product.type === "promotional" && (
                          <Box textAlign="center" mb={2}>
                            <Text
                              display="inline-flex"
                              color="gray.500"
                              fontSize="xs"
                              fontWeight={800}
                            >
                              PRECIO REGULAR:
                            </Text>
                            <Text
                              display="inline-flex"
                              color="gray.500"
                              fontSize="sm"
                              fontWeight={800}
                              ml={1}
                              textDecoration="line-through"
                            >
                              {product.originalPrice ? `${p(product.originalPrice)}` : ''}
                            </Text>
                            {promoText && (
                              <Box d="inline-flex" ml={2} fontSize="xs" borderWidth={2} borderRadius='lg' borderColor='black' px={1} py={0} fontWeight={600}>
                                {`${promoText} ${p(product.originalPrice - min)}`}
                              </Box>
                            )}
                          </Box>
                        )}
                      </>
                    )}

                    {/*(product.wholesale && ["promotional", "available"].includes(product.type)) && (
                      <Stack mt={1}>
                        <Box borderWidth={2} borderColor="primary.500" borderRadius="lg" px={3} pt={2} pb={3}>
                          <Flex mb={'2'}>
                            <MoneyShield
                              color="primary.500" 
                              height={6} width={6}
                              pt={1}
                            />
                            <Text
                              fontSize={{ base: '16px', lg: '18px' }}
                              color={'primary.500'}
                              fontWeight={'900'}
                              mt={1}
                              pl={2}
                            >
                              COMPRA MÁS, AHORRA MÁS
                            </Text>
                          </Flex>
                          <Stack isInline fontWeight={600} pl={3} fontSize={15} color="gray.600">
                            <Box w="55%">
                              Cantidad
                            </Box>
                            <Box w="45%">
                              Precio unitario
                            </Box>
                          </Stack>
                          {(product.xoptions).map((xoption) => (
                          <Stack key={xoption.id} isInline pl={3} pt={2} fontSize={15} color="gray.600">
                            <Box w="55%" lineHeight={1}>
                              A partir de {xoption.quantity} <Text d={{base:"block", lg:"none"}} lineHeight={0}><br/></Text> unidades
                            </Box>
                            <Box w="45%" m="auto">
                              {p(xoption.price)}
                            </Box>
                          </Stack>
                          ))}
                        </Box>
                      </Stack>
                    )*/}

                    {product.type === "ask" && (
                      <Stack>
                        <Box
                          color="green.500"
                          fontWeight={700}
                          fontSize="xl"
                        >
                          {`*Precio a consultar`}
                        </Box>
                        
                      </Stack>
                    )}
                    {product.type === "unavailable" && (
                      <Stack>
                        <Text
                          backgroundColor= "#ebf8ff"
                          borderWidth="1px"
                          fontSize="md"
                          whiteSpace="pre-line"
                          p={3}
                        >
                          Producto sin stock
                        </Text>
                        
                      </Stack>
                    )}

                    {product.code && (
                      <Text
                        color="gray.500"
                        fontSize="md"
                        whiteSpace="pre-line"
                      >
                        {`SKU: ${product.code}`}
                      </Text>
                    )}

                    {product.description && (
                      <TruncatedText
                        color="gray.500"
                        fontSize="md"
                        limit={280}
                        whiteSpace="pre-line"
                      >
                        {product.description}
                      </TruncatedText>
                    )}
                    <Divider/>
                    {fakeVisitors && (
                      <Stack
                        color="black"
                        isInline
                        fontSize="sm"
                        alignItems="center"
                        fontWeight={300}
                        marginBottom={6}
                      >
                        <EyeIcon size={14}/>
                        <Text>{number} Personas están mirando este producto ahora!</Text>
                      </Stack>
                    )}
                  </Stack>
                  {product.options?.length ? form : null}
                  {/*product.type != "unavailable" && (
                    <Flex alignItems="center" justifyContent="space-between">
                      <FormLabel padding={0}>{t("common.count")}</FormLabel>
                      <Stepper min={1} value={count} onChange={setCount} />
                    </Flex>
                  )*/}
                  {flags.includes("note") && (
                    <FormControl
                      help={t("cartItemDrawer.comments.placeholder")}
                      label={t("cartItemDrawer.comments.label")}
                    >
                      <Textarea
                        max={140}
                        placeholder={t("cartItemDrawer.comments.placeholder")}
                        value={note}
                        onChange={handleNoteChange}
                      />
                    </FormControl>
                  )}
                </Stack>
              </DrawerBody>
              <DrawerFooter>
                {["unavailable", "available", "promotional", "ask"].includes(product.type) && (
                  <SimpleGrid columns={1} w='100%' spacingY='20px'>
                    <Flex alignItems="center" justifyContent="space-between" >
                      <FormLabel padding={0}>{t("common.count")}</FormLabel>
                      {(["promotional", "available"].includes(product.type) && product.wholesale) && (
                        <Text color="primary.600" fontSize="sm" fontWeight="900" textAlign="center">{getProductSaving(product.wholesale, product.xoptions, product.price, count)}</Text>
                      )}
                      <StepperPacked min={product.mqo} packed={product.numPiezas} value={count} onChange={setCount} mqo={product.mqo}/>
                    </Flex>
                    <SummaryButton
                      isDisabled={product.type === "unavailable"}
                      isLoading={isLoading}
                      items={items}
                      onClick={(event) => {
                        event.stopPropagation();

                        submit();
                      }}
                    >
                      ➕ {t("common.add")}
                    </SummaryButton>
                   </SimpleGrid>
                )}
                {/*product.type === "ask" && (
                  <Button
                    boxShadow="lg"
                    size="lg"
                    variantColor="primary"
                    width="100%"
                    onClick={(event) => {
                      event.stopPropagation();

                      submit();
                    }}
                  >
                    ➕ {t("common.add")}
                  </Button>
                )*/}
              </DrawerFooter>
            </>
          );
        }}
      </ProductVariantForm>
    </Drawer>
  );
};

export default CartItemDrawer;
