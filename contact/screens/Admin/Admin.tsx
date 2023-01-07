import React from "react";
import {Stack, Box, Flex, Button} from "@chakra-ui/core";
import {useTranslation} from "~/i18n/hooks";
import PlusIcon from "~/ui/icons/Plus";
import Content from "~/ui/structure/Content";
import {Contact} from "../../types";
import IconButton from "~/ui/controls/IconButton";
import {useFilteredContacts, useContactActions} from "../../hooks";
import ContactsList from "../../components/ContactsList";
import ContactDrawer from "../../components/ContactDrawer";
import NoResults from "~/ui/feedback/NoResults";
import {useRouter} from "next/router";
import {useTenant} from "~/tenant/hooks";

const AdminScreen: React.FC = () => {
  const t = useTranslation();
  const router = useRouter();
  const tenant = useTenant();

  const {contacts, filters} = useFilteredContacts();
  const {update, remove, create} = useContactActions();
  const [selected, setSelected] = React.useState< Partial<Contact> | undefined >(undefined);

  async function handleSubmit(contact: Contact) {
    if (contact.id) {
      await update(contact);
    } else {
      await create(contact);
    }

    closeContactDrawer();
  }

  function onCreate() {
    setSelected({
    });
  }

  function onContactEdit(contact: Contact) {
    setSelected(contact);
  }

  function closeContactDrawer() {
    setSelected(undefined);
  }

  const [, setIsRefreshing] = React.useState(false);

  const refreshDatas = () => {
    router.replace(`/[slug]/admin`, `/${tenant.slug}/admin`, {shallow: false});
    setIsRefreshing(true);
  };

  React.useEffect(() => {
    setIsRefreshing(false);
  }, [contacts]);

	return (
    <>
    	<Flex direction="column" height="100%" marginTop={4}>
        <Box flex={1}>
          <Flex alignItems="center">
            <Content>
              <Flex alignItems="center" justifyContent="space-between" paddingX={4} width="100%">
                {filters}
                <Stack isInline shouldWrapChildren marginLeft={4} spacing={2}>
                  <Button background='gray.100' _hover={{ bg: '#gray.200' }} color='gray' onClick={refreshDatas}>
                    Actualizar lista
                  </Button>
                  <IconButton
                    isCollapsable
                    data-test-id="add-product"
                    leftIcon={PlusIcon}
                    size="md"
                    variantColor="primary"
                    onClick={onCreate}
                  >
                    {t("common.add")}
                  </IconButton>
                </Stack>
              </Flex>
            </Content>
          </Flex>
          <Content padding={4}>
            <Box width="100%">
              {contacts.length ? (
                <Stack spacing={6}>
                  <ContactsList
                    contacts={contacts}
                    width="100%"
                    onEdit={onContactEdit}
                    onRemove={remove}
                  />
                </Stack>
              ) : (
                <NoResults>{'No se encontraron contactos'}</NoResults>
              )}
            </Box>
          </Content>
        </Box>
      </Flex>
      {Boolean(selected) && (
        <ContactDrawer
          defaultValues={selected}
          onClose={closeContactDrawer}
          onSubmit={handleSubmit}
        />
      )}
		</>
	)

}

export default AdminScreen;
