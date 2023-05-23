import React from "react";
import {Box} from "@chakra-ui/core";


import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function Card({
  // itemId,
  selected,
  onClick,
  title
}: {
  // itemId: string;
  selected: boolean;
  onClick: Function;
  title: string;
}) {
  const visibility = React.useContext(VisibilityContext);

  // const visible = visibility.isItemVisible(itemId);

  return (
    <Box
      onClick={() => onClick(visibility)} // NOTE: for center items
      as="button"
      display="inline-block"
      minWidth="60px"
      my={1}
      mx="5px"
      pb={{base: 1, lg:3}}
      pt={{base: 1, lg:1}}
      userSelect= "none"
      // style={{
      //   border: "1px solid",
      //   display: "inline-block",
      //   margin: "0 10px",
      //   width: "160px",
      //   userSelect: "none"
      // }}
      tabIndex={0}
      className="card"
    >
      <Box
        whiteSpace="nowrap"
        borderColor={selected ? "primary.500" : "gray.200"}
        backgroundColor= {selected ? "primary.500" : "primary.50"}
        color= {selected ? "white" : "primary.500"}
        fontWeight= {selected ? "900" : "400"}
        boxShadow= {selected ? "none" : "md"}
        paddingX={{base: 5, lg:5}}
        paddingY={{base: 1, lg:1  }}
        fontSize={{base: "sm", lg:"md"}}
        style={{
          borderWidth: "1px",
          borderRadius: "10px",
          // height: "20px"
        }}
      >
        {title}
      </Box>
      <Box
        
      />
    </Box>
  );
}
