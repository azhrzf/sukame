import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import List from "@mui/joy/List";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChatListItem from "./ChatListItem";
import { ChatProps, UserProps } from "../../../../types";
import { toggleMessagesPane, toggleSidebar } from "../../../../utils";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";

type ChatsPaneProps = {
  user: UserProps;
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
  handleNewChat: (targetUser: string) => void;
};

function ChatsPane({
  user,
  chats,
  setSelectedChat,
  selectedChatId,
  handleNewChat,
}: ChatsPaneProps) {
  const [open, setOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");

  return (
    <>
      <Sheet
        sx={{
          borderRight: "1px solid",
          borderColor: "divider",
          height: "calc(100dvh - var(--Header-height))",
          overflowY: "auto",
        }}
      >
        <Stack
          sx={{ backgroundColor: "success.headerBg" }}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          p={2}
          pb={1.5}
        >
          <IconButton
            onClick={() => toggleSidebar()}
            variant="outlined"
            color="neutral"
            size="sm"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <MenuRoundedIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            fontSize={{ xs: "md", md: "lg" }}
            component="h1"
            fontWeight="lg"
            sx={{ mr: "auto", color: "white" }}
          >
            Messages
          </Typography>

          <IconButton
            variant="plain"
            aria-label="edit"
            color="neutral"
            size="sm"
            sx={{ display: { xs: "flex" } }}
          >
            <EditNoteRoundedIcon
              sx={{ color: "white" }}
              onClick={() => setOpen(true)}
            />
          </IconButton>

          <IconButton
            variant="plain"
            aria-label="edit"
            color="neutral"
            size="sm"
            onClick={() => {
              toggleMessagesPane();
            }}
            sx={{ display: { sm: "none" } }}
          >
            <CloseRoundedIcon sx={{ color: "white" }} />
          </IconButton>
        </Stack>
        <Box sx={{ px: 2, pb: 1.5, backgroundColor: "success.headerBg" }}>
          <Input
            size="sm"
            startDecorator={<SearchRoundedIcon />}
            placeholder="Search"
            aria-label="Search"
          />
        </Box>
        <List
          sx={{
            py: 0,
            "--ListItem-paddingY": "0.75rem",
            "--ListItem-paddingX": "1rem",
          }}
        >
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              {...chat}
              user={user}
              setSelectedChat={setSelectedChat}
              selectedChatId={selectedChatId}
            />
          ))}
        </List>
      </Sheet>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <DialogTitle>New Messages</DialogTitle>
          <DialogContent>Fill in the target username</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleNewChat(usernameInput);
              setOpen(false);
              setUsernameInput("");
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={usernameInput}
                  autoFocus
                  required
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                  }}
                />
              </FormControl>
              <Button color="success" variant="solid" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default ChatsPane;
