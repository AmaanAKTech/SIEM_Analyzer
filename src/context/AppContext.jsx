// src/context/AppContext.jsx
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [filterLevel, setFilterLevel] = useState('');
  const [filterIP, setFilterIP] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [alerts, setAlerts] = useState([]);

  const updateLogs = (logArray) => setLogs(logArray);

  return (
    <AppContext.Provider value={{
      logs, updateLogs,
      filterLevel, setFilterLevel,
      filterIP, setFilterIP,
      searchQuery, setSearchQuery,
       alerts, setAlerts 
    }}>
      {children}
    </AppContext.Provider>
  );
};
