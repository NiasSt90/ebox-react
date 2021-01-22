import {Link, useHistory} from "react-router-dom";
import {Box, IconButton, Tooltip, Typography} from "@material-ui/core";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React from "react";
import useAuthService from "../hooks/useAuthService";

const UserInfo = () => {
	const history = useHistory();
	const authService = useAuthService();
	return <Box>
		{authService.isAuthenticated === true ?
			<Typography variant={"subtitle2"}>
				{authService.user.name}
				<Tooltip title="Abmelden">
					<IconButton onClick={() => {
						authService.signout(() => history.push('/'))
					}}>
						<ExitToAppIcon/>
					</IconButton>
				</Tooltip>
			</Typography>
			: <Typography variant={"subtitle2"}>nicht angemeldet!
				<IconButton component={Link} to="/login"><LockOpenIcon/></IconButton>
			</Typography>}
		</Box>
}

export default UserInfo;


