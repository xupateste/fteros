import React from "react";
import {Button, Stack, IDrawer} from "@chakra-ui/core";

import {Contact} from "../types";
import ContactForm from "../forms/ContactForm";

import Drawer, {DrawerHeader, DrawerBody, DrawerTitle} from "~/ui/controls/Drawer";

interface Props extends Omit<IDrawer, "children"> {
  onClose: () => void;
  onSubmit: (values: Omit<Contact, "id">) => void;
  defaultValues?: Partial<Contact>;
}

const ContactDrawer: React.FC<Props> = ({defaultValues, onClose, onSubmit}) => {
  const isNew = Boolean(!defaultValues?.id);
  return (
    <Drawer closeOnOverlayClick={false} id="contact" onClose={onClose}>
      <DrawerHeader onClose={onClose} />
      <ContactForm defaultValues={defaultValues} onSubmit={onSubmit} isNew={isNew}>
        {({form, submit, isLoading}) => (
          <DrawerBody marginBottom={4}>
            <Stack shouldWrapChildren spacing={4}>
              <DrawerTitle>{isNew ? "Agregar" : "Editar"} contacto</DrawerTitle>
              {form}
              <Button
                backgroundColor="primary.500"
                color="white"
                isLoading={isLoading}
                type="submit"
                variantColor="primary"
                width="100%"
                onClick={(event) => {
                  event.stopPropagation();

                  submit();
                }}
              >
                {isNew ? "Agregar contacto" : "Editar contacto"}
              </Button>
            </Stack>
          </DrawerBody>
        )}
      </ContactForm>
    </Drawer>
  );
}

export default ContactDrawer;
