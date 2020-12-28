import {useAtom} from "jotai";
import {userAtom} from "../context/atoms";
import {useMemo} from "react";
import {junkiesApi} from "../api/JunkiesApi";

export const useArtistService = () => {
	const [user] = useAtom(userAtom);
	return useMemo(() => {
		return {
			artistInfo: (artistnid) => {
				if (sessionStorage.getItem("artist_" + artistnid)) {
					return Promise.resolve(JSON.parse(sessionStorage.getItem("artist_" + artistnid)));
				}
				return junkiesApi(user).artistinfo(artistnid)
						.then(info => {
							sessionStorage.setItem("artist_" + artistnid, JSON.stringify(info));
							return info;
						});
			}
		}
	}, [user]);
};