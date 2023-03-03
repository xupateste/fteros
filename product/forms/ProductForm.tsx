import React from "react";
import {useForm, Controller, FormContext} from "react-hook-form";
import {Stack, Divider} from "@chakra-ui/core";

import {Product} from "../types";
/*import ProductVariantsInput, {
  validator as ProductVariantsInputValidator,
  info as ProductVariantsInputInfo,
} from "../inputs/ProductVariantsInput";*/
import ProductTypeInput, {info as ProductTypeInputInfo} from "../inputs/ProductTypeInput";

import Input from "~/ui/inputs/Input";
import Select from "~/ui/inputs/Select";
import Textarea from "~/ui/inputs/Textarea";
import ImageInput from "~/ui/inputs/Image";
import SwitchInput from "~/ui/inputs/Switch";
import Price from "~/ui/inputs/Price";
import FormControl from "~/ui/form/FormControl";
import BadgeColorRadio from "~/ui/inputs/BadgeColorRadio";


interface Props {
  defaultValues?: Partial<Product>;
  categories: Product["category"][];
  onSubmit: (values: Partial<Product>) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const ProductForm: React.FC<Props> = ({defaultValues, children, onSubmit, categories}) => {
  const form = useForm<Partial<Product>>({defaultValues});
  const {handleSubmit: submit, watch, errors, register, formState, setValue, control} = form;
  const values = watch();

  function handleSubmit(values: Partial<Product>) {
    const product = {...defaultValues, ...values};

    return onSubmit(product);
  }

  function setCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue("category", event.target.value);
    event.target.value = "";
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <FormContext {...form}>
        <form onSubmit={submit(handleSubmit)}>
          <Stack spacing={4}>
            <FormControl
              error={errors.image?.message}
              isInvalid={Boolean(errors.image)}
              name="image"
            >
              <Controller
                as={ImageInput}
                control={control}
                defaultValue=""
                name="image"
                quality="low"
              />
            </FormControl>
            <FormControl
              error={errors.code && "Este campo es requerido. Máximo 20 caracteres"}
              help="Código interno de tu producto"
              label="SKU"
              name="code"
            >
              <Input
                ref={register({maxLength: 20})}
                // autoFocus
                name="code"
                placeholder="90001"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.title && "Este campo es requerido"}
              help="Ej: Campera de cuero con apliques de piedras"
              label="Nombre"
              name="title"
            >
              <Input
                ref={register({required: true})}
                // autoFocus
                name="title"
                placeholder="Alicate comercial"
              />
            </FormControl>
            <FormControl
              error={errors.description && "La descripción no puede ser mayor a 1400 caracteres"}
              help="Máximo 1400 caracteres"
              label="Descripción"
              name="description"
            >
              <Textarea
                ref={register({maxLength: 1400})}
                maxLength={1400}
                name="description"
                placeholder="Uso rudo pesado."
              />
            </FormControl>
            <FormControl
              error={errors.keywords && "Las keywords no pueden ser mayor a 1400 caracteres"}
              help="Palabras adicionales que ayuden a la busqueda del producto"
              label="Keywords"
              name="keywords"
            >
              <Input
                ref={register({maxLength: 1400})}
                maxLength={1400}
                name="keywords"
                placeholder="Palabras separadas por espacios"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.type?.message}
              info={<ProductTypeInputInfo />}
              label="Tipo"
              name="type"
            >
              <ProductTypeInput
                data-test-id="type-select"
                name="type"
                register={register({required: true})}
              />
            </FormControl>
            {!["ask","variant"].includes(values.type) && (
              <Stack isInline spacing={2}>
                <FormControl
                  isRequired
                  error={errors.price && "Este campo es requerido"}
                  flex={1}
                  help="Precio principal"
                  label="Precio final"
                  name="price"
                >
                  <Price
                    ref={register({required: true})}
                    name="price"
                    placeholder="200"
                    rounded="md"
                  />
                </FormControl>
                {values.type === "promotional" && (
                  <FormControl
                    isRequired
                    error={errors.originalPrice && "Este valor es requerido"}
                    flex={1}
                    help="Valor sin promoción"
                    label="Precio original"
                    name="originalPrice"
                  >
                    <Price
                      ref={register({required: true})}
                      name="originalPrice"
                      placeholder="150"
                      rounded="md"
                    />
                  </FormControl>
                )}
              </Stack>
            )}
            <Divider />
            <Stack>
              <FormControl
                error={errors.badgeText && "Este valor es requerido"}
                flex={1}
                label="Etiqueta de Producto"
                name="badgeText"
              >
                <Input
                  ref={register({maxLength: 100})}
                  name="badgeText"
                  placeholder=""
                  rounded="md"
                />
              </FormControl>
              <FormControl
                error={errors.badgeColor && "Este valor es requerido"}
                flex={1}
                help="Texto y color de fondo para etiqueta"
                name="badgeColor"
              >
                <Controller
                  as={BadgeColorRadio}
                  control={control}
                  defaultValue="white"
                  name="badgeColor"
                  // rules={{required: true}}
                />
              </FormControl>
            </Stack>
            <Divider />
            <FormControl
              isRequired
              error={errors.category && "Este campo es requerido"}
              help="Escribe ó selecciona una categoría"
              label="Categoría"
              name="category"
            >
              <Stack isInline spacing={2}>
                <Input ref={register({required: true})} name="category" placeholder="Categoría" />
                {Boolean(categories.length) && (
                  <Select data-test-id="category-select" onChange={setCategory}>
                    <option value="">Cargar</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                )}
              </Stack>
            </FormControl>
            <FormControl error={errors.featured?.message} name="featured">
              <Controller
                as={SwitchInput}
                color="primary"
                control={control}
                defaultValue={false}
                display="block"
                label="Destacar"
                name="featured"
              />
            </FormControl>
            {/*<Divider />
            <FormControl info={<ProductVariantsInputInfo />} label="Variantes" name="options">
              <Controller
                as={ProductVariantsInput}
                control={control}
                defaultValue={[]}
                error={(errors.options as unknown) as FieldError}
                name="options"
                rules={{
                  validate: ProductVariantsInputValidator,
                }}
              />
            </FormControl>*/}
          </Stack>
        </form>
      </FormContext>
    ),
  });
};

export default ProductForm;
