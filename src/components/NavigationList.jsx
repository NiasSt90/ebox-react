import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link} from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddIcon from '@mui/icons-material/Add';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export const NavigationList = ({filters}) => {
	return <List>
		<ListItemButton component={Link} to="/home">
			<ListItemIcon><HomeIcon/></ListItemIcon>
			<ListItemText primary="Home"/>
		</ListItemButton>
		<ListItemButton component={Link} to="/playing">
			<ListItemIcon><HeadphonesIcon/></ListItemIcon>
			<ListItemText primary="Gerade gehört"/>
		</ListItemButton>
		<ListItemButton component={Link} to="/lastgood">
			<ListItemIcon><ThumbUpIcon/></ListItemIcon>
			<ListItemText primary="Zuletzt gut bewertet"/>
		</ListItemButton>
		<ListItemButton component={Link} to="/artists">
			<ListItemIcon><PersonSearchIcon/></ListItemIcon>
			<ListItemText primary="Artists"/>
		</ListItemButton>
		<ListItemButton component={Link} to="/filter/neu">
			<ListItemIcon><AddIcon/></ListItemIcon>
			<ListItemText primary="Neuer Filter"/>
		</ListItemButton>
		{filters.map(({id,name,user}, i) => (
				<ListItemButton key={i} component={Link} to={"/filter/" + id}>
					<ListItemIcon>{user?<FolderSpecialIcon/>:<FolderSharedIcon/>}</ListItemIcon>
					<ListItemText primary={name}/>
				</ListItemButton>
		))}
	</List>
}