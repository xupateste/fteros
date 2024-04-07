import React from "react";
import {Box, StackProps, Stack, Text, Flex} from "@chakra-ui/core";

import ContactRow from "./ContactRow";
import {Contact} from "~/contact/types";


interface Props extends StackProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onRemove: (contact: Contact) => Promise<void>;
}


const ContactsList: React.FC<Props> = ({
  contacts,
  onEdit,
  onRemove,
  ...props
}) => {
	return (
    <Stack spacing={0} {...props}>
    	<Box as="table" width="100%">
          <Box as="tbody">
            <Box as="tr" borderBottomWidth={1}>
              <Box as="th" maxWidth="300px">
                <Flex alignItems="center" marginLeft={{base: 2, md: 2}} paddingY={2}>
                  {'Contacto'}
                </Flex>
              </Box>
              <Box as="th" display={{base: "none", md: "table-cell"}} width="200px">
                <Text marginRight={{base: 4, md: 12}} textAlign="left">
                  {'Primera visita'}
                </Text>
              </Box>
              <Box as="th" display="table-cell" width="200px">
                <Text marginRight={{base: 4, md: 12}} textAlign="left">
                  {'Última visita'}
                </Text>
              </Box>
              <Box as="th" display="table-cell" width="200px">
                <Text marginRight={{base: 4, md: 12}} textAlign="left">
                  {'Visitas totales'}
                </Text>
              </Box>
            </Box>
            {contacts.map((contact) => !contact.deleted && (
              <ContactRow key={contact.id} onEdit={onEdit} onRemove={onRemove} {...contact} />
            ))}
          </Box>
        </Box>
		</Stack>
	)
}

export default ContactsList;