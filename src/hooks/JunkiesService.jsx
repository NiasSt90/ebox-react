import {useAtom} from "jotai";
import {loadingAtom, userAtom} from "../context/atoms";
import {useMemo} from "react";
import {junkiesApi} from "../api/JunkiesApi";
import {defaultImageUrl} from "./ArtistDetails";

//convert from json format to our own format (reduced)
function mapFromJsonSetlist(api, jsonSetList) {
	return jsonSetList.map(set => {
		return {
			nid: set.nid,
			title: set.title,
			artists: set.artists.map(a => a.artistnid),
			duration: new Date(set.duration * 1000),
			created: new Date(set.setcreated * 1000),
			...set.lastheard && {lastheard: new Date(set.lastheard * 1000)},

			bookmarked: set.bookmarked,
			...set.taxonomy && {genres:  Object.values(set.taxonomy).map(t => ({name: t.name, tid: t.tid}))},

			tracks: set.trackinfo.map(track => { return {
				nid: set.nid,
				title: track.title || set.title,
				artist: track.artist,
				url: api.buildTrackUrl(set.nid, track.downloadfilename),
			}}),

			artistDetails:[{
				id: 0,
				images: {
					small: defaultImageUrl,
					large: defaultImageUrl,
					extralarge: defaultImageUrl,
					mega: defaultImageUrl
				}
			}]
		}
	})
}

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
						.then(sets => mapFromJsonSetlist(junkiesApi(user), sets))
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
