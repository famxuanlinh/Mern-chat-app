import { Message } from "@apis/endpoints/messages/messagesApi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Tooltip } from "@chakra-ui/react";
import { useChatContext } from "@contexts/ChatContext/ChatContext";
import isLastMessage from "@utils/isLastMessage";
import isSameSender from "@utils/isSameSender";
import isSameSenderMargin from "@utils/isSameSenderMargin";
import isSameUser from "@utils/isSameUser";
import React, { useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";

interface Props {
  messages: Message[];
}

const ScrollableChat: React.FC<Props> = ({ messages }) => {
  const { user, selectedChat } = useChatContext();
  const chatContentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (!chatContentRef.current) return;
    chatContentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(chatContentRef.current?.scroll)

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);


  return (
    <Box pe="10px" position="relative">
      {messages &&
        messages.map((message, i) => (
          <div style={{ display: "flex" }} key={i}>
            {(isSameSender(messages, message, i, user?._id) ||
              isLastMessage(messages, i, user?._id)) && (
              <Avatar
                mt="7px"
                // mr={1}
                size="sm"
                cursor="pointer"
                name={message.sender?.name}
                src={message.sender?.pic}
              />
            )}
            <span
              style={{
                backgroundColor: `${
                  message.sender?._id === user?._id ? "#e5efff" : "#ffffff"
                }`,
                borderRadius: "8px",
                padding: "12px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, message, i, user?._id),
                marginTop: isSameUser(messages, message, i) ? 4 : 10,
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
      <div ref={chatContentRef} />

      <Box
        position="fixed"
        cursor="pointer"
        bottom="64px"
        right="14px"
        bg="white"
        borderRadius="50%"
        zIndex="999"
      >
        <ChevronDownIcon opacity={0.5} fontSize="26px" p="2px" onClick={scrollToBottom} />
      </Box>
    </Box>
  );
};

export default ScrollableChat;
