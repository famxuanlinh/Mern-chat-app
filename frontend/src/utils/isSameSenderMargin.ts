import { Message } from "@apis/endpoints/messages/messagesApi";

const isSameSenderMargin = (
  messages: Message[],
  message: Message,
  i: number,
  userId?: String
) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender?._id === message.sender?._id &&
    messages[i].sender?._id !== userId
  )
    return 38;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender?._id !== message.sender?._id &&
      messages[i].sender?._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender?._id !== userId)
  )
    return 5;
  else return "auto";
};

export default isSameSenderMargin;
