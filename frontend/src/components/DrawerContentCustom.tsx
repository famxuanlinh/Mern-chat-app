import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Square,
} from "@chakra-ui/react";
import React from "react";

const DrawerContentCustom = () => {
  return (
    <>
      <InputGroup size="md">
        <Input pr="4.5rem" type="text" placeholder="Enter users name" />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem"> Go</Button>
        </InputRightElement>
      </InputGroup>
      <Box bg="#edf2f6" w="100%" p={2} mt={4} color="white" borderRadius="8px">
        <Flex>
          <Square>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </Square>
          <Center ps={5} color="black">
            Hello hesolili
          </Center>
        </Flex>
      </Box>
      <Box bg="#edf2f6" w="100%" p={2} mt={3} color="white" borderRadius="8px">
        <Flex>
          <Square>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </Square>
          <Spacer />
          <Box color="black">
            <h2>Hello hesolili</h2>
            <p>Email: helle@example.com</p>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default DrawerContentCustom;
