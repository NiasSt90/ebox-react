import junkiesApi from "./JunkiesApi";
import settings from "../settings";
import {useMemo} from "react";
import {atom, useAtom} from "jotai";
import {atomFamily} from "jotai/utils.cjs";

atomFamily()
const session = atom({});
const sessionAtom = atom(
		async get => {
			let res = get(session);
			console.log("FROM SESSION " , res);
			return res;
		}
);

const userAtom = atom(
		() => JSON.parse(localStorage.getItem("user") || '{}'),
		(get, set, _arg) => localStorage.setItem("user", JSON.stringify(_arg)),
		);

const useAuthService = () => {
	//const [ userSession ] = useAtom(sessionAtom);
	const [ user, setUser ] = useAtom(userAtom);
	// Memoize so that a new object is only returned if something changes
	return useMemo(() => {
		return {
			login: (username, password, callback) => {
				junkiesApi(settings.REST_API_URL, {}).login(username, password)
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
