import React from "react";
import {Button, Stack, IDrawer, SimpleGrid} from "@chakra-ui/core";

import {Product} from "../types";
import PromotionForm from "../forms/PromotionForm";

import Drawer, {DrawerHeader, DrawerBody, DrawerTitle, DrawerFooter} from "~/ui/controls/Drawer";

interface Props extends Omit<IDrawer, "children"> {
  onClose: () => void;
  // categories: Product["category"][];
  // brands: Product["brand"][];
  timestamp: number;
  onSubmit: (values: Omit<Product, "id">) => void;
  onRemove: (values: Partial<Product>) => void;
  defaultValues?: Partial<Product>;
}

const PromotionDrawer: React.FC<Props> = ({onClose, defaultValues, onSubmit, onRemove, timestamp}) => {
  const isNew = Boolean(!defaultValues?.featured);
  
  return (
    <Drawer closeOnOverlayClick={false} id="promotion" onClose={onClose}>
      <DrawerHeader onClose={onClose} />
      <PromotionForm defaultValues={defaultValues} onSubmit={onSubmit} timestamp={timestamp}>
        {({form, submit, isLoading}) => (
          <>
            <DrawerBody marginBottom={4}>
              <Stack shouldWrapChildren spacing={4}>
                <DrawerTitle>{isNew ? "Agregar" : "Editar"} promoción</DrawerTitle>
                {form}
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <SimpleGrid columns={1} w="100%" spacing={2}>
                <Button
                  backgroundColor="primary.500"
                  color="white"
                  data-test-id={isNew ? `submit-new-promotion` : `submit-edit-promotion`}
                  isLoading={isLoading}
                  type="submit"
                  variantColor="primary"
                  width="100%"
                  onClick={(event) => {
                    event.stopPropagation();

                    submit();
                  }}
                >
                  {isNew ? "Agregar promoción" : "Editar promoción"}
                </Button>
                {!isNew && (
                  <Button
                    backgroundColor="white"
                    color="gray.700"
                    // data-test-id={isNew ? `submit-new-product` : `submit-edit-product`}
                    isLoading={isLoading}
                    // type="submit"
                    // variantColor="primary"
                    width="100%"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemove(defaultValues);
                    }}
                  >
                    {"Dejar de promocionar"}
                  </Button>
                )}
              </SimpleGrid>
            </DrawerFooter>
          </>
        )}
      </PromotionForm>
    </Drawer>
  );
};

export default PromotionDrawer;
