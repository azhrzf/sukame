import * as React from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import AvatarWithStatus from "../MessagesPane/AvatarWithStatus";
import { ChatProps, MessageProps, UserProps } from "../../../../types";
import { toggleMessagesPane } from "../../../../utils";
import { getSender } from "../../../../data";

type ChatListItemProps = ListItemButtonProps & {
  id: string;
  unread?: boolean;
  sender: UserProps[];
  messages: MessageProps[];
  user: UserProps;
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};

function ChatListItem({
  id,
  sender,
  messages,
  user,
  selectedChatId,
  setSelectedChat,
}: ChatListItemProps) {
  const selected = selectedChatId === id;

  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({ id, sender, messages });
          }}
          selected={selected}
          color="success"
          sx={{
            flexDirection: "column",
            alignItems: "initial",
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus
              online={getSender(user, sender).online}
              src={getSender(user, sender).avatar}
            />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">
                {getSender(user, sender).name}
              </Typography>
              <Typography level="body-sm">
                {getSender(user, sender).username}
              </Typography>
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: "right",
              }}
            >
              {/* {messages[0].unread && <CircleIcon sx={{ fontSize: 12 }} color="primary" />} */}
              <Typography
                level="body-xs"
                display={{ xs: "none", md: "block" }}
                noWrap
              >
                5 mins ago
              </Typography>
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {messages.length > 0 && messages[messages.length - 1].content}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}

export default ChatListItem;
