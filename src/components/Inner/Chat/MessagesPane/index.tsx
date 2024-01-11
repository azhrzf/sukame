import * as React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesPaneHeader from "./MessagesPaneHeader";
import { ChatProps, MessageProps, UserProps } from "../../../../types";
import { getSender } from "../../../../data";

type MessagesPaneProps = {
  user: UserProps;
  selectedChat: ChatProps;
  handleChatSend: (currentMessage: MessageProps) => void;
};

function MessagesPane({
  user,
  selectedChat,
  handleChatSend,
}: MessagesPaneProps) {
  const [currentChatMessages, setCurrentChatMessages] = React.useState(
    selectedChat.messages
  );
  const [textAreaValue, setTextAreaValue] = React.useState("");

  React.useEffect(() => {
    setCurrentChatMessages(selectedChat.messages);
  }, [selectedChat.messages]);

  const onEnterHandler = () => {
    if (!textAreaValue) {
      return;
    }
    const newId = currentChatMessages.length + 1;
    const newIdString = newId.toString();
    const newMessage: MessageProps = {
      id: newIdString,
      sender: user,
      content: textAreaValue,
      timestamp: "Just now",
    };
    setTextAreaValue("");
    setCurrentChatMessages([...currentChatMessages, newMessage]);
    handleChatSend(newMessage);
  };

  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", lg: "100dvh" },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.body",
      }}
    >
      <MessagesPaneHeader sender={getSender(user, selectedChat.sender)} />

      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {currentChatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.sender.id === user.id;
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? "row-reverse" : "row"}
              >
                {message.sender.id !== user.id && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  {...message}
                  user={user}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>

      <MessageInput
        selectedChat={selectedChat}
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={onEnterHandler}
      />
    </Sheet>
  );
}

export default MessagesPane;
