import {Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

export const NotifierMessage = ({open, severity, onclose, message, autohide}) => {
	return <Snackbar
			open={open}
			onClose={onclose}
			autoHideDuration={autohide}>
		<MuiAlert elevation={6} variant="filled" onClose={onclose} severity={severity}>
			{message ? message : ""}
		</MuiAlert>
	</Snackbar>
}