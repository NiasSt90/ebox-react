import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'

import {CircularProgress, createMuiTheme, CssBaseline} from "@material-ui/core";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {darkTheme, lightTheme} from "./bundles/common/MyThemes";
import {useAtom} from "jotai";
import {darkStateAtom} from "./context/atoms";
import {AppPageRouter} from "./AppPageRouter";


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
}))


function App() {
	const classes = useStyles();
	const [darkState] = useAtom(darkStateAtom);
	const appliedTheme = createMuiTheme(darkState ? darkTheme : lightTheme);
	return (
		<ThemeProvider theme={appliedTheme}>
			<Suspense fallback={<CircularProgress variant={"indeterminate"}/>}>
				<div className={classes.root}>
					<CssBaseline/>
					<Router>
						<AppPageRouter/>
					</Router>
				</div>
			</Suspense>
		</ThemeProvider>
	);
}

export default App;
