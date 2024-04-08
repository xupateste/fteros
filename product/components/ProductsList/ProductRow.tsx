import React from "react";
import {IconButton, Text, Tooltip, Stack, Flex, Box} from "@chakra-ui/core";

import {Product} from "../../types";

import {useToast} from "~/hooks/toast";
import TrashIcon from "~/ui/icons/Trash";
import DuplicateIcon from "~/ui/icons/Duplicate";
import StarIcon from "~/ui/icons/Star";
import Image from "~/ui/feedback/Image";
import {usePrice} from "~/i18n/hooks";
import RemoveAskModal from "./RemoveAskModal";
import {getxOptionsPriceRange} from "~/product/selectors";

//import {getVariantsPriceRange} from "~/product/selectors";

interface Props extends Product {
  onEdit: (product: Product) => void;
  onPromotion: (product: Product) => void;
  onRemove: (product: Product["id"]) => Promise<void>;
}

const ProductRow: React.FC<Props> = ({onEdit, onPromotion, onRemove, ...product}) => {
  const [status, setStatus] = React.useState("init");
  const toast = useToast();
  const p = usePrice();
  //const [min, max] = getVariantsPriceRange(product.options);
  const [isShown, setShown] = React.useState(false);
  const [min, max] = getxOptionsPriceRange(product.price, product.xoptions, product.mqo);

  async function handleRemove(product: Product["id"]) {
    setStatus("pending");
    onRemove(product).catch(() => {
      setStatus("init");

      toast({status: "error", title: "Error", description: "No se pudo borrar el producto"});
    }); 
  }

  function handleSubmitFromRemoveAskModal(event: React.FormEvent<HTMLFormElement>, product: Product["id"]) {
    event.stopPropagation();
    handleRemove(product);
    setShown(false);
  }

  function handleCloseRemoveAskModal() {
    setShown(false)
  }

  function formattedImg(image) {
    const position = image.indexOf('/upload/') + 8;
    const format = "w_120,f_auto,q_auto/";
    return [image.slice(0,position),format,image.slice(position)].join('');
  }

  return (
    <Box
      as="tr"
      borderBottomWidth={1}
      borderTopColor="gray.300"
      cursor="pointer"
      onClick={() => onEdit(product)}
    >
      <Box as="td" maxWidth="200px">
        <Flex alignItems="center" marginRight={{base: 4, md: 12}} paddingY={2}>
          {product.image && (
            <Image
              borderColor="gray.100"
              borderWidth={1}
              height={12}
              rounded="lg"
              src={product.image ? formattedImg(product.image) : "/assets/fallback-sm.jpg"}
  
              width={12}
            />)
          }
          <Box flex={1} isTruncated>
            <Text fontWeight="500" marginLeft={2} color={product.code ? "black" : "gray.300"}>{product.code ? product.code : "[Sin SKU]"}</Text>
            <Text fontWeight="900" marginLeft={2}>{product.title}</Text>
          </Box>
        </Flex>
      </Box>
      <Box as="td" display={{base: "none", md: "table-cell"}} width="220px">
        <Text fontWeight="500" marginRight={{base: 4, md: 10}} textAlign="left" fontSize="sm">
          {product.type === "ask" && `Precio a consultar`}
          {/*product.type === "variant" && (min === max ? p(min) : `${p(min)} ~ ${p(max)}`)*/}
          {["promotional", "available"].includes(product.type) && !product.wholesale && (
              <>{p(product.price)} {product.type == "promotional" && (` (${p(product.originalPrice)})`)}</>
            )}
          {["promotional", "available"].includes(product.type) && product.wholesale && (
              <>{p(min) + " - " + p(max)}</>
            )}
          {product.type === "unavailable" && "Sin stock"}
          {product.type === "hidden" && "Oculto"}
          {/*{product.type === "promotional" && `${p(product.price)} (${p(product.originalPrice)})`}*/}
        </Text>
      </Box>
      <Box as="td" display={{base: "none", md: "table-cell"}} width="200px">
        <Text marginRight={{base: 4, md: 12}} textAlign="left">
          {product.options?.length ? "Con opciones" : ""}
        </Text>
      </Box>
      <Box as="td">
        <Stack isInline justifyContent="flex-end" spacing={1}>
          <Tooltip aria-label="Promocionar producto" label="Promocionar producto" placement="left">
            <IconButton
              color={product.featured ? "yellow.300" : ""}
              _hover={{color: "yellow.300", opacity: 1}}
              alignSelf="flex-end"
              aria-label="Promocionar producto"
              icon={StarIcon}
              opacity={product.featured ? 1 : 0.3}
              size="md"
              variant="ghost"
              onClick={(event) => {
                event.stopPropagation();
                onPromotion({...product, promotionPrice: product.promotionPrice ? product.promotionPrice : product.price});
              }}
            />
          </Tooltip>
          <Tooltip aria-label="Duplicar producto" label="Duplicar producto" placement="left">
            <IconButton
              _hover={{color: "primary.500", opacity: 1}}
              alignSelf="flex-end"
              aria-label="Duplicar producto"
              icon={DuplicateIcon}
              opacity={0.5}
              size="md"
              variant="ghost"
              onClick={(event) => {
                event.stopPropagation();

                onEdit({...product, id: null, title: `${product.title} (copia)`});
              }}
            />
          </Tooltip>
          <IconButton
            _hover={{color: "red.500", opacity: 1}}
            alignSelf="flex-end"
            aria-label="Borrar producto"
            icon={TrashIcon}
            isLoading={status === "pending"}
            opacity={0.5}
            size="md"
            variant="ghost"
            onClick={(event) => {
              event.stopPropagation();
              // handleRemove(product.id);
              setShown(true);
            }}
          />
        </Stack>
      </Box>
      <RemoveAskModal
        isShown={isShown}
        onClose={handleCloseRemoveAskModal}
        onSubmit={(event) => {handleSubmitFromRemoveAskModal(event, product.id)}}
      />
    </Box>
  );
};

export default ProductRow;
