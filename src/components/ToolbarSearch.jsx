import SearchIcon from "@mui/icons-material/Search";
import {alpha, Box, InputBase} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {useState} from "react";
import useDebounce from "../hooks/useDebounce";

const styles = {
	search: theme => ({
		position: 'relative',
		borderRadius: `${theme.shape.borderRadius}px`,
		backgroundColor: alpha(theme.palette.common.black, 0.12),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.black, 0.25),
		},
		marginRight: 2,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: 3,
			width: 'auto',
		},
	}),
	searchIcon: {
		px: 2,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: theme => ({
		'& .MuiInputBase-input': {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
			transition: theme.transitions.create('width'),
			width: '100%',
			color: 'white',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
		},
	}),
};

export const ToolbarSearch = ({onSearch}) => {
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
		<Box sx={styles.search}>
			<Box sx={styles.searchIcon}><SearchIcon/></Box>
			<InputBase value={value} placeholder="Sets Suchen…"
						  sx={styles.input}
						  onChange={debouncedSearchInputHandler}
						  endAdornment={<ClearIcon htmlColor={"white"} onClick={clearSearchInput}/>}/>
		</Box>
	</>
}
