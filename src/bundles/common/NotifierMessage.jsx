import {Alert, Snackbar} from "@mui/material";

export const NotifierMessage = ({open, severity, onclose, message, autohide}) => {
	return <Snackbar
			open={open}
			onClose={onclose}
			autoHideDuration={autohide}>
		<Alert elevation={6} variant="filled" onClose={onclose} severity={severity}>
			{message ? message : ""}
		</Alert>
	</Snackbar>
}
