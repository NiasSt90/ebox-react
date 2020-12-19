import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Public from "./components/Public";
import PrivateRoute from "./components/PrivateRoute";
import UserInfo from "./components/UserInfo";
import LoginDialog from "./components/LoginDialog";
import {Backdrop, CircularProgress, CssBaseline, Divider, Drawer, makeStyles} from "@material-ui/core";
import {useAtom} from "jotai";
import {FilterListMainView} from "./components/FilterListMainView";
import {loadingAtom} from "./context/user";
import {NavigationList} from "./components/NavigationList";
import {EBoxAudioplayer} from "./components/EBoxAudioplayer";

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
                    <Drawer className={classes.drawer} variant="permanent"
                            classes={{paper: classes.drawerPaper,}} anchor="left">
                        <div className={classes.toolbar}>
                            <UserInfo/>
                        </div>
                        <Divider/>
                        <NavigationList/>
                    </Drawer>
                    <main className={classes.content}>
                        {loading &&
                        <Backdrop className={classes.backdrop} open={true}>
						    <CircularProgress color="inherit" />
                        </Backdrop>}
                        <EBoxAudioplayer/>
                        <Route exact path="/"><Redirect to="/home"/></Route>
                        <Route path="/home" component={Public}/>
                        <Route path="/login"><LoginDialog/></Route>
                        <PrivateRoute path='/filter/:id' component={FilterListMainView}/>
                    </main>
                </Router>
            </div>
        </Suspense>
    );
}

export default App;
