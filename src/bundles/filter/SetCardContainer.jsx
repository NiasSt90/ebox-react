import {useArtistApi} from "../../hooks/ArtistApi";
import {useEffect, useState} from "react";
import {usePlayerService} from "../../hooks/PlayerService";
import SetCard2 from "./SetCard2";


const defaultImageUrl = process.env.PUBLIC_URL+"/images/dj_silhouette.png";

//SHOW:
// 1. set.title/replacetitle (mehrere djs
// 2. Genres
// 3. Artists-Bilder oder Geist
// 4. Kommentare
// 5. Bookmark, Playcounts,
export const SetCardContainer = ({nummer,set}) => {
	const artistApi = useArtistApi();
	const playerService = usePlayerService()
	const [ artistImage, setArtistImage ] = useState(defaultImageUrl);
	const artistID = set.artists && set.artists[0] && set.artists[0]["artistnid"];

	useEffect(() => {
		artistID ? artistApi.artistInfo(artistID)
						.then(info => artistApi.imageUrl(info, "large", defaultImageUrl))
						.then(setArtistImage)
					: setArtistImage(defaultImageUrl);
	}, [artistApi,artistID,artistImage,setArtistImage])

	const enqueueAction = () => {
		playerService.enqueue(set);
	}
	const playAction = () => {
		playerService.play(set);
	}
	let genres = [];
	if (set.taxonomy) {
		genres = Object.values(set.taxonomy).map(t => ({name: t.name, tid: t.tid}));
	}

	const props = {nummer, set, artistImage, genres, playAction, enqueueAction};
	return <SetCard2 {...props}/>
}