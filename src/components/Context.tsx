import React, { createContext, useContext, useState } from "react";
import { ChatProps } from "../types";
import { dummychats } from "../data";
// import axios from "axios";

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

export const ChatContext = createContext<ReturnType<typeof useChats> | null>(
  null
);

export default function ChatContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatContext.Provider value={useChats(dummychats)}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
}

// let baseURL = "";

// const sendChat = (conversation_id: string, message: string) => {
// 	axios
// 		.post(
// 			`{baseURL}/v1/chat/${conversation_id}`,
// 			{
// 				message: message,
// 				datetime: new Date().toISOString(),
// 				user: {
// 					id: 123,
// 					name: "Hachiman",
// 				},
// 			},
// 			{
// 				headers: { Authorization: "Bearer " + Cookies.get("token") },
// 			}
// 		)
// 		.then((res) => {
// 			let { data } = res;
// 			console.log(data);
// 			let newChat = data;

// 			setChats((prevChats) => {
// 				const updatedChats = [...prevChats, newChat];
// 				return updatedChats;
// 			});
// 		})
// 		.catch((error) => {
// 			console.log(error.response.data.error);
// 			alert(error.response.data.error);
// 		});
// };

// const getChatList = async (id: string) => {
// 	let result = await axios.get(`{base_url}/v1/chat/:${id}?q=dia&limit=20&page=1`, {
// 		headers: { Authorization: "Bearer " + Cookies.get("token") },
// 	});
// 	let fetchResult = result.data.data;

// 	setChats(fetchResult);
// };

// export function getChatData() {
// 	const ws = new WebSocket(`ws://${baseURL}/v1/conversations/ws`);

// 	ws.onopen = () => {
// 		console.log("Websocket connection opened");
// 	};

// 	ws.onmessage = (event) => {
// 		const newChat = JSON.parse(event.data);
// 		setChats((prevChats) => {
// 			const updatedChats = [...prevChats, newChat];
// 			return updatedChats;
// 		});
// 	};

// 	ws.onerror = (error) => {
// 		console.log(error);
// 	};

// 	return ws;
// }
