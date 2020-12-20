import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import QueueIcon from '@material-ui/icons/Queue';
import {useArtistApi} from "../hooks/ArtistApi";
import {useEffect, useState} from "react";
import {usePlayerService} from "../hooks/PlayerService";

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
		width: 200,
		height: 200
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

const defaultImageUrl = process.env.PUBLIC_URL+"/images/dj_silhouette.png";

//SHOW:
// 1. set.title/replacetitle (mehrere djs
// 2. Genres
// 3. Artists-Bilder oder Geist
// 4. Kommentare
// 5. Bookmark, Playcounts,
export const FilterListSet = ({nummer,set}) => {
	const artistApi = useArtistApi();
	const playerService = usePlayerService()
	const classes = useStyles();
	const [ artistImage, setArtistImage ] = useState();
	const artistID = set.artists && set.artists[0] && set.artists[0]["artistnid"];
	useEffect(() => {
		artistID ? artistApi.artistInfo(artistID)
						.then(info => artistApi.imageUrl(info, "large", defaultImageUrl))
						.then(setArtistImage)
					: setArtistImage(defaultImageUrl);
	}, [artistApi,artistID,artistImage,setArtistImage])

	const enqueue = () => {
		playerService.enqueue(set);
	}
	const play = () => {
		playerService.play(set);
	}

	return <>
		<Card className={classes.root} elevation={3}>
			<CardMedia
					className={classes.cover}
					title={set.title}
					image={artistImage}
					height={256}
			/>
			<div className={classes.details}>
				<CardContent style={{maxWidth: 200}} className={classes.content}>
					<Typography component="h5" variant="subtitle1">{nummer + "." + set.title}</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						{set.dj ? set.dj.name : ''}
					</Typography>
				</CardContent>
				<div className={classes.controls}>
					<IconButton aria-label="play/pause" onClick={play}>
						<PlayArrowIcon className={classes.playIcon}/>
					</IconButton>
					<IconButton aria-label="enqueue" onClick={enqueue}>
						<QueueIcon className={classes.playIcon}/>
					</IconButton>
				</div>
			</div>
		</Card>
	</>
}