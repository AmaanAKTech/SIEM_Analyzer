// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle = (path) =>
    `px-4 py-2 rounded-md font-medium transition ${
      pathname === path
        ? "bg-blue-100 text-blue-700"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          SIEM Analyzer
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-x-6">
          <Link to="/" className={navLinkStyle("/")}>
            Home
          </Link>
          <Link to="/dashboard" className={navLinkStyle("/dashboard")}>
            Dashboard
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 pb-4 flex flex-col gap-2">
          <Link
            to="/"
            className={navLinkStyle("/")}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={navLinkStyle("/dashboard")}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
