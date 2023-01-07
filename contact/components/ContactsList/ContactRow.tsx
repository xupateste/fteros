import React from "react";
import {IconButton, Text, Stack, Flex, Box} from "@chakra-ui/core";

import {Contact} from "../../types";


import {useToast} from "~/hooks/toast";
import TrashIcon from "~/ui/icons/Trash";

interface Props extends Contact {
  onEdit: (contact: Contact) => void;
  onRemove: (contact: Contact["id"]) => Promise<void>;
}

const ContactRow: React.FC<Props> = ({onEdit, onRemove, ...contact}) => {
	const [status, setStatus] = React.useState("init");
  const toast = useToast();

  async function handleRemove(contact: Contact["id"]) {
    setStatus("pending");

    onRemove(contact).catch(() => {
      setStatus("init");

      toast({status: "error", title: "Error", description: "No se pudo borrar el contacto"});
    });
  }

  function dateContact(secs) {
    var t = new Date(null); // Epoch
    t.setSeconds(secs);
    var options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: '2-digit', minute: '2-digit'
    };
    return t.toLocaleDateString('es-PE', options);
  }

  function isNewContact(secs) {
    var t = new Date(null); // Epoch
    t.setSeconds(secs);
    var Now = new Date(Date.now());
    if (t < Now){
      return dateContact(secs);
    } else {
      return '-';
    }
  }
  
  return (
  	<Box
      as="tr"
      borderBottomWidth={1}
      borderTopColor="gray.300"
      cursor="pointer"
      onClick={() => onEdit(contact)}
    >
      <Box as="td" maxWidth={{base: '150px', md: '300px'}}>
	    	<Flex alignItems="center" marginRight={{base: 4, md: 12}} paddingY={2}>
	        <Box flex={1} isTruncated>
	          <Text fontWeight="900" marginLeft={2} maxWidth={{base: '150px', md: '300px'}} isTruncated>{contact.phone ? contact.phone : ""}</Text>
	          <Text fontWeight="500" marginLeft={2} maxWidth={{base: '150px', md: '300px'}} color={contact.name ? "black" : "gray.300"} isTruncated>{contact.name ? contact.name : "[Sin Nombre]"}</Text>
	        </Box>
	      </Flex>
      </Box>
      <Box as="td" display={{base: "none", md: "table-cell"}} width="200px">
        <Text marginRight={{base: 4, md: 12}} textAlign="left">
          {dateContact(contact.createdAt)}
        </Text>
      </Box>
      <Box as="td" display="table-cell" width="200px">
        <Text marginRight={{base: 4, md: 12}} textAlign="left">
          {isNewContact(contact.updatedAt)}
        </Text>
      </Box>
      <Box as="td" display="table-cell" width="200px">
        <Text marginRight={{base: 4, md: 12}} textAlign="left">
          {contact.visits} visitas
        </Text>
      </Box>
      <Box as="td">
        <Stack isInline justifyContent="flex-end" spacing={1}>
          <IconButton
            _hover={{color: "red.500", opacity: 1}}
            alignSelf="flex-end"
            aria-label="Borrar contacto"
            icon={TrashIcon}
            isLoading={status === "pending"}
            opacity={0.5}
            size="md"
            variant="ghost"
            onClick={(event) => {
              event.stopPropagation();

              handleRemove(contact.id);
            }}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default ContactRow;
