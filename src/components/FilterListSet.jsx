import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import QueueIcon from '@material-ui/icons/Queue';
import {useArtistApi} from "../hooks/ArtistApi";
import {useEffect, useState} from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 151,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 38,
		width: 38,
	},
}));

//SHOW:
// 1. set.title/replacetitle (mehrere djs
// 2. Genres
// 3. Artists-Bilder oder Geist
// 4. Kommentare
// 5. Bookmark, Playcounts,
export const FilterListSet = ({set}) => {
	const classes = useStyles();
	const artistApi = useArtistApi();
	const [ artistImage, setArtistImage ] = useState("/static/images/dj_silhouette.png");
	const artistID = set.artists && set.artists[0] && set.artists[0]["artistnid"];
	useEffect(() => {
		if (artistID) {
			artistApi.artistInfo(artistID)
					.then(info => artistApi.imageUrl(info, "large", "/static/images/dj_silhouette.png"))
					.then(setArtistImage);
		}
	}, [artistApi,artistID,artistImage,setArtistImage])

	return <>
		<Card className={classes.root} elevation={3}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="h5">
						{set.title}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						{set.dj ? set.dj.name : ''}
					</Typography>
				</CardContent>
				<div className={classes.controls}>
					<IconButton aria-label="play/pause">
						<PlayArrowIcon className={classes.playIcon}/>
					</IconButton>
					<IconButton aria-label="enqueue">
						<QueueIcon className={classes.playIcon}/>
					</IconButton>
				</div>
				<Typography variant={"subtitle2"}>{"produziert am " + new Date(set.setcreated * 1000).toLocaleDateString()}</Typography>
				<Typography variant={"subtitle2"}>{"hochgeladen am " + new Date(set.created * 1000).toLocaleDateString()}</Typography>
				{set.lastheard && <Typography variant={"subtitle2"}>{"zuletzt gehört am " + new Date(
						set.lastheard * 1000).toLocaleDateString()}</Typography>}
			</div>
			<CardMedia
					className={classes.cover}
					title={set.title}
					image={artistImage}
			/>
		</Card>
	</>
}