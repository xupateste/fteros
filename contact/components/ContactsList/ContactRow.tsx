import React from "react";
import {IconButton, Text, Stack, Flex, Box} from "@chakra-ui/core";

import {Contact} from "../../types";

import RemoveAskModal from "./RemoveAskModal";

import {useToast} from "~/hooks/toast";
import TrashIcon from "~/ui/icons/Trash";

interface Props extends Contact {
  onEdit: (contact: Contact) => void;
  onRemove: (contact: Contact) => Promise<void>;
}

const ContactRow: React.FC<Props> = ({onEdit, onRemove, ...contact}) => {
  const salesPerson = {phone:"Tienda", sales1:"Ventas1", sales2:"Ventas2", sales3:"Ventas3", sales4:"Ventas4", sales5:"Ventas5",
                       sales6:"Ventas6", sales7:"Ventas7", sales8:"Ventas8", sales9:"Ventas9", sales10:"Ventas10",};
  const currentSales = contact.sales ? contact.sales : "phone";
  // console.log(currentSales)
	const [status, setStatus] = React.useState("init");
  const toast = useToast();
  const [isShown, setShown] = React.useState(false);

  async function handleRemove(contact: Contact) {
    setStatus("pending");

    onRemove(contact).catch(() => {
      setStatus("init");

      toast({status: "error", title: "Error", description: "No se pudo borrar el contacto"});
    });
  }

  function handleSubmitFromRemoveAskModal(event: React.FormEvent<HTMLFormElement>, contact: Contact) {
    event.stopPropagation();
    handleRemove(contact);
    setShown(false);
  }

  function handleCloseRemoveAskModal() {
    setShown(false)
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
	          <Text fontWeight="500" marginLeft={2} maxWidth={{base: '150px', md: '300px'}} color={contact.name ? "black" : "gray.400"} isTruncated>[{salesPerson[currentSales]}] {contact.name ? contact.name : "[Sin Nombre]"}</Text>
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
              // handleRemove(contact);
              setShown(true);
            }}
          />
        </Stack>
      </Box>
      <RemoveAskModal
        isShown={isShown}
        onClose={handleCloseRemoveAskModal}
        onSubmit={(event) => {handleSubmitFromRemoveAskModal(event, contact)}}
      />
    </Box>
  )
}

export default ContactRow;
