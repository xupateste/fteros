import React from "react";
import {Icon, Flex, InputGroup, InputLeftElement} from "@chakra-ui/core";

import ContactContext from "./context";
import {Contact} from "./types";

import Input from "~/ui/inputs/Input";
import {filterBy} from "~/selectors/filter";
import {useTranslation} from "~/i18n/hooks";

export function useContacts() {
  const {
    state: {contacts},
  } = React.useContext(ContactContext);

  return contacts;
}

export function useContactActions() {
  const {
    actions: {create, update, remove, hookcontact},
  } = React.useContext(ContactContext);

  return {create, update, remove, hookcontact};
}

export function useFilteredContacts(selector?: (contact: Contact) => boolean) {
  const contacts = useContacts();
  const t = useTranslation();
  const [query, setQuery] = React.useState("");
  const filtered = selector ? contacts.filter(selector) : contacts;
  const contactsBySearch = React.useMemo(() => filterBy(filtered, {name:query, phone:query}), [
    query,
    filtered,
  ]);

  return {
    contacts: contactsBySearch,
    filters: (
      <Flex alignItems="center">
        <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10} w="100%">
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
            top="inherit"
          />
          <Input
            fontSize="md"
            paddingLeft={10}
            placeholder={t("filters.search")}
            value={query}
            variant="unstyled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>
    ),
  };
}
