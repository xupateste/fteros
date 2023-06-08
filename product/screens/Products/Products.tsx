import React from "react";
import {Stack, Box, PseudoBox, Flex, useDisclosure, Text, Image, Button} from "@chakra-ui/core";
// import BTT from "~/ui/icons/BTT";
import {useRouter} from "next/router";

import ProductCard from "../../components/ProductCard";
// import {useFilteredProducts, useProducts} from "../../hooks";
import {useFilteredProductsScroll, useProducts} from "../../hooks";
import ProductsGrid from "../../components/ProductsGrid";
import ProductsCarousel from "../../components/ProductsCarousel";

import PhoneClientNumber from "./PhoneClientNumber";

//import Logo from "~/ui/static/Logo";
//import Image from "~/ui/feedback/Image";
import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartSummaryDrawer from "~/cart/components/CartSummaryDrawer";
import {filterBy} from "~/selectors/filter";
import {useTenant} from "~/tenant/hooks";
import {useTranslation} from "~/i18n/hooks";
import TenantHeader from "~/tenant/components/TenantHeader";
import NoResults from "~/ui/feedback/NoResults";
import Content from "~/ui/structure/Content";
import SummaryButton from "~/cart/components/SummaryButton";
import CartItemDrawer from "~/cart/components/CartItemDrawer";
import {Product, Variant} from "~/product/types";
import Link from "~/ui/controls/Link";
import WhatsAppIcon from "~/ui/icons/WhatsApp";
import {useContactActions} from "~/contact/hooks";
import {Contact} from "~/contact/types";


