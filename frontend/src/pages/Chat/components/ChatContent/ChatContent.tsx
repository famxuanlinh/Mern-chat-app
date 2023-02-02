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
} from "@chakra-ui/react";
import { useChatContext } from "@contexts/ChatContext/useChatContext";

import UserInfoModal from "@components/UserInfoModal";
import getAvatar from "@utils/getAvatar";
import getSender from "@utils/getSender";

const ChatContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, user } = useChatContext();
  console.log(selectedChat);

  // const fetchChat = async () => {
  //   try {

  //     const { data } = await api.get(`/chat`);

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

  return (
    <>
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
                    <UserInfoModal selectedChat={selectedChat}/>
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
          <Box bg="#eef0f1" height="94vh" pt={100} ps={2}>
            {/* <div>Chúc mừng năm mới. Một năm mới cố gắng lên nhé.</div>
          <p>Chắc chắn làm được</p> */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus
            ab necessitatibus sint officiis, id aspernatur, ratione architecto
            similique eius vitae obcaecati itaque corporis unde quos vel optio
            rerum esse.
          </Box>

          <Box
            pos="fixed"
            bottom={0}
            borderTop="1px"
            borderColor="gray.200"
            w="100%"
            bg="white"
          >
            <Input variant="unstyled" placeholder="Write something" p={4} />
          </Box>
        </>
      ) : (
        <Center pt={300} fontSize={20}>
          Click on a user to start chatting
        </Center>
      )}
    </>
  );
};

export default ChatContent;
