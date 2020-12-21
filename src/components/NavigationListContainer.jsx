import React, {useEffect, useState} from "react";
import {useJunkiesService} from "../hooks/JunkiesService";
import {NavigationList} from "./NavigationList";

export const NavigationListContainer = () => {
	const junkiesApi = useJunkiesService()
	const [filter, setFilter] = useState([])
	useEffect(() => {
		junkiesApi.filterlist()
				.then((res) => {
					const newFilters = res.filter(f => f.filtername !== "")
							.map(f => ({id: f.filterid, name:f.filtername, user: !f.is_preset}));
					setFilter(newFilters)
				});
	}, [junkiesApi,setFilter])

	return <>
		<NavigationList filters={filter}/>
	</>
}