const ProductsScreen: React.FC = () => {
  const {
    query: {product},
    push,
  } = useRouter();
  const {add, increase, decrease, items, checkout, removeAll} = useCart();
  const {hookcontact} = useContactActions();
  const t = useTranslation();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  // const {products, filters} = useFilteredProducts((product) => product.type !== "hidden");
  const {products, filters} = useFilteredProductsScroll((product) => product.type !== "hidden");
  const productsAll = useProducts();
  const {fields, layout, ...tenant} = useTenant();
  const selected = React.useMemo(() => products.find((_product) => _product.slug === product), [
    products,
    product,
  ]);
  React.useEffect(()=>{
    let defaultPhone = window.localStorage?.getItem("phoneclient:Products")
    if(defaultPhone) {
      // const [isContact, setIsNewContact] = React.useState<Contact>(undefined)
      let isContact = {} as Contact;
      isContact['phone'] = defaultPhone;
      hookcontact(isContact)
    }
  }, []) // <-- empty dependency array - run only once


  const featuredProducts = filterBy(products, {featured: true});
  const productsByCategory = groupBy(products, (product) => product.category);
  const [isShown, setShown] = React.useState(false);
  
  const [tmpProduct, setTmpProduct] = React.useState<Product>({} as Product)
  const [tmpOptions, setTmpOptions] = React.useState<Variant[]>([])
  const [tmpCount, setTmpCount] = React.useState(0)
  const [tmpNote, setTmpNote] = React.useState('')
  //end added

  function handleAdd(product: Product, options: Variant[], count: number, note: string) {
    // add(product, options, count, note);

    if(!Boolean(window.localStorage?.getItem("phoneclient:Products"))) {
      if(!Boolean(window.localStorage?.getItem("phoneclient:After"))) {
        setShown(true);
        setTmpProduct(product);
        setTmpOptions(options);
        setTmpCount(count);
        setTmpNote(note);
      } else {
        add(product, options, count, note);
        push(`/[slug]`, `/${tenant.slug}`, {shallow: true});
      }
      // window.localStorage.setItem("addedtocart:Cart", "completed");
      // console.log('set to storage')
    } else {
      add(product, options, count, note);
      push(`/[slug]`, `/${tenant.slug}`, {shallow: true});
    }

   //push(`/`);
    // push(`/[slug]`, `/${tenant.slug}`, {shallow: true});
  }

  const handleSubmitFromPhoneclientModal = () => {
    add(tmpProduct, tmpOptions, tmpCount, tmpNote); // add product to cart from phone modal
    setShown(false)
    push(`/[slug]`, `/${tenant.slug}`, {shallow: true});
  }

  const handleClosePhoneclientModal = () => {
    window.localStorage.setItem("phoneclient:After", "after")
    add(tmpProduct, tmpOptions, tmpCount, tmpNote); // add for testing bypassing
    setShown(false)
    push(`/[slug]`, `/${tenant.slug}`, {shallow: true}); // add for testing bypassing
  }

  function handleOpenCart() {
    openCart();
  }

  function handleCloseSelected() {
    //push(`/`);
    push(`/[slug]`, `/${tenant.slug}`, {shallow: true});
  }

  const onChatLink = () => {
    window.open(
      `https://wa.me/${tenant.phone}?text=${encodeURIComponent('Hola - acabo de ver su catálogo y tengo una pregunta')}`,
      '_blank' // <- This is what makes it open in a new window.
    );
  };

  function handleSelect(product: Product) {
    push(
      {
        pathname: `/[slug]`,
        query: {
          product: product.slug,
        },
      },
      {
        pathname: `/${tenant.slug}`,
        query: {
          product: product.slug,
        },
      },
      {shallow: true},
    );
  }

  return (
    <>
      <Flex direction="column" height="100%">
        <Flex as="main" backgroundColor="white" direction="column" flex={1} height="100%">
          <Content height="100%" paddingX={{base: 0, sm: 4}}>
            <TenantHeader data-test-id="header" marginBottom={2} tenant={tenant} />
            <Box flex={1}>
              {/*highlight && (
                <Box
                  backgroundColor="primary.50"
                  color="primary.500"
                  fontSize={{base: "sm", sm: "md"}}
                  fontWeight="500"
                  marginTop={4}
                  paddingX={4}
                  paddingY={3}
                  roundedTop={{base: 0, sm: "lg"}}
                  textAlign={{base: "left", sm: "center"}}
                >
                  {highlight}
                </Box>
              )*/}
              <Box
                backgroundColor="gray.50"
                data-test-id="filters"
                marginBottom={{base: 5, sm: 10}}
                paddingX={4}
                paddingY={1}
                position="sticky"
                roundedBottom="lg"
                roundedTop="none"
                top={0}
                zIndex={3}
              >
                {filters}
              </Box>
              <Box marginBottom={4} paddingX={{base: 4, sm: 0}}>
                <Stack margin="auto" spacing={5} width="100%">
                  {Boolean(products.length) ? (
                    <Stack spacing={{base: 5, sm: 10}} width="100%">
                      {Boolean(featuredProducts.length) && (
                        <ProductsCarousel title={t("common.featured")} zIndex={0}>
                          {featuredProducts.map((product) => (
                            <ProductCard
                              key={product.id}
                              isRaised
                              layout="portrait"
                              width={{base:210, sm: 280}}
                              product={product}
                              onClick={() => handleSelect(product)}
                            />
                          ))}
                        </ProductsCarousel>
                      )}
                      {productsByCategory.map(([category, products]) => {
                        return (
                          <PseudoBox key={category} as="section" id={category}>
                            <ProductsGrid data-test-id="category" layout={layout} title={category} products={products}>
                              {products.map((product) => (
                                <ProductCard
                                  key={product.id}
                                  layout={layout}
                                  product={product}
                                  onClick={() => handleSelect(product)}
                                />
                              ))}
                            </ProductsGrid>
                          </PseudoBox>
                        );
                      })}
                    </Stack>
                  ) : (
                    <NoResults data-test-id="empty">{t("products.empty")}</NoResults>
                  )}
                </Stack>
              </Box>
            </Box>
          </Content>
        </Flex>
      </Flex>
      <Flex
          // as="nav"
          bottom={0}
          // justifyContent="flex-end"
          margin={{base: 0, sm: "auto"}}
          paddingX={{base: 4, sm: 24}}
          pb={4}
          direction="column"
          position="sticky"
          // display="flex"
          pointerEvents="none"
          textAlign='right'
          width="100%"
          zIndex={4}
        >
          <Box pointerEvents="none">
            <Button pointerEvents="auto" onClick={onChatLink} alignItems="center" bg="white" variantColor="gray" rounded={48} boxShadow='md' borderWidth={1}  mb={Boolean(items.length) ? 2: 5} py='6'>
              <WhatsAppIcon height={6} color="whatsapp.500" width={6} />
              <Text ml={2} fontWeight={900} fontSize="xl" color="black">Chat</Text>
            </Button>
          </Box>
      {Boolean(items.length) && (
          <Box
            display="block"
            margin={{base: 0, sm: "auto"}}
            minWidth={{base: "100%", sm: 64}}
            rounded={4}
            width={{base: "100%", sm: "auto"}}
          >
            <SummaryButton pointerEvents="auto" items={items} onClick={handleOpenCart}>
              {t("products.review")}
            </SummaryButton>
          </Box>
      )}
      </Flex>
      <Content>
        <Flex
          justifyContent="center"
          alignItems="center"
          mb={8}
          mt={2}
        >  
          <Text fontSize="md" mt={2}>
            Sitio creado con
          </Text>
          <Link href="/" isExternal ml={2}>
            <Image src={"/assets/ferreteros-app-black.png"} h="23px"/>
          </Link>
        </Flex>
      </Content>
      {isCartOpen && (
        <CartSummaryDrawer
          fields={fields}
          items={items}
          onCheckout={checkout}
          onRemoveAll={removeAll}
          onClose={closeCart}
          onDecrease={decrease}
          onIncrease={increase}
          products={productsAll}
        />
      )}
      {Boolean(selected) && (
        <CartItemDrawer product={selected} onClose={handleCloseSelected} onSubmit={handleAdd} />
      )}
      <PhoneClientNumber
        isShown={isShown}
        onHookcontact={hookcontact}
        onClose={handleClosePhoneclientModal}
        onSubmit={handleSubmitFromPhoneclientModal}
        fromParent="products"
      />
    </>
  );
};

export default ProductsScreen;