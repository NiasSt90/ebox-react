import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import App from './App';
import {render} from "./setupTests";

test('render home as default', async () => {
  render(<App />);
  await waitFor(() => screen.getByTestId("home"))
  screen.debug()
});
