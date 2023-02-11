import api from "@apis/api";
import { Chat } from "../chats";

export interface Message {
  chat: Chat;
  content: string;
  sender: User;
  _id: string;
}
export interface User {
  name: string;
  pic: string;
  _id: string;
}

export interface SendMessage {
  content: string;
  chatId?: String;
}

// const post = (payload: SendMessage): Promise<Message[]> => {
//   return api.get("/message").then((res) => res.data);
// };



const sendMessage = (payload: SendMessage): Promise<Message> => {
  return api.post("/message", payload).then((res)=>res.data);
};

const messagesApi = {
  sendMessage,
};

export default messagesApi;
