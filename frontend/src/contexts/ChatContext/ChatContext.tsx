import { Chat } from "@apis/endpoints/chats";
import { LoginUser, User } from "@apis/endpoints/users";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatContextProps {
  user?: LoginUser;
  chats: Chat[];
  handleChangeChats: (chats: Chat[]) => void;
  handleChangeSelectedChat: (selectedChat: Chat) => void;
  selectedChat?: Chat;
}

interface Props {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextProps>({
  chats: [],
  handleChangeChats: () => {},
  handleChangeSelectedChat: () => {},
});

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<LoginUser>();
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [chats, setChats] = useState<Chat[]>([]);

  const navigate = useNavigate();

  const handleChangeChats = (chats: Chat[]): void => {
    setChats(chats);
  };

  const handleChangeSelectedChat = (selectedChat: Chat): void => {
    setSelectedChat(selectedChat);
  };

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
      value={{
        user,
        chats,
        handleChangeChats,
        selectedChat,
        handleChangeSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

export default ChatContext;
