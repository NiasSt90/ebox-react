import {Box, Paper, Tooltip, Typography} from "@material-ui/core";
import AudioPlayer from "material-ui-audio-player";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import React from "react";

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
	return <>
		<Box position="fixed" bottom="0%" right="10%" left="10%" width="80%" zIndex={10}>
			<Paper>
				<AudioPlayer variation="primary" elevation="0" width="100%"
								 autoplay={true} loop={false}
								 src={url} onPlayed={onPlayed} onFinished={onFinished}/>
				<Typography variant={"overline"}>{playlist_len} Tracks in der Playlist</Typography>

				<Tooltip title="Gut bewerten">
					<IconButton onClick={voteGood}><ThumbUpIcon/></IconButton>
				</Tooltip>
				<Tooltip title="Durchschnittlich bewerten">
					<IconButton onClick={voteNeutral}><ThumbsUpDownIcon/></IconButton>
				</Tooltip>
				<Tooltip title="Schlecht bewerten">
					<IconButton onClick={voteBad}><ThumbDownIcon/></IconButton>
				</Tooltip>
				<Tooltip title="zurück zum vorherigen Track/Set">
					<IconButton onClick={prev}><SkipPreviousIcon/></IconButton>
				</Tooltip>
				<Tooltip title="zum Nächsten Track/Set">
					<IconButton onClick={next}><SkipNextIcon/></IconButton>
				</Tooltip>
				{currentTrack && <Typography paragraph variant={"overline"}>{
					"Aktuell gespielt: " + (currentTrack.artist ? (currentTrack.artist + " / ") : "")
					+ currentTrack.title}</Typography>}

			</Paper>
		</Box>
	</>
}