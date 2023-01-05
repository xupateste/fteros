import React from "react";
import {Stack, Box, Flex} from "@chakra-ui/core";
import {useTranslation} from "~/i18n/hooks";
import PlusIcon from "~/ui/icons/Plus";
import Content from "~/ui/structure/Content";
import {Contact} from "../../types";
import IconButton from "~/ui/controls/IconButton";
import {useFilteredContacts, useContactActions} from "../../hooks";
import ContactsList from "../../components/ContactsList";
import ContactDrawer from "../../components/ContactDrawer";
import NoResults from "~/ui/feedback/NoResults";

const AdminScreen: React.FC = () => {
  const t = useTranslation();
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


	return (
    <>
    	<Flex direction="column" height="100%" marginTop={4}>
        <Box flex={1}>
          <Flex alignItems="center">
            <Content>
              <Flex alignItems="center" justifyContent="space-between" paddingX={4} width="100%">
                {filters}
                <Stack isInline shouldWrapChildren marginLeft={4} spacing={2}>
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
                <NoResults>{t("admin.empty")}</NoResults>
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
