import React, {useEffect, useState} from "react";
import {
	Box,
	Grid,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Slider,
	Tooltip,
	Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCommentIcon from '@material-ui/icons/AddComment';
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import FastForwardIcon from '@material-ui/icons/FastForward';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreVert";
import {Repeat, RepeatOne} from "@material-ui/icons";
import {AudioControls, AudioState, PlaylistControls, PlaylistState} from "./types";
import {readableTime} from "../../bundles/common/helper";
import {EBoxVote, PlaylistItem} from "../../hooks/types";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		zIndex: 10,
		bottom: "0%",
		[theme.breakpoints.down('sm')]: {
			width: "100%",
			right: "0%",
			left: "0%"
		},
		[theme.breakpoints.up('md')]: {
			width: "80%",
			right: "10%",
			left: "10%"
		},
		[theme.breakpoints.up('lg')]: {
			width: "60%",
			right: "20%",
			left: "20%"
		},
		[theme.breakpoints.up('xl')]: {
			width: "40%",
			right: "30%",
			left: "30%"
		},
	},
	sliderContainer: {
		flex: '1 1 auto',
		margin: '-16px 8px -8px 8px'
	},
	slider: {
		padding: '0',
	}
}))

interface Props {
	audioState: AudioState;
	audioControls: AudioControls;
	playlistControls: PlaylistControls;
	playlistState: PlaylistState;
	voteFunction: (item: PlaylistItem, vote: EBoxVote) => void;
	startCommentFunction: (item: PlaylistItem) => void;
}

export const EBoxPlayer: React.FC<Props> = ({
	audioState,
	audioControls,
	playlistState,
	playlistControls,
	voteFunction,
	startCommentFunction
}: Props) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<Element | null>();
	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const [seekbarTime, setSeekbarTime] = useState(0);
	useEffect(() => {
		setSeekbarTime(audioState.time)
	}, [audioState.time])

	const onSeekChange = (event: React.ChangeEvent<{}>, progress: number | number[]) => {
		setSeekbarTime(progress as number)
		audioControls.seek(progress as number);
	}

	return <>
		<Paper className={classes.root} elevation={6}>
			<Grid container item justify="space-around" xs={12}>
				<IconButton><PlaylistPlayIcon/></IconButton>
				<Tooltip title={"Repeat " + playlistState.repeat}>
					<IconButton size={"small"} onClick={playlistControls.toggleRepeat}>
						{playlistState.repeat === "single" && <RepeatOne color={"primary"}/>}
						{playlistState.repeat === "all" && <Repeat color={"primary"}/>}
						{playlistState.repeat === "none" && <Repeat color={"disabled"}/>}
					</IconButton>
				</Tooltip>
				<Tooltip title="zurück zum vorherigen Track/Set">
					<IconButton size={"small"} onClick={playlistControls.prev}><SkipPreviousIcon/></IconButton>
				</Tooltip>
				<Tooltip title="30 sec zurück">
					<IconButton size={"small"}
									onClick={() => audioControls.seek(audioState.time - 30)}><FastRewindIcon/></IconButton>
				</Tooltip>

				{audioState.paused && <Tooltip title="Play">
					<IconButton size={"small"} onClick={audioControls.play}><PlayArrowIcon/></IconButton>
				</Tooltip>}
				{!audioState.paused && <Tooltip title="Pause">
					<IconButton size={"small"} onClick={audioControls.pause}><PauseIcon/></IconButton>
				</Tooltip>}

				<Tooltip title="30 sec vorwärts">
					<IconButton size={"small"}
									onClick={() => audioControls.seek(audioState.time + 30)}><FastForwardIcon/></IconButton>
				</Tooltip>
				<Tooltip title="zum Nächsten Track/Set">
					<IconButton size={"small"} onClick={playlistControls.next}><SkipNextIcon/></IconButton>
				</Tooltip>
				<Tooltip title={"Shuffle " + (playlistState.shuffle ? "enabled" : "disabled")}>
					<IconButton size={"small"} onClick={playlistControls.toggleShuffle}>
						<ShuffleIcon color={playlistState.shuffle ? "primary" : "disabled"}/>
					</IconButton>
				</Tooltip>
				{playlistState.currentTrack && <Tooltip title="Weitere Aktionen">
					<IconButton size={"small"} onClick={handleClick}><MoreIcon/></IconButton>
				</Tooltip>}
			</Grid>

			{playlistState.currentTrack &&
			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem onClick={() => {
					startCommentFunction(playlistState.currentTrack!);
					handleClose()
				}}>
					<ListItemIcon><AddCommentIcon/></ListItemIcon>
					<ListItemText>Kommentieren</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => {
					voteFunction(playlistState.currentTrack!, "good");
					handleClose()
				}}>
					<ListItemIcon><ThumbUpIcon/></ListItemIcon>
					<ListItemText>gut bewerten</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => {
					voteFunction(playlistState.currentTrack!, "neutral");
					handleClose()
				}}>
					<ListItemIcon><ThumbsUpDownIcon/></ListItemIcon>
					<ListItemText>mittelmäßig bewerten</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => {
					voteFunction(playlistState.currentTrack!, "bad");
					handleClose()
				}}>
					<ListItemIcon><ThumbDownIcon/></ListItemIcon>
					<ListItemText>schlecht bewerten</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => {
					voteFunction(playlistState.currentTrack!, "canceled");
					handleClose()
				}}>
					<ListItemIcon><HighlightOffIcon/></ListItemIcon>
					<ListItemText>Bewertung entfernen</ListItemText>
				</MenuItem>
			</Menu>
			}
			<Divider/>

			<Grid container item direction="column" justify="flex-start" xs={12}>
				<Grid item>
					<Box display="flex" justifyContent="space-between">
						<Box pl={1} pr={1}>
							<Typography noWrap variant={"overline"}>{playlistControls.curPos() + "/"
							+ playlistControls.length()} Track(s)</Typography>
						</Box>
						<Box pr={1} style={{display: "inline-grid"}}>
							{playlistState.currentTrack && <Typography noWrap component={"span"} variant={"overline"}>{
								(playlistState.currentTrack.artist ? (playlistState.currentTrack.artist + " / ") : "")
								+ playlistState.currentTrack.title}</Typography>}
						</Box>
					</Box>
				</Grid>

				<Grid item className={classes.sliderContainer}>
					<Slider classes={{root: classes.slider}}
							  min={0} max={audioState.duration}
							  value={seekbarTime}
							  valueLabelDisplay={"off"}
							  valueLabelFormat={(value: number, index: number) => readableTime(value)}
							  onChange={onSeekChange}
					/>
				</Grid>

				<Grid container item justify="space-between">
					<Box pl={1}>
						<Typography variant={"overline"}>{readableTime(audioState.time)}</Typography>
					</Box>
					<Box pr={1}>
						<Typography variant={"overline"}>{readableTime(
							audioState.duration - audioState.time)}</Typography>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	</>
}