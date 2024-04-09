import React from "react";
import {Stack, Text, IconButton, StackProps} from "@chakra-ui/core";

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

const StepperPackedLanding: React.FC<Props> = ({
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
    <Stack rounded="lg" isInline alignItems="center" spacing={0} mx={2} backgroundColor="primary.100" {...props}>
      {value && (
        <IconButton
          size="sm"
          width="35%"
          aria-label="restar"
          borderWidth={value ? "inherit" : 2}
          color={value ? "white" : "gray.400"}
          icon="minus"
          isDisabled={isMinDisabled}
          variant={value ? "solid" : "outline"}
          variantColor={value ? "primary" : "gray"}
          onClick={handleDecrease}
        />
      )}
      {value && (
        <Text w="30%" fontWeight={500} textAlign="center">
          {value}
        </Text>
      )}
      <IconButton
        size="sm"
        width="35%"
        aria-label="sumar"
        borderWidth={value ? "inherit" : 2}
        color={value ? "white" : "gray.400"}
        icon="add"
        isDisabled={isMaxDisabled}
        variant={value ? "solid" : "outline"}
        variantColor={value ? "primary" : "gray"}
        onClick={handleIncrease}
      />
    </Stack>
  );
};

export default StepperPackedLanding;
