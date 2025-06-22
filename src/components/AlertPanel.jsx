import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function AlertPanel() {
  const { alerts = [] } = useContext(AppContext); // fallback to []

  if (!alerts.length) return null;

  return (
    <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded">
      <h2 className="font-bold mb-2">Alerts</h2>
      <ul className="list-disc pl-5 space-y-1">
        {alerts.map((alert, idx) => (
          <li key={idx}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}