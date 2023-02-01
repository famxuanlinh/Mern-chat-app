import { Chat } from "@apis/endpoints/chats";
import { LoginUser, User } from "@apis/endpoints/users";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatContextProps {
  user?: LoginUser;
  chatsContent: Chat[];
  handleChangeChats: (chatsContent: Chat[]) => void;
  handleChangeSelectedChat: (selectedChat: Chat) => void;
  selectedChat?: Chat;
}

interface Props {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextProps>({
  chatsContent: [],
  handleChangeChats: () => {},
  handleChangeSelectedChat: () => {},
});

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<LoginUser>();
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [chatsContent, setChatsContent] = useState<Chat[]>([]);

  const navigate = useNavigate();

  const handleChangeChats = (data: Chat[]): void => {
    setChatsContent(data);
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
        chatsContent,
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
