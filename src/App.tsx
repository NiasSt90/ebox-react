import {Suspense} from "react";
import {BrowserRouter} from 'react-router'

import {Box, CircularProgress, CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {darkTheme, lightTheme} from "./bundles/common/MyThemes";
import {useAtom} from "jotai";
import {darkStateAtom} from "./context/atoms";
import {AppPageRouter} from "./AppPageRouter";


function App() {
	const [darkState] = useAtom(darkStateAtom);
	const appliedTheme = createTheme(darkState ? darkTheme : lightTheme);
	return (
		<ThemeProvider theme={appliedTheme}>
			<Suspense fallback={<CircularProgress variant={"indeterminate"}/>}>
				<Box sx={{display: "flex"}}>
					<CssBaseline/>
					<BrowserRouter>
						<AppPageRouter/>
					</BrowserRouter>
				</Box>
			</Suspense>
		</ThemeProvider>
	);
}

export default App;
