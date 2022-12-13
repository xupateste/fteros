import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  Select,
  InputGroup,
  InputLeftElement,
  InputGroupProps,
  InputProps
} from "@chakra-ui/core";
import Flag from "react-world-flags";
//import { AsYouType } from "libphonenumber-js";
import { getCountryTelCode } from "~/landing/components/countries";

interface Props extends Omit<InputGroupProps, "children" | "onChange">{
  size?: "sm" | "lg" | "md";
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  value?: string;
  country?: string;
  options?: any[];
  name?: string;
  onChange: (value: Props["value"]) => void;
  placeholder?: string;
  inputProps?: InputProps;
}


const PhoneNumberInput: React.FC<Props> = React.forwardRef(
  ({ size, variant, value, country, options, name, onChange, placeholder, inputProps = {}, ...rest}, ref) => {

    //export default function PhoneNumberInput({
    let [number, setNumber] = useState(value || "");
    let [selectedCountry, setSelectedCountry] = useState(country || "");
    let [countryCode, setCountryCode] = useState(
      getCountryTelCode(country) || ""
    );

    useEffect(() => {
      setSelectedCountry(country);
      setCountryCode(getCountryTelCode(country));
    }, [country]);

    const onCountryChange = e => {
      let value = e.target.value;
      let code = getCountryTelCode(value);
      //let parsedNumber = new AsYouType().input(`${code}${number}`);

      setCountryCode(code);
      setSelectedCountry(value);
      onChange(code.replaceAll("+", "").replaceAll(" ", ""));
    };

    const onPhoneNumberChange = e => {
      let value = e.target.value;
      //let parsedNumber = new AsYouType().input(`${countryCode}${value}`);

      setNumber(value);
      //onChange(parsedNumber.replaceAll("+", "").replaceAll(" ", ""));
    };

    return (
    <InputGroup size={size} {...rest}>
      <InputLeftElement width="4rem">
        <Select
          top="0"
          left="0"
          zIndex={1}
          bottom={0}
          opacity={0}
          height="100%"
          color='transparent'
          width={24}
          position="absolute"
          value={selectedCountry}
          onChange={onCountryChange}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Select>
        <Box pl={2} width="100%" alignItems="left">
          <Flex mr="4px" width="50%" flex={1}>
            <Flag height="1rem" code={selectedCountry || ""} />
            <Text>{countryCode}</Text>
          </Flex>
        </Box>
      </InputLeftElement>
      <Input
        pl={24}
        ref={ref}
        variant={variant}
        type="tel"
        name={name}
        value={number}
        pattern="[0-9]"
        placeholder={placeholder}
        onChange={onPhoneNumberChange}
        {...inputProps}
      />
    </InputGroup>
  );
});

// PhoneNumberInput.defaultProps = {
//   options: [],
//   size: "md"
// };

export default PhoneNumberInput;

