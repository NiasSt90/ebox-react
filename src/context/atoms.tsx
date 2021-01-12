import {atom} from "jotai";
import {junkiesApi} from "../api/JunkiesApi";
import {NotifyMessage, PlaylistItem} from "../hooks/types";
import {PlaylistState} from "../components/player/types";

const localUserAtom = atom(JSON.parse(localStorage.getItem("user") ?? '{}'));
export const userAtom = atom(
		async get => {
			let sessionRes = await junkiesApi(get(localUserAtom)).connect();
			console.log("Session from Server" , sessionRes);
			return sessionRes.user;
		},
		(_get, set, update) => {
			set(localUserAtom, update);
			localStorage.setItem("user", JSON.stringify(update))
		}
);

export const loadingAtom = atom(false);
export const notifyMessageAtom = atom<NotifyMessage | null>(null);

export const playlistAtom = atom<PlaylistItem[]>([] as PlaylistItem[]);
export const playlistStateAtom = atom<PlaylistState>({
	currentTrack: null,
	repeat: "all",
	shuffle: false,
});

export const pageTitleAtom = atom("Home");
export const showToolbarSearchAtom = atom(true);
export const toolbarSearchInputAtom = atom("");
export const darkStateAtom = atom(false);