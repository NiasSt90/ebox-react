/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_REST_API_URL?: string;
	readonly VITE_GIT_SHA?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
