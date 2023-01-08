import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  Square,
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
import axios from "axios";
import CreateChatGroupModal from "../ChatGroup/CreateChatGroupModal";
import UserCard from "../../../../components/UserCard";
import { useChatContext } from "../../../../contexts/ChatContext/useChatContext";

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
  const [loggedUser, setLoggedUser] = useState();

  const { user, chats, handleChangeChats, selectedChat, handleChangeSelectedChat } = useChatContext();

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
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post(`/api/chat`, { userId }, config);
      console.log("🚀 ~ file: sideBar.tsx:67 ~ accessChat ~ data", data);
      if(!chats.find((c) => c._id === data._id))  handleChangeChats([data, ...chats])

      handleChangeSelectedChat(data)
      onClose()
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

  // const fetchChat = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     };

  //     const { data } = await axios.get(`/api/chat`, config);

  //     handleChangeChats(data);
  //   } catch (err) {
  //     toast({
  //       title: "Error Occured!",
  //       description: "Failed to Load the Search Results",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom-left",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   setLoggedUser(JSON.parse(window.localStorage.getItem("userInfo") || "{}"));
  //   console.log("Logged User", loggedUser);
  //   fetchChat()
  // }, []);

  useEffect(() => {
    const getSearchresult = async () => {
      if (!user && !searchValue) return;

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };

        const { data } = await axios.get(
          `/api/user?search=${searchValue}`,
          config
        );

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
            <FontAwesomeIcon
              cursor="pointer"
              icon={faPropIcon}
              onClick={onOpen}
              style={{ padding: "0 10px" }}
            />
          )}
        </Center>

        {/* Modal create group */}
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <CreateChatGroupModal />
        </Modal>
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
                  <UserCard
                    desc={false}
                    data={data}
                  />
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
              <Avatar
                cursor="pointer"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              >
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            <Box color="black" ps={5}>
              <Text fontWeight={600}>
              {/* {!chat.isGroupChat ? getSenderFull(loggedUser, chat.users) : ChatBox.chatName} */}
                </Text>
              <p>Nay nguoi em yeu hoi</p>
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
