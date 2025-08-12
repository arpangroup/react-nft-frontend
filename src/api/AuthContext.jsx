import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('jwtToken'));
  const [expAt, setExpAt] = useState(() => Number(localStorage.getItem('jwtExpAt')));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

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

  const login = (jwtToken, expiry) => {
    setToken(jwtToken);
    setExpAt(expiry);
  };

  const logout = () => {
    setToken(null);
    setExpAt(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
