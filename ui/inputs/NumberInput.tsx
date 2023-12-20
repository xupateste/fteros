import React from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputProps} from "@chakra-ui/core";

const InputNumber: React.FC<InputProps> = React.forwardRef((props, ref) => (
  // <NumberInput focusBorderColor="primary.300" {...props}>
  <NumberInput>
    <NumberInputField min={0} ref={ref} variant="filled" pl={2} {...props} />
    <NumberInputStepper mr={2}>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
));

export default InputNumber;

