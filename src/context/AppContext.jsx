// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

// ✅ Helper to safely get logs from sessionStorage
const getInitialLogs = () => {
  const stored = sessionStorage.getItem('logs');
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.warn('Invalid logs in sessionStorage:', err);
    sessionStorage.removeItem('logs');
    return [];
  }
};

export const AppProvider = ({ children }) => {
  const [logs, setLogs] = useState(getInitialLogs);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterIP, setFilterIP] = useState('');

  // ✅ Called when new logs are uploaded
  const updateLogs = (newLogs) => {
    setLogs(newLogs);
    setFilteredLogs(newLogs);
    sessionStorage.setItem('logs', JSON.stringify(newLogs));
  };

  // ✅ Clear logs from state and session
  const clearLogs = () => {
    setLogs([]);
    setFilteredLogs([]);
    sessionStorage.removeItem('logs');
  };

  // ✅ Auto-clear logs on tab/browser close
  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.removeItem('logs');
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

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
    clearLogs,
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