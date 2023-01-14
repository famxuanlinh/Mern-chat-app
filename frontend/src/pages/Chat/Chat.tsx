import { Box } from "@chakra-ui/react";
import ChatUserList from "./components/ChatUserList";
import ChatContent from "./components/ChatContent";


const Chatspage = () => {


  return (
    <Box>
      <ChatUserList />
      <Box ms="344px" >
        <ChatContent />
      </Box>
    </Box>
  );
};

export default Chatspage;
