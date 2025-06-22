// src/hooks/useParser.jsx
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { geoipDB, badIPs } from '../utils/geoipMock';

const levelMap = {
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  CRITICAL: 5,
};

const normalizeLevel = (level = '') => {
  const upper = level.toUpperCase();
  if (['ERROR', 'ERR', 'FAIL'].includes(upper)) return 'ERROR';
  if (['WARN', 'WARNING'].includes(upper)) return 'WARN';
  if (['DEBUG'].includes(upper)) return 'DEBUG';
  if (['INFO', 'INFORMATION'].includes(upper)) return 'INFO';
  if (['CRITICAL'].includes(upper)) return 'CRITICAL';
  return 'INFO';
};

const normalizeComponent = (raw = '') => {
  const c = raw.toLowerCase();
  if (c.includes('auth')) return 'auth';
  if (c.includes('net')) return 'network';
  if (c.includes('db') || c.includes('sql')) return 'database';
  if (c.includes('web') || c.includes('http')) return 'webserver';
  return 'system';
};

export default function useParser() {
  const { updateLogs } = useContext(AppContext);

  const parseFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = e.target.result.split('\n');

      const parsedLogs = lines.map((line, index) => {
        const timestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?/;
        const levelRegex = /\b(INFO|ERROR|DEBUG|WARN|WARNING|CRITICAL|FAIL|ERR)\b/i;
        const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
        const userRegex = /user\s*=?\s*["']?([a-zA-Z0-9._-]+)["']?/i;
        const componentRegex = /\b(auth|db|sql|web|net|network|http|fs|filesystem|kernel)\b/i;

        const timestamp = (line.match(timestampRegex) || [])[0] || '';
        const levelRaw = (line.match(levelRegex) || [])[0] || '';
        const level = normalizeLevel(levelRaw);
        const severity = levelMap[level];
        const ip = (line.match(ipRegex) || [])[0] || '';
        const userMatch = line.match(userRegex);
        const user = userMatch ? userMatch[1] : '';
        const componentRaw = (line.match(componentRegex) || [])[0] || '';
        const component = normalizeComponent(componentRaw);

        const message = line.replace(timestamp, '')
          .replace(levelRaw, '')
          .replace(ip, '')
          .replace(user, '')
          .replace(componentRaw, '')
          .replace(/[:=\[\]"]/g, '')
          .trim();

        // Enrichment: GeoIP
        const geo = geoipDB[ip] || null;

        // Threat Intel: bad IP check
        const isBadIP = badIPs.includes(ip);

        return {
          id: index + 1,
          raw: line,
          timestamp,
          level,
          severity,
          component,
          user,
          ip,
          message,
          geo, // e.g. { country, city, org }
          isBadIP
        };
      });

      updateLogs(parsedLogs);
    };

    reader.readAsText(file);
  };

  return { parseFile };
}