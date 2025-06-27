import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  TimeScale
);

export default function Dashboard() {
  const { logs } = useContext(AppContext);
  const [filterLevel, setFilterLevel] = useState('All');

  if (!logs || logs.length === 0) return null;

  try {
    const filteredLogs = filterLevel === 'All' ? logs : logs.filter(log => log.level === filterLevel);

    const levelCounts = {};
    const componentCounts = {};
    const timeCounts = {};

    filteredLogs.forEach(log => {
      if (!log.timestamp || isNaN(Date.parse(log.timestamp))) return;

      if (log.level) levelCounts[log.level] = (levelCounts[log.level] || 0) + 1;
      if (log.component) componentCounts[log.component] = (componentCounts[log.component] || 0) + 1;

      const timeKey = new Date(log.timestamp).toISOString().slice(0, 16);
      timeCounts[timeKey] = (timeCounts[timeKey] || 0) + 1;
    });

    const totalLogs = filteredLogs.length;
    const uniqueComponents = Object.keys(componentCounts).length;
    const uniqueLevels = Object.keys(levelCounts).length;

    const pieData = {
      labels: Object.keys(levelCounts),
      datasets: [
        {
          data: Object.values(levelCounts),
          backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#facc15', '#a78bfa'],
        },
      ],
    };

    const barData = {
      labels: Object.keys(componentCounts),
      datasets: [
        {
          label: 'Events by Component',
          data: Object.values(componentCounts),
          backgroundColor: '#4f46e5',
        },
      ],
    };

    const lineData = {
      labels: Object.keys(timeCounts),
      datasets: [
        {
          label: 'Events over Time',
          data: Object.values(timeCounts),
          borderColor: '#2563eb',
          backgroundColor: '#bfdbfe',
          tension: 0.3,
          fill: true,
        },
      ],
    };

    const downloadCSV = () => {
      const csv = filteredLogs.map(log => `${log.timestamp},${log.level},${log.component},${log.message}`).join('\n');
      const blob = new Blob([`timestamp,level,component,message\n${csv}`], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'filtered_logs.csv');
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">📊 Log Dashboard</h1>

          <div className="flex items-center gap-x-[300px] flex-wrap">
            <div className="flex items-center gap-3">
              <label htmlFor="filter" className="text-sm font-medium text-gray-600">Filter Level:</label>
              <select
                id="filter"
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={filterLevel}
                onChange={e => setFilterLevel(e.target.value)}
              >
                <option value="All">All</option>
                {Object.keys(levelCounts).map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={downloadCSV}
            >
              ⬇ Export CSV
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-6 overflow-x-auto">
          <div className="bg-white rounded-xl shadow-md p-5 text-center min-w-[250px]">
            <h4 className="text-sm text-gray-500">Total Logs</h4>
            <p className="text-2xl font-semibold text-gray-800">{totalLogs}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 text-center min-w-[250px]">
            <h4 className="text-sm text-gray-500">Unique Components</h4>
            <p className="text-2xl font-semibold text-gray-800">{uniqueComponents}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 text-center min-w-[250px]">
            <h4 className="text-sm text-gray-500">Log Levels</h4>
            <p className="text-2xl font-semibold text-gray-800">{uniqueLevels}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Log Level Distribution</h2>
            <Pie data={pieData} />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Events by Component</h2>
            <Bar data={barData} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Time-based Log Volume</h2>
          <Line data={lineData} />
        </div>
      </div>
    );
  } catch (err) {
    console.error("Dashboard render error:", err);
    return <p className="text-red-600 text-center">Error rendering dashboard</p>;
  }
}
