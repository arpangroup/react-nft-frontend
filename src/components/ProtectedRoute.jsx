import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../api/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, expAt, logout } = useContext(AuthContext);
  const location = useLocation();

  // Check if token expired
   if (expAt && Date.now() >= expAt) {
    // Optionally logout user to clear state
    logout();

    // Redirect to login with from location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthenticated) {
    // Redirect to login page and save current location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes here
  //return children;
  return <Outlet/>;
}
