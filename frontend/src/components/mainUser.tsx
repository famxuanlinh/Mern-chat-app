import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalUserInfo from "./modalUserInfo";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../Context/ChatProvider";

const MainUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useChatContext();


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
        <Avatar
          onClick={onOpen}
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        >
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Account information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ModalUserInfo />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box color="black" ps={5}>
          <Text fontWeight={600}>Mr Fam</Text>
          <p>Test@example.com</p>
        </Box>
        <Button
          onClick={handleLogout}
          size="sm"
          m={3}
          colorScheme="blue"
          variant="outline"
        >
          Logout
        </Button>
    </>
  );
};

export default MainUser;
