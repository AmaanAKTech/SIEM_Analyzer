import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const logRegex = /^(?<timestamp>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)?\s*(?<level>INFO|ERROR|WARN|DEBUG)?[:\-]?\s*(?<message>.*?)(?<ip>\b\d{1,3}(?:\.\d{1,3}){3}\b)?$/;

export default function useParser() {
  const { updateLogs } = useContext(AppContext);

  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split('\n');

      const parsed = lines
        .map((line, idx) => {
          const match = line.match(logRegex);
          if (!match) return null;
          const { timestamp, level, message, ip } = match.groups;

          return {
            id: idx + 1,
            raw: line,
            timestamp: timestamp || '',
            level: (level || 'INFO').toUpperCase(),
            message: message.trim(),
            ip: ip || '',
          };
        })
        .filter(Boolean);

      updateLogs(parsed);
    };

    reader.readAsText(file);
  };

  return { parseFile };
}
