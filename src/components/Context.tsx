import React, { createContext, useContext, useState } from "react";
import { ChatProps } from "../types";
import { dummychats } from "../data";

const useChats = (initial: ChatProps[] = []) => {
	const [chats, setChats] = useState(initial);
	const [fetchStatus, setFetchStatus] = useState(true);
	const [selectedChat, setSelectedChat] = useState<ChatProps>(chats[0]);

	return {
		chats,
		setChats,
		fetchStatus,
		setFetchStatus,
		selectedChat,
		setSelectedChat,
		load: (newChats: ChatProps[]) => setChats(newChats),
	};
};

export const ChatContext = createContext<ReturnType<typeof useChats> | null>(null);

export default function ChatContextProvider({ children }: { children: React.ReactNode }) {
	return <ChatContext.Provider value={useChats(dummychats)}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error("useChatContext must be used within a ChatContextProvider");
	}
	return context;
}
