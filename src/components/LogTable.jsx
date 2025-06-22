// src/components/LogTable.jsx
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import Fuse from 'fuse.js';

const getRowClass = (level) => {
  switch (level) {
    case 'ERROR': return 'bg-red-100 text-red-800';
    case 'WARN': return 'bg-yellow-100 text-yellow-800';
    case 'DEBUG': return 'bg-blue-100 text-blue-800';
    case 'INFO': return 'bg-green-100 text-green-800';
    case 'CRITICAL': return 'bg-pink-200 text-red-900';
    default: return '';
  }
};

export default function LogTable() {
  const { logs, searchQuery, filterLevel, filterIP } = useContext(AppContext);

  const filteredLogs = useMemo(() => {
    // Apply basic filters first
    let result = logs.filter(log => {
      const levelMatch = filterLevel ? log.level === filterLevel : true;
      const ipMatch = filterIP ? log.ip.includes(filterIP) : true;
      return levelMatch && ipMatch;
    });

    if (searchQuery.trim()) {
      const fuse = new Fuse(result, {
        keys: ['message', 'component', 'user'],
        threshold: 0.4,
        ignoreLocation: true,
      });
      const results = fuse.search(searchQuery);
      result = results.map(r => r.item);
    }

    return result;
  }, [logs, searchQuery, filterLevel, filterIP]);

  if (filteredLogs.length === 0) {
    return <p className="text-gray-600 mt-4">No matching logs found.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-sm table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Level</th>
            <th className="p-2 text-left">Component</th>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">IP</th>
            <th className="p-2 text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, idx) => (
            <tr key={log.id} className={getRowClass(log.level)}>
              <td className="p-2 border-t">{idx + 1}</td>
              <td className="p-2 border-t">{log.timestamp}</td>
              <td className="p-2 border-t font-semibold">{log.level}</td>
              <td className="p-2 border-t">{log.component}</td>
              <td className="p-2 border-t">{log.user}</td>
              <td className="p-2 border-t">
                {log.ip}
                {log.isBadIP && (
                  <span className="ml-2 text-xs text-red-700 bg-red-100 px-1 rounded">
                    ⚠️ Blacklisted
                  </span>
                )}
                {log.geo && (
                  <div className="text-xs text-gray-500">
                    {log.geo.city}, {log.geo.country} • {log.geo.org}
                  </div>
                )}
              </td>
              <td className="p-2 border-t">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
