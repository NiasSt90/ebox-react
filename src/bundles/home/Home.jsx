import {Box, Link, List, ListItem, ListItemText, Typography} from "@material-ui/core";

const Home = () => <>
	<Box mt={6}>
		<Typography variant="h5" paragraph>Der neue DJ-Junkies WEB-Client zum Musik hören...</Typography>
		{/*<Typography gutterBottom="true" component={a}></Typography>*/}
		<Typography gutterBottom>
		Das Projekt ist OpenSource und der Quellcode ist <Link target="_blank" rel="noreferrer" href="https://github.com/NiasSt90/ebox-react">hier</Link> zu finden.
		</Typography>

		Was geht bisher:
		<List>
			<ListItem>
				<ListItemText>
					<b>Filter/Set-List inkl Suche in Filtern</b><br/>
					endlos durch die (eigenen) Filter scrollen<br/>
					Sets(mit allen Tracks) in Playlist ersetzen oder anhängen.
				</ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText>
					<b>Player</b><br/>
					Musik abspielen (einloggen notwendig, sonst 403 beim Zugriff auf File-URL).<br/>
					MediaSession-Support mit allen Aktionen, next/prev/seek/... wenn im Browser verfügbar
				</ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText>
					Musik Next/Prev aus der Playlist (Anzeige der Playlist kommt nach Player)
				</ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText>
					Musik Vote - Gut/Neutral/Schlecht des aktuelle gehörten Sets
				</ListItemText>
			</ListItem>
		</List>

	</Box>
</>

export default Home;