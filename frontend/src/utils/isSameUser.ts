import { Message } from "@apis/endpoints/messages/messagesApi";

const isSameUser = (messages: Message[], message: Message, i: number) => {
  return i > 0 && messages[i - 1].sender?._id === message.sender?._id;
};

export default isSameUser;
