import { Message } from "@apis/endpoints/messages/messagesApi";

const isSameSender = (
  messages: Message[],
  message: Message,
  i: number,
  userId?: String
) => {
  // console.log("message", message);
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender?._id !== message.sender?._id ||
      messages[i + 1].sender?._id === undefined) &&
    messages[i].sender?._id !== userId
  );
};

export default isSameSender;
