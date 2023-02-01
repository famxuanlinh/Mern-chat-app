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
} from "@chakra-ui/react";
import UserInfoModal from "@components/UserInfoModal";

const MyChats = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Box bg="#eef0f1" height="94vh" pt={100} ps={2}>
        {/* <div>Chúc mừng năm mới. Một năm mới cố gắng lên nhé.</div>
        <p>Chắc chắn làm được</p> */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus ab
        necessitatibus sint officiis, id aspernatur, ratione architecto
        similique eius vitae obcaecati itaque corporis unde quos vel optio rerum
        esse.
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
