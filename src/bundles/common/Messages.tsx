import {EBoxVote} from "../../hooks/types";

export const Messages = {
	voteMsg: (vote: EBoxVote):string => {
		switch (vote) {
			case "canceled": return "Die Bewertung für das Set wurde entfernt!";
			case "good": return "Das aktuelle Set wurde mit gut bewertet!";
			case "neutral": return "Das aktuelle Set wurde neutral bewertet!";
			case "bad": return "Das aktuelle Set wurde als schlecht bewertet!";
		}
	}
}