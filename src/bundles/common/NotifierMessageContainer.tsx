import {NotifierMessage} from "./NotifierMessage";
import {useAtom} from "jotai";
import {notifyMessageAtom} from "../../context/atoms";
import React from "react";

export const NotifierMessageContainer = () => {
	const [ msg, setMsg ] = useAtom(notifyMessageAtom);

	const closeMessage = () => {
		console.log("close notify", msg);
		setMsg(null);
	}

	return <>
		{msg &&<NotifierMessage message={msg.message} severity={msg.severity} autohide={msg.autohide}
								  open={true} onclose={closeMessage}/>}
		</>
}