import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function LogTable() {
  const { logs } = useContext(AppContext);

  if (logs.length === 0) {
    return <p className="mt-4 text-gray-500">No logs loaded yet.</p>;
  }

  return (
    <div className="mt-4 overflow-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">#</th>
            <th className="border px-2 py-1 text-left">Raw Entry</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((entry, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{idx + 1}</td>
              <td className="border px-2 py-1 font-mono text-sm whitespace-pre-wrap">
                {entry.raw}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
