import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import { IconButton, Stack } from "@mui/joy";
import Cookies from "js-cookie";
import { AuthContext } from "../../../../App";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { ChatProps } from "../../../../types";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

export type MessageInputProps = {
  selectedChat: ChatProps;
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: () => void;
};

function MessageInput({
  selectedChat,
  textAreaValue,
  setTextAreaValue,
}: MessageInputProps) {
  const textAreaRef = React.useRef<HTMLDivElement>(null);

  const { backend, token, refresher } = React.useContext(AuthContext);
  const currentUser = Cookies.get("id");

  console.log("ddd", selectedChat);
  const rev = selectedChat.sender.filter((user) => user.id !== currentUser)[0]
    .id;
  console.log("rev", rev);

  const handleSubmit = async () => {
    try {
      if (textAreaValue.trim() !== "") {
        setTextAreaValue("");
      }
      const response = await axios.post(
        `${backend}sendchat`,
        {
          sender: currentUser,
          receiver: rev,
          message: textAreaValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (response.data.status_code === 201) {
        refresher();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
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
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              handleSubmit();
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

export default MessageInput;
