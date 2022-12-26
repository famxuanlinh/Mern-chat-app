import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
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
      <Button
        mt={6}
        mb={4}
        w="100%"
        variant="solid"
        colorScheme="blue"
        size="sm"
      >
        Login
      </Button>
      <Button w="100%" variant="solid" colorScheme="red" size="sm" onClick={() => {
        setEmail('guest@example.com');
        setPassword('123456')
      }}>
        Get guest user credentials
      </Button>
    </div>
  );
};

export default FormLogin;
