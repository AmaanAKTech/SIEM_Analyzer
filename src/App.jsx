// src/App.jsx
import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppProvider, AppContext } from "./context/AppContext";
import Header from "./components/Header";
import FileUploader from "./components/FileUploader";
import Dashboard from "./components/Dashboard";
import AlertPanel from "./components/AlertPanel";
import LogSearch from "./components/LogSearch";
import LogTable from "./components/LogTable";
import useDetectionEngine from "./hooks/useDetectionEngine";

// ✅ Wrapped in try-catch & check
function HomePage() {
  const context = useContext(AppContext);

  if (!context) {
    return <div className="text-red-500">AppContext not found!</div>;
  }

  const { logs, updateLogs } = context;
  useDetectionEngine(logs || []);

  return (
    <div className="p-6 max-w-screen-xl mx-auto text-white">
      <FileUploader />
      {logs?.length > 0 && (
        <>
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
      <Router>
        <div className="bg-slate-900 min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}