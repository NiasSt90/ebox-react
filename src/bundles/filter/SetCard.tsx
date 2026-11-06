import React from 'react';
import type {SxProps, Theme} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QueueIcon from "@mui/icons-material/Queue";
import {Box, Divider, List, ListItem, ListItemText, Tooltip} from "@mui/material";
import {EBoxSet} from "../../hooks/types";

const styles = {
	root: {
		width: 250
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	cardHeader: {
		overflow: "hidden",
		"& .MuiCardHeader-content": {
			overflow: "hidden"
		},
	},
	expand: theme => ({
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	}),
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	genreListItemText: {
		marginTop: 0,
		writingMode: "vertical-rl"
	},
	avatar: {
		backgroundColor: red[500],
	},
} satisfies Record<string, SxProps<Theme>>;

interface Props {
	nummer: number;
	cardData: EBoxSet;
	playAction():void;
	enqueueAction():void;
	bookmarkAction():void;
}

export default function SetCard({nummer, cardData, playAction, enqueueAction, bookmarkAction}:Props) {
	const [expanded, setExpanded] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	var durationHHMM = String(cardData.duration.getUTCHours()).padStart(2,"0")
							 + "h:" + String(cardData.duration.getUTCMinutes()).padStart(2,"0")+"m";

	return (
			<Box sx={{display: "flex"}}>
				<Box>
					<Card sx={styles.root} raised={true}>
						<CardHeader sx={styles.cardHeader}
										avatar={<Avatar aria-label="recipe" sx={styles.avatar}>{nummer}</Avatar>}
										title={cardData.title} slotProps={{title: {noWrap: true}}}
										subheader={"produziert am " + cardData.created.toLocaleDateString()}
										action={<IconButton aria-label="settings"><MoreVertIcon/></IconButton>}
						/>

						<CardMedia sx={styles.media} image={cardData.artistDetails[0].artwork.large} title={cardData.title}/>
						<CardContent>
							<Typography variant="body2" color="text.primary" component="p" gutterBottom>
								{cardData.title}
							</Typography>
							{cardData.lastheard && <Typography variant="body2" color="text.secondary" component="p">
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
									sx={[styles.expand, expanded && styles.expandOpen]}
									onClick={handleExpandClick}>
								<ExpandMoreIcon/>
							</IconButton>
						</CardActions>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Typography sx={{mb: 2}}>Tracks:</Typography>
								<Typography sx={{mb: 2}}>TODO:implement</Typography>
							</CardContent>
						</Collapse>
					</Card>
				</Box>
				<Box>
					<List disablePadding={true}>
						<Divider/>
						<ListItem disableGutters={true}>
							<ListItemText sx={styles.genreListItemText}>{durationHHMM}</ListItemText>
						</ListItem>
						<Divider/>
						{cardData.genres && cardData.genres.filter(g => g.name !== "set").slice(0, 3).map(genre => (
								<React.Fragment key={genre.tid}>
									<ListItem disableGutters={true}>
										<ListItemText sx={styles.genreListItemText}>{genre.name}</ListItemText>
									</ListItem>
									<Divider/>
								</React.Fragment>
						))}
					</List>
				</Box>
			</Box>

	);
}