import {useEffect, useState} from "react";
import {useJunkiesService} from "../hooks/useJunkiesService";
import {NavigationList} from "./NavigationList";
import {useAtom} from "jotai";
import {filterVersionAtom} from "../context/atoms";

export const NavigationListContainer = () => {
	const junkiesApi = useJunkiesService()
	const [filter, setFilter] = useState([])
	const [filterVersion] = useAtom(filterVersionAtom)
	useEffect(() => {
		junkiesApi.filterlist()
				.then((res) => {
					const newFilters = res.filter(f => f.filtername !== "")
							.map(f => ({id: f.filterid, name:f.filtername, user: !f.is_preset}));
					setFilter(newFilters)
				});
	}, [junkiesApi,setFilter,filterVersion])

	return <>
		<NavigationList filters={filter}/>
	</>
}
