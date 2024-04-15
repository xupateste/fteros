import React from "react";
import {Box, Flex, Modal, Button, PseudoBox, IconButton,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton, 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogOverlay,
  useDisclosure} from "@chakra-ui/core";

import CheckIcon from "~/ui/icons/Check";
import CircleIcon from "~/ui/icons/Circle";
import TrashIcon from "~/ui/icons/Trash";
// import {useToast} from "~/hooks/toast";

import {useFilteredContacts} from "~/contact/hooks";

import {useOrders, useProductActions} from "~/product/hooks";

import Content from "~/ui/structure/Content";
import {useRouter} from "next/router";
import {useTenant} from "~/tenant/hooks";
// import productApi from "~/product/api/server";


const OrdersScreen: React.FC = () => {
  const salesPerson = {phone:"Tienda", sales1:"Ventas1", sales2:"Ventas2", sales3:"Ventas3", sales4:"Ventas4", sales5:"Ventas5",
                       sales6:"Ventas6", sales7:"Ventas7", sales8:"Ventas8", sales9:"Ventas9", sales10:"Ventas10",};

  const orders = useOrders();
  const {contacts} = useFilteredContacts();
  const [isLoading, toggleLoading] = React.useState(false);
  // const [, setStatus] = React.useState("init");
  // const toast = useToast();
  const router = useRouter();
  //console.log(orders);
  const {updateorder} = useProductActions();
  const [orderkey, setOrderkey] = React.useState({});
  const tenant = useTenant();


  const { isOpen, onOpen, onClose } = useDisclosure()
  const alertDialog = useDisclosure()
  const cancelRef = React.useRef();

  const [message, setMessage] = React.useState();

  function handleOnOpenAlert(order) {
    alertDialog.onOpen();
    setOrderkey(order);
  }

  function getContactNameFromNumber(phone) {
    var contact = contacts.find((contact) => {
      return contact.phone === phone;
    })
    return (contact && !contact.deleted && contact.name) ? contact.name : "[Sin Nombre]";
  } 
  function getContactSalesFromNumber(phone) {
    var contact = contacts.find((contact) => {
      return contact.phone === phone;
    })
    return (contact && !contact.deleted && contact.sales) ? contact.sales : "phone";
  } 

  function handleRemoveOrder() {
    // setStatus("pending");
    // remorder(orderkey).catch(() => {
    //   setStatus("init");
    //   toast({status: "error", title: "Error", description: "No se pudo borrar la orden"});
    // });
    orderkey['deleted'] = true;
    updateorder(orderkey);
    alertDialog.onClose();
    // setOrderkey(null);
  }

  function dateOrder(secs) {
    var t = new Date(null); // Epoch
    t.setSeconds(secs);
    var options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    };
    return t.toLocaleDateString('es-PE', options);
  }

  function timeOrder(secs) {
    var t = new Date(null); // Epoch
    t.setSeconds(secs);
    return t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const [, setIsRefreshing] = React.useState(false);

  const refreshDatas = () => {
    router.replace(`/[slug]/admin`, `/${tenant.slug}/admin`, {shallow: false});
    setIsRefreshing(true);
  };

  React.useEffect(() => {
    setIsRefreshing(false);
  }, [orders]);

  const handleToggleCheck = (order) => {
    toggleLoading(true)
    order.checked = !order.checked;
    updateorder(order).then(() => {
      toggleLoading(false)
    });
  }

  return (
    <>
      <Flex direction="column" height="100%" marginTop={4}>
        <Box flex={1}>
          <Box textAlign="center">
            <Button background='gray.100' _hover={{ bg: '#gray.200' }} color='gray' onClick={refreshDatas}>
              Actualizar lista de pedidos
            </Button>
          </Box>
          <Content padding={4}>
            <Box as="table" width="100%">
              <Box as="tbody">
                <Box as="tr" borderBottomWidth={1} textAlign="left">
                  <Box as="th" width={10}>

                  </Box>
                  <Box as="th">
                    #PEDIDO
                  </Box>
                  <Box as="th">
                    #CONTACTO
                  </Box>
                  <Box as="th">
                    FECHA
                  </Box>
                  <Box as="th" width={5}>
                    
                  </Box>
                </Box>
                {orders.map((order) => !order.deleted && (
                  <PseudoBox as="tr" key={order.id} lineHeight={2} position="relative" borderBottom="1px" borderBottomColor="gray.200" color={order.checked ? "#cccccc" : ""}>
                    <Box as="td" width={10} onClick={() => handleToggleCheck(order)}>
                      {isLoading ? <IconButton isLoading={isLoading} size="sm" aria-label="Check" /> : order.checked ? <CheckIcon /> : <CircleIcon />}
                    </Box>
                    <Box as="td" onClick={() => {onOpen();setMessage(order.message)}} textDecoration="underline" fontWeight="bold">
                      #{order.orderId}
                    </Box>
                    <Box as="td" lineHeight={1}>
                      {order.phone} [{salesPerson[getContactSalesFromNumber(order.phone)]}] {getContactNameFromNumber(order.phone)}
                    </Box>
                    <Box as="td">
                      {dateOrder(order.createdAt)} {timeOrder(order.createdAt)}
                    </Box>
                    <Box as="td" width={5} onClick={() => order.checked ? null : handleOnOpenAlert(order)}>
                      <TrashIcon />
                    </Box>
                  </PseudoBox>
                ))}
              </Box>
            </Box>
          </Content>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {String(message).split("%0A").map((line, index)=>{
              return <Box fontWeight="bold" key={index}>{decodeURIComponent(line)}</Box>
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={alertDialog.isOpen}
        leastDestructiveRef={cancelRef}
        isCentered
        onClose={alertDialog.onClose}
      >
        <AlertDialogOverlay zIndex={8000}/>
        <AlertDialogContent zIndex={8001}>
          <AlertDialogHeader>Eliminar Pedido</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Deseas eliminar este pedido?<br/>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={alertDialog.onClose}>
              Cancelar
            </Button>
            <Button background='#E53E3E' _hover={{ bg: '#E53E3E' }} color='white' onClick={handleRemoveOrder} ml={3}>
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrdersScreen;
