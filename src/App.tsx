import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MyMessages from "./components/MyMessages";
import ChatContextProvider from "./components/context";

export default function JoyMessagesTemplate() {
	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<ChatContextProvider>
				<Box sx={{ display: "flex", minHeight: "100dvh" }}>
					<Sidebar />
					<Header />
					<Box component="main" className="MainContent" sx={{ flex: 1 }}>
						<MyMessages />
					</Box>
				</Box>
			</ChatContextProvider>
		</CssVarsProvider>
	);
}
