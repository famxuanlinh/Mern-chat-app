import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Square,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const CreateChatGroupModal = () => {
  const { onClose } = useDisclosure();

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            variant="flushed"
            placeholder="Enter group name"
            p={4}
            mb={4}
          />
          <Text mb="8px">Add friend to group</Text>
          <Input
            // value={searchValue}
            // onChange={handleChange}
            placeholder="Enter name or number phone ..."
            size="sm"
            mb={4}
          />
          <hr />

          <Box w="100%" p={2} color="white" ps="16px">
            <Flex>
              <Square>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </Square>
              <Box color="black" ps={5}>
                <Text fontWeight={600}>Hello hesolili</Text>
                <p>Email: helle@example.com</p>
              </Box>
            </Flex>
          </Box>
          <Box w="100%" p={2} color="white" ps="16px">
            <Flex>
              <Square>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </Square>
              <Box color="black" ps={5}>
                <Text fontWeight={600}>Hello hesolili</Text>
                <p>Email: helle@example.com</p>
              </Box>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue">Create group</Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default CreateChatGroupModal;
