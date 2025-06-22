// src/components/Dashboard.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Bar, Pie, Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, TimeScale
);

export default function Dashboard() {
  const { logs } = useContext(AppContext);

  if (logs.length === 0) return null;

  const levelCounts = {};
  const componentCounts = {};
  const timeCounts = {};

  logs.forEach(log => {
    levelCounts[log.level] = (levelCounts[log.level] || 0) + 1;
    componentCounts[log.component] = (componentCounts[log.component] || 0) + 1;

    const timeKey = new Date(log.timestamp).toISOString().slice(0, 16); // Minute precision
    timeCounts[timeKey] = (timeCounts[timeKey] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(levelCounts),
    datasets: [
      {
        data: Object.values(levelCounts),
        backgroundColor: ['#fbbf24', '#60a5fa', '#f87171', '#a78bfa', '#34d399'],
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
        backgroundColor: '#93c5fd',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Log Level Distribution</h3>
        <Pie data={pieData} />
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Events by Component</h3>
        <Bar data={barData} />
      </div>

      <div className="col-span-full p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Time-based Log Volume</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
}