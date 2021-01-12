import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useJunkiesService} from "../../hooks/useJunkiesService";
import {useAtom} from "jotai";
import {pageTitleAtom, toolbarSearchInputAtom} from "../../context/atoms";
import {SetCardList} from "./SetCardList";
import {EBoxFilter, EBoxSearchParams, EBoxSet} from "../../hooks/types";

export const SetCardListContainer = () => {
	const junkiesApi = useJunkiesService()
	const {id} = useParams<any>()
	const [ sets, setSets ] = useState<EBoxSet[]>([] as EBoxSet[])
	const [ filterDefinition, setFilterDefinition ] = useState<EBoxFilter|undefined>();
	const [ , setPageTitle] = useAtom(pageTitleAtom);
	const [ toolbarSearchInput ] = useAtom<string>(toolbarSearchInputAtom);
	const [ searchParams, setSearchParams ] = useState<EBoxSearchParams>({filterid:id, page:0});

	const loadNextPage = () => {
		setSearchParams({...searchParams, page: searchParams.page + 1});
	}

	useEffect(() => {
		console.log("Load FilterDEF for Filter", id);
		junkiesApi.filterlist(id).then((res: EBoxFilter[]) => {
			if (res.length === 1) {
				console.log("Filter", res[0])
				setFilterDefinition(() => res[0]);
				setPageTitle((t) => "Filter " + res[0].filtername);
			}
		})
	}, [junkiesApi,id,setPageTitle])

	useEffect( ()=> {
		console.log("START NEW SEARCH",toolbarSearchInput)
		setSets(() => []);
		setSearchParams(() => { return {filterid:id, page:0, s:toolbarSearchInput}});
	}, [id,toolbarSearchInput]);

	useEffect(() => {
		//TODO: HACK damit beim Start nicht doppelt gesucht wird (dieser und obiger Hook) suchen wir erst nachdem
		// "s" mit "toolbarSearchInput" befüllt wurde durch obigen Hook...
		if (searchParams.s !== undefined) {
			console.log("FETCH NEXT:", searchParams)
			junkiesApi.setlist(searchParams).then(res => setSets([...sets, ...res]));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	return <SetCardList sets={sets} filter={filterDefinition} onNextPage={loadNextPage}/>
}
