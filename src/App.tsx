import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MyMessages from "./components/MyMessages";
import ChatContextProvider from "./components/Context";
import { getDummyChats, users } from "./data";
import { useState } from "react";
import { ChatProps, UserProps } from "./types";

export default function JoyMessagesTemplate() {
	const [currentUser, setCurrentUser] = useState(users[7]);
	const [initChats, setInitChats] = useState(getDummyChats());

	const handleChangeUser = (username: string) => {
		const userIndex = users.findIndex((user) => user.username === username);
		if (userIndex !== -1) {
			setCurrentUser(users[userIndex]);
		}
	};

	const getChatsFromUser = (chats: ChatProps[], user: UserProps): ChatProps[] => {
		return chats.filter((chat) => {
			const isFromUser = chat.sender.some((sender) => sender.id === user.id);
			return isFromUser;
		});
	};

	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<ChatContextProvider>
				<Box sx={{ display: "flex", minHeight: "100dvh" }}>
					<Sidebar user={currentUser} handleChangeUser={handleChangeUser} />
					<Header />
					<Box component="main" className="MainContent" sx={{ flex: 1 }}>
						<MyMessages
							user={currentUser}
							initChats={getChatsFromUser(initChats, currentUser)}
							setInitChats={setInitChats}
						/>
					</Box>
				</Box>
			</ChatContextProvider>
		</CssVarsProvider>
	);
}
