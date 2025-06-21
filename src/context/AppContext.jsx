import React, { createContext, useState } from 'react';
export const AppContext = createContext();
export function AppProvider({ children }) {
  const [logs, setLogs] = useState([]);
  return (
    <AppContext.Provider value={{ logs, setLogs }}>
      {children}
    </AppContext.Provider>
  );
}
