import settings from "../settings";

const junkiesApi = (authTokenSupplier) => {
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
		const url = `${settings.REST_API_URL}/user/login`;
		const data = new URLSearchParams("username=" + username + "&password=" + password);
		return customFetch(url, "POST", data, "application/x-www-form-urlencoded")
				.then(response => response.json());
	}

	const connect = () => {
		const url = `${settings.REST_API_URL}/mischungxl/connect`;
		return customFetch(url, "POST")
				.then(response => response.json());
	}

	return {
		login,
		connect
	};
};

export default junkiesApi;