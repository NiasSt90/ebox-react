import {Card, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import QueueIcon from "@material-ui/icons/Queue";
import {makeStyles} from "@material-ui/core/styles";

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
	actionIcon: {
		height: 40,
		width: 40,
	},
}));
export const SetCard = ({nummer, set, genres, artistImage, playAction, enqueueAction}) => {
	const classes = useStyles();
	return <>
		<Card className={classes.root} elevation={3}>
			<CardMedia  className={classes.cover}
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
					<IconButton aria-label="play/pause" onClick={playAction}>
						<PlayArrowIcon className={classes.actionIcon}/>
					</IconButton>
					<IconButton aria-label="enqueue" onClick={enqueueAction}>
						<QueueIcon className={classes.actionIcon}/>
					</IconButton>
				</div>
			</div>
		</Card>
	</>

}