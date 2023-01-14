import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  Checkbox,
  HStack,
  Modal,
} from "@chakra-ui/react";
import { SearchResult } from "../ChatUserList/ChatUserList";
import { useChatContext } from "@contexts/ChatContext/ChatContext";
import api from "@apis/api";
import UserCard from "@components/UserCard";
import { User } from "@apis/endpoints/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// interface SelectedUser extends SearchResult {
//   isSelected?: boolean;
// }

const CreateChatGroupModal = () => {
  const { user } = useChatContext();
  const toast = useToast();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SearchResult[]>([]);

  const handleChange = (e: any): any => {
    setSearchValue(e.target.value);
  };

  // const handleCreateChatGroup = () => {};
  // && selectedUser.map(user => user._id !== e.target.value)

  const handleSelectedUser = (data: SearchResult) =>
    selectedUsers.map((user) => {
      if (user._id !== data._id) {
        selectedUsers.push(data);
        console.log("selectedUsers", selectedUsers);
      } else {
        toast({
          title: "User selected!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    });

  useEffect(() => {
    const getSearchresult = async () => {
      if (!user && !searchValue) return;

      try {
        const { data } = await api.get(`/user?search=${searchValue}`);

        setSearchResult(data);
      } catch (error: any) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }
    getSearchresult();
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const { onClose, onOpen, isOpen } = useDisclosure();
  const faPropIcon = faUserGroup as IconProp;

  const handleCloseModal = () => {
    onClose();
    setSelectedUsers([]);
  };

  return (
    <>
      <FontAwesomeIcon
        cursor="pointer"
        icon={faPropIcon}
        onClick={onOpen}
        style={{ padding: "0 10px" }}
      />
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create group</ModalHeader>
          <ModalCloseButton onClick={handleCloseModal} />
          <ModalBody>
            <Input
              variant="flushed"
              placeholder="Enter group name"
              p={4}
              mb={4}
            />
            <Text mb="8px">Add friend to group</Text>
            <Input
              value={searchValue}
              onChange={handleChange}
              placeholder="Enter name or number phone ..."
              size="sm"
              mb={2}
            />

            <HStack spacing={2} mb={2}>
              {selectedUsers.map((user) => (
                <Tag
                  key={user._id}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                  // mb={2}
                  // me={2}
                >
                  <TagLabel>{user.name}</TagLabel>
                  <TagCloseButton />
                </Tag>
              ))}
            </HStack>

            {/* <>{searchResult.map((user) => console.log(user.name))}</> */}

            {searchResult.length !== 0 ? <hr /> : null}

            <Box maxHeight={"320px"} overflowY="auto">
              {searchResult.map((data) => (
                // <Checkbox
                //   w="100%"
                //   key={data._id}
                //   _hover={{ background: "#f3f5f6" }}
                //   ps={3}
                //   // isChecked={data?.isSelected}
                //   checked
                //   value={data._id}
                //   // onChange={(e) => handleCheckedUser(e)}
                // >
                <Box
                  cursor="pointer"
                  display="flex"
                  w="100%"
                  p={2}
                  color="white"
                  ps="16px"
                  onClick={() => handleSelectedUser(data)}
                  key={data._id}
                >
                  <UserCard check desc={false} data={data} />
                </Box>
                // </Checkbox>
              ))}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button colorScheme="blue">Create group</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateChatGroupModal;
