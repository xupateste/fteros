import React from "react";
import {IDrawer, useDisclosure,
        AlertDialog, AlertDialogOverlay, AlertDialogContent,
        AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
        Button} from "@chakra-ui/core";

import {CartItem} from "../../types";

import {getCount} from "../../selectors";

import Overview from "./Overview";
import Fields from "./Fields";

import Drawer from "~/ui/controls/Drawer";
import {ClientTenant, Field} from "~/tenant/types";
import {useAnalytics} from "~/analytics/hooks";

import {Product} from "~/product/types";//added

interface Props extends Omit<IDrawer, "children"> {
  onClose: VoidFunction;
  items: CartItem[];
  fields?: ClientTenant["fields"];
  onCheckout: (fields?: Field[]) => Promise<string>;
  onDecrease: (id: CartItem["id"]) => void;
  onIncrease: (id: CartItem["id"]) => void;
  products: Product[]; //added
  onRemoveAll: () => Promise<void>;
}

const CartSummaryDrawer: React.FC<Props> = ({
  items,
  fields,
  onIncrease,
  onDecrease,
  onCheckout,
  onClose,
  products,
  onRemoveAll,
}) => {
  const [step, setStep] = React.useState("overview");
  const [waLink, setWalink] = React.useState<string>();
  // let waLink = '';
  const [argFields, setArgFields] = React.useState<Field[]>([])
  const count = getCount(items);
  const log = useAnalytics();
  //const hasNextStep = Boolean(fields?.length);
  const { isOpen, onOpen, onClose: onCloseDialog } = useDisclosure()
  const cancelRef = React.useRef();

  const handleClose = React.useCallback(() => {
    onClose();
    handleReset();
  }, [onClose]);

  function handleReset() {
    setStep("overview");
  }

  function handlePrevious() {
    setStep("overview");
  }

  async function handleCheckout() {
    log.viewFields(items);
    onCloseDialog();
    onCheckout(argFields).then((res) => {
      setWalink(res)
      // waLink = res
    }).then(() => {
      onRemoveAll()
    })
    return setStep("fields");
  }

  // async function handleCheckoutWithoutFields() {
  //   return onCheckout();
  // }

  async function handleOpenDialog(fields: Field[]) {
    setArgFields(fields);
    onOpen();
    // return onCheckout(fields);
  }

  React.useEffect(() => {
    if (!count && step === 'overview') handleClose();
  }, [count, handleClose]);

  React.useEffect(() => {
    // We want to log this only once on mount
    log.viewCart(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [log]);

  return (
    <>
      <Drawer
        id="cart"
        placement="right"
        size="md"
        onAnimationEnd={handleReset}
        onClose={handleClose}
      >
        {step === "overview" && (
          <Overview
            fields={fields}
            //hasNextStep={hasNextStep}
            items={items}
            onClose={handleClose}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            onSubmit={handleOpenDialog}
            products={products}
            //onRemoveAll={onRemoveAll}
          />
        )}
        {step === "fields" && (
          <Fields
            fields={fields}
            waLink={waLink}
            onClose={handleClose}
            onPrevious={handlePrevious}
            onSubmit={handleOpenDialog}
          />

        )}
      </Drawer>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        isCentered={true}
        onClose={onCloseDialog}
      >
        <AlertDialogOverlay zIndex={1401}>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Confirmar pedido
            </AlertDialogHeader>
            <AlertDialogBody>
              Deseas confirmar y finalizar este pedido?.
            </AlertDialogBody>
            <AlertDialogFooter justifyContent="space-between">
              <Button bg='gray' onClick={onCloseDialog}>
                Regresar
              </Button>
              <Button variantColor="primary" onClick={handleCheckout} ml={3}>
                Si, confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CartSummaryDrawer;
