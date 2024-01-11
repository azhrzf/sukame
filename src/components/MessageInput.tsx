import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import { IconButton, Stack } from "@mui/joy";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AddIcon from "@mui/icons-material/Add";

export type MessageInputProps = {
	textAreaValue: string;
	setTextAreaValue: (value: string) => void;
	onSubmit: () => void;
};

export default function MessageInput({ textAreaValue, setTextAreaValue, onSubmit }: MessageInputProps) {
	const textAreaRef = React.useRef<HTMLDivElement>(null);
	const handleClick = () => {
		if (textAreaValue.trim() !== "") {
			onSubmit();
			setTextAreaValue("");
		}
	};
	return (
		<Box sx={{ px: 2, pb: 3 }}>
			<FormControl>
				<Textarea
					placeholder="Enter message.."
					aria-label="Message"
					ref={textAreaRef}
					onChange={(e) => {
						setTextAreaValue(e.target.value);
					}}
					value={textAreaValue}
					minRows={3}
					maxRows={10}
					endDecorator={
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							flexGrow={1}
							sx={{
								py: 1,
								pr: 1,
								borderTop: "1px solid",
								borderColor: "divider",
							}}
						>
							<div>
								<IconButton size="sm" variant="plain" color="neutral">
									<AddIcon />
								</IconButton>
								<IconButton size="sm" variant="plain" color="neutral">
									<InsertPhotoIcon />
								</IconButton>
								<IconButton size="sm" variant="plain" color="neutral">
									<AttachFileIcon />
								</IconButton>
								<IconButton size="sm" variant="plain" color="neutral">
									<KeyboardVoiceIcon />
								</IconButton>
							</div>
							<Button
								size="sm"
								color="success"
								sx={{ alignSelf: "center", borderRadius: "sm" }}
								endDecorator={<SendRoundedIcon />}
								onClick={handleClick}
							>
								Send
							</Button>
						</Stack>
					}
					onKeyDown={(event) => {
						if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
							handleClick();
						}
					}}
					sx={{
						"& textarea:first-of-type": {
							minHeight: 72,
						},
					}}
				/>
			</FormControl>
		</Box>
	);
}
