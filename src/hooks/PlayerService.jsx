import {useAtom} from "jotai";
import {currentTrackAtom, notifyMessagAtom, playlistAtom} from "../context/atoms";
import {useMemo} from "react";
import {useJunkiesService} from "./JunkiesService";

function extractNidFromUrl(url) {
	const queryString = url.substr(url.indexOf("?"));
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get("nid");
}

export const usePlayerService = () => {
	const [playlist, setPlaylist] = useAtom(playlistAtom)
	const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom)
	const [, setNotifyMessage] = useAtom(notifyMessagAtom);
	const junkiesApi = useJunkiesService()

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
				setNotifyMessage({
					message: `Die aktuelle Playlist wurde erweitert um #${tracks.length} Tracks aus dem Set ${set.title}.`,
					severity: "success",
					autohide: 3000 })
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
				setNotifyMessage({
					message: `Die aktuelle Playlist wurde ersetzt mit #${tracks.length} Tracks aus dem Set ${set.title}.`,
					severity: "success",
					autohide: 3000 })
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
				junkiesApi.vote(nid, vote)
						.then((set) => setNotifyMessage({
							message: `Das Set ${set.title} wurde erfolgreich mit ${set.votes.my} bewertet.`,
							severity: "success",
							autohide: 3000 }));
			}
		}
	}, [junkiesApi, playlist, currentTrack, setPlaylist, setCurrentTrack, setNotifyMessage]);
}
