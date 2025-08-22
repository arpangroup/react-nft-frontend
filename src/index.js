import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from './context/Context';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from "./context/NotificationContext";
import AppWrapper from './AppWrapper';


ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>  
      <ContextProvider >
         <NotificationProvider>
          {/* <App /> */}
          <AppWrapper/>
         </NotificationProvider>
      </ContextProvider>
      </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

