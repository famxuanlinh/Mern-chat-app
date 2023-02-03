import { Message } from "@apis/endpoints/messages/messagesApi";
import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import { useChatContext } from "@contexts/ChatContext/ChatContext";
import isLastMessage from "@utils/isLastMessage";
import isSameSender from "@utils/isSameSender";
import isSameSenderMargin from "@utils/isSameSenderMargin";
import isSameUser from "@utils/isSameUser";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";

interface Props {
  messages: Message[];
}

const ScrollableChat: React.FC<Props> = ({ messages }) => {
  const { user } = useChatContext();

  return (
    <Box>
      {messages &&
        messages.map((message, i) => (
          <div style={{ display: "flex" }} key={i}>
            {(isSameSender(messages, message, i, user?._id) ||
              isLastMessage(messages, i, user?._id)) && (
              // <Tooltip
              //   label={message.sender.name}
              //   placement="bottom-start"
              //   hasArrow
              // >
              <Avatar
                mt="7px"
                // mr={1}
                size="sm"
                cursor="pointer"
                name={message.sender?.name}
                src={message.sender?.pic}
              />
              // </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  message.sender?._id === user?._id ? "#e5efff" : "#ffffff"
                }`,
                borderRadius: "8px",
                padding: "12px",
                maxWidth: "75%",
                // marginBottom: "4px",
                marginLeft: isSameSenderMargin(messages, message, i, user?._id),
                marginTop: isSameUser(messages, message, i) ? 4 : 10,
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </Box>
  );
};

export default ScrollableChat;
