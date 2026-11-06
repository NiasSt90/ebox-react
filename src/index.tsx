import {createRoot} from 'react-dom/client';
import App from './App';
import {Provider} from "jotai";
import {ServiceWorkerProvider} from "./ServiceWorkerProvider";

createRoot(document.getElementById('root')!).render(
	<ServiceWorkerProvider>
		<Provider>
			<App/>
		</Provider>
	</ServiceWorkerProvider>
);

