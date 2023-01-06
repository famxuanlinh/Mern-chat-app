import React, { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import MainUser from "./mainUser";
import { useChatContext } from "../Context/ChatProvider";
import axios from "axios";

interface SearchResult {
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
  const [searchresult, setSearchresult] = useState<SearchResult[]>([]);
  const { user } = useChatContext();
  console.log("searchresult", searchresult);

  const handleChange = (e: any): any => {
    setSearchValue(e.target.value);
    // console.log("searchValue", searchValue);
  };

  const faPropIcon = faUserGroup as IconProp;
  const faSearchIcon = faMagnifyingGlass as IconProp;

  const handleOpenSearchSuggest = () => setIsSearch(true);
  const handleCloseSearchSuggest = () => setIsSearch(false);

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

        setSearchresult(data);
        console.log("searchresult", searchresult);
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
      setSearchresult([]);
      return;
    }
    getSearchresult();
  }, [searchValue]);// eslint-disable-line react-hooks/exhaustive-deps

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
              icon={faPropIcon}
              onClick={onOpen}
              style={{ padding: "0 10px" }}
            />
          )}
        </Center>

        {/* Modal create group */}
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
                value={searchValue}
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
        </Modal>
      </Flex>

      

      {/* Body */}
      {isSearch ? (
        <>
          {searchresult.length !== 0 ? (
            <>
              {searchresult.map((item: any) => (
                <Box
                  key={item._id}
                  w="100%"
                  p={2}
                  color="white"
                  ps="16px"
                  display="flex"
                >
                  <Avatar name="Dan Abrahmov" src={item.pic}>
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                  <Center>
                    <Text color="black" ps={5} fontWeight={600}>
                      {item.name}
                    </Text>
                  </Center>
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
          <Box bg="#edf2f6" w="100%" p={2} color="white" ps="16px">
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
          </Box>
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
          <MainUser/>
        </Flex>
      </Box>
    </Box>
  );
};

export default SideBar;
