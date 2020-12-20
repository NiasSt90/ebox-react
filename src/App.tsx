import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Home from "./bundles/home/Home";
import LoginDialog from "./bundles/login/LoginDialog";

import {Backdrop, Box, CircularProgress, CssBaseline, makeStyles} from "@material-ui/core";
import {useAtom} from "jotai";
import {FilterListMainView} from "./bundles/filter/FilterListMainView";
import {loadingAtom} from "./context/user";
import {EBoxAudioplayer} from "./components/EBoxAudioplayer";
import PersistentDrawerLeft from "./components/NavigationDrawer";

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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
    const [ loading ] = useAtom(loadingAtom);
    return (
        <Suspense fallback={<CircularProgress variant={"indeterminate"}/>}>
            <div className={classes.root}>
                <CssBaseline/>
                <Router>
                    <PersistentDrawerLeft>
                        {/*TODO: ein HACK der den Player oben fixiert, nicht ser hübsch aber er scrollt erstmal nicht raus */}
                        <Box position="fixed" width="100%" margin={-2} zIndex={10}>
                            <EBoxAudioplayer/>
                        </Box>
                        <Route exact path="/"><Redirect to="/home"/></Route>
                        <Route path="/home" component={Home}/>
                        <Route path="/login"><LoginDialog/></Route>
                        <Route path='/filter/:id'
                               render={props => <FilterListMainView key={props.match.params.id || 'empty'} /> }/>
                        {/*TODO: "render" statt "component" als Parameter benötigt wegen key=...
                            <PrivateRoute path='/filter/:id' component={FilterListMainView}/>*/}
                        {loading &&
                            <Backdrop className={classes.backdrop} open={true}>
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        }
                    </PersistentDrawerLeft>
                </Router>
            </div>
        </Suspense>
    );
}

export default App;
