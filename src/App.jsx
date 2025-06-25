// src/App.jsx
import "./App.css"
import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';

import FileUploader from './components/FileUploader';
import Dashboard from './components/Dashboard';
import AlertPanel from './components/AlertPanel';
import LogSearch from './components/LogSearch';
import LogTable from './components/LogTable';
import useDetectionEngine from './hooks/useDetectionEngine';

function AppContent() {
  const context = useContext(AppContext);             // ✅ Safe
  const logs = context?.logs || [];                   // ✅ No crash
  const updateLogs = context?.updateLogs;

  useDetectionEngine(logs);                           // ✅ Safe to run

  return (
    <div className="p-6 max-w-screen-xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">SIEM Analyzer</h1>
      <FileUploader />

      {logs.length > 0 && (
        <>
          <Dashboard />
          <AlertPanel />
          <LogSearch />
          <LogTable />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}