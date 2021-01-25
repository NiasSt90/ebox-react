import PersistentDrawerLeft from "./components/NavigationDrawer";
import {Redirect, Route, useRouteMatch} from "react-router-dom";
import {Home} from "./bundles/home/Home";
import LoginDialog from "./bundles/login/LoginDialog";
import {PrivateRoute} from "./bundles/common/PrivateRoute";
import {SetCardListContainer} from "./bundles/filter/SetCardListContainer";
import {NotifierMessageContainer} from "./bundles/common/NotifierMessageContainer";
import {EBoxPlayerContainer} from "./components/player/EBoxPlayerContainer";
import React from "react";
import {LoadingIndicator} from "./bundles/common/LoadingIndicator";
import {Logo} from "./components/Logo";
import {Box} from "@material-ui/core";

export const AppPageRouter = () => {
	const logoMatch = useRouteMatch("/logo");
	return <>
		{logoMatch ?
			<Box p={4}><Logo/></Box> :
			<PersistentDrawerLeft>
				<Route exact path="/"><Redirect to="/home"/></Route>
				<Route path="/home" component={Home}/>
				<Route path="/login"><LoginDialog/></Route>
				<PrivateRoute path='/filter/:id'
								  render={props => <SetCardListContainer key={props.match.params.id || 'empty'}/>}/>
				<NotifierMessageContainer/>
				<EBoxPlayerContainer/>
			</PersistentDrawerLeft>
		}
		<LoadingIndicator/>
	</>
}