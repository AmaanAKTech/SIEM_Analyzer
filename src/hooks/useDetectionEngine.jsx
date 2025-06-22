// src/hooks/useDetectionEngine.jsx
import { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const parseTime = (t) => new Date(t).getTime();

export default function useDetectionEngine(logs) {
  const { setAlerts } = useContext(AppContext);

  useEffect(() => {
    if (!logs || logs.length === 0) {
      setAlerts([]);
      return;
    }

    const alerts = [];

    // Group by IP
    const failedLogins = {};
    const burstByComponent = {};

    logs.forEach(log => {
      const time = parseTime(log.timestamp);

      // 1. Detect 5+ failed logins from same IP in 60s
      if (log.level === 'ERROR' && log.message.toLowerCase().includes('login')) {
        if (!failedLogins[log.ip]) failedLogins[log.ip] = [];
        failedLogins[log.ip].push(time);
      }

      // 2. Detect CRITICAL bursts
      if (log.level === 'CRITICAL') {
        const key = `${log.component}`;
        if (!burstByComponent[key]) burstByComponent[key] = [];
        burstByComponent[key].push(time);
      }

      // 3. Bad IP flag
      if (log.isBadIP) {
        alerts.push({
          type: 'Threat Intel',
          ip: log.ip,
          message: `Blacklisted IP (${log.ip}) accessed system`,
          timestamp: log.timestamp,
        });
      }
    });

    // 4. Statistical Anomaly Detection
const levelCounts = logs.reduce((acc, log) => {
  acc[log.level] = (acc[log.level] || 0) + 1;
  return acc;
}, {});

if (levelCounts['CRITICAL'] && levelCounts['CRITICAL'] > 20) {
  alerts.push({
    type: 'Anomaly Detection',
    message: `Unusual spike: ${levelCounts['CRITICAL']} CRITICAL logs detected`,
    timestamp: new Date().toISOString(),
  });
}

// 5. UBA – User logs in from unseen IP or geo
const seenUsers = {}; // user => [ip, city, country]

logs.forEach(log => {
  if (!log.user || !log.ip) return;

  if (!seenUsers[log.user]) {
    seenUsers[log.user] = [];
  }

  const known = seenUsers[log.user].find(
    rec => rec.ip === log.ip || (log.geo && rec.city === log.geo.city)
  );

  if (!known) {
    alerts.push({
      type: 'User Behavior',
      user: log.user,
      ip: log.ip,
      message: `New login pattern: ${log.user} logged in from new IP ${log.ip}${log.geo ? ` (${log.geo.city})` : ''}`,
      timestamp: log.timestamp,
    });

    seenUsers[log.user].push({
      ip: log.ip,
      city: log.geo?.city,
      country: log.geo?.country
    });
  }
});

    // Check failed login rule
    for (const ip in failedLogins) {
      const timestamps = failedLogins[ip].sort();
      for (let i = 0; i < timestamps.length - 4; i++) {
        const delta = timestamps[i + 4] - timestamps[i]; // 5 in short window
        if (delta <= 60000) {
          alerts.push({
            type: 'Brute Force Login',
            ip,
            message: `5+ failed logins from ${ip} within 1 minute`,
            timestamp: new Date(timestamps[i]).toISOString(),
          });
          break;
        }
      }
    }

    // Check burst detection
    for (const comp in burstByComponent) {
      const timestamps = burstByComponent[comp].sort();
      for (let i = 0; i < timestamps.length - 9; i++) {
        const delta = timestamps[i + 9] - timestamps[i];
        if (delta <= 120000) {
          alerts.push({
            type: 'Burst Alert',
            component: comp,
            message: `Burst of CRITICAL logs in ${comp} within 2 minutes`,
            timestamp: new Date(timestamps[i]).toISOString(),
          });
          break;
        }
      }
    }

    setAlerts(alerts);
  }, [logs, setAlerts]);
}

