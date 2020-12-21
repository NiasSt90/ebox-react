import {atom} from "jotai";
import {junkiesApi} from "../service/JunkiesApi";

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
export const notifyMessagAtom = atom();
export const playlistAtom = atom([]);
export const currentTrackAtom = atom();
