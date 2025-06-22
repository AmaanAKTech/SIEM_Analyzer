// src/App.jsx
import React from 'react';
import useParser from './hooks/useParser';
import useDetectionEngine from './hooks/useDetectionEngine';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import LogSearch from './components/LogSearch';
import LogTable from './components/LogTable';
import AlertPanel from './components/AlertPanel';
import Dashboard from './components/Dashboard';

export default function App() {
  const { parseFile } = useParser();
  const { logs } = useContext(AppContext);
  useDetectionEngine(logs); // Hook for rule detection

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) parseFile(file);
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">SIEM Analyzer</h1>
      <input type="file" onChange={handleUpload} className="mb-4" />
      
      {/* Updated component order */}
      <Dashboard />
      <AlertPanel />
      <LogSearch />
      <LogTable />
    </div>
  );
}
