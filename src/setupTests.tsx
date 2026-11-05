import '@testing-library/jest-dom/vitest';
import {render} from "@testing-library/react";
import { Provider } from 'jotai';
import {ReactElement} from "react";
import {ServiceWorkerProvider} from "./ServiceWorkerProvider";

// @ts-ignore
window.env = {
	REST_API_URL: 'https://test.dj-junkies.de'
}

export const AllTheProviders = ({ children }:any) => {
	return (<ServiceWorkerProvider><Provider>{children}</Provider></ServiceWorkerProvider>)
}
const customRender = (ui:ReactElement, options:any = undefined) =>
	render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
//export * from '@testing-library/react'
// override render method
export { customRender as render }