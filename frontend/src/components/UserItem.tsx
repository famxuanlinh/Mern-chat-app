import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
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

export interface UserInfo {
  name: string;
  pic: string;
  email: string;
  _id: string;
}

interface Props {
  data: UserInfo;
  desc?: boolean;
  modal?: boolean;
  btn?: boolean;
}

const UserItem: React.FC<Props> = ({
  data,
  desc = true,
  modal = false,
  btn = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <Avatar
        onClick={modal ? onOpen : undefined}
        cursor="pointer"
        name={data.name}
        src={data.pic}
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
      <Center>
        <Box color="black" ps={5} fontWeight={600}>
          {data.name}
          {desc ? <Text fontWeight={400}>{data.email}</Text> : null}
        </Box>
      </Center>
      {btn ? (
        <Button
          onClick={handleLogout}
          size="sm"
          m={3}
          colorScheme="blue"
          variant="outline"
        >
          Logout
        </Button>
      ) : null}
    </>
  );
};

export default UserItem;
