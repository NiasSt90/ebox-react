import {useEffect, useMemo, useState} from "react";
import {ArtistImageSizes, EBoxArtist} from "./types";
import {useAtom} from "jotai";
import {userAtom} from "../context/atoms";
import {junkiesApi} from "../api/JunkiesApi";

export const defaultImageUrl = process.env.PUBLIC_URL + "/images/dj_silhouette.png";

interface Props {
	artists: number[];
}

export const useArtistDetails = ({artists}:Props):EBoxArtist[] => {
	const artistService = useArtistService();
	const [artistDetails, setArtistDetails] = useState<EBoxArtist[]>([] as EBoxArtist[]);

	useEffect(() => {
		artists.map(artistID =>
				artistService.artistInfo(artistID).then((artistInfo) => {
					let data:EBoxArtist = {
						nid: artistInfo.nid,
						djid: artistInfo.id,
						name: artistInfo.name,
						artwork: {
							small: defaultImageUrl,
							large: defaultImageUrl,
							extralarge: defaultImageUrl,
							mega: defaultImageUrl
						}
					};
					if (artistInfo && artistInfo["lastfm_artistinfo"]) {
						const images = artistInfo["lastfm_artistinfo"]["image"] || [];
						if (images) {
							images.forEach((img:any) => data.artwork[img.size as ArtistImageSizes] = img["#text"])
						}
						data.name = artistInfo["lastfm_artistinfo"]["name"];
					}
					setArtistDetails((curData) => [...curData && [...curData], data]);
				})
		)
	}, [artistService, artists])
	return artistDetails;
}

//@deprecated
const useArtistService = () => {
	const [user] = useAtom(userAtom);
	return useMemo(() => {
		return {
			artistInfo: (artistnid:number) => {
				if (sessionStorage.getItem("artist_" + artistnid)) {
					return Promise.resolve(JSON.parse(sessionStorage.getItem("artist_" + artistnid) as string));
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
