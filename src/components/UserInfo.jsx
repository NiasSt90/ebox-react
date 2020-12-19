import {Link, useHistory} from "react-router-dom";
import {Box, IconButton, Typography} from "@material-ui/core";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React from "react";
import useAuthService from "../hooks/AuthService";

const UserInfo = () => {
	const history = useHistory();
	const authService = useAuthService();
	return <Box m={1}>
		{authService.isAuthenticated === true ?
			<Typography variant={"subtitle2"}>
				Angemeldet als {authService.user.name}
				<IconButton onClick={() => {
					authService.signout(() => history.push('/'))
				}}>
					<ExitToAppIcon/>
				</IconButton>
			</Typography>
			: <Typography variant={"subtitle2"}>nicht angemeldet!
				<IconButton component={Link} to="/login"><LockOpenIcon/></IconButton>
			</Typography>}
		</Box>
}

export default UserInfo;


