import {useAtom} from "jotai";
import {loadingAtom, userAtom} from "../context/atoms";
import {useMemo} from "react";
import {junkiesApi} from "../api/JunkiesApi";

export const useArtistService = () => {
	const [user] = useAtom(userAtom);
	const [, setLoading] = useAtom(loadingAtom);
	return useMemo(() => {
		return {
			artistInfo: (artistnid) => {
				if (sessionStorage.getItem("artist_" + artistnid)) {
					return Promise.resolve(JSON.parse(sessionStorage.getItem("artist_" + artistnid)));
				}
				setLoading(true);
				return junkiesApi(user).artistinfo(artistnid)
						.finally(() => setLoading(false))
						.then(info => {
							sessionStorage.setItem("artist_" + artistnid, JSON.stringify(info));
							return info;
						});
			},
			largestImageUrl: (artistInfo, defUrl) => {
				const images = artistInfo && artistInfo["lastfm_artistinfo"] && artistInfo["lastfm_artistinfo"]["image"];
				if (images && images.length > 0) {
					const image = images.filter(img => img["#text"])
							.sort((a, b) => imageSize[b.size] - imageSize[a.size]);
					if (image && image.length > 0) return Promise.resolve(image[0]["#text"]);
				}
				return Promise.resolve(defUrl);
			},
			imageUrl: (artistInfo, size, defUrl) => {
				const images = artistInfo && artistInfo["lastfm_artistinfo"] && artistInfo["lastfm_artistinfo"]["image"];
				if (images && images.length > 0) {
					const image = images.filter(img => img["#text"]).filter(img => img.size === size);
					if (image && image.length > 0) return Promise.resolve(image[0]["#text"]);
				}
				return Promise.resolve(defUrl);
			}
		}
	}, [user, setLoading]);
};

const imageSize = {
	"mega": 100,
	"extralarge": 50,
	"large": 30,
	"small": 10
}