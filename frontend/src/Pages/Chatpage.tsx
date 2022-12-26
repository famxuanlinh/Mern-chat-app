import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, Text, Button } from "@chakra-ui/react";

interface Chat {
  isGroupChat: boolean;
  _id: string;
  chatName: string;
  users: User[];
}

interface User {
  name: string;
  email: string;
}

const Chatspage = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  console.log(chats);

  return (
    <div>
      {chats.map((chat): any => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
      <Button colorScheme='blue'>Button</Button>
    </div>
  );
};

export default Chatspage;
