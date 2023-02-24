import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Center,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
  FormControl,
  useToast,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useChatContext } from "@contexts/ChatContext/useChatContext";

import UserInfoModal from "@components/UserInfoModal";
import getAvatar from "@utils/getAvatar";
import getSender from "@utils/getSender";
import { useEffect, useState, useRef } from "react";
import messagesApi, { Message } from "@apis/endpoints/messages/messagesApi";
import api from "@apis/api";
import ScrollableChat from "./ScrollableChat";
import io, { Socket } from "socket.io-client";
import { Chat } from "@apis/endpoints/chats";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Lottie from "react-lottie";
import animationData from "../../../../animations/typing.json";
import { ArrowBackIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const ENDPOINT = "http://localhost:3005";
var socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  selectedChatCompare: Chat | undefined;

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // console.log("Chat content", selectedChat);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    selectedChat,
    user,
    notification,
    handleChangeSelectedChat,
    handleNotification,
  } = useChatContext();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const { data } = await api.get(`/message/${selectedChat._id}`);

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
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

  const sendMessage = async (event: any) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat?._id);
      try {
        setNewMessage("");
        const data = await messagesApi.sendMessage({
          content: newMessage,
          chatId: selectedChat?._id,
        });
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat?._id]);

  useEffect(() => {
    socket.on("message recieved", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification?.includes(newMessageReceived)) {
          handleNotification([newMessageReceived, ...notification]);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <Box w="100%">
      {/* Header */}
      {selectedChat ? (
        <>
          <Box
            w="100%"
            p={3}
            color="white"
            pos="fixed"
            borderBottom="1px"
            borderColor="gray.200"
            bg="white"
            zIndex={99}
          >
            <Flex>
              <Center>
                <Icon
                  cursor="pointer"
                  display={{ base: "flex", md: "none" }}
                  onClick={() => handleChangeSelectedChat()}
                  fontSize="26px"
                  color="gray"
                  as={ChevronLeftIcon}
                  me={3}
                />
              </Center>
              <Box onClick={onOpen}>
                {selectedChat.isGroupChat ? (
                  <AvatarGroup size="xs" max={2}>
                    {selectedChat.users.map((user) => (
                      <Avatar key={user._id} name={user.name} src={user.pic} />
                    ))}
                  </AvatarGroup>
                ) : (
                  <Avatar
                    cursor="pointer"
                    name={getSender(selectedChat.users, user)}
                    src={getAvatar(selectedChat.users, user)}
                  >
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                )}
              </Box>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Account information</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <UserInfoModal selectedChat={selectedChat} />
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Box color="black" ps={5}>
                {selectedChat.isGroupChat ? (
                  <strong style={{ fontSize: "18px" }}>
                    {selectedChat.chatName}
                  </strong>
                ) : (
                  <strong style={{ fontSize: "18px" }}>
                    {getSender(selectedChat.users, user)}
                  </strong>
                )}

                <p style={{ fontSize: "12px" }}>Vừa truy cập</p>
              </Box>
            </Flex>
          </Box>

          {/* Body */}
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            // overflowY="hidden"
            pt="76px"
            pb="60px"
          >
            {loading ? (
              <Spinner
                size="s"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
              >
                <ScrollableChat messages={messages} />
              </Box>
            )}
          </Box>

          {/* Footer */}
          <Box
            pos="fixed"
            bottom={0}
            // borderTop="1px"
            borderColor="gray.200"
            w="100%"
            // bg="transparent"

            // overflowY="hidden"
          >
            <FormControl onKeyDown={sendMessage} isRequired>
              {typing ? (
                <>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={50}
                    style={{ marginBottom: "5px", marginLeft: 0 }}
                  />
                </>
              ) : (
                <></>
              )}
              <Input
                variant="unstyled"
                placeholder="Enter a message..."
                p={4}
                onChange={typingHandler}
                value={newMessage}
                bg="white"
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Center pt={300} fontSize={20}>
          Click on a user to start chatting
        </Center>
      )}
    </Box>
  );
};

export default ChatContent;
