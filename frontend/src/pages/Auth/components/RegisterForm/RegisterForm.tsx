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
  import { useToast } from "@chakra-ui/react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
import api from "@apis/api";
import users from "@apis/endpoints/users";
  
  const FormSignup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState<string>();
    const [picLoading, setPicLoading] = useState<boolean>(false);
  
    let navigate = useNavigate();
  
    const toast = useToast();
  
    const handleClick = () => setShow(!show);
  
    // interface Event<T = EventTarget> {
    //   target: T;
    //   // ...
    // }
  
    const postDetails = (e: any) => {
      const pics = e.target.files[0];
      setPicLoading(true);
  
      if (pics === undefined) {
        toast({
          title: "Please select an image!",
          description: "We've created your account for you.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
  
      if (pics.type === "image/jpeg" || "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "devcodef");
        fetch("https://api.cloudinary.com/v1_1/devcodef/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data: any) => {
            setPic(data.url.toString());
            // console.log("data.url.toString()", data);
            setPicLoading(false);
          })
          .catch((err) => {
            console.log("🚀 ~ file: formSignup.tsx:65 ~ postDetails ~ err", err);
            setPicLoading(false);
          });
      } else {
        toast({
          title: "Please select an image!",
          description: "We've created your account for you.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    };
  
    const submitHandle = async () => {
      setPicLoading(true);
      if (!name || !email || !password || !confirmPassword) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
        return;
      }
  
      if (password !== confirmPassword) {
        toast({
          title: "Password do not to match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
  
      try {
        const data = await users.register({
          name,
          email,
          password,
          pic,
        })
        console.log(data);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setPicLoading(false);
        navigate("/chat");
      } catch (error: any) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
      }
    };
  
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
            onChange={postDetails}
          />
        </FormControl>
        <Button
          mt={10}
          w="100%"
          variant="solid"
          colorScheme="blue"
          size="sm"
          onClick={submitHandle}
          isLoading={picLoading}
        >
          Sign up
        </Button>
      </VStack>
    );
  };
  
  export default FormSignup;
  