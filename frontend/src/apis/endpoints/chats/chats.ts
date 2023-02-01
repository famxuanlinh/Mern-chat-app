import api from "@apis/api";
import { User } from "../users";

export interface Chat {
  isGroupChat: boolean;
  _id: string;
  chatName: string;
  users: User[];
}

export interface ChatGroup {
  name: string;
  users: string;
}

/**
 * Get chat list
 * @returns Chat[]
 */
const getMany = (): Promise<Chat[]> => {
  return api.get("/chat");
};

/**
 * Create a new Chat
 * @param payload Object
 * @returns Chat
 */
const create = (payload: ChatGroup): Promise<Chat> => {
  return api.post("/chat/group", payload).then((res) => res.data);
};

// const create = (payload: {userId: string}): Promise<Chat> => {
//     return api.post('/chat', payload)
// }

const messages = {
  getMany,
  create,
};

export default messages;
