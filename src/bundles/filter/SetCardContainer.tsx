import {useEffect, useState} from "react";
import {useArtistDetails} from "../../hooks/useArtistDetails";
import {EBoxSet} from "../../hooks/types";
import SetCard from "./SetCard";
import {usePlaylist} from "../../components/player/hooks/usePlaylist";
import {useJunkiesService} from "../../hooks/useJunkiesService";

interface Props {
	nummer: number;
	cardData: EBoxSet;
}

export const SetCardContainer = ({nummer, cardData }:Props) => {
	const playlist = usePlaylist();
	const junkiesService = useJunkiesService();
	const artistDetails = useArtistDetails({artists:cardData.artists});
	const [ details, setDetails ] = useState<EBoxSet>(cardData);

	useEffect(() => {
		let mounted = true;
		if (artistDetails.length > 0 && mounted) {
			setDetails((details) => {
				return {...details, artistDetails: artistDetails}
			})
		}
		return () => {mounted = false;}
	}, [artistDetails])

	const enqueueAction = () => {
		playlist.controls.addAll(details)
	}
	const playAction = () => {
		playlist.controls.replace(details)
	}
	const bookmarkAction = () => {
		junkiesService.bookmark(details.nid, !details.bookmarked)
			.then(() => setDetails({...details, bookmarked: !details.bookmarked}))
	}
	return <SetCard nummer={nummer} cardData={details}
					playAction={playAction} enqueueAction={enqueueAction} bookmarkAction={bookmarkAction}/>
}