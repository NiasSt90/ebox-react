import React, {useEffect, useState} from "react";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import FilterListIcon from '@material-ui/icons/FilterList';
import {useJunkiesApi} from "../hooks/JunkiesApi";

export const NavigationList = () => {
	const junkiesApi = useJunkiesApi()
	const [filter, setFilter] = useState([])

	useEffect(() => {
		junkiesApi.filterlist().then((res) => setFilter(res));
	}, [junkiesApi,setFilter])

	return <>
		<List>
			<ListItem button component={Link} to="/home">
				<ListItemIcon><HomeIcon/></ListItemIcon>
				<ListItemText primary="Home"/>
			</ListItem>
			{filter && filter.filter(f => f.filtername !== "").map((filter, i) => (
				<ListItem key={i} button component={Link} to={"/filter/" + filter.filterid}>
					<ListItemIcon><FilterListIcon/></ListItemIcon>
					<ListItemText primary={filter.filtername}/>
				</ListItem>
			))}
		</List>
	</>
}
