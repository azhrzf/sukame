import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import MessagesPane from "./MessagesPane";
import ChatsPane from "./ChatsPane";
import { useEffect } from "react";
// import { useChatContext } from "./context";
import { ChatProps, MessageProps, UserProps } from "../types";

type MyMessagesProps = {
	user: UserProps;
	initChats: ChatProps[];
	setInitChats: React.Dispatch<React.SetStateAction<ChatProps[]>>;
};

export default function MyProfile({ user, initChats, setInitChats }: MyMessagesProps) {
	// const { chats, selectedChat, setSelectedChat } = useChatContext();
	const [chats, setChats] = React.useState<ChatProps[]>(initChats);
	const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);

	useEffect(() => {
		setChats(initChats);
	}, [initChats, selectedChat]);

	const handleChatSend = (currentMessage: MessageProps): void => {
		const chatIndex = chats.findIndex((chat) => chat.id === selectedChat.id);
		if (chatIndex !== -1) {
			setChats((prevChats) => {
				const updatedChats = [...prevChats];
				updatedChats[chatIndex].messages.push(currentMessage);
				return updatedChats;
			});
			console.log(chats);
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
				<ChatsPane user={user} chats={chats} selectedChatId={selectedChat.id} setSelectedChat={setSelectedChat} />
			</Sheet>
			<MessagesPane user={user} selectedChat={selectedChat} handleChatSend={handleChatSend} />
		</Sheet>
	);
}
