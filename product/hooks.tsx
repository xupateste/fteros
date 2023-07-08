import React from "react";
import {Icon, Text, Flex, InputGroup, InputLeftElement, Divider, Box} from "@chakra-ui/core";

import ProductContext from "./context";
import {Product} from "./types";

import Input from "~/ui/inputs/Input";
import Select from "~/ui/inputs/Select";
import {extractUniqueBy, filterBy} from "~/selectors/filter";
//import {sort} from "~/selectors/sort";
import {groupBy} from "~/selectors/group";
import {useTranslation} from "~/i18n/hooks";
import {getQtyProdsTypeOf} from "~/app/screens/Home/SelectorsTypeTenant"
import {useTenant} from "~/tenant/hooks";

//added for scroll
import MenuScroll from "~/product/components/MenuScroll";

// import "~/product/components/ScrollComponents/styles.css";


//end added for scroll


export function useProducts() {
  const {
    state: {products},
  } = React.useContext(ProductContext);

  return products;
}

export function useOrders() {
  const {
    state: {orders},
  } = React.useContext(ProductContext);

  return orders;
}

export function useProductActions() {
  const {
    actions: {create, update, remove, remorder, upsert, updateorder},
  } = React.useContext(ProductContext);

  return {create, update, remove, remorder, upsert, updateorder};
}

export function useProductCategories() {
  const products = useProducts();
  let arrayCats = extractUniqueBy(products, (product) => product.category);
  // arrayCats.push('Accesorios Eléctricos');
  // arrayCats.push('Herramientas');
  // arrayCats.push('Gasfitería y Tubería');
  // arrayCats.push('Limpieza y Plagicídas');
  // arrayCats.push('Chapería');
  // arrayCats.push('Herrería y Pernería');
  let uniqueCats = [...new Set(arrayCats)];
  return uniqueCats;
}

export function useProductBrands() {
  const products = useProducts();
  let arrayBrands = extractUniqueBy(products, (product) => product.brand);
  arrayBrands = arrayBrands.filter(function(e){return e});
  // console.log(arrayBrands);
  // arrayCats.push('Accesorios Eléctricos');
  // arrayCats.push('Herramientas');
  // arrayCats.push('Gasfitería y Tubería');
  // arrayCats.push('Limpieza y Plagicídas');
  // arrayCats.push('Chapería');
  // arrayCats.push('Herrería y Pernería');
  let uniqueBrand = [...new Set(arrayBrands)];
  return uniqueBrand;
}

export function useFilteredProducts(selector?: (product: Product) => boolean) {
  const products = useProducts();
  const t = useTranslation();
  const [query, setQuery] = React.useState("");
  const filtered = selector ? products.filter(selector) : products;
  const productsBySearch = React.useMemo(() => filterBy(filtered, {code:query, title:query, keywords:query, badgeText:query}), [
    query,
    filtered,
  ]);
  const categories = groupBy(filtered, (product) => product.category).map(([category, products]): [
    Product["category"],
    number,
  ] => [category, products.length]);

  //added
  const {typeTenant} = useTenant();

  function handleCategoryChange(category: Product["category"]) {
    setQuery("");

    if (category) {
      document
        .querySelector(`[id="${category}"]`)
        ?.scrollIntoView(true)
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }
  }

  return {
    products: productsBySearch.slice(0,getQtyProdsTypeOf(typeTenant)),
    filters: (
      <>
        <Flex alignItems="center">
          <Select
            flex={{base: 1, sm: "inherit"}}
            fontWeight="500"
            height="100%"
            maxWidth={{base: "100%", sm: "140px"}}
            paddingLeft={0}
            placeholder={t("common.categories")}
            value=""
            variant="unstyled"
            width="auto"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleCategoryChange(e.target.value)
            }
          >
            {categories.map(([category, count]) => (
              <option key={category} value={category}>
                {category} ({count})
              </option>
            ))}
          </Select>
          <Divider height={4} orientation="vertical" />
          <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10} w="100%">
            <InputLeftElement
              children={<Icon color="gray.300" name="search" />}
              color="gray.300"
              fontSize="1.2em"
              top="inherit"
            />
            <Input
              fontSize="md"
              paddingLeft={10}
              placeholder={t("filters.search")}
              value={query}
              variant="unstyled"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Flex>
        {query && (
            <Text fontWeight="900" fontStyle="italic" textAlign="center">Resultados para: "{query}"</Text>
          )
        }
      </>
    ),
  };
}

