import {Box, Divider, Link, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {pageTitleAtom} from "../../context/atoms";

function createRoadmapEntry(title: string, text:string , finished: boolean) {
	return { title: title, text: text, finished: finished};
}

export const Home = () => {
	const [ , setPageTitle] = useAtom(pageTitleAtom);
	useEffect(() => {
		setPageTitle("Home")
	}, [setPageTitle])
	const roadmapEntries = [
			createRoadmapEntry("Filter/Set-List inkl Suche in Filtern",
					"endlos durch die (eigenen) Filter scrollen<br/>"
					+ "Sets(mit allen Tracks) in Playlist ersetzen oder anhängen.", true),
			createRoadmapEntry("MusicPlayer", "Musik abspielen inkl. Untstützung der Mediasession(Keys)", true),
			createRoadmapEntry("Playlist-Next/Prev/Seek/Repeat", "Shuffle noch ohne Funktion", true),
			createRoadmapEntry("Bewerten", "das aktuell gespielte Set bewerten", true),
			createRoadmapEntry("Kommentieren", "das aktuell gespielte Set kommentieren", true),
			createRoadmapEntry("Vote-Reminder", "Desktop-Benachrichtigung am Ende des Sets zum Bewerten", true),

			createRoadmapEntry("Playlist-Shuffle/Repeat", "Shuffle/Repeat Support", false),
			createRoadmapEntry("Playlist-Anzeige", "Anzeige der aktuellen Einträge mit Edit-Funktionen", false),

			createRoadmapEntry("Set-Kommentar", "Kommentar am Set anzeigen", false),
			createRoadmapEntry("Set-Bewertungen", "Bewertungen (eigene und andere) am Set anzeigen", false),
			createRoadmapEntry("Set-Tracks", "Tracks am Set anzeigen, wenn mehr als eins", false),

			createRoadmapEntry("Filter-Editor", "Filter bauen, anzeigen und persistent auf dj-junkies speichern/bearbeiten/löschen", false),
			createRoadmapEntry("Artist-Anzeige", "Suche und Anzeige von DJs", false),
	]
	return <>
		<Box mt={6}>
			<Typography variant="h5" paragraph>Der neue DJ-Junkies WEB-Client zum Musik hören...</Typography>
			<Typography gutterBottom data-testid="home">
				Das Projekt ist OpenSource und der Quellcode ist <Link target="_blank" rel="noreferrer" href="https://github.com/NiasSt90/ebox-react">hier</Link> zu finden.
			</Typography>

			aktueller Stand/Roadmap:
			<List>
				{roadmapEntries.map((entry, index) =><React.Fragment key={index}>
					<ListItem>
						{entry.finished && <ListItemIcon><DoneIcon /></ListItemIcon>}
						<ListItemText primary={entry.title} secondary={entry.text}/>
					</ListItem>
					<Divider/>
					</React.Fragment>
				)}
			</List>
		</Box>
	</>
}