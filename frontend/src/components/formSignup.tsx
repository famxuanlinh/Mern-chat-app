import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const FormSignup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const handleClick = () => setShow(!show);

  const postDetails = () => {};

  const submitHandle = () => {};

  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel>Name </FormLabel>
        <Input
          type="text"
          placeholder="Enter your name"
          size="sm"
          onChange={(e: any): any => setName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email address </FormLabel>
        <Input
          type="email"
          size="sm"
          placeholder="Enter your email address"
          onChange={(e: any): any => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e: any): any => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel> Confirm password </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e: any): any => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your picture </FormLabel>
        <Input
          type="file"
          p={0.5}
          accept="image/*"
          size="sm"
          onChange={() => postDetails()}
        />
      </FormControl>
      <Button mt={10} w="100%" variant="solid" colorScheme="blue" size="sm">
        Register
      </Button>
    </VStack>
  );
};

export default FormSignup;
