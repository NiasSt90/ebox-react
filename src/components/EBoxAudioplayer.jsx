import AudioPlayer from "material-ui-audio-player";
import React from "react";
import {useAtom} from "jotai";
import {playlistAtom} from "../context/user";
import {useJunkiesApi} from "../hooks/JunkiesApi";

export const EBoxAudioplayer = () => {
	const [ playlist ] = useAtom(playlistAtom)
	const junkiesApi = useJunkiesApi();
	const playinform = (e) => {
		console.log("PlayInform ", e.target.currentSrc);
		const queryString = e.target.currentSrc.substr("?");
		const urlParams = new URLSearchParams(queryString);
		const nid = urlParams.get("nid");
		if (nid) {
			junkiesApi.playinform(nid);
		}
	}
	return <>
		<AudioPlayer src={playlist} autoplay={false} loop={true} onPlayed={playinform}/>
	</>
}