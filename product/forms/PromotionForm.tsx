import React from "react";
import {useForm, FormContext, Controller, FieldError} from "react-hook-form";
import {Stack} from "@chakra-ui/core";

import {Product} from "../types";

import Input from "~/ui/inputs/Input";
import Price from "~/ui/inputs/Price";
import FormControl from "~/ui/form/FormControl";
import SwitchInput from "~/ui/inputs/Switch";

import ProductxOptionsInput from "../inputs/ProductVariantsInput/ProductxOptionsInput";
import {xvalidator as ProductxOptionsInputValidator} from "../inputs/ProductVariantsInput"



interface Props {
  defaultValues?: Partial<Product>;
  timestamp: number;
  onSubmit: (values: Partial<Product>) => void;
  children: (xoptions: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const PromotionForm: React.FC<Props> = ({defaultValues, children, onSubmit}) => {
  const form = useForm<Partial<Product>>({defaultValues});
  const {handleSubmit: submit, watch, errors, register, formState, control} = form;
  const values = watch();

  function handleSubmit(values: Partial<Product>) {
    const product = {...defaultValues, ...values};
    return onSubmit(product);
  }

  // function setDate(days: number) {
  //   var milliseconds = Number(days) * 86400000 + Number(timestamp);
  //   var d = new Date(milliseconds);
  //   if(days > 0) {
  //     return "Expira en " + d.toLocaleDateString();
  //   } else {
  //     return "Días no validos";
  //   }
  // }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <FormContext {...form}>
        <form onSubmit={submit(handleSubmit)}>
          <Stack spacing={4}>
            {/*<FormControl
              isRequired
              error={errors.promotionDays && "La promoción debe durar al menos 1 día"}
              help="Elige cuánto tiempo tendrás este producto en promoción"
              label="Duración en días"
              name="promotionDays"
            >
              <Stack isInline spacing={2}>
                <Input
                  ref={register({
                    required: true,
                    validate: (value) => Number(value) > 0
                  })}
                  // autoFocus
                  name="promotionDays"
                  placeholder="Días"
                  // value={values.promotionDays}
                  defaultValue={values.promotionDays}
                  inputMode="numeric"
                  min={0}
                  type="number"
                  onChange={() => setValue("promotionExpireText", setDate(values.promotionDays))}
                />
                <Input
                  isReadOnly
                  ref={register({required: true})}
                  // autoFocus
                  name="promotionExpireText"
                  // value={values.promotionExpireText}
                  defaultValue={values.promotionExpireText}
                  color="black"
                  placeholder=""
                />
              </Stack>
            </FormControl>*/}
            <FormControl
              isRequired
              error={errors.promotionUnits && "Debe haber al menos 1 producto en promoción"}
              help="Cantidad de productos a promocionar"
              label="Stock en promoción"
              name="promotionUnits"
            >
              <Input
                ref={register({
                  required: true,
                  validate: (value) => Number(value) > 0
                })}
                // autoFocus
                inputMode="numeric"
                type="number"
                name="promotionUnits"
                placeholder="Unidades"
              />
            </FormControl>
            <Stack isInline spacing={2}>
              <FormControl
                isRequired
                error={errors.price && "El precio promocional debe ser mayor a cero"}
                help="Elige un precio para la promoción"
                label="Precio promocional"
                name="price"
              >
                <Price
                  ref={register({
                    required: true,
                    validate: (value) => Number(value) > 0
                  })}
                  // autoFocus
                  name="price"
                  placeholder="Precio"
                />
              </FormControl>
              <FormControl
                isRequired
                error={errors.originalPrice && "Este campo es requerido"}
                // help="Elige un precio para la promoción"
                // isReadOnly
                label="Precio anterior"
                name="originalPrice"
              >
                <Price
                  ref={register({required: true})}
                  value={values.originalPrice}
                  // autoFocus
                  name="originalPrice"
                  // placeholder="Precio"
                />
              </FormControl>
            </Stack>
            <FormControl 
                error={errors.featured?.message}
                name="wholesale"
                help="Al activar esta opcion puedes colocar precios de acuerdo a la cantidad de pedido"
                mt={4}
                mb={2}
              >
                <Controller
                  as={SwitchInput}
                  color="primary"
                  control={control}
                  defaultValue={false}
                  display="block"
                  name="wholesale"
                  label="Tengo precios al por mayor"
                />
              </FormControl>
              {values.wholesale && (
                <Stack>
                  <FormControl name="xoptions">
                    <Controller
                      as={ProductxOptionsInput}
                      control={control}
                      defaultValue={[]}
                      error={(errors.xoptions as unknown) as FieldError}
                      name="xoptions"
                      rules={{
                        validate: ProductxOptionsInputValidator,
                      }}
                    />
                  </FormControl>
                </Stack>
              )}
          </Stack>
        </form>
      </FormContext>
    ),
  });
};

export default PromotionForm;
