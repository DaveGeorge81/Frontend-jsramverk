import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import MapComponent from './Maps.jsx';
import Table from './Table.jsx';
import TicketsForm from './TicketsForm.jsx';
import Tickets from './Tickets.jsx'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
          <Routes>
        <Route path="/ticket" element={<div className="tickets"><TicketsForm /><Tickets /></div>} />
        <Route path="/tickets" element={<div className="tickets"><Tickets /></div>} />
        <Route path="/" element={<div className="side-by-side"><MapComponent /><Table /></div>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
