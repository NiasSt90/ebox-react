import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import React from "react";

export const NavigationList = ({filters}) => {
	return <List>
		<ListItem button component={Link} to="/home">
			<ListItemIcon><HomeIcon/></ListItemIcon>
			<ListItemText primary="Home"/>
		</ListItem>
		{filters.map(({id,name,user}, i) => (
				<ListItem key={i} button component={Link} to={"/filter/" + id}>
					<ListItemIcon>{user?<FolderSpecialIcon/>:<FolderSharedIcon/>}</ListItemIcon>
					<ListItemText primary={name}/>
				</ListItem>
		))}
	</List>
}