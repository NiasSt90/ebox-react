import {Redirect, Route, RouteProps} from "react-router-dom";
import useAuthService from "../../hooks/useAuthService";


//TODO: auch support für render= Attribute einbauen, damit key=$prop.param für parametrisierte Routen verwendet werden kann
export const PrivateRoute = ({render, component, ...rest}: RouteProps) => {
	const authService = useAuthService();

	return <Route {...rest} render={(props) => (
		authService.isAuthenticated ?
			// @ts-ignore
			(render ? render(props) : <component {...props}/>)
			: <Redirect to={{
				pathname: '/login',
				state: {from: props.location}
			}}/>
	)}/>
}