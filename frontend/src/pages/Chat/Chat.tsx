import { Box, Grid, GridItem } from "@chakra-ui/react";
import ChatUserList from "./components/ChatUserList";
import ChatContent from "./components/ChatContent";
import { useChatContext } from "@contexts/ChatContext/ChatContext";

const Chatspage = () => {
  const { user, selectedChat } = useChatContext();

  return (
    <Box display="flex" w="100%" h="100vh">
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        minWidth="344px"
        w={{ base: "100%", md: "20%" }}
      >
        {user && <ChatUserList />}
      </Box>
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        w={{ base: "100%", md: "80%" }}
      >
        {user && <ChatContent />}
      </Box>
    </Box>
  );
};

export default Chatspage;
