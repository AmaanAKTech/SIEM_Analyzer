import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const getRowClass = (level) => {
  switch (level) {
    case 'ERROR':
      return 'bg-red-100 text-red-700';
    case 'WARN':
      return 'bg-yellow-100 text-yellow-800';
    case 'DEBUG':
      return 'bg-blue-100 text-blue-800';
    case 'INFO':
      return 'bg-green-100 text-green-800';
    default:
      return '';
  }
};

const highlightKeywords = (text) => {
  const keywords = ['error', 'failed', 'closed', 'denied', 'unauthorized'];
  let result = text;

  keywords.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    result = result.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  });

  return result;
};

export default function LogTable() {
  const { logs, filterLevel, filterIP } = useContext(AppContext);

  const filteredLogs = logs.filter(log => {
    const levelMatch = filterLevel ? log.level === filterLevel : true;
    const ipMatch = filterIP ? log.ip.includes(filterIP) : true;
    return levelMatch && ipMatch;
  });

  if (filteredLogs.length === 0) {
    return <p className="mt-4 text-gray-500">No matching logs found.</p>;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full text-sm table-auto border border-gray-300 shadow">
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Timestamp</th>
            <th className="p-2 text-left">Level</th>
            <th className="p-2 text-left">Message</th>
            <th className="p-2 text-left">IP</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, idx) => (
            <tr key={log.id} className={getRowClass(log.level)}>
              <td className="p-2 border-t">{idx + 1}</td>
              <td className="p-2 border-t">{log.timestamp}</td>
              <td className="p-2 border-t font-bold">{log.level}</td>
              <td
                className="p-2 border-t"
                dangerouslySetInnerHTML={{ __html: highlightKeywords(log.message) }}
              />
              <td className="p-2 border-t">{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
