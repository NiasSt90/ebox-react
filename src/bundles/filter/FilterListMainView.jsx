import {useEffect, useState} from "react";
import {SetCardContainer} from "./SetCardContainer";
import {useParams} from "react-router";
import {Grid} from "@material-ui/core";
import {useJunkiesService} from "../../hooks/JunkiesService";
import {Waypoint} from "react-waypoint";
import {useAtom} from "jotai";
import {notifyMessageAtom, pageTitleAtom, showToolbarSearchAtom, toolbarSearchInputAtom} from "../../context/atoms";

export const FilterListMainView = () => {
	const junkiesApi = useJunkiesService()
	const {id} = useParams()
	const [ sets, setSets ] = useState([])
	const [ page, setPage ] = useState(0)
	const [ pageTitle, setPageTitle] = useAtom(pageTitleAtom);
	const [ notifyMessage, setNotifyMessage] = useAtom(notifyMessageAtom);
	const [ toolbarSearchInput, setToolbarSearchInput] = useAtom(toolbarSearchInputAtom);

	useEffect(() => {
		console.log(`FETCH: filterID=${id} page=${page}`)
		junkiesApi.setlist({filterid:id, page: page})
				.then(res => {setSets([...sets, ...res])});
	}, [id, page, setSets, junkiesApi])

	useEffect( ()=> {
		console.log("START SEARCH FOR:" + toolbarSearchInput)
		if (toolbarSearchInput)
		setNotifyMessage({
			message: `Search for ${toolbarSearchInput} ... Not yet implemented`,
			severity: "warning",
			autohide: 1000 })
	}, [toolbarSearchInput, setNotifyMessage])

	return <>
		<h3>Sets im Filter</h3>
		<Grid container spacing={3} direction="row" justify="space-evenly" alignItems="stretch">
			{sets && sets.map((set, i) =>
				<Grid key={i} item xs>
					<SetCardContainer nummer={i + 1} set={set}/>
					{i === sets.length - 10 && (
						<Waypoint onEnter={() => setPage(page + 1)}/>)
					}
				</Grid>)
			}
		</Grid>
	</>
}
