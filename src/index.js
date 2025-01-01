import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from './static/components/login';
import Register from './static/components/Register';
import Account from './static/components/Account';
import Update from './static/components/Update';
import Notes from './static/components/Notes';
import Home from './static/components/Home';
import Edit from './static/components/Edit';
import SeeNote from './static/components/SeeNote';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="Account" element={<Account />} />
        <Route path="update" element={<Update />} />
        <Route path="notes" element={<Notes />} />
        <Route path="" element={<Home />} />
        <Route path="edit" element={<Edit />} />
        <Route path="seeNote" element={<SeeNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();