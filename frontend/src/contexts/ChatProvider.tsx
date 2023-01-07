import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatContextProps {
  handleLogin: () => void;
  user?: LoginUser;
  chats: Chat[];
  handleChangeChats: (chats: Chat[]) => void;
  handleChangeSelectedChat: (selectedChat: Chat) => void ;
  selectedChat?: Chat;
}



export interface User {
  email: string;
  name: string;
  pic: string;
  _id: string;
}

interface LoginUser extends User{
  token: string;
}


interface Chat {
  isGroupChat: boolean;
  _id: string;
  chatName: string;
  users: User[];
}


interface Props {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextProps>({
  handleLogin: () => {},
  chats: [],
  handleChangeChats: () => {},
  handleChangeSelectedChat: () => {}
});

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<LoginUser>();
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [chats, setChats] = useState<Chat[]>([]);

  const navigate = useNavigate();

  const handleLogin = () => {};

  const handleChangeChats = (chats: Chat[]): void => {
    setChats(chats)
  }

  const handleChangeSelectedChat = (selectedChat: Chat): void => {
    setSelectedChat(selectedChat)
  }

  useEffect(() => {
    const userInfo = JSON.parse(
      window.localStorage.getItem("userInfo") || "{}"
    );
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ handleLogin, user, chats, handleChangeChats, selectedChat, handleChangeSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

export default ChatContext;
