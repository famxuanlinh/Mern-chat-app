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
import ModalUserInfo from "./modalUserInfo";

const MyChats = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Account information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <ModalUserInfo />
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* <Spacer /> */}
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
