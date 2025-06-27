import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper to get persisted alerts
const getStoredAlerts = () => {
  try {
    const stored = localStorage.getItem('persisted_alerts');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export default function AlertPanel() {
  const { alerts = [] } = useContext(AppContext);
  const [visibleAlerts, setVisibleAlerts] = useState(getStoredAlerts);
  const previousAlertsRef = useRef([]);

  // Sync with AppContext + localStorage
  useEffect(() => {
    const newAlerts = alerts.filter(
      alert => !previousAlertsRef.current.some(prev => prev.message === alert.message)
    );

    newAlerts.forEach(alert => {
      toast(`${alert.message}`, {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        className: 'text-sm',
        theme: 'colored',
      });
    });

    const combinedAlerts = [...alerts];
    setVisibleAlerts(combinedAlerts);
    localStorage.setItem('persisted_alerts', JSON.stringify(combinedAlerts));
    previousAlertsRef.current = combinedAlerts;
  }, [alerts]);

  // Dismiss single alert
  const dismissAlert = (indexToRemove) => {
    const updated = visibleAlerts.filter((_, i) => i !== indexToRemove);
    setVisibleAlerts(updated);
    localStorage.setItem('persisted_alerts', JSON.stringify(updated));
  };

  // Dismiss all
  const clearAllAlerts = () => {
    setVisibleAlerts([]);
    localStorage.removeItem('persisted_alerts');
  };

  const getBadgeStyle = (severity) => {
    switch (severity) {
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getIcon = (severity) => {
    switch (severity) {
      case 'error': return '❗';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      default: return '🔔';
    }
  };

  if (!visibleAlerts.length) return null;

  return (
    <div className="relative mt-6 bg-white border border-red-300 rounded-xl shadow-md p-5 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
          🚨 Alerts
        </h2>
        <button
          onClick={clearAllAlerts}
          className="text-xs text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Clear All
        </button>
      </div>

      <div className="max-h-60 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-100">
        {visibleAlerts.map((alert, idx) => (
          <div
            key={idx}
            className={`animate-slideUp flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-l-4 pl-4 pr-3 py-3 rounded-md bg-red-50 hover:bg-red-100 transition-all duration-300 ${getBadgeStyle(alert.severity)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{getIcon(alert.severity)}</span>
              <div>
                <p className="text-sm font-medium">{alert.message || JSON.stringify(alert)}</p>
                {alert.timestamp && (
                  <p className="text-xs mt-1 text-gray-500">
                    {format(new Date(alert.timestamp), 'PPpp')}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {alert.severity && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${getBadgeStyle(alert.severity)}`}>
                  {alert.severity}
                </span>
              )}
              <button
                onClick={() => dismissAlert(idx)}
                className="text-xs px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-200 transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
