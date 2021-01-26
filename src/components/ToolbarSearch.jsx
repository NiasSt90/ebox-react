import SearchIcon from "@material-ui/icons/Search";
import {fade, InputBase} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useDebounce from "../hooks/useDebounce";

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.12),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		color: 'white',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

export const ToolbarSearch = ({onSearch}) => {
	const classes = useStyles();
	const [value, setValue] = useState("");

	const debounce = useDebounce();
	const debouncedSearchInputHandler = (event) => {
		//need to save to state because it's a controlled input
		setValue(event.target.value);
		//debounce and after 1s of no call do real update setToolbarSearchInput
		debounce({fn: () => onSearch(event.target.value), timeout: 500});
	};
	const clearSearchInput = () => {
		setValue("");
		onSearch("");
	}

	return <>
		<div className={classes.search}>
			<div className={classes.searchIcon}><SearchIcon/></div>
			<InputBase value={value} placeholder="Sets Suchen…"
						  classes={{input: classes.inputInput,}}
						  onChange={debouncedSearchInputHandler}
						  endAdornment={<ClearIcon htmlColor={"white"} onClick={clearSearchInput}/>}/>
		</div>
	</>
}