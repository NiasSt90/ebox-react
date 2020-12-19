import {useEffect, useState} from "react";
import {FilterListSet} from "./FilterListSet";
import {useParams} from "react-router";
import {Grid} from "@material-ui/core";
import {useJunkiesApi} from "../hooks/JunkiesApi";

export const FilterListMainView = () => {
	const junkiesApi = useJunkiesApi()
	const {id} = useParams()
	const [ sets, setSets ] = useState([])

	useEffect(() => {
		junkiesApi.setlist({filterid:id}).then((res) => setSets(res));
	}, [id, setSets, junkiesApi])

	return <>
		<h3>Sets im Filter</h3>
		<Grid container spacing={3}>
			{sets && sets.map((set, i) =>
				<Grid key={i} item xs><FilterListSet set={set}/></Grid>)
			}
		</Grid>
	</>
}
