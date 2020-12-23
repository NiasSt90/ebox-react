import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useJunkiesService} from "../../hooks/JunkiesService";
import {useAtom} from "jotai";
import {pageTitleAtom, toolbarSearchInputAtom} from "../../context/atoms";
import {SetCardList} from "./SetCardList";

export const SetCardListContainer = () => {
	const junkiesApi = useJunkiesService()
	const {id} = useParams()
	const [ sets, setSets ] = useState([])
	const [ filterDefinition, setFilterDefinition ] = useState();
	const [ , setPageTitle] = useAtom(pageTitleAtom);
	const [ toolbarSearchInput] = useAtom(toolbarSearchInputAtom);
	const [ searchParams, setSearchParams ] = useState({filterid:id, s:"", page:0});

	const loadNextPage = () => {
		setSearchParams({...searchParams, page: searchParams.page + 1});
	}

	useEffect(() => {
		console.log("Load FilterDEF for Filter", id);
		junkiesApi.filterlist(id).then(res => {
			if (res.length === 1) {
				console.log("Filter", res[0])
				setFilterDefinition(res[0]);
				setPageTitle("Filter " + res[0].filtername);
			}
		})
	}, [])

	useEffect(() => {
		console.log("FETCH NEXT:", searchParams)
		junkiesApi.setlist(searchParams).then(res => {
			setSets([...sets, ...res])
		});
	}, [searchParams])

	useEffect( ()=> {
		console.log("START NEW SEARCH:" + toolbarSearchInput)
		setSets([]);
		setSearchParams({...searchParams, s:toolbarSearchInput, page:0});
	}, [toolbarSearchInput]);


	return <SetCardList sets={sets} filterDefinition={filterDefinition} onNextPage={loadNextPage}/>
}