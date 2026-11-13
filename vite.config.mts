/// <reference types="vitest/config" />
import {execSync} from "node:child_process";
import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa";

// Version für die Anzeige in der App; im Docker-Build fehlt .git, dann bleibt sie leer.
const gitSha = (() => {
	try {
		return execSync("git describe --always", {stdio: ["ignore", "pipe", "ignore"]}).toString().trim();
	} catch {
		return "";
	}
})();

// Lokale Umgebung aus electrobox-infra (deploy/local): nginx auf Port 8080.
const LOCAL_API_URL = "http://localhost:8080";

export default defineConfig(({command, mode}) => {
	// Vorgaben in process.env setzen, damit Vite sie auch in index.html
	// (%VITE_…%) ersetzt; .env-Dateien und echte Umgebungsvariablen haben Vorrang.
	const env = loadEnv(mode, process.cwd(), "VITE_");
	process.env.VITE_GIT_SHA ||= env.VITE_GIT_SHA || gitSha;
	// Dev-Server und Tests sprechen standardmäßig die lokale Umgebung an, nie Produktion.
	// Ein Build (Image für live/test) muss das Backend ausdrücklich angeben, z. B.
	// VITE_REST_API_URL=https://www.dj-junkies.de oder https://test.dj-junkies.de.
	const apiUrl = process.env.VITE_REST_API_URL || env.VITE_REST_API_URL;
	if (!apiUrl && command === "build") {
		throw new Error("VITE_REST_API_URL fehlt: Für einen Build das Backend ausdrücklich setzen "
			+ "(live: https://www.dj-junkies.de, test: https://test.dj-junkies.de, lokal: " + LOCAL_API_URL + ").");
	}
	process.env.VITE_REST_API_URL = apiUrl || LOCAL_API_URL;

	return {
		plugins: [
			react(),
			VitePWA({
				// Eigener Service Worker (src/service-worker.ts); Workbox injiziert nur das Precache-Manifest.
				strategies: "injectManifest",
				srcDir: "src",
				filename: "service-worker.ts",
				// Registrierung und Update-Hinweis übernimmt serviceWorkerRegistration.ts.
				injectRegister: false,
				manifest: false,
				injectManifest: {
					globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
				},
			}),
		],
		server: {
			port: 3000,
		},
		preview: {
			port: 3000,
		},
		build: {
			// nginx und Dockerfile erwarten die Ausgabe weiterhin unter build/.
			outDir: "build",
		},
		test: {
			environment: "jsdom",
			globals: true,
			setupFiles: ["src/setupTests.tsx"],
		},
	};
});
