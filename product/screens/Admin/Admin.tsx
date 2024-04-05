import React from "react";
import {Stack, Box, Flex} from "@chakra-ui/core";

import ProductDrawer from "../../components/ProductDrawer";
import PromotionDrawer from "../../components/PromotionDrawer";
import {useFilteredProductsWithCode, useProductActions, useProductCategories, useProductBrands} from "../../hooks";
import {Product} from "../../types";
import ProductsList from "../../components/ProductsList";

import {groupBy} from "~/selectors/group";
import PlusIcon from "~/ui/icons/Plus";
import IconButton from "~/ui/controls/IconButton";
import Content from "~/ui/structure/Content";
import NoResults from "~/ui/feedback/NoResults";
import {useTranslation} from "~/i18n/hooks";
import {useTenant} from "~/tenant/hooks";
import ProductsUpsertButton from "~/product/components/ProductsUpsertButton";
import {getIsItExceeds} from "~/app/screens/Home/SelectorsTypeTenant"

interface Props {
  setItExceeds: React.Dispatch<React.SetStateAction<boolean>>;
  timestamp: number;
}

const AdminScreen: React.FC<Props> = ({setItExceeds, timestamp}) => {
  const [selected, setSelected] = React.useState< Partial<Product> | undefined >(undefined);
  const [promotion, setPromotion] = React.useState< Partial<Product> | undefined >(undefined);
  const {flags, layout, typeTenant} = useTenant();
  const {products, filters} = useFilteredProductsWithCode();
  const {update, remove, create, upsert} = useProductActions();
  const categories = useProductCategories();
  const brands = useProductBrands();
  const productsByCategory = groupBy(products, (product) => product.category);
  const t = useTranslation();

  async function handleSubmit(product: Product) {
    if (product.id) {
      await update(product);
    } else {
      await create(product);
    }

    closeProductDrawer();
  }

  async function handlePromotionSubmit(product: Product) {
    product["featured"] = true;
    product["type"] = "promotional";
    await update(product);
    closePromotionDrawer();
  }

  async function handlePromotionRemove(product: Product) {
    product["promotionDays"] = 0;
    product["promotionUnits"] = 0;
    product["promotionPrice"] = 0;
    product["featured"] = false;
    product["badgeText"] = "";
    product["badgeColor"] = "white";
    await update(product);
    closePromotionDrawer();
  }

  function onCreate() {
    setSelected({
      type: "available",
      image: "",
      options: [],
    });
  }

  function onProductEdit(product: Product) {
    setSelected(product);
  }

  function onPromotion(product: Product) {
    setPromotion(product);
  }

  function closeProductDrawer() {
    setSelected(undefined);
  }
  
  function closePromotionDrawer() {
    setPromotion(undefined);
  }
  
  React.useEffect(() => {
    setItExceeds(getIsItExceeds(typeTenant, products.length))
  }, [getIsItExceeds(typeTenant, products.length)])

  return (
    <>
      <Flex direction="column" height="100%" marginTop={4}>
        <Box flex={1}>
          <Flex alignItems="center" data-test-id="filters">
            <Content>
              <Flex alignItems="center" justifyContent="space-between" paddingX={4} width="100%">
                {filters}
                <Stack isInline shouldWrapChildren marginLeft={4} spacing={2}>
                  <ProductsUpsertButton
                    display={{base: "none", sm: "flex"}}
                    products={products}
                    onSubmit={upsert}
                    isDisabled={getIsItExceeds(typeTenant, products.length)}
                  />
                  <IconButton
                    isDisabled={getIsItExceeds(typeTenant, products.length)}
                    isCollapsable
                    data-test-id="add-product"
                    leftIcon={PlusIcon}
                    size="md"
                    variantColor="primary"
                    onClick={onCreate}
                  >
                    {t("common.add")}
                  </IconButton>
                </Stack>
              </Flex>
            </Content>
          </Flex>
          <Content padding={4}>
            <Box width="100%">
              {products.length ? (
                <Stack spacing={6}>
                  {productsByCategory.map(([category, products]) => (
                    <Box key={category} id={category}>
                      <ProductsList
                        isPreviewEnabled={flags.includes("preview")}
                        layout={layout}
                        products={products}
                        title={category}
                        width="100%"
                        onEdit={onProductEdit}
                        onPromotion={onPromotion}
                        onRemove={remove}
                      />
                    </Box>
                  ))}
                </Stack>
              ) : (
                <NoResults>{t("admin.empty")}</NoResults>
              )}
            </Box>
          </Content>
        </Box>
      </Flex>
      {Boolean(promotion) && (
        <PromotionDrawer
          // categories={categories}
          // brands={brands}
          timestamp={timestamp}
          defaultValues={promotion}
          onClose={closePromotionDrawer}
          onSubmit={handlePromotionSubmit}
          onRemove={handlePromotionRemove}
        />
      )}
      {Boolean(selected) && (
        <ProductDrawer
          categories={categories}
          brands={brands}
          defaultValues={selected}
          onClose={closeProductDrawer}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AdminScreen;
