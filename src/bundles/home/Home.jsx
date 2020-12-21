import {Box, List, ListItem, ListItemText, Typography} from "@material-ui/core";

const Home = () => <>
	<Box mt={6}>
		<Typography variant="h5" paragraph>Der neue DJ-Junkies WEB-Client zum Musik hören...</Typography>
		Was geht bisher:
		<List>
			<ListItem>
				<ListItemText>
					<b>Filter/Set-List</b><br/>
					endlos durch die (eigenen) Filter scrollen<br/>
					Sets(mit allen Tracks) in Playlist ersetzen oder anhängen.
				</ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText>
					<b>Player</b><br/>
					Musik abspielen (einloggen notwendig, sonst 403 beim Zugriff auf File-URL).<br/>
					Achtung: Player aktuell mit Autoplay, d.h. enqueue führt zum Play, aber das Icon im Player wechselt nicht.<br/>
					Ohne Autostart würde er nicht am Ende zum nächsten Eintrag der Playlist wechseln.<br/>
					Hier werd ich wohl ne andere Komponente nehmen müssen, die aktuelle hat da ein paar Mängel.
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