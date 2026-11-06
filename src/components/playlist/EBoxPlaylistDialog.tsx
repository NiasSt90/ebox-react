import {IPlaylist} from "./hooks/usePlaylist";
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, Divider, IconButton,
	List, ListItem, ListItemAvatar, ListItemButton, ListItemText
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

interface Props {
	playlist: IPlaylist;
}

export const EBoxPlaylistDialog: React.FC<Props> = ({playlist}: Props) => {
	return <>
		<Dialog open={playlist.state.showPlaylist} onClose={playlist.controls.hide}
				  maxWidth={"sm"} fullWidth={true} scroll={"paper"}>
			<DialogTitle>Playlist</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{(playlist.controls.length() === 0) ? "die aktuelle Playlist ist leer": "die aktuelle Playlist"}
				</DialogContentText>
				<List>
					{playlist.controls.items().map((item, idx) => {
						return <React.Fragment key={idx}>
							<ListItem disablePadding secondaryAction={
								<IconButton edge="end" onClick={() => playlist.controls.remove(idx)}><DeleteIcon/></IconButton>
							}>
								<ListItemButton dense={true} alignItems="flex-start"
												onClick={() => playlist.controls.goto(idx)}
												selected={(idx+1) === playlist.controls.curPos()}>
									<ListItemAvatar>
										<Avatar alt={item.artist} src={item.artwork.small}/>
									</ListItemAvatar>
									<ListItemText
										primary={item.artist}
										secondary={item.title}>
									</ListItemText>
								</ListItemButton>
							</ListItem>
							<Divider variant="inset" component="li"/>
						</React.Fragment>
					})}
				</List>
			</DialogContent>
			<DialogActions>
				<Button color="inherit" onClick={playlist.controls.hide}>Close</Button>
				<Button color="primary" onClick={playlist.controls.shuffle} disabled={playlist.controls.length() === 0}>Shuffle</Button>
				<Button color="secondary" onClick={playlist.controls.clear} disabled={playlist.controls.length() === 0}>Clear</Button>
			</DialogActions>
		</Dialog>
	</>
}