import {Backdrop, CircularProgress, makeStyles} from "@material-ui/core";
import React from "react";
import {useAtom} from "jotai";
import {loadingAtom} from "../../context/atoms";

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	}
}));

export const LoadingIndicator = () => {
	const classes = useStyles();
	const [ loading ] = useAtom(loadingAtom);

	return <>
		{loading &&
						 <Backdrop className={classes.backdrop} open={true}>
							 <CircularProgress color="inherit" />
						 </Backdrop>
			}
		</>
}