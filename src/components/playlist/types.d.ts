import {PlaylistItem} from "../../hooks/types";

type PlaylistRepeat = "single" | "none" | "all";

export interface PlaylistState {
	currentTrack: PlaylistItem | null;
	repeat: PlaylistRepeat;
	showPlaylist: boolean;
}

export interface PlaylistControls {
	addAll: (set: EBoxSet) => void;
	replace: (set: EBoxSet) => void;
	remove: (idx: number) => void;
	clear: () => void;
	shuffle: () => void;
	goto: (number: number) => void;
	next: () => void;
	prev: () => void;
	toggleRepeat: () => void;
	setRepeat: (repeat: PlaylistRepeat) => void;
	items: () => PlaylistItem[];
	curPos: () => number;
	length: () => number;
	hasNext: () => boolean;
	show: () => void;
	hide: () => void;
}