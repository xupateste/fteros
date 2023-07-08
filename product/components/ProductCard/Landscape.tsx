import React from "react";
import {Box, Flex, Text, FlexProps, Stack, PseudoBox} from "@chakra-ui/core";

import Image from "~/ui/feedback/Image";
import {Product} from "~/product/types";
import {usePrice} from "~/i18n/hooks";
import TruncatedText from "~/ui/feedback/TruncatedText";
//import {getVariantsPriceRange} from "~/product/selectors";
import {getxOptionsPriceRange} from "~/product/selectors";

interface Props extends Omit<FlexProps, "onClick"> {
  product: Product;
  onClick?: (product: Product) => void;
  isRaised?: boolean;
}

const LandscapeProductCard: React.FC<Props> = ({isRaised = false, product, onClick, ...props}) => {
  const p = usePrice();
  // const {image, title, price, originalPrice, description, type} = product;
  const {image, description, title, price, originalPrice, type, badgeText, badgeColor, wholesale, mqo} = product;
  //const [min, max] = getVariantsPriceRange(product.options);
  const [min, max] = getxOptionsPriceRange(price, product.xoptions, mqo);


  function handleClick() {
    onClick && onClick(product);
  }

  function formattedImg(image) {
    const position = image.indexOf('/upload/') + 8;
    const format = "w_360,f_auto,q_auto/";
    return [image.slice(0,position),format,image.slice(position)].join('');
  }

  // If we get here by any point, return null
  if (type === "hidden") return null;

  return (
    <PseudoBox
      backgroundColor="white"
      borderBottomWidth={{base: 1, sm: 0}}
      borderWidth={{sm: 1}}
      boxShadow={isRaised ? "lg" : "none"}
      cursor={onClick ? "pointer" : "inherit"}
      paddingY={{base: 4, sm: 0}}
      rounded={{base: "none", sm: "md"}}
      transition="all 0.2s"
    >
      <Stack
        isInline
        alignItems={{base: "center", sm: "stretch"}}
        data-test-id="product"
        height="100%"
        justifyContent="space-between"
        position="relative"
        spacing={0}
        onClick={handleClick}
        {...props}
      >
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
          minHeight={{base: 32, sm: "9rem"}}
          padding={{base: 0, sm: 4}}
          paddingTop={0}
          width="100%"
        >
          <Stack marginBottom={2} spacing={1}>
            <TruncatedText fontWeight={500} lineHeight="normal" lines={2}>
              {title}
            </TruncatedText>
            <TruncatedText color="gray.500" display="block" fontSize="sm" lines={2}>
              {description ? description : ` `}
            </TruncatedText>
          </Stack>
          {(type === "available" && !wholesale) &&(
          <Stack isInline alignItems="center">
            <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600} lineHeight={1}>
              {p(price)}
            </Text>
          </Stack>
        )}
        {(type === "promotional" && !wholesale) && (
          <>
            <Stack isInline alignItems="center">
              <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600} lineHeight={1}>
                {p(price)}
              </Text>
              <Text color="gray.500" fontSize={{base:"sm", md:"md"}} lineHeight={1} textDecoration="line-through">
                {p(originalPrice)}
              </Text>
            </Stack>
            <Flex>
              <Box borderWidth={2} fontSize={{base:"xs", md:"sm"}} borderRadius='md' borderColor='black' mt={1} px={1} py={0} fontWeight={600}>
                {`USTED GANA.. ${p(originalPrice - price)}`}
              </Box>
            </Flex>
          </>
        )}
        {(wholesale && !["unavailable", "ask"].includes(type)) && (
          <Stack>
            <Text color="green.500" fontSize={{base:"sm", md:"md"}} fontWeight={600} lineHeight={1}>
              {p(min) + " - " + p(max)}
            </Text>
          </Stack>
        )}
        {type === "unavailable" && (
          <Text color="yellow.500" fontSize={{base:"sm", md:"md"}} fontWeight={900} lineHeight={1}>
            *Agotado
          </Text>
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
        <Image
          fadeIn
          height={{base: 32, sm: "auto"}}
          minHeight={{base: 32, sm: "9rem"}}
          roundedLeft={{base: "md", sm: "none"}}
          roundedRight="md"
          src={image ? formattedImg(image) : "/assets/fallback.jpg"}
          width={{base: 32, sm: "9rem"}}
        />
        <Box
          position="absolute"
          width="100%"
          height="100%"
        >
          {(type === "unavailable") && (
            <Flex width={{base: 32, sm: "9rem"}} right={0} position="absolute" height="100%">
              <Box borderColor="gray.400" m="auto">
                <Text fontSize="12px" fontWeight="bold" px={2} bg="black" color="white">Sin stock</Text>
              </Box>
            </Flex>)
          || badgeText && (
            <Flex>
              <Box fontWeight="bold" fontSize="12px" backgroundColor={`${badgeColor}.500`} position="absolute" top={0} right={0} display="inline-flex" justifyContent="center">
                <Text fontStyle="italic" px={2} color="white">{badgeText}</Text>
              </Box>
            </Flex>)
          }
        </Box>
      </Stack>
    </PseudoBox>
  );
};

export default LandscapeProductCard;
