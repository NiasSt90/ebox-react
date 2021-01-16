import {useEffect, useState} from "react";
import {AudioState, PlaylistState} from "../types";
import {PlaylistItem} from "../../../hooks/types";

export const notifyImageUrl = process.env.PUBLIC_URL + "/images/manitobateam.png";

export interface Props {
	playlistState: PlaylistState;
	audioState: AudioState;
}

export interface IDesktopNotify {
}

type VoteReminderState = "START" | "PLAYING" | "REMIND" | "FINISHED";
type VoteReminderEvents = "@Start" | "@Middle" | "@End" | "@Notify"

interface VoteReminderMap {
	[nid: number]: VoteReminderState;
}

function nextVoteState(state: VoteReminderState, event: VoteReminderEvents): VoteReminderState {
	switch (state) {
		case "START":
			return event === "@Middle" ? "PLAYING" : state;
		case "PLAYING":
			return event === "@End" ? "REMIND" : state;
		case "REMIND":
			return event === "@Notify" ? "FINISHED" : state;
		case "FINISHED":
			return event === "@Start" ? "START" : state;
	}
	return state;
}

function sendNotification(item: PlaylistItem) {
	let options: NotificationOptions = {
		body: `Das gerade gehörte Set ${item.title} wurde noch nicht bewertet.\nJetzt bewerten und dann bessere Vorschläge bekommen..`,
		renotify: false,
		icon: notifyImageUrl,
		dir: "ltr"
	};
	new Notification("Vote-Reminder", options)
}

export const useVoteReminder = ({playlistState, audioState}: Props): IDesktopNotify => {
	const [voteReminders, setVoteReminders] = useState<VoteReminderMap>({});

	//ask for permission to notify at mount time
	useEffect(() => {
		if (!("Notification" in window) || Notification.permission === "granted") {
			return
		}
		if (Notification.permission !== "denied") {
			Notification.requestPermission();
		}
	}, []);

	//State-Machine Handling
	useEffect(() => {
		if (playlistState.currentTrack?.nid) {
			const nid = playlistState.currentTrack?.nid;
			let curState: VoteReminderState = voteReminders[nid];
			if (!curState) {
				setVoteReminders((cur) => {
					return {[nid]: "START"}
				});
				return;
			}
			const curProgress = 100 * audioState.time / audioState.duration;
			//create Event, one of "@Start" "@Middle" or "@End", based on progress
			let curEvent: VoteReminderEvents = curProgress < 10 ? "@Start" : curProgress > 90 ? "@End" : "@Middle";
			let nextState: VoteReminderState = nextVoteState(curState, curEvent);
			if (curState !== nextState) {
				setVoteReminders((cur) => {
					return {...cur, [nid]: nextState}
				});
			}
		}
	}, [voteReminders, audioState.time, audioState.duration, playlistState.currentTrack?.nid]);

	//send notify if needed and possible and not already done for this set.
	useEffect(() => {
		const nid = playlistState.currentTrack?.nid as number;
		let curState: VoteReminderState = voteReminders[nid as number];
		if (curState === "REMIND") {
			if (Notification.permission === "granted" &&
				playlistState.currentTrack && playlistState.currentTrack.myVote === undefined) {
				sendNotification(playlistState.currentTrack);
			}
			let nextState = nextVoteState(curState, "@Notify")
			setVoteReminders((cur) => {
				return {[nid]: nextState}
			})
		}
	}, [voteReminders, playlistState.currentTrack])
	return {}
}

