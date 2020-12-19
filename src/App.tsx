import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Redirect
} from 'react-router-dom'
import Public from "./components/Public";
import PrivateRoute from "./components/PrivateRoute";
import Protected from "./components/Protected";
import UserInfo from "./components/UserInfo";
import LoginDialog from "./components/LoginDialog";
import {CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import {Provider} from "jotai";

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
        <Provider>
            <div className={classes.root}>
                <CssBaseline/>
                <Router>
                    <Drawer className={classes.drawer} variant="permanent"
                            classes={{paper: classes.drawerPaper,}} anchor="left">
                        <div className={classes.toolbar}>
                            <UserInfo/>
                        </div>
                        <Divider/>
                        <List>
                            <ListItem button component={Link} to="/home">
                                <ListItemIcon><HomeIcon/></ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>
                            <ListItem button component={Link} to="/protected">
                                <ListItemIcon><HomeIcon/></ListItemIcon>
                                <ListItemText primary="Alle Sets"/>
                            </ListItem>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Route exact path="/"><Redirect to="/home"/></Route>
                        <Route path="/home" component={Public}/>
                        <Route path="/login"><LoginDialog/></Route>
                        <PrivateRoute path='/protected' component={Protected}/>
                    </main>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
