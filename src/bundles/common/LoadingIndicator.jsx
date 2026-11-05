import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";
import {useAtom} from "jotai";
import {loadingAtom} from "../../context/atoms";

const styles = {
	backdrop: {
		zIndex: theme => theme.zIndex.drawer + 1,
		color: '#fff',
	}
};

export const LoadingIndicator = () => {
	const [ loading ] = useAtom(loadingAtom);

	return <>
		{loading &&
						 <Backdrop sx={styles.backdrop} open={true}>
							 <CircularProgress color="inherit" />
						 </Backdrop>
			}
		</>
}