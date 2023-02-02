import { Box } from "@chakra-ui/react";
import ChatUserList from "./components/ChatUserList";
import ChatContent from "./components/ChatContent";
import { useChatContext } from "@contexts/ChatContext/ChatContext";

const Chatspage = () => {
  const { user } = useChatContext();

  return (
    <Box>
      {user && <ChatUserList />}
      <Box ms="344px">{user && <ChatContent />}</Box>
    </Box>
  );
};

export default Chatspage;
