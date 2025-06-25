// src/components/Header.jsx
import "../App.css"
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("dashboard");

  return (
    <header className="bg-white text-gray-800 shadow-md px-6 py-4 flex justify-between items-center rounded-lg mb-6">
      <h1 className="text-2xl font-bold">SIEM Analyzer</h1>
      <nav className="space-x-4">
        <Link
          to="/"
          className="btn btn-gray"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="btn btn-blue"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
}