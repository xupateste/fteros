import React from "react";
import {useForm, FormContext} from "react-hook-form";
import {Stack} from "@chakra-ui/core";
import {Contact} from "../types";
import Input from "~/ui/inputs/Input";
import Textarea from "~/ui/inputs/Textarea";
import FormControl from "~/ui/form/FormControl";


interface Props {
  defaultValues?: Partial<Contact>;
  onSubmit: (values: Partial<Contact>) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}


const ContactForm: React.FC<Props> = ({defaultValues, children, onSubmit}) => {
  const form = useForm<Partial<Contact>>({defaultValues});
  const {handleSubmit: submit, errors, register, formState} = form;
  // const values = watch();

  function handleSubmit(values: Partial<Contact>) {
    const contact = {...defaultValues, ...values};

    return onSubmit(contact);
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
    	<FormContext {...form}>
        <form onSubmit={submit(handleSubmit)}>
          <Stack spacing={4}>
          	<FormControl
              // isDisabled
              label="WhatsApp"
              name="phone"
            >
              <Input
                ref={register({required: true})}
                name="phone"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.name && "El nombre no puede ser mayor a 70 caracteres"}
              help="Ej: Ferretería Amigos SAC"
              label="Nombre"
              name="name"
            >
              <Input
                ref={register({maxLength: 70})}
                autoFocus
                name="name"
                placeholder="..."
              />
            </FormControl>
            <FormControl
              error={errors.location && "La dirección / ubicación no puede ser mayor a 1400 caracteres"}
              help="Máximo 1400 caracteres"
              label="Dirección / Ubicación"
              name="location"
            >
              <Textarea
                ref={register({maxLength: 1400})}
                maxLength={1400}
                name="location"
                placeholder="Av. San Luis 7330 - Ate, Lima"
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
                placeholder="64GB mem. Silver."
              />
            </FormControl>
          </Stack>
    		</form>
    	</FormContext>
    ),
  });
};

export default ContactForm;
