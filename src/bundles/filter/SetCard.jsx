import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import QueueIcon from "@material-ui/icons/Queue";
import {Box, Divider, List, ListItem, ListItemText, Tooltip} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 350
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	cardHeaderRoot: {
		overflow: "hidden"
	},
	cardHeaderContent: {
		overflow: "hidden"
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	genreListItem: {
		paddingTop: "2",
		paddingBottom: "2",
	},
	genreListItemText: {
		marginTop: 0,
		writingMode: "vertical-rl"
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function SetCard({nummer, set, genres, artistImage, playAction, enqueueAction}) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	var duration = new Date(set.duration * 1000);
	var durationHHMM = String(duration.getUTCHours()).padStart(2,"0")
							 + "h:" + String(duration.getUTCMinutes()).padStart(2,"0")+"m";

	return (
			<Box display="flex">
				<Box>
					<Card className={classes.root}>
						<CardHeader classes={{root: classes.cardHeaderRoot, content: classes.cardHeaderContent}}
										avatar={<Avatar aria-label="recipe" className={classes.avatar}>{nummer}</Avatar>}
										title={set.title} titleTypographyProps={{noWrap: true}}
										subheader={"produziert am " + new Date(set.setcreated * 1000).toLocaleDateString()}
										action={<IconButton aria-label="settings"><MoreVertIcon/></IconButton>}
						/>

						<CardMedia className={classes.media} image={artistImage} title={set.title}/>
						<CardContent>
							<Typography variant="body2" color="textPrimary" component="p" gutterBottom>
								{set.title}
							</Typography>
							{set.lastheard && <Typography variant="body2" color="textSecondary" component="p">
								{"zuletzt gehört am " + new Date(set.lastheard * 1000).toLocaleDateString() + " um "
								 + new Date(set.lastheard * 1000).toLocaleTimeString() + " Uhr"}
							</Typography>}
						</CardContent>
						<CardActions disableSpacing>
							<Tooltip title={"Abspielen"}>
								<IconButton aria-label="play/pause" onClick={playAction}>
									<PlayArrowIcon className={classes.actionIcon}/>
								</IconButton>
							</Tooltip>
							<Tooltip title={"in Playlist anhängen"}>
								<IconButton aria-label="enqueue" onClick={enqueueAction}>
									<QueueIcon className={classes.actionIcon}/>
								</IconButton>
							</Tooltip>
							<Tooltip title={"Set Bookmarken"}>
								<IconButton>
									<FavoriteIcon/>
								</IconButton>
							</Tooltip>
							<IconButton
									className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
									onClick={handleExpandClick}>
								<ExpandMoreIcon/>
							</IconButton>
						</CardActions>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Typography paragraph>Tracks:</Typography>
								<Typography paragraph>TODO:implement</Typography>
							</CardContent>
						</Collapse>
					</Card>
				</Box>
				<Box>
					<List disablePadding={true}>
						<Divider/>
						<ListItem selected={false} disableGutters={true} classes={{root: classes.genreListItem}}>
							<ListItemText classes={{root: classes.genreListItemText}}>{durationHHMM}</ListItemText>
						</ListItem>
						<Divider/>
						{genres && genres.filter(g => g.name !== "set").slice(0, 3).map(({name, tid}) => (
								<React.Fragment key={tid}>
									<ListItem selected={false} disableGutters={true} classes={{root: classes.genreListItem}}>
										<ListItemText classes={{root: classes.genreListItemText}}>{name}</ListItemText>
									</ListItem>
									<Divider/>
								</React.Fragment>
						))}
					</List>
				</Box>
			</Box>

	);
}