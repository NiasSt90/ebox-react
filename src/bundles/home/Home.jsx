import {Box, List, ListItem, ListItemText, Typography} from "@material-ui/core";

const Home = () => <>
	<Box mt={6}>
		<Typography variant="h5" paragraph>Der neue DJ-Junkies WEB-Client zum Musik hören...</Typography>
		<Typography paragraph>
			Was geht bisher:
			<List>
				<ListItem><ListItemText>endlos durch die (eigenen) Filter scrollen</ListItemText></ListItem>
				<ListItem><ListItemText>Musik abspielen (einloggen notwendig, sonst 403 beim Zugriff auf
					File)</ListItemText></ListItem>
			</List>
		</Typography>
	</Box>
</>

export default Home;