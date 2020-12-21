import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Home from "./bundles/home/Home";
import LoginDialog from "./bundles/login/LoginDialog";

import {CircularProgress, CssBaseline, makeStyles} from "@material-ui/core";
import {FilterListMainView} from "./bundles/filter/FilterListMainView";
import {EBoxPlayerContainer} from "./components/EBoxPlayerContainer";
import PersistentDrawerLeft from "./components/NavigationDrawer";
import {LoadingIndicator} from "./bundles/common/LoadingIndicator";

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
    return (
        <Suspense fallback={<CircularProgress variant={"indeterminate"}/>}>
            <div className={classes.root}>
                <CssBaseline/>
                <Router>
                    <PersistentDrawerLeft>
                        <Route exact path="/"><Redirect to="/home"/></Route>
                        <Route path="/home" component={Home}/>
                        <Route path="/login"><LoginDialog/></Route>
                        <Route path='/filter/:id'
                               render={props => <FilterListMainView key={props.match.params.id || 'empty'} /> }/>
                        {/*TODO: "render" statt "component" als Parameter benötigt wegen key=...
                            <PrivateRoute path='/filter/:id' component={FilterListMainView}/>*/}
                        <EBoxPlayerContainer/>
                    </PersistentDrawerLeft>
                    <LoadingIndicator/>
                </Router>
            </div>
        </Suspense>
    );
}

export default App;
