// interface Chat {
//   isGroupChat: boolean;
//   _id: string;
//   chatName: string;
//   users: User[];
// }

import { Box } from "@chakra-ui/react";
import { useChatContext } from "../Context/ChatProvider";
// import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
// import ChatBox from "../components/ChastBox";
// import Header from "../components/Header";
import SideBar from "../components/sideBar";

// interface UserInfo {
//   name: string;
//   email: string;
// }

const Chatspage = () => {
  const { user } = useChatContext();
  console.log("Chatspage ~ user", user)

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
