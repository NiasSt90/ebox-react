import {NotifierMessage} from "./NotifierMessage";
import {useAtom} from "jotai";
import {notifyMessagAtom} from "../../context/atoms";

export const NotifierMessageContainer = () => {
	const [ msg, setMsg ] = useAtom(notifyMessagAtom);

	const closeMessage = () => {
		console.log("close notify", msg);
		setMsg(null);
	}

	return <>
		{msg &&<NotifierMessage message={msg.message} severity={msg.severity} autohide={msg.autohide}
								  open={true} onclose={closeMessage}/>}
		</>
}