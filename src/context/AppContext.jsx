import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]); // important
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState([]);

  const value = {
    logs,
    setLogs,
    filteredLogs,
    setFilteredLogs,
    query,
    setQuery,
    setAlerts
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};