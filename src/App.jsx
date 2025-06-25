// src/App.jsx
import React, { useContext } from 'react';
import useParser from './hooks/useParser.jsx';
import useDetectionEngine from './hooks/useDetectionEngine.jsx';
import { AppContext } from './context/AppContext';

// ✅ Make sure these are correctly placed in /src/components/
import FileUploader from './components/FileUploader.jsx';
import Dashboard from './components/Dashboard.jsx';
import AlertPanel from './components/AlertPanel.jsx';
import LogSearch from './components/LogSearch.jsx';
import LogTable from './components/LogTable.jsx';

export default function App() {
  const { parseFile } = useParser();
  const { logs } = useContext(AppContext);

  // ⛳ Starts detection logic after logs update
  useDetectionEngine(logs);

  return (
    <div className="p-6 max-w-screen-xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">SIEM Analyzer</h1>

      {/* Main Flow */}
      <FileUploader />

      {/* Render conditionally based on logs */}
      {logs?.length > 0 && (
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
