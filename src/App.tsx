import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import LoginDialog from "./bundles/login/LoginDialog";

import {CircularProgress, createMuiTheme, CssBaseline} from "@material-ui/core";
import {SetCardListContainer} from "./bundles/filter/SetCardListContainer";
import {EBoxPlayerContainer} from "./components/player/EBoxPlayerContainer";
import PersistentDrawerLeft from "./components/NavigationDrawer";
import {LoadingIndicator} from "./bundles/common/LoadingIndicator";
import {NotifierMessageContainer} from "./bundles/common/NotifierMessageContainer";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {darkTheme, lightTheme} from "./bundles/common/MyThemes";
import {useAtom} from "jotai";
import {darkStateAtom} from "./context/atoms";
import {Home} from "./bundles/home/Home";
import {PrivateRoute} from "./bundles/common/PrivateRoute";


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
    const [ darkState ] = useAtom(darkStateAtom);
    const appliedTheme = createMuiTheme(darkState ? darkTheme : lightTheme);
    return (
        <ThemeProvider theme={appliedTheme}>
            <Suspense fallback={<CircularProgress variant={"indeterminate"}/>}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <Router>
                        <PersistentDrawerLeft>
                            <Route exact path="/"><Redirect to="/home"/></Route>
                            <Route path="/home" component={Home}/>
                            <Route path="/login"><LoginDialog/></Route>
                            <PrivateRoute path='/filter/:id'
                                   render={props => <SetCardListContainer key={props.match.params.id || 'empty'}/>}/>
                            <NotifierMessageContainer/>
                            <EBoxPlayerContainer/>
                        </PersistentDrawerLeft>
                        <LoadingIndicator/>
                    </Router>
                </div>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
