import AudioPlayer from "material-ui-audio-player";
import React from "react";
import {useAtom} from "jotai";
import {playlistAtom} from "../context/user";

export const EBoxAudioplayer = () => {
	const [ playlist ] = useAtom(playlistAtom)
	return <>
		<AudioPlayer src={playlist} autoplay={true} loop={true}/>
	</>
}