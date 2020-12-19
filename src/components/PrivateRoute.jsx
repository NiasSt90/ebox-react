import {Redirect, Route} from "react-router-dom";
import useAuthService from "../hooks/AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => {
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

export default PrivateRoute;