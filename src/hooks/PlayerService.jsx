import {useAtom} from "jotai";
import {playlistAtom} from "../context/user";
import {useMemo} from "react";
import {useJunkiesApi} from "./JunkiesApi";

export const usePlayerService = () => {
	const [ playlist, setPlaylist ] = useAtom(playlistAtom)
	const junkiesApi = useJunkiesApi()

	return useMemo(() => {
		return {
			enqueue: (set) => {
				const tracks = set.trackinfo
						.map(track => junkiesApi.buildTrackUrl(set.nid, track.downloadfilename));
				setPlaylist([...playlist, ...tracks]);
			},
			play: (set) => {
				const tracks = set.trackinfo
						.map(track => junkiesApi.buildTrackUrl(set.nid, track.downloadfilename));
				setPlaylist(tracks);
			}
		}
	}, [junkiesApi, playlist, setPlaylist]);
}