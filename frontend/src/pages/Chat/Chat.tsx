// interface Chat {
//   isGroupChat: boolean;
//   _id: string;
//   chatName: string;
//   users: User[];
// }

import { Box } from "@chakra-ui/react";
import ChatUserList from "./components/ChatUserList";
import ChatContent from "./components/ChatContent";
// import { useChatContext } from "../Context/ChatProvider";
// import SideDrawer from "../components/miscellaneous/SideDrawer";
// import ChatBox from "../components/ChastBox";
// import Header from "../components/Header";

// interface UserInfo {
//   name: string;
//   email: string;
// }

const Chatspage = () => {


  return (
    <Box>
      {/* {user && <Header />} */}
      <ChatUserList />
      {/* <SideDrawer /> */}
      <Box ms="344px" >
        <ChatContent />
        {/* <ChatBox /> */}
      </Box>
    </Box>
  );
};

export default Chatspage;
