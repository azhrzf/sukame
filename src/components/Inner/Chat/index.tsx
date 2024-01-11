import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import MessagesPane from "./MessagesPane";
import ChatsPane from "./ChatsPane";
import { useEffect, useContext } from "react";
import { ChatProps, MessageProps, UserProps } from "../../../types";
import { getUserByUsername } from "../../../data";
import { AuthContext } from "../../../App";

type MyMessagesProps = {
  user: UserProps;
  initChats: ChatProps[];
  setInitChats: React.Dispatch<React.SetStateAction<ChatProps[]>>;
};

function MyProfile({ user, initChats, setInitChats }: MyMessagesProps) {
  const [chats, setChats] = React.useState<ChatProps[]>(initChats);
  const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);
  const { refresh } = useContext(AuthContext);

  useEffect(() => {
    setChats(initChats);
  }, [chats, initChats, selectedChat, refresh]);

  const handleChatSend = (currentMessage: MessageProps): void => {
    const chatIndex = chats.findIndex((chat) => chat.id === selectedChat.id);
    if (chatIndex !== -1) {
      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[chatIndex].messages.push(currentMessage);
        return updatedChats;
      });
    }
  };

  const handleNewChat = (targetUser: string) => {
    const target = getUserByUsername(targetUser);
    if (target !== undefined) {
      const newId = initChats.length + 1;
      const newIdString = newId.toString();
      const chat: ChatProps = {
        id: newIdString,
        sender: [target, user],
        messages: [],
      };
      setInitChats((prevChats) => {
        return [...prevChats, chat];
      });
      // let newChatIndex = chats.findIndex((c) => c.id === newIdString);
      // setSelectedChat(chats[8]);
    }
  };

  return (
    <Sheet
      sx={{
        flex: 1,
        width: "100%",
        mx: "auto",
        pt: { xs: "var(--Header-height)", sm: 0 },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(min-content, min(30%, 400px)) 1fr",
        },
      }}
    >
      <Sheet
        sx={{
          position: {
            xs: "fixed",
            sm: "sticky",
          },
          transform: {
            xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
            sm: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 100,
          width: "100%",
          top: 52,
        }}
      >
        <ChatsPane
          user={user}
          chats={chats}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
          handleNewChat={handleNewChat}
        />
      </Sheet>
      <MessagesPane
        user={user}
        selectedChat={selectedChat}
        handleChatSend={handleChatSend}
      />
    </Sheet>
  );
}

export default MyProfile;
