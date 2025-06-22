// src/components/LogSearch.jsx
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function LogSearch() {
  const { searchQuery, setSearchQuery, filterLevel, setFilterLevel, filterIP, setFilterIP } = useContext(AppContext);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search message, user, component..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border px-3 py-2 rounded w-64"
      />

      <select
        value={filterLevel}
        onChange={(e) => setFilterLevel(e.target.value)}
        className="border px-2 py-2 rounded"
      >
        <option value="">All Levels</option>
        <option value="DEBUG">DEBUG</option>
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
        <option value="CRITICAL">CRITICAL</option>
      </select>

      <input
        type="text"
        placeholder="Filter by IP"
        value={filterIP}
        onChange={(e) => setFilterIP(e.target.value)}
        className="border px-3 py-2 rounded w-48"
      />
    </div>
  );
}