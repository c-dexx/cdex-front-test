import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) setUser(loggedUser);
  }, []);

  const login = (userData) => {
    const userInformation = {
      email: userData.email,
      name: userData.nama,
      id: userData.id,
    };
    setUser(userInformation);
    localStorage.setItem('user', JSON.stringify(userInformation));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
