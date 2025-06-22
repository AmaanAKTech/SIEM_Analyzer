// src/context/AppContext.jsx
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState([]);

const value = {
  logs,
  setLogs,
  filteredLogs,
  setFilteredLogs,
  query,
  setQuery,
  alerts,
  setAlerts,
};

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};