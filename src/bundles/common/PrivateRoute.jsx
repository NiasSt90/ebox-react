import {Redirect, Route} from "react-router-dom";
import useAuthService from "../../hooks/useAuthService";

//TODO: auch support für render= Attribute einbauen, damit key=$prop.param für parametrisierte Routen verwendet werden kann
export const PrivateRoute = ({ component: Component, ...rest }) => {
	const authService = useAuthService();
	return <Route {...rest} render={(props) => (
			authService.isAuthenticated === true
					? <Component {...props} />
					: <Redirect to={{
						pathname: '/login',
						state: {from: props.location}
					}}/>
	)}/>
}