import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    // Store both token and user info (if available)
    const userToStore = {
      token: userData.token,
      username: userData.username || userData.email?.split('@')[0],
      email: userData.email
    };
    localStorage.setItem('user', JSON.stringify(userToStore));
    setUser(userToStore);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      
      
    };
    
    // Check on mount
    checkTokenExpiration();
    
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
