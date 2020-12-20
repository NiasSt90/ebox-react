import settings, {appVersion} from "../settings";

export const junkiesApi = (authTokenSupplier) => {
	const authToken = authTokenSupplier;
	const defaultHeader = () => {
		return {
			Accept: "application/json"
		};
	}
	const customFetch = (
			url,
			method = "GET",
			body = false,
			type = "application/json",
			headers = defaultHeader()
	) => {
		const options = {
			method,
			headers
		};
		if (body) {
			options.body = type === "application/json" ? JSON.stringify(body) : body;
			if (type) {//kein Content-Type setzen für Dateiupload aus Javascript
				options.headers["Content-Type"] = type;
			}
		}
		return fetch(url, options)
				.then(async response => {
					if (!response.ok) {
						throw new Error(await response.text());
					}
					return response;
				})
				.catch(err => {
					throw new Error(err);
				});
	};

	const login = (username, password) => {
		const url = `${settings.REST_API_URL}/js-api/user/login`;
		const data = new URLSearchParams("username=" + username + "&password=" + password);
		return customFetch(url, "POST", data, "application/x-www-form-urlencoded")
				.then(response => response.json());
	}

	const connect = () => {
		const url = `${settings.REST_API_URL}/js-api/mischungxl/connect?${authToken.token ? 'token=' + authToken.token : ''}`;
		return customFetch(url, "POST")
				.then(response => response.json());
	}

	const setlist = (searchParams) => {
		const params = {
			...authToken.token && {token: authToken.token},
			...searchParams
		};
		const paramsStr = Object.entries(params).map(pair => pair.map(encodeURIComponent).join('=')).join("&")
		const url = `${settings.REST_API_URL}/js-api/mischungxl?${paramsStr}`;
		return customFetch(url, "GET")
				.then(response => response.json());
	}

	const filterlist = () => {
		const url = `${settings.REST_API_URL}/js-api/mischungxl/getfilters?${authToken.token ? 'token=' + authToken.token : ''}`;
		return customFetch(url, "POST")
				.then(response => response.json());
	}

	const artistinfo = (artistnid) => {
		const url = `${settings.REST_API_URL}/js-api/mischungxl/artistinfo?nid=${artistnid}&${authToken.token ? 'token=' + authToken.token : ''}`;
		return customFetch(url, "POST")
				.then(response => response.json());
	}

	const playinform = (nid) => {
		const params = {
			...authToken.token && {token: authToken.token},
			id: nid,
			caller: appVersion,
			timestamp: new Date().getTime()/1000
		}
		const paramsStr = Object.entries(params).map(pair => pair.map(encodeURIComponent).join('=')).join("&")
		const url = `${settings.REST_API_URL}/js-api/mischungxl/playinform?${paramsStr}`;
		return customFetch(url, "POST")
				.then(response => response.json());
	}

	const buildTrackUrl = (nid, downloadfilename) => {
		const params = {
			...authToken.token && {token: authToken.token},
			nid: nid, origFilename: downloadfilename
		};
		const paramsStr = Object.entries(params).map(pair => pair.map(encodeURIComponent).join('=')).join("&")
		return `${settings.REST_API_URL}/mischungxl/download?${paramsStr}`
	}

	return {
		login,
		connect,
		setlist,
		filterlist,
		artistinfo,
		playinform,
		buildTrackUrl
	};
};


