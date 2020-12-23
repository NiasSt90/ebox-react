import {useAtom} from "jotai";
import {loadingAtom, userAtom} from "../context/atoms";
import {useMemo} from "react";
import {junkiesApi} from "../api/JunkiesApi";

export const useJunkiesService = () => {
	const [user] = useAtom(userAtom);
	const [, setLoading] = useAtom(loadingAtom);
	return useMemo(() => {
		return {
			buildTrackUrl: (nid, downloadfilename) => {
				return junkiesApi(user).buildTrackUrl(nid, downloadfilename);
			},

			filterlist: (id= null) => {
				return junkiesApi(user).filterlist(id)
						.then(result => {return result.filters;})
			},

			setlist: (searchParams) => {
				setLoading(true)
				return junkiesApi(user).setlist(searchParams)
						.finally(() => setLoading(false))
			},

			playinform: (nid) => {
				return junkiesApi(user).playinform(nid).then(result => result)
			},

			vote: (nid, vote) => {
				return junkiesApi(user).vote(nid, vote).then(result => result)
			},

			bookmark: (nid, createBookmark) => {
				if (createBookmark === true) return junkiesApi(user).addbookmark(nid).then(result => result);
				return junkiesApi(user).delbookmark(nid).then(result => result)
			}
		}
	}, [user, setLoading]);
};
