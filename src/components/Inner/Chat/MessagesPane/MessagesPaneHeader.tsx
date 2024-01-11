import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { toggleMessagesPane } from "../../../../utils";
import { UserProps } from "../../../../types";

type MessagesPaneHeaderProps = {
  sender: UserProps;
};

function MessagesPaneHeader({ sender }: MessagesPaneHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "success.headerBg",
      }}
      py={{ xs: 2, md: 2 }}
      px={{ xs: 1, md: 2 }}
    >
      <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
          }}
          onClick={() => toggleMessagesPane()}
        >
          <ArrowBackIosNewRoundedIcon sx={{ color: "white" }} />
        </IconButton>
        <Avatar color="success" size="lg" src={sender.avatar} />
        <div>
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            sx={{ color: "white" }}
            endDecorator={
              sender.online ? (
                <Chip
                  variant="outlined"
                  size="sm"
                  color="success"
                  sx={{
                    borderRadius: "sm",
                  }}
                  startDecorator={
                    <CircleIcon sx={{ fontSize: 8 }} color="success" />
                  }
                  slotProps={{ root: { component: "span" } }}
                >
                  Online
                </Chip>
              ) : undefined
            }
          >
            {sender.name}
          </Typography>

          <Typography sx={{ color: "white" }} level="body-sm">
            {sender.username}
          </Typography>
        </div>
      </Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        <IconButton size="sm" variant="plain" color="neutral">
          <MoreVertRoundedIcon sx={{ color: "white" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default MessagesPaneHeader;
