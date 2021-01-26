import React from "react";
import * as serviceWorker from "./serviceWorkerRegistration";

interface ServiceWorkerControl {
	assetsUpdateReady: boolean;
	assetsCached: boolean;
	updateAssets: () => void;
}

const ServiceWorkerContext = React.createContext<ServiceWorkerControl | undefined>(undefined);

const ServiceWorkerProvider = (children: any) => {
	const [waitingServiceWorker, setWaitingServiceWorker] = React.useState<ServiceWorker | null>(null);
	const [assetsUpdateReady, setAssetsUpdateReady] = React.useState(false);
	const [assetsCached, setAssetsCached] = React.useState(false);

	const value = React.useMemo(
		() => ({
			assetsUpdateReady,
			assetsCached,
			updateAssets: () => {
				if (waitingServiceWorker) {
					waitingServiceWorker.addEventListener("statechange", event => {
						// @ts-ignore
						if (event.target.state === "activated") {
							window.location.reload()
						}
					});
					waitingServiceWorker.postMessage({type: "SKIP_WAITING"});
				}
			}
		}),
		[assetsUpdateReady, assetsCached, waitingServiceWorker]
	);

	// Once on component mounted subscribe to Update and Success events in
	// CRA's service worker wrapper
	React.useEffect(() => {
		serviceWorker.register({
			onUpdate: registration => {
				registration.showNotification("Es ist eine neue Electrobox@Web Version verfügbar!", {
					body: "Das Update kann über den Button in der Toolbar ausgelöst werden!"
				});
				setWaitingServiceWorker(registration.waiting);
				setAssetsUpdateReady(true);
			},
			onSuccess: () => {
				setAssetsCached(true);
			}
		});
	}, []);

	return <ServiceWorkerContext.Provider value={value} {...children} />;
}

function useServiceWorker() {
	const context = React.useContext(ServiceWorkerContext);
	if (!context) {
		throw new Error(
			"useServiceWorker must be used within a ServiceWorkerProvider"
		);
	}
	return context;
}

export {ServiceWorkerProvider, useServiceWorker};