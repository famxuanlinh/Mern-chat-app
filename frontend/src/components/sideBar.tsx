import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("");
  const handleChange = (event: any) => setValue(event.target.value);

  const faPropIcon = faUserGroup as IconProp;
  const faSearchIcon = faMagnifyingGlass as IconProp;
  return (
    <Box
      w="344px"
      h="100%"
      borderRight="1px"
      pos="fixed"
      borderColor="gray.200"
      // ps="16px"
      pt="16px"
    >
      <Flex borderBottom="1px" borderColor="gray.200" pb={4} ps="16px">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FontAwesomeIcon icon={faSearchIcon} />}
          />
          <Input type="tel" placeholder="Search" />
        </InputGroup>
        <Center p={2} onClick={onOpen}>
          <FontAwesomeIcon icon={faPropIcon} />
        </Center>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
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
                value={value}
                onChange={handleChange}
                placeholder="Enter name or number phone ..."
                size="sm"
                mb={4}
              />
              <hr />

              <Box w="100%" p={2} color="white" ps="16px">
                <Flex>
                  <Square>
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    >
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  </Square>
                  {/* <Spacer /> */}
                  <Box color="black" ps={5}>
                    <Text fontWeight={600}>Hello hesolili</Text>
                    <p>Email: helle@example.com</p>
                  </Box>
                </Flex>
              </Box>
              <Box w="100%" p={2} color="white" ps="16px">
                <Flex>
                  <Square>
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    >
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  </Square>
                  {/* <Spacer /> */}
                  <Box color="black" ps={5}>
                    <Text fontWeight={600}>Hello hesolili</Text>
                    <p>Email: helle@example.com</p>
                  </Box>
                </Flex>
              </Box>
              {/* <Lorem count={2} /> */}
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost"  mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" >Create group</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>

      <div>
        <Box w="100%" p={2} color="white" ps="16px">
          <Flex>
            <Square>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Square>
            {/* <Spacer /> */}
            <Box color="black" ps={5}>
              <Text fontWeight={600}>Hello hesolili</Text>
              <p>Email: helle@example.com</p>
            </Box>
          </Flex>
        </Box>
        <Box bg="#edf2f6" w="100%" p={2} color="white" ps="16px">
          <Flex>
            <Square>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Square>
            {/* <Spacer /> */}
            <Box color="black" ps={5}>
              <h2>Hello hesolili</h2>
              <p>Email: helle@example.com</p>
            </Box>
          </Flex>
        </Box>
      </div>

      <Box
        bg="#edf2f6"
        pos="fixed"
        w="344px"
        bottom={0}
        borderTop="1px"
        borderColor="gray.200"
      >
        <Flex p={2} ps="16px">
          <Square>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </Square>
          {/* <Spacer /> */}
          <Box color="black" ps={5}>
            <Text fontWeight={600}>Mr Fam</Text>
            <p>Test@example.com</p>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SideBar;
