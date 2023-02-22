import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import CreateChatGroupModal from "../ChatGroup/CreateChatGroupModal";
import UserCard from "@components/UserCard";
import { useChatContext } from "@contexts/ChatContext/useChatContext";
import api from "@apis/api";
import getSender from "@utils/getSender";
import getAvatar from "@utils/getAvatar";

export interface SearchResult {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

const SideBar = () => {
  const toast = useToast();
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const faSearchIcon = faMagnifyingGlass as IconProp;

  const { user, selectedChat, chatsContent, handleChangeChats, handleChangeSelectedChat } =
    useChatContext();

  const handleChange = (e: any): any => {
    setSearchValue(e.target.value);
  };

  const handleOpenSearchSuggest = () => setIsSearch(true);

  const handleCloseSearchSuggest = () => {
    setIsSearch(false);
    setSearchValue("");
  };

  const accessChat = async (userId: string) => {
    try {
      const { data } = await api.post(`/chat`, { userId });
      if (!chatsContent.find((c) => c._id === data._id))
        handleChangeChats([data, ...chatsContent]);

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
      minWidth="344px"
      h="100%"
      borderRight="1px"
      pos="fixed"
      // display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      // w={{ base: "100%", md: "31%" }}
      // flexDir="column"
      borderColor="gray.200"
    >
      <Box 
      // w="344px" 
      pt="8px">
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
      </Box>
      <Flex borderBottom="1px" borderColor="gray.200" pt={1} pb={2} ps="16px">
        <InputGroup
          borderRadius="50%"
          bg="#f0f2f5"
          onClick={handleOpenSearchSuggest}
          p={0}
        >
          <InputLeftElement
            pointerEvents="none"
            children={<FontAwesomeIcon icon={faSearchIcon} />}
          />
          <Input
            borderRadius="50px"
            type="tel"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => handleChange(e)}
          />
        </InputGroup>
        <Center p={2}>
          {isSearch && (
            <button onClick={handleCloseSearchSuggest}>Close</button>
          )}
        </Center>
      </Flex>

      {/* Body */}
      {isSearch ? (
        <>
          {searchResult.length !== 0 ? (
            <Box maxHeight={"90%"} minHeight={"50%"} overflowY="auto">
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
            </Box>
          ) : (
            <Center pt={90} fontSize={20}>
              Not result
            </Center>
          )}
        </>
      ) : (
        <Box maxHeight={"85%"} minHeight={"50%"} overflowY="auto">
          {chatsContent.map((chat) => (
            <Box
              cursor="pointer"
              _hover={{ background: "#f3f5f6" }}
              w="100%"
              p={2}
              color="white"
              ps="16px"
              key={chat._id}
              onClick={() => handleChangeSelectedChat(chat)}
            >
              <Flex>
                {chat.isGroupChat ? (
                  <AvatarGroup size="xs" max={2}>
                    {chat.users.map((user) => (
                      <Avatar key={user._id} name={user.name} src={user.pic} />
                    ))}
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
        </Box>
      )}
    </Box>
  );
};

export default SideBar;