export function useFilteredProductsScroll(selector?: (product: Product) => boolean) {
  const products = useProducts();
  const t = useTranslation();
  const [query, setQuery] = React.useState("");
  const [catquery, setCatquery] = React.useState("");
  const filtered = selector ? products.filter(selector) : products;
  const productsBySearch = React.useMemo(() => filterBy(filtered, {code:query, title:query, keywords:query, badgeText:query, brand:query}), [
    query,
    filtered,
  ]);
  const productsByCategory = React.useMemo(() => filterBy(filtered, {category:catquery}), [
    catquery,
    filtered,
  ]);
  // const categories = groupBy(filtered, (product) => product.category).map(([category, products]): [
  //   Product["category"],
  //   number,
  // ] => [category, products.length]);

  const map = groupBy(filtered, (product) => product.category).map(([category]) => ["id", category]);

  map.unshift(["id","TODOS"])
  const categoryList = Array.from(map, ([key, value]) => {
    return {[key]: value};
  });


  //added
  const {typeTenant} = useTenant();

  ///////////add scroll menu test
  // const [items] = React.useState(getItems);
  // console.log(items)

  
  ///////////end add scroll menu test
  function handleCatChange(category) {
    setCatquery(category)
  }

  React.useEffect(() => {
    // setQuery(catquery);
    handleCategoryChange(catquery)
  }, [catquery]);

  const [width, setWidth] = React.useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  React.useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

  function handleCategoryChange(category: Product["category"]) {
    setQuery("");
    if (category === "TODOS") {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (category) {
      document
        .querySelector(`[id="${category}"]`)
        ?.scrollIntoView(true)
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        isMobile ? window.scrollTo({ top: scrolledY - 100, behavior: 'smooth' }) : window.scrollTo({ top: scrolledY - 130, behavior: 'smooth' });
      }
    }
  }


  function onChangeSearchInput(value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setQuery(value)
  }

  return {
    products: (query || catquery==="TODOS") ? productsBySearch.slice(0,getQtyProdsTypeOf(typeTenant)) : productsByCategory.slice(0,getQtyProdsTypeOf(typeTenant)),
    filters: (
      <>
        <Flex alignItems="center">
          <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10} w="100%">
            <InputLeftElement
              children={<Icon color="gray.300" name="search" />}
              color="gray.300"
              fontSize="1.2em"
              top="inherit"
            />
            <Input
              fontSize="md"
              paddingLeft={10}
              placeholder={t("filters.search")}
              value={query}
              variant="unstyled"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeSearchInput(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Box w="100%">
          <MenuScroll
            items={categoryList as []}
            catChange={handleCatChange}
            setDefault={query ? true : false}
          />
        </Box>
        {query && (
            <Text fontWeight="900" fontStyle="italic" textAlign="center">Resultados para: "{query}"</Text>
          )
        }
      </>
    ),
  };
}


export function useFilteredProductsWithCode(selector?: (product: Product) => boolean) {
  const products = useProducts();
  const t = useTranslation();
  const [query, setQuery] = React.useState("");
  const filtered = selector ? products.filter(selector) : products;
  const productsBySearch = React.useMemo(() => filterBy(filtered, {code: query, title:query, description:query}), [
    query,
    filtered,
  ]);
  const categories = groupBy(filtered, (product) => product.category).map(([category, products]): [
    Product["category"],
    number,
  ] => [category, products.length]);

  function handleCategoryChange(category: Product["category"]) {
    setQuery("");

    if (category) {
      document
        .querySelector(`[id="${category}"]`)
        ?.scrollIntoView(true)
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }
  }

  return {
    products: productsBySearch,
    filters: (
      <Flex alignItems="center">
        <Select
          flex={{base: 1, sm: "inherit"}}
          fontWeight="500"
          height="100%"
          maxWidth={{base: "100%", sm: "140px"}}
          paddingLeft={0}
          placeholder={t("common.categories")}
          value=""
          variant="unstyled"
          width="auto"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleCategoryChange(e.target.value)
          }
        >
          {categories.map(([category, count]) => (
            <option key={category} value={category}>
              {category} ({count})
            </option>
          ))}
        </Select>
        <Divider height={4} orientation="vertical" />
        <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10} w="100%">
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
            top="inherit"
          />
          <Input
            fontSize="md"
            paddingLeft={10}
            placeholder={t("filters.search")}
            value={query}
            variant="unstyled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>
    ),
  };
}

export function useFilteredProductsOriginal(selector?: (product: Product) => boolean) {
  const products = useProducts();
  const t = useTranslation();
  const [query, setQuery] = React.useState("");
  const filtered = selector ? products.filter(selector) : products;
  const productsBySearch = React.useMemo(() => filterBy(filtered, {title:query}), [
    query,
    filtered,
  ]);
  const categories = groupBy(filtered, (product) => product.category).map(([category, products]): [
    Product["category"],
    number,
  ] => [category, products.length]);

  function handleCategoryChange(category: Product["category"]) {
    setQuery("");

    if (category) {
      document
        .querySelector(`[id="${category}"]`)
        ?.scrollIntoView(true)
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }
  }

  return {
    products: productsBySearch,
    filters: (
      <Flex alignItems="center">
        <Select
          flex={{base: 1, sm: "inherit"}}
          fontWeight="500"
          height="100%"
          maxWidth={{base: "100%", sm: "140px"}}
          paddingLeft={0}
          placeholder={t("common.categories")}
          value=""
          variant="unstyled"
          width="auto"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleCategoryChange(e.target.value)
          }
        >
          {categories.map(([category, count]) => (
            <option key={category} value={category}>
              {category} ({count})
            </option>
          ))}
        </Select>
        <Divider height={4} orientation="vertical" />
        <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10} w="100%">
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
            top="inherit"
          />
          <Input
            fontSize="md"
            paddingLeft={10}
            placeholder={t("filters.search")}
            value={query}
            variant="unstyled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>
    ),
  };
}
