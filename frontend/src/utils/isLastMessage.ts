import { Message } from "@apis/endpoints/messages/messagesApi";

const isLastMessage = (messages: Message[], i: number, userId?: String) => {
  console.log("🚀 ~ file: isLastMessage.ts:4 ~ isLastMessage ~ messages", messages)
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
export default isLastMessage;