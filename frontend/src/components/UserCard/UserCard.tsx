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
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import UserInfoModal from "../UserInfoModal";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "@contexts/ChatContext/ChatContext";
import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  InfoOutlineIcon,
  RepeatIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import CreateChatGroupModal from "@pages/Chat/components/ChatGroup/CreateChatGroupModal";

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
  check?: boolean;
}

const UserCard: React.FC<Props> = ({
  data,
  desc = true,
  modal = false,
  btn = false,
  check = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/auth");
  };

  return (
    <>
      <Flex
        ps="16px"
        pt={1}
        pb={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Avatar
          onClick={modal ? onOpen : undefined}
          cursor="pointer"
          name={data.name}
          src={data.pic}
          // size={btn ? "sm" : "md"}
        >
          {/* <AvatarBadge boxSize="1.25em" bg="green.500" /> */}
        </Avatar>
        {btn && (
          <Flex>
            <CreateChatGroupModal />
            <Menu>
              <MenuButton
                bg="#f5f5f5"
                borderRadius="50%"
                me="16px"
                ms="8px"
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                // bg="white"
                fontSize="18px"
              />
              <MenuList>
                <MenuItem icon={<AddIcon />}>New Message</MenuItem>
                <MenuItem icon={<InfoOutlineIcon />}>Infomation</MenuItem>
                <MenuItem icon={<SettingsIcon />}>Setting</MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  icon={<EditIcon color="white" />}
                >
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* <UserInfoModal  /> */}</ModalBody>
        </ModalContent>
      </Modal>

      {!btn && (
        <Center>
          <Box color="black" ps={5} fontWeight={600}>
            {data.name}
            {desc ? <Text fontWeight={400}>{data.email}</Text> : null}
          </Box>
        </Center>
      )}
    </>
  );
};

export default UserCard;
