import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";

import Tickets from '../Tickets.jsx';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('renders learn react link', () => {
  render(<Tickets />);
  const linkElement = screen.getByText("Current tickets:");
  expect(linkElement).toBeInTheDocument();
});

test('Back button takes you back to main page', () => {
  render(<Tickets />)
  const linkElement = screen.getByRole('link', { name: 'Back to map' });
  expect(linkElement).toHaveAttribute('href', '/')
})