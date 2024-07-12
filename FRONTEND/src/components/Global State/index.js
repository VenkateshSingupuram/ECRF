// GlobalStateContext.js

import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [dataRole, setDataRole] = useState(null);

  const setGlobalDataRole = (value) => {
    setDataRole(value);
  };

  return (
    <GlobalStateContext.Provider value={{ dataRole, setGlobalDataRole }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
