import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import FormLogin from "./components/LoginForm";
import FormSignup from "./components/RegisterForm";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    console.log("🚀 ~ file: Homepage.tsx:22 ~ useEffect ~ userInfo", typeof userInfo)
    if (userInfo === "{}") {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div>
      <VStack>
        <Container
          maxW="md"
          bg="gray.50"
          boxShadow="xl"
          mt={100}
          borderRadius="md"
        >
          <Box color="gray" pb={2} as="b" fontSize="36px">
            {" "}
            Talk A Tive
          </Box>
          <Tabs pt={4} pb={4}>
            <TabList>
              <Tab w="100%">Login</Tab>
              {/* <Spacer /> */}
              <Tab w="100%">Sign Up</Tab>
            </TabList>

            <TabPanels mt={4} mb={8}>
              <TabPanel>
                <FormLogin />
              </TabPanel>
              <TabPanel>
                <FormSignup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>{" "}
      </VStack>
    </div>
  );
};

export default Homepage;
