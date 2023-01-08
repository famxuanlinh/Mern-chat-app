import {
    Avatar,
    Box,
    Button,
    Center,
    Grid,
    GridItem,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tr,
  } from "@chakra-ui/react";
  import React from "react";
import { useChatContext } from "../../contexts/ChatContext/useChatContext";
  
  const ModalUserInfo = () => {
    const { user } = useChatContext();
  
    return (
      <>
        <Box>
          {/* <Center> */}
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem w="100%" />
            <GridItem w="100%">
              <Center>
                <Avatar
                  size="xl"
                  name="Dan Abrahmov"
                  src={user?.pic}
                ></Avatar>
              </Center>
              <Center>
                <Text pt={3} pb={3} fontWeight={600}>{user?.name}</Text>
              </Center>
              <Center>
                {" "}
                <Button colorScheme="gray">Message</Button>
              </Center>
            </GridItem>
            <GridItem w="100%" />
          </Grid>
  
          {/* </Center> */}
        </Box>
        <Box p={4}>
          <Text fontWeight={600}>Information</Text>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td p={0} color='gray.600'>Bio</Td>
                  <Td p={2}>Read book</Td>
                </Tr>
                <Tr>
                  <Td p={0} color='gray.600'>Number phone</Td>
                  <Td p={2}>0999999999</Td>
                </Tr>
                <Tr>
                  <Td p={0} color='gray.600'>Sex</Td>
                  <Td p={2}>Male</Td>
                </Tr>
                <Tr>
                  <Td p={0} color='gray.600'>Birthday</Td>
                  <Td p={2}>01/01/97</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };
  
  export default ModalUserInfo;
  