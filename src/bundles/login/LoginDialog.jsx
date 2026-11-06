import React from "react";
import {Navigate, useLocation} from "react-router";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle, FormControl, FormHelperText,
	Stack,
	TextField, Typography
} from "@mui/material";
import useAuthService from "../../hooks/useAuthService";
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
		return <Navigate to={from} replace/>
	}
	if (values.redirectToHome) {
		return <Navigate to={values.redirectToHome} replace/>
	}

	return <Dialog open={true}>
		<DialogTitle>
			DJ-Junkies Login<Typography component="div" variant={"overline"}>({settings.REST_API_URL})</Typography>
		</DialogTitle>
		<DialogContent>
			<form onSubmit={login}>
				<FormControl fullWidth variant="outlined" margin="normal" error={values.loginError}>
					<Stack spacing={2} sx={{alignItems: "flex-start"}}>
						<TextField name="username" label="Username" variant="outlined" slotProps={{inputLabel: {shrink: true}}}
									  value={values.username} onChange={handleInputChange}
									  onKeyDown={(ev) => {
										  if (ev.key === 'Enter') {
											  ev.preventDefault();//no submit if there were a button with type form
											  login();
										  }
									  }}/>
						<TextField name="password" type="password" label="Passwort" variant="outlined"
									  slotProps={{inputLabel: {shrink: true}}}
									  value={values.password} onChange={handleInputChange}
									  onKeyDown={(ev) => {
										  if (ev.key === 'Enter') {
											  ev.preventDefault();//no submit if there were a button with type form
											  login();
										  }
									  }}/>
					</Stack>
					<FormHelperText>{values.loginError}</FormHelperText>
				</FormControl>
			</form>
		</DialogContent>
		<DialogActions>
			<Button onClick={() => setValues({...values, redirectToHome: '/'})} color="secondary"
					  variant="contained">Abbrechen</Button>
			<Button type="button" onClick={login} color="primary" variant="contained">Einloggen</Button>
		</DialogActions>
	</Dialog>
			;
};

export default LoginDialog;
