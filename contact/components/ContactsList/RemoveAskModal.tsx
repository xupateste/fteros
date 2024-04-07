import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Button,
  Stack,
} from "@chakra-ui/core";

interface Props {
  isShown: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RemoveAskModal: React.FC<Props> = ({
  isShown, onClose, onSubmit
}) => {
  function handleClose() {}

  if (!isShown) return null;

  return (  
    <Modal isCentered isOpen onClose={handleClose} closeOnOverlayClick blockScrollOnMount={true}>
      <ModalOverlay backgroundColor="rgba(255,255,255,0.8)" zIndex={1400} />
      <ModalContent
        backgroundColor="transparent"
        // bottom={{base: 0, sm: "auto"}}
        boxShadow="none"
        marginY={0}
        padding={4}
        // position="absolute"
      >
        <ModalBody
          backgroundColor="primary.50"
          borderColor="primary.500"
          borderWidth={2}
          boxShadow="lg"
          padding={4}
          textAlign="center"
          rounded="lg"
        >
          Deseas eliminar este contacto? 
          <Stack pt={3}>
            <Button
              w="full"
              bg="primary.500"
              size="lg"
              color="white"
              mr={3}
              onClick={onSubmit}
              _hover={{
                bg: "primary.600",
                color: 'white'
              }}>
              <Text mr={5}>Si, eliminar</Text>
            </Button>
            <Button
              w="full"
              bg="white"
              size="lg"
              color="gray.700"
              mr={3}
              onClick={onClose}
            >
              <Text mr={5}>Cancelar</Text>
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RemoveAskModal;