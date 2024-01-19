import React from "react";
import {Grid, Stack, Text, StackProps} from "@chakra-ui/core";

interface Props extends StackProps {
  title?: string;
  layout: "landscape" | "portrait";
  products?: {
    length?: number,
  };
}

const ProductsGrid: React.FC<Props> = ({children, title, layout, products, ...props}) => (
  <Stack pb={0} spacing={{base: 2, sm: 2}} {...props}>
    {title && (
      <Stack
          isInline
          alignItems="center"
          fontSize="lg"
          fontWeight={900}
          spacing={2}
          paddingX={{base: 4, sm: 0}}
        >
        <Text
          as="h2"
          data-test-id="title"
          fontSize={{base: "xl", sm: "2xl"}}
          fontWeight={500}
          textTransform="capitalize"  
        >
          {title}
        </Text>
        <Text fontSize="xl" color="gray.500">({products.length})</Text>
      </Stack>
    )} 
    {layout === "landscape" && (
      <Grid
        alignItems="flex-start"
        px={4}
        // gridAutoColumns="minmax(280px,280px)"
        gridAutoColumns={{base:150, sm:220}}
        gridAutoFlow="column"
        // gridGap={{base: 4, sm: 6}}
        overflowX="auto"
        overflowY="hidden"
        gridGap={{base: 3, sm: 6}}
        // templateColumns={{
        //   base: "repeat(auto-fill, minmax(200px,1fr))",
        //   sm: "repeat(auto-fill, minmax(400px,1fr))",
        // }}
      >
        {children}
      </Grid>
    )}
    {layout === "portrait" && (
      <Grid
        paddingX={{base: 4, sm: 0}}
        autoRows="auto"
        gridGap={{base: 4, sm: 8}}
        templateColumns={{
          base: "repeat(auto-fill, minmax(120px,1fr))",
          sm: "repeat(auto-fill, minmax(180px,1fr))",
        }}
      >
        {children}
      </Grid>
    )}
  </Stack>
);

export default ProductsGrid;
