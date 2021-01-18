import React, {Suspense} from 'react';
import {Provider} from "jotai";
import {act} from "react-dom/test-utils";
import {EBoxPlayerContainer} from "./EBoxPlayerContainer";
import {render, screen} from "@testing-library/react";


test('render home as default', async () => {
	await act(async () => {
		render(<Provider><Suspense fallback={"test"}><EBoxPlayerContainer /></Suspense></Provider>)
	})
	screen.debug();
});
