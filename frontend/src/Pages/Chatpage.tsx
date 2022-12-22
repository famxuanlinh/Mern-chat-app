import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatspage = () => {

  interface Chat{
    isGroupChat: boolean 
    _id: string 
    chatName: string 
    users: User[] 
}

interface User{
    name: string
    email: string
}
  const [chats, setChats] = useState<Chat[]>([])
  // const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) : any => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chatspage;
