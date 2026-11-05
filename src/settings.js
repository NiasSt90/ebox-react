const settings = {
	// Vorgabe und Umschaltung auf das Testsystem stehen in vite.config.mts.
	REST_API_URL: import.meta.env.VITE_REST_API_URL,
};
export default settings;

export const appVersion = "ElectroBox@Web v" + (import.meta.env.VITE_GIT_SHA || 'unknown')+''
