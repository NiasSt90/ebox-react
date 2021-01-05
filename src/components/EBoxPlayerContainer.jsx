import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {currentTrackAtom, playlistAtom} from "../context/atoms";
import {usePlayerService} from "../hooks/PlayerService";
import {EBoxPlayer} from "./EBoxPlayer";
import {MediaSessionHandler} from "./MediaSessionHandler";


export const EBoxPlayerContainer = () => {
	const [ action, setAction ] = useState();
	const [ currentTrack ] = useAtom(currentTrackAtom)
	const [ playlist ] = useAtom(playlistAtom)
	const player = usePlayerService();
	let url = null;
	if (currentTrack && currentTrack.url) {
		url = currentTrack.url;
	}

	useEffect(() => {
		if (action) {
			const url = action.url;
			const type = action.type;
			if (type && url) {
				switch (action.type) {
					case "inform":
						player.playinform(url);
						break;
					case "next":
						player.playNext(url);
						break;
					case "prev":
						player.playPrev(url);
						break;
					case "vote_up":
						player.vote(url, 5);
						break;
					case "vote_medium":
						player.vote(url, 3);
						break;
					case "vote_down":
						player.vote(url, 1);
						break;
					default:
						console.warn("nicht behandelte player action", action);
				}
			}
			setAction(null);
		}
	}, [player, action, setAction]);

	return <>
		<MediaSessionHandler/>
		<EBoxPlayer url={url} currentTrack={currentTrack} playlist_len={playlist.length}
						onPlayed={() => setAction({type: "inform", url: url})}
						onFinished={() => setAction({type: "next", url: url})}
						next={() => setAction({type: "next" , url: url})}
						prev={() => setAction({type: "prev" , url: url})}
						voteGood={() => setAction({type: "vote_up" , url: url})}
						voteNeutral={() => setAction({type: "vote_medium" , url: url})}
						voteBad={() => setAction({type: "vote_down" , url: url})}
		/>
	</>
}