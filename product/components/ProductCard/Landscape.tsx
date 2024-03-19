import React from "react";
import {Box, Flex, Text, FlexProps, Stack} from "@chakra-ui/core";

import Image from "~/ui/feedback/Image";
import {Product} from "~/product/types";
import {usePrice} from "~/i18n/hooks";
// import TruncatedText from "~/ui/feedback/TruncatedText";
//import {getVariantsPriceRange} from "~/product/selectors";
import {useTenant} from "~/tenant/hooks";
import {getxOptionsPriceRange} from "~/product/selectors";

interface Props extends Omit<FlexProps, "onClick"> {
  product: Product;
  onClick?: (product: Product) => void;
  isRaised?: boolean;
}

const LandscapeProductCard: React.FC<Props> = ({isRaised = false, product, onClick, ...props}) => {
  const p = usePrice();
  const {image, title, price, originalPrice, type, badgeText, badgeColor, wholesale, mqo, featured} = product;
  // const [min, max] = getVariantsPriceRange(product.options);
  const [min, max] = getxOptionsPriceRange(price, product.xoptions, mqo);
  const {promoText, showMqo} = useTenant();

  function formattedImg(image) {
    const position = image.indexOf('/upload/') + 8;
    const format = "w_360,f_auto,q_auto/";
    return [image.slice(0,position),format,image.slice(position)].join('');
  }
  
  function handleClick() {
    onClick && onClick(product);
  }

  // If we get here by any point, return null
  if (type === "hidden") return null;

  return (
    <Flex
      alignItems="flex-end"
      boxShadow={isRaised ? "lg" : "none"}
      cursor={onClick ? "pointer" : "inherit"}
      data-test-id="product"
      direction="column"
      justifyContent="space-between"
      position="relative"
      rounded="md"
      transition="transform 0.2s"
      onClick={handleClick}
      marginBottom={4}
      bg="white"
      borderWidth={featured ? 2 : 0}
      borderColor="yellow.300"
      {...props}
    >
      <Image
        fadeIn
        //height={{base: 48, sm: 48}}
        paddingBottom="100%"
        height="0"
        rounded="md"
        //src={image || "/assets/fallback.jpg"}
        src={image ? formattedImg(image) : "/assets/fallback.jpg"}
        width="100%"
      />
      <Box
        position="absolute"
        width="100%"
        paddingBottom="100%"
        height="0"
      >
        {(type === "unavailable") && (
          <Flex pt="44%" w="100%" borderColor="gray.400">
            <Text m="auto" fontSize="11px" fontWeight="bold" px={2} bg="black" color="white" position="relative">Producto sin stock</Text>
          </Flex>)
        || badgeText && (
          <Flex>
            <Box fontWeight="bold" fontSize="10px" backgroundColor={`${badgeColor}.500`} position="absolute" top={0} right={0} display="inline-flex" justifyContent="center">
              <Text fontStyle="italic" px={2} color="white">{badgeText}</Text>
            </Box>
          </Flex>)
        }
      </Box>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        height="100%"
        justifyContent="normal"
        padding={isRaised ? {base: 2, sm: 4} : 1}
        paddingTop={1}
        width="100%"
        mx="auto"
      >
        <Text
          display="block"
          fontSize={{base: "xs", sm: "xs"}}
          textTransform="uppercase"
          fontWeight={500}
          lineHeight="normal"
          marginBottom={0}
          // noOfLines={2}
          // isTruncated
        >
          {title}
        </Text>
        {(["promotional", "available"].includes(type) && !wholesale) && (
          <Box>
             <Box>
              <Text d="inline" color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600}>
                {p(price)}
              </Text>
              {(type === "promotional") && (
                <Text d="inline" ml={1} color="gray.500" fontSize={{base:"xs", md:"sm"}} textDecoration="line-through">
                  {originalPrice ? `${p(originalPrice)}` : ''}
                </Text>
              )}
            </Box>
            {(type === "promotional" && promoText) && (
              <Flex>
                <Box borderWidth={2} fontSize="10px" borderRadius='md' borderColor='black' px={2} fontWeight={600}>
                  {`${promoText} ${p(originalPrice - price)}`}
                </Box>
              </Flex>
            )}
            {showMqo && (
              <Text color="gray.800" fontSize="10px" lineHeight={2}>
                {`Pedido mín.: ${mqo} pza.`}
              </Text>
            )}
          </Box>
        )}
        {(["promotional", "available"].includes(type) && wholesale) && (
            <Stack alignItems="flex-start" direction="column">
              <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600} lineHeight={1}>
                {p(min) + " - " + p(max)}
              </Text>
              {showMqo && (
                <Text color="gray.800" fontSize={{base:"xs", md:"xs"}} lineHeight={1}>
                  {`Pedido mín.: ${mqo} pza.`}
                </Text>
              )}
            </Stack>
            // {(["promotional"].includes(type) && promoText) && (
            //   <Flex>
            //     <Box borderWidth={2} fontSize={{base:"xs", md:"xs"}} borderRadius='md' borderColor='black' mt={1} px={2} py={0} fontWeight={600}>
            //       {`${promoText} ${p(originalPrice - min)}`}
            //     </Box>
            //   </Flex>
            // )}
        )}
       {/* {(type === "available" && !wholesale) &&(
          <Stack alignItems="flex-start" direction="column">
            <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600} lineHeight={1}>
              {p(price)}
            </Text>
            {showMqo && (
              <Text color="gray.800" fontSize={{base:"xs", md:"xs"}} lineHeight={1}>
                {`Pedido mín.: ${mqo} pza.`}
              </Text>
            )}
          </Stack>
        )}*/}
        {/*{(type === "promotional" && !wholesale) && (
          <>
            <Stack isInline alignItems="center" >
              <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600} lineHeight={1}>
                {p(price)}
              </Text>
              <Text color="gray.500" fontSize={{base:"sm", md:"md"}} lineHeight={1} textDecoration="line-through">
                {p(originalPrice)}
              </Text>
            </Stack>
            {promoText && (
              <Flex>
                <Box borderWidth={2} fontSize={{base:"xs", md:"xs"}} borderRadius='md' borderColor='black' mt={1} px={2} py={0} fontWeight={600}>
                  {`${promoText} ${p(originalPrice - price)}`}
                </Box>
              </Flex>
            )}
          </>
        )}*/}
        {/*{(type === "promotional" && wholesale) && (
          <>
            <Stack isInline alignItems="center" >
              <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600} lineHeight={1}>
                {p(price)}
              </Text>
              <Text color="gray.500" fontSize={{base:"sm", md:"md"}} lineHeight={1} textDecoration="line-through">
                {p(originalPrice)}
              </Text>
            </Stack>
            {promoText && (
              <Flex>
                <Box borderWidth={2} fontSize={{base:"xs", md:"xs"}} borderRadius='md' borderColor='black' mt={1} px={2} py={0} fontWeight={600}>
                  {`${promoText} ${p(originalPrice - min)}`}
                </Box>
              </Flex>
            )}
          </>
        )}*/}
        {/*{(wholesale && !["unavailable", "ask"].includes(type)) && (
          <>
            <Stack alignItems="flex-start" direction="column">
              <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600} lineHeight={1}>
                {p(min) + " - " + p(max)}
              </Text>
              {showMqo && (
                <Text color="gray.800" fontSize={{base:"xs", md:"xs"}} lineHeight={1}>
                  {`Pedido mín.: ${mqo} pza.`}
                </Text>
              )}
            </Stack>
            {promoText && (
              <Flex>
                <Box borderWidth={2} fontSize={{base:"xs", md:"xs"}} borderRadius='md' borderColor='black' mt={1} px={2} py={0} fontWeight={600}>
                  {`${promoText} ${p(originalPrice - min)}`}
                </Box>
              </Flex>
            )}
          </>
        )}*/}
        {type === "unavailable" && (
          // <Text color="yellow.500" fontSize={{base:"sm", md:"md"}} fontWeight={900} lineHeight={1}>
          //   *Agotado
          // </Text>
          <>
            <Stack isInline alignItems="center" >
              <Text color="green.500" fontSize={{base:"md", md:"lg"}} fontWeight={600} lineHeight={1}>
                {p(price)}
              </Text>
              {(originalPrice) && (
                <Text color="gray.500" fontSize={{base:"sm", md:"md"}} lineHeight={1} textDecoration="line-through">
                  {p(originalPrice)}
                </Text>
              )}
            </Stack>
            {(["promotional"].includes(type) && promoText) && (
              <Flex>
                <Box borderWidth={2} fontSize={{base:"xs", md:"xs"}} borderRadius='md' borderColor='black' mt={1} px={2} py={0} fontWeight={600}>
                  {`${promoText} ${p(originalPrice - price)}`}
                </Box>
              </Flex>)}
          </>
        )}
        {/*type === "variant" && (
          <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={500} lineHeight={1}>
            {min === max ? p(min) : p(min)} ~ {p(max)}
          </Text>
        )*/}
        {type === "ask" && (
          <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600} lineHeight={1}>
            *Precio a consultar
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default LandscapeProductCard;
