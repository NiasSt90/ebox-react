import {useArtistService} from "../../hooks/ArtistService";
import {useEffect, useState} from "react";
import {usePlayerService} from "../../hooks/PlayerService";
import SetCard from "./SetCard";


const defaultImageUrl = process.env.PUBLIC_URL+"/images/dj_silhouette.png";

//SHOW:
// 1. set.title/replacetitle (mehrere djs
// 2. Genres
// 3. Artists-Bilder oder Geist
// 4. Kommentare
// 5. Bookmark, Playcounts,
export const SetCardContainer = ({nummer, set }) => {
	const artistApi = useArtistService();
	const playerService = usePlayerService()
	const [ artistImage, setArtistImage ] = useState(defaultImageUrl);
	const [ details, setDetails ] = useState(set);
	const artistID = set.artists && set.artists[0] && set.artists[0]["artistnid"];
	let genres = [];
	if (details.taxonomy) {
		genres = Object.values(details.taxonomy).map(t => ({name: t.name, tid: t.tid}));
	}

	useEffect(() => {
		artistID ? artistApi.artistInfo(artistID)
						.then(info => artistApi.imageUrl(info, "large", defaultImageUrl))
						.then(setArtistImage)
					: setArtistImage(defaultImageUrl);
	}, [artistApi,artistID,artistImage,setArtistImage])

	const enqueueAction = () => {
		playerService.enqueue(details);
	}
	const playAction = () => {
		playerService.play(details);
	}
	const bookmarkAction = () => {
		playerService.toggleBookmark(details).then((details) => {
			setDetails(details)
		});
	}
	const props = {nummer, set:details, artistImage, genres, playAction, enqueueAction, bookmarkAction};
	return <SetCard {...props}/>
}