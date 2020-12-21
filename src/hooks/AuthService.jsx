import {useMemo} from "react";
import {useAtom} from "jotai";
import {junkiesApi} from "../api/JunkiesApi";
import {userAtom} from "../context/atoms";


const useAuthService = () => {
	const [ user, setUser ] = useAtom(userAtom);
	// Memoize so that a new object is only returned if something changes
	return useMemo(() => {
		return {
			login: (username, password, callback) => {
				junkiesApi({}).login(username, password)
						.then(session => {
							console.log(session.user);
							setUser(session.user);
							callback(session.user);
						})
						.catch(error => {
							console.log(error);
							callback(error.message)
						});
			},
			signout: (callback) => {
				setUser({});
				callback();
			},
			user,
			isAuthenticated: user.uid > 0
		};
	}, [user, setUser]);
};

export default useAuthService;
