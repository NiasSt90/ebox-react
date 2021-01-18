import {PlaylistControls, PlaylistRepeat, PlaylistState} from "../types";
import {EBoxSet, PlaylistItem} from "../../../hooks/types";
import {useAtom} from "jotai";
import {playlistAtom, playlistStateAtom} from "../../../context/atoms";
import {useCallback, useMemo} from "react";

function createPlaylistItems(set: EBoxSet):PlaylistItem[] {
    return set.tracks.map(track => { return {
        nid:set.nid,
        url:track.url,
        artist: track.artist,
        title: track.title,
        myVote: set.myVote,
        artwork: set.artistDetails[0].artwork
    }});
}

export interface IPlaylist {
    state: PlaylistState;
    controls: PlaylistControls;
}

export const usePlaylist = ():IPlaylist => {
    const [playlist, setPlaylist] = useAtom(playlistAtom)
    const [state, setState] = useAtom(playlistStateAtom);
    const mergeToState = useCallback((partState: Partial<PlaylistState>) =>
            setState((cur) => { return {...cur, ...partState}}),
        [setState]);

    const controls: PlaylistControls = useMemo(() => { return {
        addAll: (set: EBoxSet) => {
            let newPlaylistItems: PlaylistItem[] = createPlaylistItems(set)
            let newPlaylist: PlaylistItem[] = [...playlist, ...newPlaylistItems];
            setPlaylist(newPlaylist);
            if (!state.currentTrack && newPlaylist.length > 0) {
                mergeToState({currentTrack: newPlaylist[0]})
            }
        },
        replace: (set: EBoxSet) => {
            let newPlaylist: PlaylistItem[] = createPlaylistItems(set)
            setPlaylist(newPlaylist);
            mergeToState({currentTrack: newPlaylist[0]})
        },
        next: () => {
            let curIndex = state.currentTrack ? playlist.indexOf(state.currentTrack) : -1;
            let newIndex = (curIndex + 1) % playlist.length;
            if (state.shuffle && playlist.length > 2) {
                //TODO: shuffle support
            }
            if (curIndex !== newIndex) {
                console.log("playNext next = ", playlist[newIndex]);
                mergeToState({currentTrack: playlist[newIndex]})
            }
        },
        prev: () => {
            let curIndex = state.currentTrack ? playlist.indexOf(state.currentTrack) : -1;
            let newIndex = (curIndex + (playlist.length - 1)) % playlist.length;
            if (state.shuffle && playlist.length > 2) {
                //TODO: shuffle or history support
            }
            if (curIndex !== newIndex) {
                console.log("playPrev next = ", playlist[newIndex]);
                mergeToState({currentTrack: playlist[newIndex]})
            }
        },
        curPos: () => {
            return state.currentTrack ? playlist.indexOf(state.currentTrack) + 1 : 0;
        },
        length: () => {
            return playlist.length;
        },
        hasNext: () => {
            const pos = state.currentTrack ? playlist.indexOf(state.currentTrack) + 1 : 0;
            switch (state.repeat) {
                case "none": return pos < playlist.length;
                case "single": return state.currentTrack !== undefined;
                case "all": return playlist.length > 0;
            }
        },
        setRepeat: (repeat: PlaylistRepeat) => {
            if (repeat) {
                mergeToState({repeat: repeat});
            }
        },
        toggleRepeat: () => {
            switch (state.repeat) {
                case "single":
                    mergeToState({repeat: "all"});
                    break;
                case "all":
                    mergeToState({repeat: "none"});
                    break;
                case "none":
                    mergeToState({repeat: "single"});
                    break;
            }
        },
        toggleShuffle: () => {
            mergeToState({shuffle: !state.shuffle});
        }
    }}, [state, playlist, setPlaylist, mergeToState])
    return { state, controls };
};