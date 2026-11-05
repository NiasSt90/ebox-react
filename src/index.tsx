import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "jotai";
import {ServiceWorkerProvider} from "./ServiceWorkerProvider";

createRoot(document.getElementById('root')!).render(
	<ServiceWorkerProvider>
		<Provider>
			<App/>
		</Provider>
	</ServiceWorkerProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
