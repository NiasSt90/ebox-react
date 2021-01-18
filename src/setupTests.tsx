// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {render} from "@testing-library/react";
import { Provider } from 'jotai';
import {ReactElement} from "react";

// @ts-ignore
window.env = {
	REST_API_URL: 'https://test.dj-junkies.de'
}

export const AllTheProviders = ({ children }:any) => {
	return (<Provider>{children}</Provider>)
}
const customRender = (ui:ReactElement, options:any = undefined) =>
	render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
//export * from '@testing-library/react'
// override render method
export { customRender as render }