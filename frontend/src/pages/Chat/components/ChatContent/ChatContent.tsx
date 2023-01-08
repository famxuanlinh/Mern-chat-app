import {
    Avatar,
    AvatarBadge,
    Box,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import UserInfoModal from "../../../../components/UserInfoModal";
  import { useEffect, useState } from "react";
  import axios from "axios";
import { useChatContext } from "../../../../contexts/ChatContext/useChatContext";
  
  const MyChats = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
      user,
      chats,
      handleChangeChats,
      selectedChat,
      handleChangeSelectedChat,
    } = useChatContext();
    const [loggedUser, setLoggedUser] = useState();
  
    const toast = useToast();
  
    const fetchChat = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        };
  
        const { data } = await axios.get(`/api/chat`, config);
  
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
      setLoggedUser(JSON.parse(window.localStorage.getItem("userInfo") || "{}"));
      console.log("Logged User", loggedUser);
      fetchChat()
    }, []);
  
    return (
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
              <Avatar
                cursor="pointer"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              >
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Account information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <UserInfoModal />
                </ModalBody>
              </ModalContent>
            </Modal>
            <Box color="black" ps={5}>
              <strong style={{ fontSize: "18px" }}>Hello hesolili</strong>
              <p style={{ fontSize: "12px" }}>Vừa truy cập</p>
            </Box>
          </Flex>
        </Box>
        <Box bg="#eef0f1" height="94vh" pt={100}>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            incidunt tempore voluptatum illum similique sit praesentium illo
            earum. Ullam maiores ex accusantium sapiente asperiores voluptatum
            nemo iusto laborum facilis provident?
          </div>
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
    );
  };
  
  export default MyChats;
  