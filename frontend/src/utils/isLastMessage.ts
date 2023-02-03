import { Message } from "@apis/endpoints/messages/messagesApi";

const isLastMessage = (messages: Message[], i: number, userId?: String) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
export default isLastMessage;