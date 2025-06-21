import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function LogFilters() {
  const { filterLevel, setFilterLevel, filterIP, setFilterIP } = useContext(AppContext);

  return (
    <div className="flex gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium">Filter by Level</label>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          <option value="INFO">INFO</option>
          <option value="ERROR">ERROR</option>
          <option value="WARN">WARN</option>
          <option value="DEBUG">DEBUG</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Filter by IP</label>
        <input
          type="text"
          value={filterIP}
          onChange={(e) => setFilterIP(e.target.value)}
          placeholder="e.g. 10.0.0.1"
          className="border px-2 py-1 rounded"
        />
      </div>
    </div>
  );
}