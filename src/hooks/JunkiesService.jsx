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

			filterlist: () => {
				setLoading(true);
				return junkiesApi(user).filterlist()
						.finally(() => setLoading(false))
						.then(result => {
							return result.filters;
						})
			},

			setlist: (searchParams) => {
				setLoading(true)
				return junkiesApi(user).setlist(searchParams)
						.finally(() => setLoading(false))
						.then(result => {
							return result;
						})
			},

			playinform: (nid) => {
				return junkiesApi(user).playinform(nid).then(result => result)
			},

			vote: (nid, vote) => {
				return junkiesApi(user).vote(nid, vote).then(result => result)
			}
		}
	}, [user, setLoading]);
};
