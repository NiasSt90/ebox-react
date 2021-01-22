//TODO: Docker build support erstmal entsorgt...die Weiche (config.js) nervt beim Entwickeln von service-worker
const settings = {
	REST_API_URL: process.env.REACT_APP_REST_API_URL,
};
/*
//REACT_APP_REST_API_URL should not be defined in DockerBuilds to leave the window.env.REST_API_URL as default.
if (process.env.NODE_ENV === "development") {
	settings.REST_API_URL = process.env.REACT_APP_REST_API_URL ? process.env.REACT_APP_REST_API_URL : window.env.REST_API_URL;
}
*/
export default settings;

export const appVersion = "ElectroBox@Web v" + (process.env.REACT_APP_GIT_SHA || 'unknown')+''
