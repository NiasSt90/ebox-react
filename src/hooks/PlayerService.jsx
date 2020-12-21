import {useAtom} from "jotai";
import {currentSetUrlAtom, currentTrackAtom, playlistAtom} from "../context/user";
import {useMemo} from "react";
import {useJunkiesApi} from "./JunkiesApi";

function extractNidFromUrl(url) {
	const queryString = url.substr(url.indexOf("?"));
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get("nid");
}

export const usePlayerService = () => {
	const [playlist, setPlaylist] = useAtom(playlistAtom)
	const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom)
	const junkiesApi = useJunkiesApi()

	return useMemo(() => {
		return {
			enqueue: (set) => {
				const tracks = set.trackinfo
						.map(track => {
							const url = junkiesApi.buildTrackUrl(set.nid, track.downloadfilename);
							return {nid: set.nid, artist: track.artist, title: track.title || set.title, url: url}
						});
				console.log("add to playlist", tracks)
				let newPlaylist = [...playlist, ...tracks];
				setPlaylist(newPlaylist);
				if (!currentTrack && newPlaylist.length > 0) {
					setCurrentTrack(newPlaylist[0]);
				}
			},

			play: (set) => {
				const tracks = set.trackinfo
						.map(track => {
							const url = junkiesApi.buildTrackUrl(set.nid, track.downloadfilename);
							return {nid: set.nid, artist: track.artist, title: track.title || set.title, url: url}
						});
				console.log("replace playlist", tracks)
				setPlaylist(tracks);
				setCurrentTrack(tracks[0]);
			},

			playinform: (url) => {
				console.log("playinform ", url);
				const nid = extractNidFromUrl(url);
				if (nid) {
					junkiesApi.playinform(nid);
				}
			},

			playNext: (url) => {
				console.log("playNext from current ", url);
				const nid = extractNidFromUrl(url);
				const index = playlist.findIndex(s => s.nid === nid)
				const nextIndex = (index + 1) % playlist.length;
				if (index !== nextIndex) {
					console.log("playNext next = ", playlist[nextIndex]);
					setCurrentTrack(playlist[nextIndex]);
				}
			},

			playPrev: (url) => {
				console.log("playPrev from current ", url);
				const nid = extractNidFromUrl(url);
				const index = playlist.findIndex(s => s.nid === nid)
				const nextIndex = (index + (playlist.length - 1)) % playlist.length;
				if (index !== nextIndex) {
					console.log("playNext next = ", playlist[nextIndex]);
					setCurrentTrack(playlist[nextIndex]);
				}
			},

			vote: (url, vote) => {
				console.log(`vote ${vote} for current `, url);
				const nid = extractNidFromUrl(url);
				junkiesApi.vote(nid, vote);
			}
		}
	}, [junkiesApi, playlist, setPlaylist, currentTrack, setCurrentTrack]);
}
