// src/components/AlertPanel.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function AlertPanel() {
  const { alerts } = useContext(AppContext);

  if (alerts.length === 0) return null;

  return (
    <div className="my-4 bg-red-50 border-l-4 border-red-500 p-4">
      <h2 className="font-bold text-red-700 mb-2">Detected Alerts</h2>
      <ul className="list-disc ml-6 text-red-900 text-sm">
        {alerts.map((alert, idx) => (
          <li key={idx}>
            <strong>{alert.type}</strong>: {alert.message} <br />
            <span className="text-xs text-gray-600">{alert.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}