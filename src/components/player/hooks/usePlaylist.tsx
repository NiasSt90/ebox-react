import {PlaylistControls, PlaylistState} from "../types";
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

export const usePlaylist = () => {
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
            //TODO: shuffle support
            let curIndex = state.currentTrack ? playlist.indexOf(state.currentTrack) : -1;
            const newIndex = (curIndex + 1) % playlist.length;
            if (curIndex !== newIndex) {
                console.log("playNext next = ", playlist[newIndex]);
                mergeToState({currentTrack: playlist[newIndex]})
            }
        },
        prev: () => {
            //TODO: shuffle/historie support
            let curIndex = state.currentTrack ? playlist.indexOf(state.currentTrack) : -1;
            const newIndex = (curIndex + (playlist.length - 1)) % playlist.length;
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