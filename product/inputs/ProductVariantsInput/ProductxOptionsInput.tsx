import React from "react";
import {Stack, Divider, CloseButton, Flex, Box, StackProps, Text, Button} from "@chakra-ui/core";
import produce from "immer";

import {xOption} from "../../types";
import {FieldError} from "react-hook-form";

import {getxOption} from "./constants";

import Input from "~/ui/inputs/Input";
import FormControl from "~/ui/form/FormControl";
import PlusIcon from "~/ui/icons/Plus";
import IconButton from "~/ui/controls/IconButton";
import Price from "~/ui/inputs/Price";

interface Props extends Omit<StackProps, "onChange"> {
  // index: number;
  error?: FieldError;

  value?: Partial<xOption[]>;
  onChange: (option: Partial<xOption[]>) => void;
}

const ProductxOptionsInput: React.FC<Props> = ({error: _error, value = [], onChange, ...props}) => {
  // const error = React.useMemo(() => {
  //   if (!_error) return null;

  //   const [index, message] = _error.message.split("|");

  //   return {
  //     type: _error.type,
  //     index: Number(index),
  //     message,
  //   };
  // }, [_error]);

  const error = React.useMemo(() => {
    if (!_error) return null;

    const [index, type, message] = (_error.message as string).split("|");

    return {index: Number(index), type, message};
  }, [_error]);

  if (!value.length) {value.push(getxOption());}

  function handleChange(subindex, prop, newValue) {
    onChange(
      produce(value, (value) => {
        value[subindex][prop] = newValue;
      }),
    );
  }

  function handleAdd() {
    onChange(
      produce(value, (value) => {
        value.push(getxOption());
      }),
    );
  }

  function handleRemove(subindex) {
    onChange(
      produce(value, (value) => {
        value.splice(subindex, 1);
      }),
    );
  }

  return (
    <Stack spacing={0} pb={3} {...props}>
      <Stack spacing={0}>
        {/*{value.length && (
          <FormLabel fontSize={{base: "sm", sm: "md"}} fontWeight={500} marginBottom={0}>
            Opciones
          </FormLabel>
        )}*/}
        <Stack isInline spacing={0}>
          <Box w="55%">
            <Box fontSize="sm" fontWeight="900">Cantidad</Box>
              <Stack isInline spacing={0}>
                <Box w="45%" fontSize="xs">Desde</Box>
                <Box w="10%" fontSize="xs"></Box>
                <Box w="45%" fontSize="xs">Hasta</Box>
              </Stack>
            </Box>
          <Box w="45%" fontSize="sm" fontWeight="900" my="auto" pl={4}>Precio por producto</Box>
        </Stack>
        {value.map((option, subindex, elements) => {
          // const optionError = error?.index === subindex ? error : null;
          const optionError = error?.index === subindex ? error : null;
          const next = elements[subindex+1]
          const prev = elements[subindex-1]
          return (
            <Stack key={option.id} isInline spacing={0} pb={2}>
              <Box w="55%">
                <Stack isInline spacing={0}>
                  <Box w="100%">
                    <FormControl
                      isRequired
                      error={
                        (optionError?.type === "optionsQuantity" && optionError.message) ||
                        ((prev ? (Number(prev.quantity) >= Number(option.quantity) ? true : false) : false) && "La cantidad debe ser mayor a la fila anterior")
                      }
                      width="100%"
                    >
                      <Stack isInline spacing={0}>
                        <Input
                          w="45%"
                          placeholder="Cant."
                          inputMode="numeric"
                          type="number"
                          roundedRight={0}
                          value={option.quantity ? option.quantity : ''}
                          onChange={(event) => handleChange(subindex, "quantity", event.target.value)}
                        />
                        <Button w="10%" isDisabled>
                          -
                        </Button>
                        <Button isDisabled w="45%" borderRadius='md' bg={next ? 'gray.100' : 'white'} color="gray.500" fontWeight="500" textAlign="left" pl={3}>
                          <Text fontSize="md">
                            {next ? (Number(next.quantity) > 1 ? (Number(next.quantity) - 1) : '') : 'A más'}
                          </Text>
                        </Button>
                      </Stack>
                    </FormControl>
                  </Box>
                </Stack>
              </Box> 
              <Box w="45%" pl={4}>
                <Stack isInline spacing={0}>
                  <Box w="auto">
                    <FormControl
                      isRequired
                      error={
                              optionError?.type === "optionsPrice" && optionError.message
                              // option?.price <= 0 && "El precio debe ser mayor a 0"
                            }
                      flexShrink={2}
                      width="100%"
                    >
                      <Price
                        placeholder="Precio"
                        // borderColor={optionError ? "red.500" : "transparent"}
                        // borderWidth={optionError ? 2 : 0}
                        rounded={0}
                        value={option.price}
                        onChange={(event) =>
                          handleChange(
                            subindex,
                            "price",
                            event.target.value ? Number(event.target.value) : "",
                          )
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box w="10" d={value.length > 1 ? 'block' : 'none'}>
                    <Flex backgroundColor="gray.100" roundedRight="md">
                      <Divider
                        borderColor="gray.400"
                        height={6}
                        marginX={0}
                        marginY={2}
                        orientation="vertical"
                        style={{marginLeft: "-1px"}}
                      />
                      <CloseButton
                        aria-label="Borrar sub opción"
                        height={10}
                        roundedLeft={0}
                        width={10}
                        onClick={() => handleRemove(subindex)}
                      />
                    </Flex>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          )})}

        {/*<Stack spacing={2}>
          {value.map((option, subindex) => {
            const optionError = error?.index === subindex ? error : null;

            return (
              <Stack key={option.id} spacing={0}>

                <Stack isInline alignItems="flex-start" spacing={0}>
                  <FormControl
                    error={optionError?.type === "optionsTitle" && optionError.message}
                    width="100%"
                  >
                    <Input
                      placeholder="Queso cheddar"
                      roundedRight={0}
                      value={option.title}
                      onChange={(event) => handleChange(subindex, "title", event.target.value)}
                    />
                  </FormControl>
                  <Divider
                    borderColor="gray.400"
                    height={6}
                    marginX={0}
                    marginY={2}
                    orientation="vertical"
                    style={{marginLeft: "-1px"}}
                  />
                  <FormControl
                    error={optionError?.type === "optionsPrice" && optionError.message}
                    flexShrink={2}
                    width="100%"
                  >
                    <Price
                      placeholder="Precio"
                      rounded={0}
                      value={option.price}
                      onChange={(event) =>
                        handleChange(
                          subindex,
                          "price",
                          event.target.value ? Number(event.target.value) : "",
                        )
                      }
                    />
                  </FormControl>
                  {value.length > 1 && (
                    <Flex backgroundColor="gray.100" roundedRight="md">
                      <Divider
                        borderColor="gray.400"
                        height={6}
                        marginX={0}
                        marginY={2}
                        orientation="vertical"
                        style={{marginLeft: "-1px"}}
                      />
                      <CloseButton
                        aria-label="Borrar sub opción"
                        height={10}
                        roundedLeft={0}
                        width={10}
                        onClick={() => handleRemove(subindex)}
                      />
                    </Flex>
                  )}
                </Stack>
              </Stack>
            );
          })}
        </Stack>*/}
      </Stack>
      <IconButton
        fontWeight="normal"
        color="gray.600"
        justifyContent="space-between"
        isDisabled={value.length > 2 ? true : false}
        rightIcon={PlusIcon}
        onClick={handleAdd}
      >
        Agregar otra fila precio
      </IconButton>
    </Stack>
  );
};

export default ProductxOptionsInput;
