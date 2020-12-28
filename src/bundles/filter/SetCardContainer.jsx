import {useEffect, useState} from "react";
import {usePlayerService} from "../../hooks/PlayerService";
import SetCard from "./SetCard";
import {useArtistDetails} from "../../hooks/ArtistDetails";

export const SetCardContainer = ({nummer, cardData }) => {
	const playerService = usePlayerService()
	const artistDetails = useArtistDetails({artists:cardData.artists});
	const [ details, setDetails ] = useState(cardData);

	useEffect(() => {
		if (artistDetails.length > 0) {
			//console.log("Update ArtistDetails1", nummer, artistDetails)
			setDetails((details) => {return {...details, artistDetails: artistDetails}})
		}
		else {
			//console.log("empty ArtistDetails", nummer);
		}
	}, [artistDetails])

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
	const props = {nummer, cardData:details, playAction, enqueueAction, bookmarkAction};
	return <SetCard {...props}/>
}