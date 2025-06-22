// src/hooks/useDetectionEngine.jsx
import { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast'; // <-- Added

const parseTime = (t) => new Date(t).getTime();

export default function useDetectionEngine(logs) {
  const { setAlerts } = useContext(AppContext);

  useEffect(() => {
    if (!logs || logs.length === 0) {
      setAlerts([]);
      return;
    }

    const alerts = [];
    const alertSet = new Set(); // <-- Deduplication set

    const pushAlert = (alert) => {
      const key = `${alert.type}-${alert.message}`;
      if (!alertSet.has(key)) {
        alerts.push(alert);
        toast.error(`${alert.type}: ${alert.message}`);
        alertSet.add(key);
      }
    };

    // Group by IP/component
    const failedLogins = {};
    const burstByComponent = {};

    // 1. Iterate logs
    logs.forEach(log => {
      const time = parseTime(log.timestamp);

      // 1.1 Detect 5+ failed logins from same IP in 60s
      if (log.level === 'ERROR' && log.message.toLowerCase().includes('login')) {
        if (!failedLogins[log.ip]) failedLogins[log.ip] = [];
        failedLogins[log.ip].push(time);
      }

      // 1.2 Detect CRITICAL bursts
      if (log.level === 'CRITICAL') {
        const key = `${log.component}`;
        if (!burstByComponent[key]) burstByComponent[key] = [];
        burstByComponent[key].push(time);
      }

      // 1.3 Blacklisted IP
      if (log.isBadIP) {
        pushAlert({
          type: 'Threat Intel',
          ip: log.ip,
          message: `Blacklisted IP (${log.ip}) accessed system`,
          timestamp: log.timestamp,
        });
      }
    });

    // 2. Anomaly Detection
    const levelCounts = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {});

    if (levelCounts['CRITICAL'] && levelCounts['CRITICAL'] > 20) {
      pushAlert({
        type: 'Anomaly Detection',
        message: `Unusual spike: ${levelCounts['CRITICAL']} CRITICAL logs detected`,
        timestamp: new Date().toISOString(),
      });
    }

    // 3. User Behavior Analytics (UBA)
    const seenUsers = {}; // user => [{ ip, city, country }]
    logs.forEach(log => {
      if (!log.user || !log.ip) return;

      if (!seenUsers[log.user]) {
        seenUsers[log.user] = [];
      }

      const known = seenUsers[log.user].find(
        rec => rec.ip === log.ip || (log.geo && rec.city === log.geo.city)
      );

      if (!known) {
        pushAlert({
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

    // 4. Brute Force Login detection
    for (const ip in failedLogins) {
      const timestamps = failedLogins[ip].sort();
      for (let i = 0; i < timestamps.length - 4; i++) {
        const delta = timestamps[i + 4] - timestamps[i];
        if (delta <= 60000) {
          pushAlert({
            type: 'Brute Force Login',
            ip,
            message: `5+ failed logins from ${ip} within 1 minute`,
            timestamp: new Date(timestamps[i]).toISOString(),
          });
          break;
        }
      }
    }

    // 5. Burst Alert detection
    for (const comp in burstByComponent) {
      const timestamps = burstByComponent[comp].sort();
      for (let i = 0; i < timestamps.length - 9; i++) {
        const delta = timestamps[i + 9] - timestamps[i];
        if (delta <= 120000) {
          pushAlert({
            type: 'Burst Alert',
            component: comp,
            message: `Burst of CRITICAL logs in ${comp} within 2 minutes`,
            timestamp: new Date(timestamps[i]).toISOString(),
          });
          break;
        }
      }
    }

    // Finalize alert state
    setAlerts(alerts);
  }, [logs, setAlerts]);
}
