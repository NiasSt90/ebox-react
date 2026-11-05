import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import React from "react";

export const NavigationList = ({filters}) => {
	return <List>
		<ListItemButton component={Link} to="/home">
			<ListItemIcon><HomeIcon/></ListItemIcon>
			<ListItemText primary="Home"/>
		</ListItemButton>
		{filters.map(({id,name,user}, i) => (
				<ListItemButton key={i} component={Link} to={"/filter/" + id}>
					<ListItemIcon>{user?<FolderSpecialIcon/>:<FolderSharedIcon/>}</ListItemIcon>
					<ListItemText primary={name}/>
				</ListItemButton>
		))}
	</List>
}