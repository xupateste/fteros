import React from "react";
import {Flex, Stack, Box, Link} from "@chakra-ui/core";

import {ClientTenant} from "../types";
import SettingsForm from "../forms/SettingsForm";
import {useTenant, useTenantActions} from "../hooks";
import {useTranslation} from "~/i18n/hooks";


import Button from "~/ui/controls/Button";
import Content from "~/ui/structure/Content";

const AdminScreen: React.FC = () => {
  const tenant = useTenant();
  const {update} = useTenantActions();
  const t = useTranslation();

  function handleUpdate(tenant: ClientTenant) {
    return update(tenant);
  }

  return (
    <Stack>
      <Box borderBottomWidth={1}>
        <Content>
          <Stack isInline marginX={4} overflowX="auto" paddingY={4} spacing={12}>
            <Link
              _hover={{color: "primary.500"}}
              color="gray.600"
              fontWeight={500}
              href="#basic"
              role="button"
              whiteSpace="nowrap"
            >
              {t("admin.shop.basicInformation.title")}
            </Link>
            <Link
              _hover={{color: "primary.500"}}
              color="gray.600"
              fontWeight={500}
              href="#customization"
              role="button"
            >
              {t("admin.shop.personalize.title")}
            </Link>
            <Link
              _hover={{color: "primary.500"}}
              color="gray.600"
              fontWeight={500}
              href="#social"
              role="button"
              whiteSpace="nowrap"
            >
              {t("admin.shop.socialNetworks.title")}
            </Link>
            <Link
              _hover={{color: "primary.500"}}
              color="gray.600"
              fontWeight={500}
              href="#fields"
              role="button"
              whiteSpace="nowrap"
            >
              {t("admin.shop.additionalFields.title")}
            </Link>
            {tenant.flags?.includes("mercadopago") && (
              <Link
                _hover={{color: "primary.500"}}
                color="gray.600"
                fontWeight={500}
                href="#mercadopago"
                role="button"
                whiteSpace="nowrap"
              >
                Mercado Pago
              </Link>
            )}
            <Link
              _hover={{color: "primary.500"}}
              color="gray.600"
              fontWeight={500}
              href="#advanced"
              role="button"
              whiteSpace="nowrap"
            >
              {t("admin.shop.advancedOptions.title")}
            </Link>
          </Stack>
        </Content>
      </Box>
      <Content padding={4}>
        <Box width="100%">
          <SettingsForm defaultValues={tenant} onSubmit={handleUpdate}>
            {({form, isLoading, submit}) => (
              <Flex maxWidth="480px">
                <Stack spacing={4} width="100%">
                  {form}
                  <Button
                    alignSelf="flex-end"
                    isLoading={isLoading}
                    mt={4}
                    type="submit"
                    variantColor="primary"
                    width={{base: "100%", sm: "auto"}}
                    onClick={submit}
                  >
                    {t("admin.save")}
                  </Button>
                </Stack>
              </Flex>
            )}
          </SettingsForm>
        </Box>
      </Content>
    </Stack>
  );
};

export default AdminScreen;
