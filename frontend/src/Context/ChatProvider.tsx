import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatContextProps {
  handleLogin: () => void;
  //   setUser: any;
  user?: User;
}
interface User {
  email: string;
  name: string;
  pic: string;
  _id: string;
  token: string;
}

interface Props {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextProps>({
  handleLogin: () => {},
});

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();

  console.log("hatProvider.tsx:24 ~ user", user);

  const navigate = useNavigate();

  const handleLogin = () => {};

  useEffect(() => {
    const userInfo = JSON.parse(
      window.localStorage.getItem("userInfo") || "{}"
    );
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);
  //   console.log("user2", user)

  return (
    <ChatContext.Provider value={{ handleLogin, user }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

export default ChatContext;
