import React from "react";
import {Grid, Stack, StackProps} from "@chakra-ui/core";

interface Props extends StackProps {
  layout: "landscape" | "portrait";
}

const ProductsGrid: React.FC<Props> = ({children, layout, ...props}) => (
  <Stack pb={0} spacing={{base: 2, sm: 2}} {...props}>
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
