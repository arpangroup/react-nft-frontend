import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from './context/Context';
import { AuthProvider } from './api/AuthContext';


ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>  
      <ContextProvider >
        <App />
      </ContextProvider>
      </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

