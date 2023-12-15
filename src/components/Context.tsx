import React, { createContext, useState } from "react";
import { ChatProps } from "../types";

// export interface User {
// 	id: number;
// 	name: string;
// 	username: string;
// 	avatar: string;
// 	online: boolean;
// }

// export interface Message {
// 	id: string;
// 	content: string;
// 	timestamp: string;
// 	unread?: boolean;
// 	sender: User | "You";
// 	attachment?: {
// 		fileName: string;
// 		type: string;
// 		size: string;
// 	};
// }

// export interface Chat {
// 	id: string;
// 	sender: User;
// 	messages: Message[];
// }

const useChats = (initial: ChatProps[] = []) => {
  const [chats, setChats] = useState<ChatProps[]>(initial);
  const [fetchStatus, setFetchStatus] = useState<boolean>(true);
  const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);

  return {
    chats,
    fetchStatus,
    setFetchStatus,
    selectedChat,
    setSelectedChat,
    load: (newChats: ChatProps[]) => setChats(newChats),
  };
};

const ChatContext = createContext<ReturnType<typeof useChats> | null>(null);

function ChatProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChatContext.Provider value={useChats([])}>{children}</ChatContext.Provider>
  );
}

export {ChatContext, ChatProvider}
