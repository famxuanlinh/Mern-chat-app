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
  Modal,
  Wrap,
  WrapItem,
  Flex,
} from "@chakra-ui/react";
import { SearchResult } from "../ChatUserList/ChatUserList";
import { useChatContext } from "@contexts/ChatContext/ChatContext";
import api from "@apis/api";
import UserCard from "@components/UserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Empty from "./Empty";
import chats from "@apis/endpoints/chats";

const CreateChatGroupModal = () => {
  const { user, handleChangeChats, chatsContent } = useChatContext();
  const toast = useToast();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SearchResult[]>([]);
  const [groupChatName, setGroupChatName] = useState("");
  const { onClose, onOpen, isOpen } = useDisclosure();
  const faPropIcon = faUserGroup as IconProp;

  const handleChange = (e: any): any => {
    setSearchValue(e.target.value);
  };

  const handleSelectedUser = (data: SearchResult) => {
    if (selectedUsers.includes(data)) {
      toast({
        title: "User added",
        description: "User added successfully",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    setSelectedUsers((prev) => [...prev, data]);
  };

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

  const handleCloseModal = () => {
    onClose();
    setSelectedUsers([]);
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields1",
        description: "Please fill all the fields1",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    // console.log(JSON.stringify(selectedUsers.map((user) => user._id)));

    try {
      const data = await chats.create({
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((user) => user._id)),
      });
      // console.log(data)
      handleChangeChats([data, ...chatsContent]);
      setSelectedUsers([]);
      setSearchValue("");
      onClose();

      toast({
        title: "New group chat created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error: any) {
      toast({
        title: "Failed to create the chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleRemoveSelectedUser = (data: SearchResult) => {
    const newSelectedUsers = selectedUsers.filter(
      (user) => user._id !== data._id
    );
    setSelectedUsers(newSelectedUsers);
  };

  return (
    <>
      <Flex alignItems="center" bg="#f5f5f5" borderRadius='50%'>
        <FontAwesomeIcon
          cursor="pointer"
          icon={faPropIcon}
          onClick={onOpen}
          style={{ padding: "0 10px" }}
          fontSize="16px"
        />
      </Flex>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"520px"}>
          <ModalHeader>Create group</ModalHeader>
          <ModalCloseButton onClick={handleCloseModal} />
          <ModalBody>
            <Input
              variant="flushed"
              placeholder="Enter group name"
              p={4}
              mb={4}
              // value={groupChatName}
              onChange={(e: any) => setGroupChatName(e.target.value)}
            />
            <Text mb="8px">Add friend to group</Text>
            <Input
              value={searchValue}
              onChange={handleChange}
              placeholder="Enter name or number phone ..."
              size="sm"
              mb={2}
            />

            <Wrap spacing={2} mb={2}>
              {selectedUsers.map((user) => (
                <WrapItem key={user._id}>
                  <Tag
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                  >
                    <TagLabel>{user.name}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemoveSelectedUser(user)}
                    />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>

            {/* <>{searchResult.map((user) => console.log(user.name))}</> */}

            {searchResult.length !== 0 ? <hr /> : null}

            <Box maxHeight={"220px"} minHeight={"140px"} overflowY="auto">
              {searchResult.length ? (
                searchResult.map((data) => (
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
                ))
              ) : (
                <Empty />
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateChatGroupModal;
