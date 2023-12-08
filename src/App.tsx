import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MyMessages from "./components/MyMessages";
import { ChatProvider } from "./components/context";

export default function JoyMessagesTemplate() {
	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<ChatProvider>
				<Box sx={{ display: "flex", minHeight: "100dvh" }}>
					<Sidebar />
					<Header />
					<Box component="main" className="MainContent" sx={{ flex: 1 }}>
						<MyMessages />
					</Box>
				</Box>
			</ChatProvider>
		</CssVarsProvider>
	);
}
