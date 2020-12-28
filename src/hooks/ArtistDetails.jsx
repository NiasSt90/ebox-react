import {useArtistService} from "./ArtistService";
import {useEffect, useState} from "react";

export const defaultImageUrl = process.env.PUBLIC_URL + "/images/dj_silhouette.png";

export const useArtistDetails = ({artists}) => {
	const artistService = useArtistService();
	const [artistDetails, setArtistDetails] = useState([]);

	useEffect(() => {
		artists.map(artistID =>
				artistService.artistInfo(artistID).then((artistInfo) => {
					let data = {
						nid: artistInfo.nid,
						djid: artistInfo.id,
						name: artistInfo.name,
						images: {
							small: defaultImageUrl,
							large: defaultImageUrl,
							extralarge: defaultImageUrl,
							mega: defaultImageUrl
						}
					};
					if (artistInfo && artistInfo["lastfm_artistinfo"]) {
						const images = artistInfo["lastfm_artistinfo"]["image"]
											|| [];
						if (images) {
							images.forEach(img => data.images[img.size] = img["#text"])
						}
						data.name = artistInfo["lastfm_artistinfo"]["name"];
					}
					setArtistDetails((curData) => [...curData && [...curData], data]);
				})
		)
	}, [artistService, artists])
	return artistDetails;
}