import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('jwtToken'));
  const [expAt, setExpAt] = useState(() => Number(localStorage.getItem('jwtExpAt')));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Sync token and expiry to localStorage & update isAuthenticated
  useEffect(() => {
    if (token) {
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('jwtExpAt', expAt);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('jwtExpAt');
      setIsAuthenticated(false);
    }
  }, [token, expAt]);

  // Auto logout when token expires
  useEffect(() => {
    if (!expAt) return;

    const now = Date.now();
    const timeLeft = expAt - now;

    if (timeLeft <= 0) {
      logout();
      return;
    }

    const timeoutId = setTimeout(() => {
      logout();
    }, timeLeft);

    // Clear timeout if expAt changes or component unmounts
    return () => clearTimeout(timeoutId);

  }, [expAt]);

  const login = (jwtToken, expiry) => {
    setToken(jwtToken);
    setExpAt(expiry);
  };

  const logout = () => {
    setToken(null);
    setExpAt(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, expAt }}>
      {children}
    </AuthContext.Provider>
  );
}
