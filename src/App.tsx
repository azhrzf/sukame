import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCommentIcon from "@material-ui/icons/AddComment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	chatSection: {
		width: "100%",
		height: "85vh",
	},
	headBG: {
		backgroundColor: "#e0e0e0",
	},
	borderRight500: {
		borderRight: "1px solid #e0e0e0",
	},
	messageArea: {
		height: "70vh",
		overflowY: "auto",
	},
});

const App = () => {
	const classes = useStyles();

	return (
		<>
			<Grid container>
				<Grid item xs={3}>
					<Paper variant="outlined">
						<List>
							<ListItem key="JohnWick">
								<ListItemIcon>
									<Avatar alt="John Wick" src="https://material-ui.com/static/images/avatar/5.jpg" />
								</ListItemIcon>
								<ListItemText primary="John Wick"></ListItemText>
								<ListItemIcon>
									<IconButton edge="end" aria-label="new chat">
										<AddCommentIcon />
									</IconButton>
								</ListItemIcon>
								<ListItemIcon>
									<IconButton edge="end" aria-label="settings">
										<SettingsIcon />
									</IconButton>
								</ListItemIcon>
							</ListItem>
						</List>
					</Paper>
				</Grid>
				<Grid item xs={9}>
					<Paper variant="outlined">
						<List>
							<ListItem button key="RemySharp">
								<ListItemIcon>
									<Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
								</ListItemIcon>
								<ListItemText primary="Remy Sharp" secondary="online"></ListItemText>
								<ListItemIcon>
									<IconButton edge="end" aria-label="menu">
										<MoreHorizIcon />
									</IconButton>
								</ListItemIcon>
							</ListItem>
						</List>
					</Paper>
				</Grid>
			</Grid>
			<Grid container component={Paper} className={classes.chatSection}>
				<Grid item xs={3} className={classes.borderRight500}>
					<Divider />
					<Grid item xs={12} style={{ padding: "10px" }}>
						<TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
					</Grid>
					<Divider />
					<List>
						<ListItem button key="RemySharp">
							<ListItemIcon>
								<Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
							</ListItemIcon>
							<ListItemText primary="Remy Sharp" secondary="online"></ListItemText>
						</ListItem>
						<ListItem button key="Alice">
							<ListItemIcon>
								<Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
							</ListItemIcon>
							<ListItemText primary="Alice">Alice</ListItemText>
						</ListItem>
						<ListItem button key="CindyBaker">
							<ListItemIcon>
								<Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
							</ListItemIcon>
							<ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
						</ListItem>
					</List>
				</Grid>
				<Grid item xs={9}>
					<List className={classes.messageArea}>
						<ListItem key="1">
							<Grid container>
								<Grid item xs={12}>
									<ListItemText primary="Hey man, What's up ?"></ListItemText>
								</Grid>
								<Grid item xs={12}>
									<ListItemText secondary="09:30"></ListItemText>
								</Grid>
							</Grid>
						</ListItem>
						<ListItem key="2">
							<Grid container>
								<Grid item xs={12}>
									<ListItemText primary="Hey, Iam Good! What about you ?"></ListItemText>
								</Grid>
								<Grid item xs={12}>
									<ListItemText secondary="09:31"></ListItemText>
								</Grid>
							</Grid>
						</ListItem>
						<ListItem key="3">
							<Grid container>
								<Grid item xs={12}>
									<ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
								</Grid>
								<Grid item xs={12}>
									<ListItemText secondary="10:30"></ListItemText>
								</Grid>
							</Grid>
						</ListItem>
					</List>
					<Divider />
					<Grid container style={{ padding: "16px" }}>
						<Grid item xs={1}>
							<IconButton aria-label="picture">
								<InsertPhotoIcon />
							</IconButton>
						</Grid>
						<Grid item xs={1}>
							<IconButton aria-label="picture">
								<AttachFileIcon />
							</IconButton>
						</Grid>
						<Grid item xs={9}>
							<TextField id="outlined-basic-email" label="Type Something" fullWidth />
						</Grid>
						<Grid xs={1}>
							<Fab color="primary" aria-label="add">
								<SendIcon />
							</Fab>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default App;
