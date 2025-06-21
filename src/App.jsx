// src/App.jsx
import React from 'react';
import FileUploader from './components/FileUploader.jsx';
import LogTable from './components/LogTable.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">BrowserSIEM</h1>
      <FileUploader />
      <LogTable />
    </div>
  );
}

