import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import api from "@apis/api";
import users from "@apis/endpoints/users";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const toast = useToast();

  const handleClick = () => setShow(!show);

  // const handerLogIn = (e: any) => {
  //   console.log(e.target.value)
  // }

  const submitHandler = async () => {
    setLoading(true);
    if (!email && !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(true);
      return;
    }

    try {
      const data = await users.login({
        email,
        password,
      });
      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <form>
      <FormControl isRequired>
        <FormLabel>Email address </FormLabel>
        <Input
          value={email}
          type="email"
          name="email"
          size="sm"
          placeholder="Enter your email address"
          onChange={(e: any): any => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password </FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            name="password"
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
        onClick={submitHandler}
        isLoading={loading}
        type="submit"
        // onKeyDown={handerLogIn}
      >
        Login
      </Button>
      <Button
        w="100%"
        variant="solid"
        colorScheme="red"
        size="sm"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get guest user credentials
      </Button>
    </form>
  );
};

export default FormLogin;
