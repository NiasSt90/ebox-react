import {Link, useNavigate} from "react-router";
import {Box, IconButton, Tooltip, Typography} from "@mui/material";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import useAuthService from "../hooks/useAuthService";

const UserInfo = () => {
	const navigate = useNavigate();
	const authService = useAuthService();
	return <Box>
		{authService.isAuthenticated === true ?
			<Typography variant={"subtitle2"}>
				{authService.user.name}
				<Tooltip title="Abmelden">
					<IconButton onClick={() => {
						authService.signout(() => navigate('/'))
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


