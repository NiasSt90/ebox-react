import React from "react";
import {Box, Grid, Paper, Tooltip, Typography} from "@material-ui/core";
import AudioPlayer from "material-ui-audio-player";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ReplayIcon from '@material-ui/icons/Replay';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";

const icons = {
	PlayIcon: PlayCircleOutlineIcon,
	ReplayIcon: ReplayIcon,
	PauseIcon: PauseCircleOutlineIcon,
	VolumeUpIcon: VolumeUpIcon,
	VolumeOffIcon: VolumeOffIcon
}

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		zIndex: 10,
		bottom: "0%",
		[theme.breakpoints.down('sm')]: {
			width: "100%",
			right:"0%",
			left:"0%"
		},
		[theme.breakpoints.up('md')]: {
			width: "80%",
			right:"10%",
			left:"10%"
		},
		[theme.breakpoints.up('lg')]: {
			width: "60%",
			right:"20%",
			left:"20%"
		},
		[theme.breakpoints.up('xl')]: {
			width: "40%",
			right:"30%",
			left:"30%"
		},

	}
}))

export const EBoxPlayer = ({
	url,
	currentTrack,
	playlist_len,
	prev,
	next,
	voteGood,
	voteNeutral,
	voteBad,
	onPlayed,
	onFinished
}) => {
	const classes = useStyles();
	return <>
		<Box className={classes.root}>
			<Paper elevation={6}>
				<Grid container alignItems="center" spacing={2}>
					<Grid item xs={12} style={{paddingBottom:"0"}}>
						<Box display="flex" flexDirection="row">
							<Box>
								<Tooltip title="zurück zum vorherigen Track/Set">
									<IconButton onClick={prev}><SkipPreviousIcon/></IconButton>
								</Tooltip>
								<Tooltip title="zum Nächsten Track/Set">
									<IconButton onClick={next}><SkipNextIcon/></IconButton>
								</Tooltip>
							</Box>
							<Box flexGrow={1}>
								<AudioPlayer variation="default" elevation="0" width="100%" spacing={2}
												 icons={icons} autoplay={true} loop={false}
												 src={url} onPlayed={onPlayed} onFinished={onFinished}/>
							</Box>
							<Box>
								<Tooltip title="Gut bewerten">
									<IconButton size="medium" onClick={voteGood}><ThumbUpIcon/></IconButton>
								</Tooltip>
								<Tooltip title="Durchschnittlich bewerten">
									<IconButton onClick={voteNeutral}><ThumbsUpDownIcon/></IconButton>
								</Tooltip>
								<Tooltip title="Schlecht bewerten">
									<IconButton onClick={voteBad}><ThumbDownIcon/></IconButton>
								</Tooltip>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} style={{paddingTop:"0"}}>
						<Divider/>
						<Box display="flex" alignItems="center" justifyContent="space-between" flexDirection="row">
							<Box ml={2}>
								<Box display="flex" alignItems="center">
									<IconButton><PlaylistPlayIcon/></IconButton>
									<Typography variant={"overline"}>{playlist_len} Track(s)</Typography>
								</Box>
							</Box>
							<Box mr={2}>
								{currentTrack && <Typography variant={"overline"}>{
									"Aktuell: " + (currentTrack.artist ? (currentTrack.artist + " / ") : "")
									+ currentTrack.title}</Typography>}
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	</>
}