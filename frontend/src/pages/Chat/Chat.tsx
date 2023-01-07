// interface Chat {
//   isGroupChat: boolean;
//   _id: string;
//   chatName: string;
//   users: User[];
// }

import { Box } from "@chakra-ui/react";
import SideBar from "../../components/SideBar";
import MyChats from "../../components/MyChats";
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
      <SideBar />
      {/* <SideDrawer /> */}
      <Box ms="344px" >
        <MyChats />
        {/* <ChatBox /> */}
      </Box>
    </Box>
  );
};

export default Chatspage;
