import React from "react";
import {Redirect, useLocation} from "react-router-dom";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle, FormControl, FormHelperText,
	Grid,
	TextField, Typography
} from "@material-ui/core";
import useAuthService from "../../hooks/AuthService";
import settings from "../../settings";

const LoginDialog = () => {
	const authService = useAuthService();
	const [values, setValues] = React.useState({
		redirectToReferrer: false,
		redirectToHome: null,
		loginError: "",
		username: "",
		password: ""
	})
	const handleInputChange = e => {
		const {name, value} = e.target
		setValues({...values, [name]: value})
	}
	const login = () => {
		authService.login(values.username, values.password, (res) => {
			if (res.uid) {
				setValues({...values, redirectToReferrer: true, loginError: null})
			}
			else {
				setValues({...values, loginError: res})
			}
		})
	}
	let location = useLocation();
	const {from} = location.state || {from: {pathname: '/'}}
	if (values.redirectToReferrer === true) {
		return <Redirect to={from}/>
	}
	if (values.redirectToHome) {
		return <Redirect to={values.redirectToHome}/>
	}

	return <Dialog open={true}>
		<DialogTitle>
			DJ-Junkies Login <Typography variant={"subtitle2"}>({settings.REST_API_URL})</Typography>
		</DialogTitle>
		<DialogContent>
			<form onSubmit={login}>
				<FormControl fullWidth variant="outlined" margin="normal" error={values.loginError}>
					<Grid container spacing={2} direction={"column"}>
						<Grid item>
							<TextField name="username" label="Username" variant="outlined" InputLabelProps={{shrink: true}}
										  value={values.username} onChange={handleInputChange}/>
						</Grid>
						<Grid item>
						<TextField name="password" type="password" label="Passwort" variant="outlined"
									  InputLabelProps={{shrink: true}}
									  value={values.password} onChange={handleInputChange}/>
						</Grid>
					</Grid>
					<FormHelperText>{values.loginError}</FormHelperText>
				</FormControl>
			</form>
		</DialogContent>
		<DialogActions>
			<Button onClick={() => setValues({...values, redirectToHome: '/'})} color="secondary"
					  variant="contained">Abbrechen</Button>
			<Button type={"submit"} onClick={login} color="primary" variant="contained">Einloggen</Button>
		</DialogActions>
	</Dialog>
;
};

export default LoginDialog;
