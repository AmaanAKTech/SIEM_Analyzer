import { useCallback } from 'react';

export default function useParser() { 
  const parseFile = useCallback((file, onComplete, onError) => {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;
      const lines = text.split(/\r?\n/).filter(Boolean);
      const parsed = lines.map(line => ({ raw: line }));

      onComplete(parsed);
    };

    reader.onerror = () => {
      onError && onError(reader.error);
    };

    reader.readAsText(file);
  }, []);

  return { parseFile };
}
