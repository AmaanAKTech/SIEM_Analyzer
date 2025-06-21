import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [filterLevel, setFilterLevel] = useState('');
  const [filterIP, setFilterIP] = useState('');

  const updateLogs = (logArray) => setLogs(logArray);

  return (
    <AppContext.Provider
      value={{ logs, updateLogs, filterLevel, setFilterLevel, filterIP, setFilterIP }}
    >
      {children}
    </AppContext.Provider>
  );
};
