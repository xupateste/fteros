import React from "react";
import {Stack, Text, IconButton, StackProps} from "@chakra-ui/core";
import styled from "@emotion/styled";

const RoundButton = styled(IconButton)`
  svg {
    width: 10px;
    height: 10px;
  }
`;

interface Props extends Omit<StackProps, "value" | "onChange"> {
  value?: number;
  max?: number;
  min?: number;
  packed?: number;
  mqo?: number;
  isMqo?: boolean;
  onChange?: (value: number) => void;
  onIncrease?: (value: number) => void;
  onDecrease?: (value: number) => void;
}

const StepperPacked: React.FC<Props> = ({
  value,
  onDecrease,
  onIncrease,
  onChange,
  min,
  max,
  mqo,
  packed,
  isMqo,
  ...props
}) => {
  const isMinDisabled = min === undefined ? false : value <= min;
  const isMaxDisabled = max === undefined ? false : value >= max;

  const getMultiplyInf = (val) => {
    return packed*Math.floor(val/packed)
  } 

  function handleDecrease(event: React.MouseEvent) {
    event.stopPropagation();

    // onDecrease && onDecrease(value - (value === 1*packed ? (0) : (1*packed)));
    // onDecrease && onDecrease((value === 1*packed) ? (mqo) : (value - 1*packed));
    onDecrease && onDecrease(((value - 1*packed) < mqo) ? (mqo) : (value - 1*packed));
    onChange && onChange(((value - 1*packed) < mqo) ? (mqo) : (value - 1*packed));
  }

  function handleIncrease(event: React.MouseEvent) {
    event.stopPropagation();

    onIncrease && onIncrease(value < mqo ? (mqo) : getMultiplyInf(value) + (1*packed));
    // onChange && onChange(value + (1*packed));
    onChange && onChange(value < mqo ? (mqo) : getMultiplyInf(value) + (1*packed));
  }

  return (
    <Stack isInline alignItems="center" rounded="lg" spacing={0} width="auto" {...props}>
      {isMqo && (<Text color="primary.500" fontSize={{base:10, sm:12}} fontWeight={900} lineHeight={1} pr={1}>Pedido<br/>mínimo</Text>)}
      {value && (
        <RoundButton
          isRound
          aria-label="restar"
          borderWidth={value ? "inherit" : 2}
          color={value ? "white" : "gray.400"}
          display="flex"
          height="24px"
          icon="minus"
          isDisabled={isMinDisabled}
          minHeight="24px"
          minWidth="24px"
          variant={value ? "solid" : "outline"}
          variantColor={value ? "primary" : "gray"}
          width="24px"
          onClick={handleDecrease}
        />
      )}
      {value && (
        <Text fontWeight={500} textAlign="center" width={10}>
          {value}
        </Text>
      )}
      <RoundButton
        isRound
        aria-label="sumar"
        borderWidth={value ? "inherit" : 2}
        color={value ? "white" : "gray.400"}
        display="flex"
        height="24px"
        icon="add"
        isDisabled={isMaxDisabled}
        minHeight="24px"
        minWidth="24px"
        variant={value ? "solid" : "outline"}
        variantColor={value ? "primary" : "gray"}
        width="24px"
        onClick={handleIncrease}
      />
    </Stack>
  );
};

export default StepperPacked;
