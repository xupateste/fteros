import React from "react";
import {Grid, StackProps, Stack} from "@chakra-ui/core";

interface Props extends StackProps {
  title?: string;
}

const ProductsCarousel: React.FC<Props> = ({children, title, ...props}) => (
  <Stack spacing={{base: 4, sm: 5}} bg="primary.50" pt={4} mb={6} {...props}>
    {/*{title && (
      <Text as="h2" fontSize={{base: "xl", sm: "2xl"}} fontWeight={500} mt={5}>
        {title}
      </Text>
    )}*/}
    <Grid
      alignItems="flex-start"
      px={4}
      // gridAutoColumns="minmax(280px,280px)"
      gridAutoColumns={{base:210, sm:280}}
      gridAutoFlow="column"
      gridGap={{base: 4, sm: 6}}
      overflowX="auto"
      overflowY="hidden"
      // paddingBottom={4}
      {...props}
    >
      {children}
    </Grid>
  </Stack>
);

export default ProductsCarousel;
