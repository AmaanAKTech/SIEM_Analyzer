import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState([]);

  const updateLogs = (newLogs) => {
    setLogs(newLogs);
    setFilteredLogs(newLogs); 
  };

  const value = {
    logs,
    setLogs,
    filteredLogs,
    setFilteredLogs,
    query,
    setQuery,
    alerts,
    setAlerts,
    updateLogs, 
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
