import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterIP, setFilterIP] = useState('');

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

    // ✅ ADD THESE to support LogSearch and LogTable
    searchQuery,
    setSearchQuery,
    filterLevel,
    setFilterLevel,
    filterIP,
    setFilterIP,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
