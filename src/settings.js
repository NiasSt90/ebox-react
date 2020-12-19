const settings = {
	REST_API_URL: window.env.REST_API_URL,
};
//TODO: replace ugly optional override of variables in development mode
if (process.env.NODE_ENV === "development") {
	settings.REST_API_URL = process.env.REACT_APP_REST_API_URL ? process.env.REACT_APP_REST_API_URL : window.env.REST_API_URL;
}

export default settings;