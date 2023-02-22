import { Chat } from "@apis/endpoints/chats";
import { LoginUser, User } from "@apis/endpoints/users";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "@apis/endpoints/messages/messagesApi";

interface ChatContextProps {
  user?: LoginUser;
  chatsContent: Chat[];
  handleChangeChats: (chatsContent: Chat[]) => void;
  handleChangeSelectedChat: (selectedChat: Chat) => void;
  selectedChat?: Chat;
  handleNotification: (data: Message[]) => void;
  notification: Message[];
}

interface Props {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextProps>({
  chatsContent: [],
  notification: [],
  handleChangeChats: () => {},
  handleChangeSelectedChat: () => {},
  handleNotification: () => {},
});

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<LoginUser>();
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [chatsContent, setChatsContent] = useState<Chat[]>([]);
  const [notification, setNotification] = useState<Message[]>([]);

  const navigate = useNavigate();

  const handleChangeChats = (data: Chat[]): void => {
    setChatsContent(data);
  };

  const handleNotification = (data: Message[]) => {
    setNotification(data);
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
        notification,
        handleNotification,
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
