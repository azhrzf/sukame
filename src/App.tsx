import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MyMessages from "./components/MyMessages";
import ChatContextProvider from "./components/context";
import { users } from "./data";
import { useState } from "react";

export default function JoyMessagesTemplate() {
	const [currentUser, setCurrentUser] = useState(users[7]);

	const handleChangeUser = (username: string) => {
		const userIndex = users.findIndex((user) => user.username === username);
		if (userIndex !== -1) {
			setCurrentUser(users[userIndex]);
		}
	};

	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<ChatContextProvider>
				<Box sx={{ display: "flex", minHeight: "100dvh" }}>
					<Sidebar user={currentUser} handleChangeUser={handleChangeUser} />
					<Header />
					<Box component="main" className="MainContent" sx={{ flex: 1 }}>
						<MyMessages user={currentUser} />
					</Box>
				</Box>
			</ChatContextProvider>
		</CssVarsProvider>
	);
}
