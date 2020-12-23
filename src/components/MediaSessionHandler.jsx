import {useAtom} from "jotai";
import {currentTrackAtom} from "../context/atoms";
import {useEffect} from "react";
import {useArtistService} from "../hooks/ArtistService";
import {usePlayerService} from "../hooks/PlayerService";

export const MediaSessionHandler = () => {
	const [currentTrack] = useAtom(currentTrackAtom)
	const artistService = useArtistService();
	const playerService = usePlayerService()
	useEffect(() => {
		if (currentTrack && 'mediaSession' in navigator) {
			console.log("MEDIASESSION im Browser vorhanden.")
			if (currentTrack.artistID) {
				artistService.artistInfo(currentTrack.artistID)
						.then(info => artistService.imageUrl(info, "extralarge"))
						.then((url) => {
							navigator.mediaSession.metadata = new window.MediaMetadata({
								title: currentTrack.title,
								artist: currentTrack.artist,
								artwork: [{src: url, sizes: '512x512', type: 'image/jpg'}]
							});
						});
			}
			else {
				navigator.mediaSession.metadata = new window.MediaMetadata({
					title: currentTrack.title,
					artist: currentTrack.artist
				});
			}
			navigator.mediaSession.setActionHandler('play', function() { console.log("mediaSession::PLAY")});
			navigator.mediaSession.setActionHandler('pause', function() { console.log("mediaSession::PAUSE") });
			navigator.mediaSession.setActionHandler('stop', function() { console.log("mediaSession::STOP") });
			navigator.mediaSession.setActionHandler('seekbackward', function() { /* Code excerpted. */ });
			navigator.mediaSession.setActionHandler('seekforward', function() { /* Code excerpted. */ });
			navigator.mediaSession.setActionHandler('seekto', function() { /* Code excerpted. */ });
			navigator.mediaSession.setActionHandler('previoustrack', function() {
				playerService.playPrev(currentTrack.url)
			});
			navigator.mediaSession.setActionHandler('nexttrack', function() {
				playerService.playNext(currentTrack.url)
			});
			//navigator.mediaSession.setActionHandler('skipad', function() { /* Code excerpted. */ });
		}
	}, [currentTrack]);
	return <>
		</>
}