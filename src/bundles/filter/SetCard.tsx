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
import {EBoxSet} from "../../hooks/types";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 250
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

interface Props {
	nummer: number;
	cardData: EBoxSet;
	playAction():void;
	enqueueAction():void;
	bookmarkAction():void;
}

export default function SetCard({nummer, cardData, playAction, enqueueAction, bookmarkAction}:Props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	var durationHHMM = String(cardData.duration.getUTCHours()).padStart(2,"0")
							 + "h:" + String(cardData.duration.getUTCMinutes()).padStart(2,"0")+"m";

	return (
			<Box display="flex">
				<Box>
					<Card className={classes.root} raised={true}>
						<CardHeader classes={{root: classes.cardHeaderRoot, content: classes.cardHeaderContent}}
										avatar={<Avatar aria-label="recipe" className={classes.avatar}>{nummer}</Avatar>}
										title={cardData.title} titleTypographyProps={{noWrap: true}}
										subheader={"produziert am " + cardData.created.toLocaleDateString()}
										action={<IconButton aria-label="settings"><MoreVertIcon/></IconButton>}
						/>

						<CardMedia className={classes.media} image={cardData.artistDetails[0].artwork.large} title={cardData.title}/>
						<CardContent>
							<Typography variant="body2" color="textPrimary" component="p" gutterBottom>
								{cardData.title}
							</Typography>
							{cardData.lastheard && <Typography variant="body2" color="textSecondary" component="p">
								{"zuletzt gehört am " + cardData.lastheard.toLocaleDateString() + " um "
								 + cardData.lastheard.toLocaleTimeString() + " Uhr"}
							</Typography>}
						</CardContent>
						<CardActions disableSpacing>
							<Tooltip title={"Abspielen"}>
								<IconButton aria-label="play/pause" onClick={playAction}><PlayArrowIcon/></IconButton>
							</Tooltip>
							<Tooltip title={"in Playlist anhängen"}>
								<IconButton aria-label="enqueue" onClick={enqueueAction}><QueueIcon/></IconButton>
							</Tooltip>
							<Tooltip title={"Set Bookmarken"}>
								<IconButton onClick={bookmarkAction}>
									<FavoriteIcon color={cardData.bookmarked ? "secondary": "disabled"}/>
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
						{cardData.genres && cardData.genres.filter(g => g.name !== "set").slice(0, 3).map(genre => (
								<React.Fragment key={genre.tid}>
									<ListItem selected={false} disableGutters={true} classes={{root: classes.genreListItem}}>
										<ListItemText classes={{root: classes.genreListItemText}}>{genre.name}</ListItemText>
									</ListItem>
									<Divider/>
								</React.Fragment>
						))}
					</List>
				</Box>
			</Box>

	);
}