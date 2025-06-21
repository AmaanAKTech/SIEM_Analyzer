import React from 'react';
import useParser from './hooks/useParser';
import LogTable from './components/LogTable';
import LogFilters from './components/LogFilters';
export default function App() {
  const { logs, parseFile } = useParser();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) parseFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">SIEM Analyzer</h1>
      <input
        type="file"
        accept=".log,.txt"
        onChange={handleFileUpload}
        className="mb-4"
      />
      <LogTable logs={logs} />
    </div>
  );
}
