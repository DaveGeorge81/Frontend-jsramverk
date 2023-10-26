import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";


import Table from '../Table.jsx';

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


test('renders table and titles', () => {
    render(<Table />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Train number:")).toBeInTheDocument();
    expect(screen.getByText("Current station:")).toBeInTheDocument();
    expect(screen.getByText("Route:")).toBeInTheDocument();
    expect(screen.getByText("Delay:")).toBeInTheDocument();
    expect(screen.getByText("Add ticket:")).toBeInTheDocument();
});
