import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
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
import { Chat } from "@apis/endpoints/chats";
import { useChatContext } from "@contexts/ChatContext/useChatContext";
import getSender from "@utils/getSender";
import getAvatar from "@utils/getAvatar";

interface Props {
  selectedChat: Chat;
}

const UserInfoModal: React.FC<Props> = ({ selectedChat }) => {
  const { user } = useChatContext();

  return (
    <>
      <Box>
        {/* <Center> */}
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem w="100%" />
          <GridItem w="100%">
            <Center>
              {selectedChat.isGroupChat ? (
                <AvatarGroup size="xs" max={2}>
                  {selectedChat.users.map((user) => (
                    <Avatar key={user._id} name={user.name} src={user.pic} />
                  ))}
                </AvatarGroup>
              ) : (
                <Avatar
                  cursor="pointer"
                  name={getSender(selectedChat.users, user)}
                  src={getAvatar(selectedChat.users, user)}
                >
                  {/* <AvatarBadge boxSize="1.25em" bg="green.500" /> */}
                </Avatar>
              )}
            </Center>
            <Center>
              <Text pt={3} pb={3} fontWeight={600}>
                {selectedChat.isGroupChat ? (
                  <strong style={{ fontSize: "18px" }}>
                    {selectedChat.chatName}
                  </strong>
                ) : (
                  <strong style={{ fontSize: "18px" }}>
                    {getSender(selectedChat.users, user)}
                  </strong>
                )}
              </Text>
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
                <Td p={0} color="gray.600">
                  Bio
                </Td>
                <Td p={2}>Read book</Td>
              </Tr>
              <Tr>
                <Td p={0} color="gray.600">
                  Number phone
                </Td>
                <Td p={2}>0999999999</Td>
              </Tr>
              <Tr>
                <Td p={0} color="gray.600">
                  Sex
                </Td>
                <Td p={2}>Male</Td>
              </Tr>
              <Tr>
                <Td p={0} color="gray.600">
                  Birthday
                </Td>
                <Td p={2}>01/01/97</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserInfoModal;
