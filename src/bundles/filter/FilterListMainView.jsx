import {useEffect, useState} from "react";
import {FilterListSet} from "./FilterListSet";
import {useParams} from "react-router";
import {Grid} from "@material-ui/core";
import {useJunkiesApi} from "../../hooks/JunkiesApi";
import {Waypoint} from "react-waypoint";

export const FilterListMainView = () => {
	const junkiesApi = useJunkiesApi()
	const {id} = useParams()
	const [ sets, setSets ] = useState([])
	const [ page, setPage ] = useState(0)
	const currentSets = sets;

	useEffect(() => {
		console.log(`FETCH: filterID=${id} page=${page}`)
		junkiesApi.setlist({filterid:id, page: page})
				.then(res => {
					setSets([...currentSets, ...res])
				});
	}, [id, page, setSets, junkiesApi])

	return <>
		<h3>Sets im Filter</h3>
		<Grid container spacing={3}
				direction="row"
				justify="space-evenly"
				alignItems="stretch">
			{sets && sets.map((set, i) =>
				<Grid key={i} item xs>
					<FilterListSet nummer={i + 1} set={set}/>
					{i === sets.length - 10 && (
						<Waypoint onEnter={() => setPage(page + 1)}/>)
					}
				</Grid>)
			}
		</Grid>
	</>
}