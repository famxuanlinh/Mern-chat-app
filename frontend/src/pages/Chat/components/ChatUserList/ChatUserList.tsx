import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import CreateChatGroupModal from "../ChatGroup/CreateChatGroupModal";
import UserCard from "@components/UserCard";
import { useChatContext } from "@contexts/ChatContext/useChatContext";
import api from "@apis/api";
import getSender from "@utils/getSender";
import { LoginUser, User } from "@apis/endpoints/users";
import getAvatar from "@utils/getAvatar";

export interface SearchResult {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

const SideBar = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  // const [loggedUser, setLoggedUser] = useState<LoginUser>();

  const {
    user,
    chats,
    handleChangeChats,
    selectedChat,
    handleChangeSelectedChat,
  } = useChatContext();

  const handleChange = (e: any): any => {
    setSearchValue(e.target.value);
  };

  const faPropIcon = faUserGroup as IconProp;
  const faSearchIcon = faMagnifyingGlass as IconProp;

  const handleOpenSearchSuggest = () => setIsSearch(true);
  const handleCloseSearchSuggest = () => {
    setIsSearch(false);
    setSearchValue("");
  };

  const accessChat = async (userId: string) => {
    // console.log("userId", userId);
    try {
      const { data } = await api.post(`/chat`, { userId });
      if (!chats.find((c) => c._id === data._id))
        handleChangeChats([data, ...chats]);

      handleChangeSelectedChat(data);
      setIsSearch(false);
    } catch (err) {
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

  const fetchChat = async () => {
    try {
      const { data } = await api.get(`/chat`);
      handleChangeChats(data);
    } catch (err) {
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

  useEffect(() => {
    fetchChat();
  }, []);

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

  return (
    <Box
      w="344px"
      h="100%"
      borderRight="1px"
      pos="fixed"
      borderColor="gray.200"
      pt="16px"
    >
      <Flex borderBottom="1px" borderColor="gray.200" pb={4} ps="16px">
        {/* Header */}
        <InputGroup onClick={handleOpenSearchSuggest}>
          <InputLeftElement
            pointerEvents="none"
            children={<FontAwesomeIcon icon={faSearchIcon} />}
          />
          <Input
            type="tel"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => handleChange(e)}
          />
        </InputGroup>
        <Center p={2}>
          {isSearch ? (
            <button onClick={handleCloseSearchSuggest}>Close</button>
          ) : (
            // <FontAwesomeIcon
            //   cursor="pointer"
            //   icon={faPropIcon}
            //   onClick={onOpen}
            //   style={{ padding: "0 10px" }}
            // />
            <CreateChatGroupModal />
          )}
        </Center>

        {/* Modal create group */}
        {/* <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
          <CreateChatGroupModal/>
        </Modal> */}
      </Flex>

      {/* Body */}
      {isSearch ? (
        <>
          {searchResult.length !== 0 ? (
            <>
              {searchResult.map((data) => (
                <Box
                  key={data._id}
                  w="100%"
                  p={2}
                  color="white"
                  ps="16px"
                  display="flex"
                  transition="0.3ms"
                  _hover={{ background: "#f3f5f6" }}
                  cursor="pointer"
                  onClick={() => accessChat(data._id)}
                >
                  <UserCard desc={false} data={data} />
                </Box>
              ))}
            </>
          ) : (
            <Center pt={90} fontSize={20}>
              Not result
            </Center>
          )}
        </>
      ) : (
        <>
          {chats.map((chat) => (
            <Box
              cursor="pointer"
              _hover={{ background: "#f3f5f6" }}
              w="100%"
              p={2}
              color="white"
              ps="16px"
              key={chat._id}
            >
              <Flex>
                {chat.isGroupChat ? (
                  <AvatarGroup size="xs" max={3}>
                    <Avatar
                      name="Ryan Florence"
                      src="https://bit.ly/ryan-florence"
                    />
                    <Avatar
                      name="Segun Adebayo"
                      src="https://bit.ly/sage-adebayo"
                    />
                    <Avatar
                      name="Kent Dodds"
                      src="https://bit.ly/kent-c-dodds"
                    />
                    <Avatar
                      name="Prosper Otemuyiwa"
                      src="https://bit.ly/prosper-baba"
                    />
                    <Avatar
                      name="Christian Nwamba"
                      src="https://bit.ly/code-beast"
                    />
                  </AvatarGroup>
                ) : (
                  <Avatar
                    cursor="pointer"
                    name="Dan Abrahmov"
                    src={getAvatar(chat.users, user)}
                  >
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                )}

                <Box color="black" ps={5}>
                  <Text fontWeight={600}>
                    {!chat.isGroupChat
                      ? getSender(chat.users, user)
                      : chat.chatName}
                  </Text>
                  <Text>{chat.chatName}</Text>
                  {/* <p>{chat.users[0].name}</p> */}
                </Box>
              </Flex>
            </Box>
          ))}
          {/* <Box
            cursor="pointer"
            _hover={{ background: "#f3f5f6" }}
            w="100%"
            p={2}
            color="white"
            ps="16px"
          >
            <Flex>
                <Avatar
                  cursor="pointer"
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                >
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              <Box color="black" ps={5}>
                <Text fontWeight={600}>Hello hesolili</Text>
                <p>Email: helle@example.com</p>
              </Box>
            </Flex>
          </Box>
          <Box
            cursor="pointer"
            _hover={{ background: "#edf2f6" }}
            w="100%"
            p={2}
            color="white"
            ps="16px"
          >
            <Flex>
              <Square>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </Square>
              <Box color="black" ps={5}>
                <h2>Hello hesolili</h2>
                <p>Email: helle@example.com</p>
              </Box>
            </Flex>
          </Box> */}
        </>
      )}

      {/* Footer */}
      <Box
        bg="#edf2f6"
        pos="fixed"
        w="344px"
        bottom={0}
        borderTop="1px"
        borderColor="gray.200"
      >
        <Flex p={2} ps="16px">
          {user ? (
            <UserCard
              data={{
                _id: user._id,
                email: user.email,
                name: user.name,
                pic: user.pic,
              }}
              modal
              btn
            />
          ) : null}
        </Flex>
      </Box>
    </Box>
  );
};

export default SideBar;
