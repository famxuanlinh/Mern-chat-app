import { Box, Grid, GridItem } from "@chakra-ui/react";
import ChatUserList from "./components/ChatUserList";
import ChatContent from "./components/ChatContent";
import { useChatContext } from "@contexts/ChatContext/ChatContext";

const Chatspage = () => {
  const { user } = useChatContext();

  return (
    <>
      <Box>{user && <ChatUserList />}</Box>
      <Box>{user && <ChatContent />}</Box>
    </>
  );
};

export default Chatspage;
