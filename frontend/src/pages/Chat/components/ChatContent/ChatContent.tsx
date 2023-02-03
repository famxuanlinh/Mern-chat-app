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
} from "@chakra-ui/react";
import { useChatContext } from "@contexts/ChatContext/useChatContext";

import UserInfoModal from "@components/UserInfoModal";
import getAvatar from "@utils/getAvatar";
import getSender from "@utils/getSender";
import { useEffect, useState } from "react";
import messagesApi, { Message } from "@apis/endpoints/messages/messagesApi";
import api from "@apis/api";
import ScrollableChat from "./ScrollableChat";

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, user } = useChatContext();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const { data } = await api.get(`/message/${selectedChat._id}`);

      setMessages(data);
      setLoading(false);
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

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (event: any) => {
    if (event.key === "Enter" && newMessage) {
      // console.log("Send message");

      try {
        const data = await messagesApi.sendMessage({
          content: newMessage,
          chatId: selectedChat?._id,
        });
        // console.log("data", data);
        setNewMessage("");
        setMessages([data, ...messages]);
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

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    // Typing Indicator Logic
  };

  return (
    <Box ps="344px" w="100%">
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
            zIndex={999}
          >
            <Flex>
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
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            pt='70px'
            pb='60px'
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
                style={
                  {
                    // display: "flex",
                    // flexDirection: "column",
                    // overflowY: "scroll",
                    // scrollbarWidth: "none",
                  }
                }
                mb="140px"
              >
                <ScrollableChat messages={messages} />
              </Box>
            )}
          </Box>

          {/* Footer */}
          <Box
            pos="fixed"
            bottom={0}
            borderTop="1px"
            borderColor="gray.200"
            w="100%"
            bg="white"
          >
            <FormControl onKeyDown={sendMessage} isRequired>
              <Input
                variant="unstyled"
                placeholder="Enter a message..."
                p={4}
                onChange={typingHandler}
                value={newMessage}
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
