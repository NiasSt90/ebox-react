import {useState} from "react";

const useDebounce = ({defaultTimeout = 250, defaultIdentifier = 'default'} = {}) => {

	const [identifiers, setIdentifiers] = useState<any>({[defaultIdentifier]: null});

	return ({fn = null, identifier = defaultIdentifier, timeout = defaultTimeout} = {}) => {
		//clear last created timer for "identifier" if already created (from second call)
		if (identifiers.hasOwnProperty(identifier)) {
			clearTimeout(identifiers[identifier]);
		}
		//create a new timer and put the timerID into state for this "identifier"
		// @ts-ignore TODO: das hier Typescript fähig bekommen..
		setIdentifiers({...identifiers, [identifier]: setTimeout(fn, timeout)});
	};
};

export default useDebounce;