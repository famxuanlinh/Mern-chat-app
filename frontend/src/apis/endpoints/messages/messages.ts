import api from "@apis/api"
import { User } from "../users";

export interface Message{
    isGroupChat: boolean;
    _id: string;
    chatName: string;
    users: User[];
}  

const get = (): Promise<Message[]> => {
    return api.get('/chat')
}

const create = (payload: any ): Promise<Message> => {
    return api.post('/chat')
}

const messages = {
    get,
    create
}

export default messages
