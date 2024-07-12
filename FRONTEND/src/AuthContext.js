import React, { createContext, useState, useContext } from 'react';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [dataa, setData] = useState(null);
  const [loggedInUsername, setLoggedInUsername] = useState(null);

  const setInfo = (userData) => {
    setData(userData);
  };

  return (
    <AuthContext.Provider value={{ dataa, setInfo, loggedInUsername, setLoggedInUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the context
export const useData = () => useContext(AuthContext);
