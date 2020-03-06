import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";

test('renders exchange button', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const linkElement = getByText(/exchange/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn cancel button', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const linkElement = getByText(/cancel/i);
  expect(linkElement).toBeInTheDocument();
});
