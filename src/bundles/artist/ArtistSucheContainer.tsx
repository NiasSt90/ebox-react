import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";
import {useAtom} from "jotai";
import {pageTitleAtom} from "../../context/atoms";
import {useJunkiesService} from "../../hooks/useJunkiesService";
import {useDebouncedValue} from "../../hooks/useDebouncedValue";
import {EBoxArtistTreffer} from "../../hooks/types";
import {ArtistSuche, MIN_ZEICHEN} from "./ArtistSuche";

/** Seite /artists: Suchtext steht in ?s=, damit „Zurück“ von der Artist-Seite die Treffer wieder zeigt. */
export const ArtistSucheContainer = () => {
	const junkies = useJunkiesService();
	const [, setPageTitle] = useAtom(pageTitleAtom);
	const [params, setParams] = useSearchParams();
	const suche = params.get("s") ?? "";
	const verzoegert = useDebouncedValue(suche.trim(), 300);
	const [treffer, setTreffer] = useState<EBoxArtistTreffer[] | null>(null);

	useEffect(() => setPageTitle("Artists"), [setPageTitle]);
	useEffect(() => {
		if (verzoegert.length < MIN_ZEICHEN) {
			setTreffer(null);
			return;
		}
		let aktuell = true;
		junkies.artists({s: verzoegert})
			.then(t => aktuell && setTreffer(t))
			.catch(() => aktuell && setTreffer([]));
		return () => {
			aktuell = false;
		};
	}, [junkies, verzoegert]);

	return <ArtistSuche suche={suche} treffer={treffer}
							  onSuche={text => setParams(text ? {s: text} : {}, {replace: true})}/>;
}
