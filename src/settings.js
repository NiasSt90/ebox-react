const settings = {
	REST_API_URL: window.env.REST_API_URL,
};
if (process.env.NODE_ENV === "development") {
	settings.REST_API_URL = process.env.REACT_APP_REST_API_URL ? process.env.REACT_APP_REST_API_URL : window.env.REST_API_URL;
}

export const appVersion = "ElectroBox - React v0.0.1"

export default settings;